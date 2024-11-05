import React from "react";
import { ToastContainer } from "react-toastify";

const ToastContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default ToastContext;
