import { Models } from "react-native-appwrite"; // Import untuk Models dari Appwrite (pastikan ini sesuai dengan proyek Anda)
import User from "../types/User";


/**
 * Mapper function to convert Appwrite Document.Models to User
 * @param docsUser - The document object from Appwrite
 * @returns A mapped User object
 */
export const mapDocumentToUser = (docsUser: Models.Document): User => {
  return {
    $id: docsUser.$id,
    email: docsUser.email,
    username: docsUser.username,
    accountId: docsUser.accountId,
    avatar: docsUser.avatar,
  };
};
