import { INewPost, INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

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
    const session = await account.createEmailSession(user.email, user.password); // from appwrite
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function singOutAccount() {
  try {
    const session = await account.deleteSession("current"); // from appwrite
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
    // console.log("currentUser.documents[0]: ", currentUser.documents[0]);
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(post: INewPost) {
  try {
    // upload a file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]); // first post
    if (!uploadFile) throw Error;

    // get a file url
    const fileUrl = getFilePreview(uploadedFile?.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile?.$id);
      throw Error;
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create a post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile?.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile?.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

// UPLOAD FILE to storage
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fieldId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fieldId,
      2000,
      2000,
      "top",
      100
    );
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ファイル削除
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

// home
export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(20)]
  );

  if (!posts) throw Error;

  return posts;
}

export async function likePost(postId: string, likesArray: string[]) {
  // save の仕組みとほとんど同じ
  try {
    // likeのarrayを上書きする
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function savePost(postId: string, userId: string) {
  // like の仕組みとほとんど同じ
  try {
    // likeのarrayを上書きする
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(), // create new id
      {
        // check appwrite saves attributes
        user: userId,
        post: postId,
      }
    );
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );
    if (!statusCode) throw Error;
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}
