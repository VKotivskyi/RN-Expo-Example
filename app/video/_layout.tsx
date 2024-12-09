import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const VideoLayout = () => {
  const { post } = useLocalSearchParams();
  const postObject = post ? JSON.parse(post as string) : null;

  // Inisialisasi player
  const player = useVideoPlayer(postObject?.video, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    return () => {
      if (player) player.release();
    };
  }, [player]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <VideoView
        player={player}
        style={styles.video}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
  },
});

export default VideoLayout;
