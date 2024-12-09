import { Models } from "react-native-appwrite";
import User from "./User";

interface Post extends Models.Document {
  id: string;
  title: string;
  prompt: string;
  thumbnail: string;
  video: string;
  creator: User;
}

export default Post;
