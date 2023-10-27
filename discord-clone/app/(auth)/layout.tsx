import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="bg-red-300 h-full">{children}</div>;
};

export default AuthLayout;
