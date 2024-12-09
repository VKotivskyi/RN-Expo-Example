import * as DocumentPicker from "expo-document-picker";

interface PostForm {
  title: string;
  thumbnail: DocumentPicker.DocumentPickerAsset | null;
  video: DocumentPicker.DocumentPickerAsset | null;
  prompt: string;
  userId: string
}

export default PostForm;
