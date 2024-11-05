import mongoose from "mongoose";
const { Schema } = mongoose;

interface IUserAddress extends Document {
  userId?: mongoose.Types.ObjectId;
  placeId?: string;
  completeAddress?: string;
  shortAddress?: string;
  isDeleted: boolean;
  latitude: number;
  longitude: number;
  deletedAt: Date;
}
const userAddressSchema = new Schema<IUserAddress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    placeId: {
      type: String,
      default: null,
    },
    completeAddress: {
      type: String,
      default: null,
    },
    shortAddress: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
  },
  { timestamps: true }
);
const userAddress =
  mongoose.models.user_address ||
  mongoose.model<IUserAddress>("user_address", userAddressSchema);
export default userAddress;
