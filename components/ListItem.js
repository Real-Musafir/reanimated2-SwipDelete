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

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      console.log(translateX.value);
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_TRESHHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
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
  return (
    <View style={styles.taskContainer}>
      <View style={styles.iconContainer}>
        <FontAwesome5
          name={"trash-alt"}
          size={LIST_ITEM_HEIGHT * 0.4}
          color={"red"}
        />
      </View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
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
    marginVertical: 10,
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
