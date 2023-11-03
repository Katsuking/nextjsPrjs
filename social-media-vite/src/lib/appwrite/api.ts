import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";

// appwrite に新たにユーザーを作成
export const createUserAccount = async ({
  name,
  email,
  password,
  username,
}: INewUser) => {
  try {
    // create a user account ( not inside db)
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    // create a user inside db
    const avatarUrl = avatars.getInitials(name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: username,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveUserToDB = async (user: {
  accountId: string;
  name: string;
  email: string;
  imageUrl: URL;
  username?: string;
}) => {
  // appwrite Authへの処理は上で書いたので、
  // ここではDBへ保存する処理
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export async function singInAccount(user: { email: string; password: string }) {
  // user can login with email and password
  try {
    const session = account.createEmailSession(user.email, user.password); // from appwrite
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error;
    }
    // dbからユーザーの取得
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
