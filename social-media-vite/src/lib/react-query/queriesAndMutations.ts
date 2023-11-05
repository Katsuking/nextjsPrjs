import { useMutation } from "@tanstack/react-query";
import {
  createUserAccount,
  singInAccount,
  singOutAccount,
} from "../appwrite/api";
import { INewUser } from "@/types";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user), //
  });
};

export const useSignInAccountMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      singInAccount(user), // user can singin
  });
};

export const useSignOutAccountMutation = () => {
  return useMutation({
    mutationFn: singOutAccount,
  });
};
