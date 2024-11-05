import ToastContext from "@/app/contexts/toast-context";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import ColorfulSpinner from "@/components/loader/ColorfulSpinner";
import PrivatemainComp from "@/components/mainParentComp.tsx/headerAndFooter";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body >
        <div id="fullscreen-loader">
          <ColorfulSpinner />
        </div>
        <PrivatemainComp>
          <ToastContext>
            <div className="w-full bg-deep-purple">
              <Header />
              {children}
              <Footer />
            </div>
          </ToastContext>
        </PrivatemainComp>
      </body>
    </html>
  );
}
