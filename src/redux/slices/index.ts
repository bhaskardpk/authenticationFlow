import userReducer from "./userSlice";
import settingReducer from "./settingSlice";
import reportReducer from "./reportSlice";
import playerSlice from "./playerSlice";

let combineReducer = {
  userDetails: userReducer,
  settingDetails: settingReducer,
  reportDetails: reportReducer,
  player: playerSlice
};

export default combineReducer;
