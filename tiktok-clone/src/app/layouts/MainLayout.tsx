'use client';

import { usePathname } from 'next/navigation';
import TopNav from './includes/TopNav';
import SideNavMain from './includes/SideNavMain';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <>
      <TopNav />
      <div
        className={`flwx justify-center mx-auto w-full lg:px-2.5 px-0 ${
          pathname == '/' ? 'max-w-[1140px]' : ''
        } `}
      >
        <SideNavMain />
        {children}
      </div>
    </>
  );
}
