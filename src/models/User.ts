import mongoose, { Schema } from "mongoose";

mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);



export default mongoose.models.User || mongoose.model("User", userSchema);