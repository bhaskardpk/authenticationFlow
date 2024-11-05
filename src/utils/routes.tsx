type PublicRoutes = {
  signIn: string;
  signUp: string;
  emailVerify: string;
  forgetPassword: string;
  resetPassword: string;
  forgotPassword: string;
  changeForgotPassword: string;
};

type PrivateRoutes = {
  dashboard: string;
  marketplace: string;
  note: string;
  resetPassword: string;
  setting: string;
  chooseSubscription: string;
  paymentMethod: string;
  logout: string;
  profileSetting: string;
  createReport: string;
  orderReport: '/order-report';
  orders: '/orders'
};

type CommonRoutes = {
  home: string;
  tnc: string;
  error: string;
};

type Paths = {
  public: PublicRoutes;
  private: PrivateRoutes;
  common: CommonRoutes;
};

export const paths: Paths = {
  public: {
    signIn: "/login",
    signUp: "/registration",
    emailVerify: "/email-verified",
    forgetPassword: "/forgot-password",
    resetPassword: "/reset-password",
    forgotPassword: "/forgot-password",
    changeForgotPassword: "/change-forgot-password",
  },
  private: {
    dashboard: "/dashboard",
    marketplace: "/marketplace",
    note: "/dashboard/note",
    resetPassword: "/reset-password",
    setting: "/dashboard/settings",
    chooseSubscription: "/choose-subscription",
    paymentMethod: "/payment-method",
    logout: "/logout",
    profileSetting: "/profile-setting",
    createReport: "/create-report",
    orderReport: "/order-report",
    orders: "/orders",
  },
  common: {
    home: "/",
    tnc: "/tnc",
    error: "/500-error",
  },
} as const;

export const notShowHeaderArray: string[] = [];
export const notShowFooterArray: string[] = [];
