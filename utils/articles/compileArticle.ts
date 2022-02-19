import { IArticleMetadata } from "types/Blog";
import { Loader, BuildOptions } from "esbuild";

import { getMDXExport } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import formatArticle from "./formatArticle";
import { getArticleDist, readArticle, getArticleSrc } from "./utils";

const LOADER_FORMAT_MAP: { [key in Loader]?: Array<string> } = {
  file: ["png", "jpeg", "jpg", "svg"],
  text: ["vue", "ts", "tsx", "js", "html", "css"],
};

const LOADERS: BuildOptions["loader"] = Object.entries(
  LOADER_FORMAT_MAP
).reduce((ac, [loader, extensions]) => {
  return {
    ...ac,
    ...extensions.reduce(
      (ac, ext) => ({
        ...ac,
        ["." + ext]: loader,
      }),
      {}
    ),
  };
}, {});

export default async function compileArticle(
  slug: string,
) {
  const articleSrc = getArticleSrc(slug);

  const precompiledArticle = formatArticle(readArticle(slug));

  const { code } = await bundleMDX({
    source: precompiledArticle,
    cwd: articleSrc,
    esbuildOptions: (options) => {
      // Set the `outdir` to a public location for this bundle.
      options.outdir = getArticleDist(slug);
      options.loader = {
        ...options.loader,
        ...LOADERS,
      };

      options.publicPath = `/articles/${slug}`;
      options.write = true;

      return options;
    },
  });

  const { frontMatter } = getMDXExport(code) as {
    frontMatter: IArticleMetadata;
  };

  return {
    code,
    frontMatter,
  };
}
