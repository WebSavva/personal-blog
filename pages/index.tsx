import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import HeroBlock from "@/components/HeroBlock";
import MissionBlock from "@/components/MissionBlock";
import ActionBlock from "@/components/ActionBlock";
import TechnologyBlock from "@/components/TechnologyBlock";
import DetailsBlock from "@/components/DetailsBlock";

const Home: NextPage = () => {
  return (<>
    <Head>
      <title>Intro | WebSavva Blog</title>
    </Head>

    <div>
      <HeroBlock />

      <MissionBlock />

      <ActionBlock />

      <TechnologyBlock />

      <DetailsBlock />
    </div>
  </>
  );
};

export default Home;
