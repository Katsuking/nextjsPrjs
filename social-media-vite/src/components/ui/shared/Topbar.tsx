// rafce

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccountMutation(); // apwrite api -> reqct query ->
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0); // navigate to signin/signup page
  }),
    [isSuccess];

  return (
    <section className="sticky top-0 z-50 md:hidden bg-dark-2 w-full">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/react.svg"
            alt="react logo"
            width={25}
            height={25}
          />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            Log out
          </Button>
          <Link to={`/profile/${user.id}`} className="flex flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/react.svg"}
              alt="profile-image"
              className="h-8 w-8 rounded-full"
            ></img>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
