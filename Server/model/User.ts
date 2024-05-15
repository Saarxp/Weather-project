import { Schema, model } from "mongoose";

export default class User {
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public loggedIn: boolean
  ) {}
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minLength: 5,
  },
  hashedPassword: {
    type: String,
    required: true,
    minLength: 5,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  loggedIn: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export const UserModel = model("users", UserSchema);
