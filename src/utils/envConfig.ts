type typenvValue = {
  NEXT_PUBLIC_MONGODB_URI: string;
  NEXT_PUBLIC_JWT_KEY: string;
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_URL: string;
  emailConfig: {
    NEXT_PUBLIC_EMAIL_ADDRESS: string;
    NEXT_PUBLIC_AWS_ACCESS_KEY_ID: string;
    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: string;
    NEXT_PUBLIC_REGION: string;
  };
  NEXT_PUBLIC_GOOGLE_PLACE_KEY: string;
  NEXT_PUBLIC_FORMALIST_KEY: String;
};

const envValues: typenvValue = {
  NEXT_PUBLIC_MONGODB_URI: process.env.NEXT_PUBLIC_MONGODB_URI || "",
  NEXT_PUBLIC_JWT_KEY: process.env.NEXT_PUBLIC_JWT_KEY || "",
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "",
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || "",
  emailConfig: {
    NEXT_PUBLIC_EMAIL_ADDRESS: process.env.NEXT_PUBLIC_EMAIL_ADDRESS as string,
    NEXT_PUBLIC_AWS_ACCESS_KEY_ID: process.env
      .NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY: process.env
      .NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    NEXT_PUBLIC_REGION: process.env.NEXT_PUBLIC_REGION as string,
  },
  NEXT_PUBLIC_GOOGLE_PLACE_KEY: process.env
    .NEXT_PUBLIC_GOOGLE_PLACE_KEY as string,
  NEXT_PUBLIC_FORMALIST_KEY: process.env.NEXT_PUBLIC_FORMALIST_KEY as string,
};

export { envValues };
