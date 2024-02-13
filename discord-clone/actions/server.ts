import * as z from "zod";
import { FormSchema } from "@/schemas";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";

export const server = async (values: z.infer<typeof FormSchema>) => {
  const validatedFields = FormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, imageUrl } = validatedFields.data;
  const existingProfile = await currentProfile();
  if (!existingProfile) {
    return { error: "Could not find your profile" };
  }

  const server = db.server.create({
    data: {
      profileId: existingProfile.id,
      inviteCode: uuidv4(),
      name,
      imageUrl,
      channels: {
        create: [{ name: "general", profileId: existingProfile.id }],
      },
      members: {
        create: [{ profileId: existingProfile.id, role: MemberRole.ADMIN }],
      },
    },
  });

  return { success: "server created" };
};
