import { UserModel } from "../models";
import userAddress from "../models/userAddress";
import { apiThrowError, tryCatchFun } from "../utils/apiHelper";

const findOne = tryCatchFun(async (data: any) => {
  let res: any = await UserModel.findOne(data).lean();
  if (res?.isDeleted) {
    apiThrowError(
      "Your account has been deleted.If you need any assistance, please contact the admin."
    );
  }
  return res;
});

const create = tryCatchFun(async (data: any) => {
  let res = await UserModel.create(data);
  if (!res) {
    apiThrowError("Data not created");
  }
  return res;
});

type findByIdAndUpdateType = {
  filter: any;
  update: any;
};
const findByIdAndUpdate = tryCatchFun(async (data: findByIdAndUpdateType) => {
  const { filter, update } = data || "";
  let res = await UserModel.findByIdAndUpdate(filter, update, { new: true });
  if (!res) {
    apiThrowError("Data not updated");
  }
  return res;
});

const getUserAllDetails = tryCatchFun(async (data: any) => {
  // let res = await UserModel.aggregate([
  //   { $match: { ...data } },
  //   {
  //     $lookup: {
  //       from: "user_addresses",
  //       localField: "_id",
  //       foreignField: "userId",
  //       as: "address",
  //     },
  //   },
  // ]);
  let res = await UserModel.findOne(data)
    .select("-password")
    .populate("addressId")
    .populate("companyId");

  if (!res) {
    apiThrowError("Data not updated");
  }
  return res;
});

export default { findOne, create, findByIdAndUpdate, getUserAllDetails };
