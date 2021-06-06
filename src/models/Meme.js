import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MemeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: Number,
  imageLocation: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  usageCount: Number,
}, {
  timestamps: true,
});
MemeSchema.index({name: 'text', 'description': 'text'});
mongoose.model("Meme", MemeSchema);

export default mongoose.model("Meme");
