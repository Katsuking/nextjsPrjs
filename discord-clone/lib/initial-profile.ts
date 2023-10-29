import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { Profile, Prisma } from "@prisma/client";

export type ProfileWithMember = Prisma.ProfileGetPayload<{
  include: { member: true };
}>;

export const initialProfile = async () => {
  const user = await currentUser(); // 現在ログインしているユーザー情報を取得
  if (!user) return redirectToSignIn();

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) return profile;

  // profileが見つからなかった場合は新規作成
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress, // 注意
    },
  });

  return newProfile;
};
