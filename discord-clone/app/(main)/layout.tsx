import { ReactNode } from "react";

// sfc
const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <h1>hell world</h1>
      {children}
    </div>
  );
};

export default MainLayout;
