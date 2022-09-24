import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Image = new Schema({
  expected: {
    type: Number,
  },
  current: {
    type: Number,
  },
  imageLocation: String,
  origin: String,
  downloadedOn: Date,
  ip: String
}, {
  timestamps: true,
}, { collection: 'image_data' });

mongoose.model("Image", Image);

export default mongoose.model("Image");
