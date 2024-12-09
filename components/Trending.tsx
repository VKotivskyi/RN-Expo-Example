import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  ViewToken,
} from "react-native";
import Post from "../types/Post";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { router } from "expo-router";

Animatable.initializeRegistryWithDefinitions({
  zoomIn: {
    0: { transform: [{ scale: 0.9 }] },
    1: { transform: [{ scale: 1.0 }] },
  },
  zoomOut: {
    0: { transform: [{ scale: 1.0 }] },
    1: { transform: [{ scale: 0.9 }] },
  },
});

interface TrendingItemProps {
  activeItem: Post;
  item: Post;
}

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item ? "zoomIn" : "zoomOut"}
      duration={500}
    >
      <TouchableOpacity
        className="relative flex justify-center items-center"
        activeOpacity={0.7}
        onPress={() =>
          router.push({
            pathname: "/video",
            params: {
              post: JSON.stringify(item),
            },
          })
        }
      >
        <ImageBackground
          source={{
            uri: item.thumbnail,
          }}
          className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        />

        <Image
          source={icons.play}
          className="w-12 h-12 absolute"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animatable.View>
  );
};

interface TrendingProps {
  posts: Post[];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  useEffect(() => {
    // Set the initial active item to the first post in the list
    if (posts.length > 0) {
      setActiveItem(posts[0]);
    }
  }, [posts]);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    if (viewableItems.length > 0) {
      const firstVisibleItem = viewableItems[0]?.item as Post;
      setActiveItem(firstVisibleItem);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 0, y: 0 }} // Start the list from the beginning
      horizontal
    />
  );
};

export default Trending;
