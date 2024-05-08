import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import MenuItems from './MenuItems';
import ClientOnly from '@/components/ClientOnly';
import MenuItemFollow from './MenuItemFollow';

const SideNavMain = () => {
  const pathname = usePathname();

  return (
    <>
      <div
        id="SideNavMain"
        className={`
      fixed z-20 bg-white pt-[70px] h-full lg:border-r w-[70px] overflow-auto
      ${pathname === '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'}
      `}
      >
        <div className="mx-auto lg:w-full w-[55px]">
          <Link href="/">
            <MenuItems
              iconString="For you"
              colorString={pathname === '/' ? '#F02C56' : ''}
              sizeString="25"
            />
            <MenuItems
              iconString="Following"
              colorString={pathname === '/' ? '#F02C56' : ''}
              sizeString="25"
            />
            <MenuItems
              iconString="Live"
              colorString={pathname === '/' ? '#F02C56' : ''}
              sizeString="25"
            />
          </Link>
          <div className="border-b lg:ml-2 mt-2" />
          <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
            Suggested Account
          </h3>
          <div className="lg:hidden block pt-3" />
          <ClientOnly>
            <div className="cursor-pointer">
              <MenuItemFollow
                user={{
                  id: 1,
                  name: 'testuser',
                  image: 'https://placehold.co/40x40/png',
                }}
              />
            </div>
          </ClientOnly>
        </div>
      </div>
    </>
  );
};

export default SideNavMain;
