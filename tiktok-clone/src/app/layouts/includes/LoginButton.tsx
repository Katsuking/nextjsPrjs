// ユーザーのログイン状態によって表示を切り替える

import Image from 'next/image';
import React from 'react';
import { BiUser } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

const LoginButton = () => {
  return (
    <>
      {true ? (
        <div className="flex items-center">
          <button className="flex items-center bg-red-400 text-white border rounded-md px-3 py-[6px]">
            <span className="whitespace-nowrap mx-4 font-medium text-[15px]">
              Log in
            </span>
          </button>
          <BsThreeDotsVertical size={25} color="#161724" />
        </div>
      ) : (
        <div className="flex items-center">
          <div className="relative">
            <button className="mt-1 border border-gray-100 rounded-full">
              <Image
                src="https://placehold.co/40"
                alt="aaa"
                className="rounded-full"
                width={35}
                height={35}
              />
            </button>
            <div className="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[40px] right-0">
              <button className="flex items-center justify-start w-full py-3 px-2 hover:bg-gray-200 cursor-pointer">
                <BiUser size={20} />
                <span className="font-semibold pl-2 text-sm">profile</span>
              </button>
              <button className="flex items-center justify-start w-full py-3 px-2 hover:bg-gray-200 cursor-pointer">
                <FiLogOut size={20} />
                <span className="font-semibold pl-2 text-sm">Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;
