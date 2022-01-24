import mongoose, { Schema, model, Model } from "mongoose";
import dbConnect from "../utils/dbConnect";
import { IArticle } from "types/Blog";

async function getArticleModel() {
  if (!mongoose.models.Article) {
    await dbConnect();

    return model<IArticle>(
      "Article",
      new Schema<IArticle>({
        title: {
          type: String,
          required: true,
        },

        description: {
          type: String,
          required: true,
        },

        thumbnailUrl: {
          type: String,
          required: true,
        },

        publishedDate: {
          type: Date,
          required: true,
        },

        body: {
          type: String,
          required: true,
        },
      })
    );
  } else {
      return mongoose.models.Article as Model<IArticle>;
  }
};


export default getArticleModel;
