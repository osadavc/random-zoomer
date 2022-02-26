import mongoose from "mongoose";

interface UserI extends mongoose.Document {
  zoomId: string;
  name: string;
  email: string;
  picture: string;
}

const userSchema = new mongoose.Schema<UserI>({
  zoomId: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

export default (mongoose.models.User as mongoose.Model<UserI>) ||
  mongoose.model<UserI>("User", userSchema);
