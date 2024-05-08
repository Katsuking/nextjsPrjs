import LoginButton from '@/app/layouts/includes/LoginButton';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

const TopNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSearchName = (e: { target: { value: string } }) => {
    console.log(e.target.value);
  };

  const handleClick = () => {
    console.log('handleClick');
  };

  return (
    <div
      id="TopNav"
      className="fixed bg-white z-30 flex items-center w-full border-b h-[60px"
    >
      <div
        className={`flex items-center justify-between gap-6 w-full px-4 mx-auto ${
          pathname == '/' ? 'max-w-[1150px]' : ''
        }`}
      >
        <Link href="/" className="flex flex-row items-center">
          <Image
            src="/images/logo.png"
            className="min-w-[15px]"
            width={50}
            height={50}
            alt="logo"
          />
          <p className="text-red-400 font-bold text-[30px] ml-2">pick</p>
        </Link>

        <div className="relative hidden md:flex items-center justify-end bg-[#F1F1F2] p-1 rounded-full max-w-[430px] w-full">
          <input
            type="text"
            onChange={handleSearchName}
            className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
            placeholder="search account"
          />
          <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">
            <div className="p-1">
              <Link
                href={`/profile/1`}
                className="flex items-center justify-between w-full cursor-pointer hover:bg-red-400 p-1 px-2 hover:text-red-100"
              >
                <div className="flex items-center">
                  <Image
                    src="https://placehold.co/600x400/png"
                    alt="aaa"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <div className="truncate ml-2">Tay Keith Dev</div>
                </div>
              </Link>
            </div>
          </div>
          <div className="px-3 py-1 flex items-center border-l border-l-gray-300">
            <BiSearch color="#A1A2A7" size={22} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleClick()}
            className="flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5"
          >
            <AiOutlinePlus color="#000000" size={22} />
            <span className="px-2 font-medium text-[15px] ">Upload</span>
          </button>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
