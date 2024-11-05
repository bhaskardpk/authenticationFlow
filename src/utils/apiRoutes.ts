type userType = {
  registration: string;
  login: string;
  verifyEmail: string;
  forgotPasswordEmail: string;
  verifyForgotPassToken: string;
  resetForgotPassword: string;
};
type privateType = {
  getUserDetails: string;
  subscriptionGet: string;
  subscriptionAdd: string;
  userSubscriptionadd: string;
  userProfileChangePassword: string;
  userProfileChangeEmail: string;
  userProfileDeleteAccount: string;
  agentInformationAdd: string;
  agentInformationGet: string;
  userCompanyaddCompany: string;
  userCompany: string;
  uploadProfile: string;
  addReport: string;
  getReports: string;
  updateReport: string;
  deleteReport: string;
  reportQuestion: string;
  addReportQuestion: string;
  player: string;
  playerSearch: string;
};
type apiRoutesType = {
  users: userType;
  private: privateType;
};

const apiRoutes: apiRoutesType = {
  users: {
    registration: "/user/registration",
    login: "/user/login",
    verifyEmail: "user/verify-email",
    forgotPasswordEmail: "user/forgot-password-email",
    verifyForgotPassToken: "user/verify-forgot-pass-token",
    resetForgotPassword: "user/reset-forgot-password",
  },
  private: {
    getUserDetails: "user/get-user-details",
    subscriptionGet: "subscription/get",
    subscriptionAdd: "subscription/add",
    userSubscriptionadd: "/userSubscription/add",
    userProfileChangePassword: "userProfile/change-password",
    userProfileChangeEmail: "userProfile/change-email",
    userProfileDeleteAccount: "userProfile/delete-account",
    userCompanyaddCompany: "userCompany/addCompany",
    userCompany: "userCompany",
    agentInformationAdd: "agentInformation/add",
    agentInformationGet: "agentInformation/get",
    uploadProfile: "upload/add",
    addReport: "report/add",
    getReports: "report/getReport",
    updateReport: "report/update",
    deleteReport: "report/delete",
    reportQuestion: "report-question",
    addReportQuestion: "report-question/add",
    player: "player",
    playerSearch: "player/search",
  },
};
export { apiRoutes };
