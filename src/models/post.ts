import {
  Schema,
  model,
  Model,
  Document,
  Types,
  PopulatedDoc,
  ObjectId,
} from "mongoose";
import { IUser } from "./user";

export interface Ipost extends Document {
  caption: string;
  file: string[];
  location: string;
  tags: string[];
  creator: PopulatedDoc<Document<ObjectId> & IUser>;
  like:string[],
  bookmark:String[],
  _id:string | Types.ObjectId
}

type postModelType = Model<Ipost>;
const schema = new Schema<Ipost>(
  {
    caption: {
      type: String,
      required: true,
    },
    file: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    creator: {
      type: Types.ObjectId,
      ref: "Users",
      required: true,
    },
    like:{
      type:[String]
    },
    bookmark:{
      type:[String]
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const postModel: postModelType = model<Ipost>("Post", schema);

export default postModel;
