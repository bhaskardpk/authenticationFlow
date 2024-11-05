import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface CompanyInterface {
  address: string;
  businessName: string;
  createdAt: string;
  createdFrom: string;
  deletedAt: string | null;
  identificationNumber: number;
  isDeleted: boolean;
  legalForm: string;
  placeId: string;
  updatedAt: string;
  userId: string;
  vatNumber: string | null;
  _id?: string;
}
export interface UserStateInterface {
  fullName?: string;
  email?: string;
  oldEmail?: string;
  password?: string;
  phoneNumber?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  dob?: string;
  isDeleted?: boolean;
  avatar?: string;
  completedStep?: number;
  emailVerified?: boolean;
  resetPasswordToken?: string;
  countryCode?: string;
  profileDescription?: string;
  representedClub?: string;
  representedPlayer?: string;
  function?: string;
  deletedAt?: Date | null;
  emailChangeAt?: Date | null;
  // addressId?: Schema.Types.ObjectId;
  companyId?: CompanyInterface;
  _id?: string;
}

export type userInitialStateType = {
  user?: UserStateInterface;
  isLoading?: boolean;
};
const initialState: userInitialStateType = {
  user: {
    fullName: "",
    email: "",
    oldEmail: "",
    password: "",
    phoneNumber: "",
    userName: "",
    firstName: "",
    lastName: "",
    address: "",
    dob: "",
    isDeleted: false,
    avatar: "",
    completedStep: 0,
    emailVerified: false,
    resetPasswordToken: "",
    countryCode: "",
    profileDescription: "",
    representedClub: "",
    representedPlayer: "",
    function: "",
    deletedAt: null,
    emailChangeAt: null,
  },
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserStateInterface>) => {
      return { ...state, user: { ...state.user, ...action.payload } };
    },
    clearUser: (state) => {
      return initialState;
    },
    setIsloading: (state, action: PayloadAction<userInitialStateType>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Export actions and reducer
export const { setUser, clearUser, setIsloading } = userSlice.actions;
export default userSlice.reducer;
