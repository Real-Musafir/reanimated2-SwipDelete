import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

function ListItem({ task }) {
  return (
    <View style={styles.taskContainer}>
      <PanGestureHandler>
        <Animated.View style={styles.task}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    width: "90%",
    height: 70,
    backgroundColor: "white",
    marginVertical: 10,
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
});

export default ListItem;
