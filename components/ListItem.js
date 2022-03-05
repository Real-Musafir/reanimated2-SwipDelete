import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import { Dimensions } from "react-native";

const LIST_ITEM_HEIGHT = 70;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TRANSLATE_X_TRESHHOLD = -SCREEN_WIDTH * 0.3;

function ListItem({ task }) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_TRESHHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_TRESHHOLD ? 1 : 0
    );
    return { opacity };
  });

  return (
    <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5
          name={"trash-alt"}
          size={LIST_ITEM_HEIGHT * 0.4}
          color={"red"}
        />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  task: {
    width: "90%",
    height: LIST_ITEM_HEIGHT,
    backgroundColor: "white",

    justifyContent: "center",
    paddingLeft: 20,
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,

    elevation: 5, // it is needed for android
  },
  taskContainer: {
    width: "100%",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItem;
