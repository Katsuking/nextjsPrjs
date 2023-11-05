// rafce

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const { pathname } = useLocation(); // find where you are
  const { mutate: signOut, isSuccess } = useSignOutAccountMutation(); // apwrite api -> reqct query ->
  const navigate = useNavigate();
  const { user } = useUserContext(); // やっとここでuseContextの強みが活かせる...

  useEffect(() => {
    if (isSuccess) navigate(0); // navigate to signin/signup page
  }),
    [isSuccess];

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        {/* homeへ */}
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/react.svg"
            alt="react logo"
            width={25}
            height={25}
          />
          <div className="flex flex-col">
            <p className="font-bold">mySocialApp</p>
          </div>
        </Link>
        {/* ユーザーページへ */}
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/react.svg"}
            alt="profile"
            className="h-8 w-8 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
                key={link.label}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}
      >
        Log out
      </Button>
    </nav>
  );
};

export default LeftSidebar;
