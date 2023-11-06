import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  singInAccount,
  singOutAccount,
} from "../appwrite/api";
import { INewPost, INewUser } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

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

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
