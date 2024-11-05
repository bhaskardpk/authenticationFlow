import mongoose, { Schema } from "mongoose";
import validator from "validator";
interface IUser extends Document {
  fullName?: string;
  email: string;
  oldEmail: string;
  password: string;
  phoneNumber?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  dob?: string;
  isDeleted: boolean;
  avatar?: string;
  completedStep?: number;
  emailVerified: boolean;
  resetPasswordToken?: string;
  countryCode?: string;
  profileDescription?: string;
  representedClub?: string;
  representedPlayer?: string;
  function?: string;
  scoutStatus?: string;
  deletedAt?: Date;
  emailChangeAt?: Date;
  addressId?: Schema.Types.ObjectId;
  companyId?: Schema.Types.ObjectId;
  myCertification?: Schema.Types.ObjectId[];
  identification?: string;
}
const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    oldEmail: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    emailChangeAt: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    countryCode: {
      type: String,
      default: null,
    },
    userName: {
      type: String,
      default: null,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    dob: {
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
    avatar: {
      type: String,
      default: null,
    },
    completedStep: {
      type: Number,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "user_address",
      default: null,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "company",
      default: null,
    },
    profileDescription: {
      type: String,
      default: null,
    },
    representedClub: {
      type: String,
      default: null,
    },
    representedPlayer: {
      type: String,
      default: null,
    },
    identification: {
      type: String,
      default: null,
    },

    myCertification: [
      {
        type: Schema.Types.ObjectId,
        ref: "agentInfo",
      },
    ],
    function: {
      type: String,
      default: null,
    },
    scoutStatus: String
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
