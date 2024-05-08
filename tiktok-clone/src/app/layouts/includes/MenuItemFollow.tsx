'use client';
import { MenuItemFollowComTypes } from '@/app/types';
import Image from 'next/image';
import Link from 'next/link';
// wrapper component to prevent hydration error

import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
React;

const MenuItemFollow = ({ user }: MenuItemFollowComTypes) => {
  return (
    <div>
      <Link
        href={`/profile/${user?.id}`}
        className="flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2"
      >
        <Image
          src={user?.image}
          alt="usrimg"
          className="rounded-full mx-auto lg:mx-0"
          width={35}
          height={35}
        />
        <div className="lg:pl-2.5 lg:block hidden">
          <div className="flex items-center">
            <p className="font-bold text-[14px] truncate">{user?.name}</p>
            <p className="ml-1 rounded-full bg-red-300 h-[14px] relative">
              <AiOutlineCheck
                className="relative p-[3px]"
                color="#FFFFFF"
                size="15"
              />
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuItemFollow;
