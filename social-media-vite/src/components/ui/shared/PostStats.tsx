import { getCurrentUser } from "@/lib/appwrite/api";
import {
  useDeletePostsMutation,
  useLikePostsMutation,
  useSavePostsMutation,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useState } from "react";
import { record } from "zod";

interface PostStatsProps {
  post: Models.Document;
  userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  // create a likeArray containing user id
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, SetIsSaved] = useState(false);

  // like, save 機能の実装
  const { mutate: likePost } = useLikePostsMutation();
  const { mutate: savePost } = useSavePostsMutation();
  const { mutate: deleteSavedPost } = useDeletePostsMutation();

  const { data: currentUser } = getCurrentUser();

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation(); // 親要素全体をclickableにしたとき用に、親や子要素へのイベントの伝播を防ぐ e.g. 記事のページに飛ぶ等

    const newLikes = [...likes];
    const hasLiked = newLikes.includes(userId); // ユーザーがlikeしたかどうか true/false

    if (hasLiked) {
      newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    // 引数の渡し方もTSのおかげで詳細が見える
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation(); // 親要素全体をclickableにしたとき用に、親や子要素へのイベントの伝播を防ぐ e.g. 記事のページに飛ぶ等
    const savedPostRecord = currentUser?.save.find(
      (record: Models.Document) => record.$id === post.$id
    );

    console.log("savedPostRecord:", savedPostRecord);

    if (savedPostRecord) {
      SetIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          // likeされたかされてないかの判定
          src={
            checkIsLiked(likesList, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={`${
            isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
          }`}
          alt="save"
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PostStats;
