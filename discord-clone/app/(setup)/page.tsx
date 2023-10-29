import { InitialModal } from "@/components/modals/initial-modals";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await initialProfile(); // profile 情報の取得, なければ作成

  // ユーザーが属しているserver情報の取得
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  // serverがあったらリダイレクト
  if (server) return redirect(`/server/${server.id}`);

  return (
    <div>
      <InitialModal />
      create a server
    </div>
  );
};

export default SetupPage;
