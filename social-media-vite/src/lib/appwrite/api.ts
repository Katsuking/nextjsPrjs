import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account } from "./config";

// appwrite に新たにユーザーを作成
export const createUserAccount = async ({
  name,
  email,
  password,
}: INewUser) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    return newAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
};
