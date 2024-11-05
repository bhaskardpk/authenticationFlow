import { FC } from "react";
import Image from "next/image";
import { paths } from "@/utils/routes";
import { image404 } from "@/images/imagesFile";
import Link from "next/link";

const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="text-center flex flex-col justify-center w-full ">
        <div className="mb-4">
          <Image
            src={image404 as any}
            alt="404 Not Found"
            width={400}
            height={300}
            className="w-full max-w-xs mx-auto"
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-4">
          Sorry, the page you are looking for does not exist.
        </p>

        <div className="flex justify-center">
          <Link href={paths.public.signIn}>
            <button className="flex max-w-[200px] justify-center px-4 py-2 bg-blue-600 bg-neon-pink text-white rounded-md hover:bg-blue-700 transition duration-300">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
