import { Schema, model } from "mongoose";
import { UserInterface } from "../interfaces/Models.interface";
import bcrypt from "bcrypt";
import { jwtSignValue } from "../helpers/Jwt";

const userSchema = new Schema<UserInterface>({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid Email"],
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
      "Invalid Password",
    ],
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  emailValidationKey: {
    type: String,
    unique: true,
  },
  emailValidationExpire: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashedPassword: string = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePasswords = async function (password: string) {
  const comparePw = await bcrypt.compare(password, this.password);
  return comparePw;
};

userSchema.methods.getTokens = function () {
  const accessToken = jwtSignValue(
    { _id: this._id },
    "30m",
    <string>process.env.ACCESS_TOKEN_KEY
  );
  const refreshToken = jwtSignValue(
    { _id: this._id },
    "30d",
    <string>process.env.REFRESH_TOKEN_KEY
  );
  return { accessToken, refreshToken };
};

const User = model<UserInterface>("User", userSchema);
export default User;
