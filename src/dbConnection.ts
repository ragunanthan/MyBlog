import mongoose, { Schema } from "mongoose";

mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.Promise = global.Promise;

const blogsSchema = new Schema(
  {
    title: String,
    description: String,
    category: [String],
    active: Boolean,
    imageUrl : String
  },
  {
    timestamps: true,
  } 
);

const Blogs = mongoose.models.Blogs || mongoose.model("Blogs", blogsSchema);

export default Blogs;