import { Schema, model, Model, Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  _id:string | Types.ObjectId
}

type UserModelType=Model<IUser>
const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModel:UserModelType = model<IUser>("Users", schema);


export default UserModel