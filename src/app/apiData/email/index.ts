import { envValues } from "@/utils/envConfig";
import AWS from "aws-sdk";
import { emailVerificationTemplate } from "./emailTemplates/verify";
import { paths } from "@/utils/routes";
import { resetPasswordLinkTemplate } from "./emailTemplates/reset";

const credentials = new AWS.Credentials(
  envValues.emailConfig.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  envValues.emailConfig.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
);

AWS.config.update({
  region: envValues.emailConfig.NEXT_PUBLIC_REGION, // Replace with your SES region
  credentials: credentials,
});

const ses = new AWS.SES();

type sendEmailType = {
  sendToEmails: string[];
  subject: string;
  body: string;
  html: string;
};
export async function sendEmail({
  sendToEmails = [],
  subject = "",
  body = "",
  html = "",
}: sendEmailType) {
  const params: AWS.SES.SendEmailRequest = {
    Source: envValues.emailConfig.NEXT_PUBLIC_EMAIL_ADDRESS,
    Destination: {
      // ToAddresses: ["kamal.singh@ongraph.com"],
      ToAddresses: sendToEmails,
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: body,
        },
        Html: {
          Data: html,
        },
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    return result;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export const userEmailVerificationMail = async (
  email: string,
  token: string
) => {
  try {
    const link = `${envValues.NEXT_PUBLIC_URL}${paths.public.emailVerify}?code=${token}`;
    await sendEmail({
      sendToEmails: [email],
      subject: "Verify Your Email",
      body: "Verify Your Email ",
      html: emailVerificationTemplate(link),
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const userForgotPasswordMail = async (email: string, token: string) => {
  try {
    const link = `${envValues.NEXT_PUBLIC_URL}${paths.public.changeForgotPassword}?code=${token}`;
    await sendEmail({
      sendToEmails: [email],
      subject: "Reset password Email",
      body: "Reset password Email ",
      html: resetPasswordLinkTemplate(link),
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
