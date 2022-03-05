import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView, ScrollView } from "react-native";
import { useState } from "react";
import ListItem from "./components/ListItem";
import "react-native-gesture-handler";
import { useCallback } from "react";

const TITLES = [
  "Record the dismissible tutorial",
  "Leave to the video",
  "Check Youtube comments",
  "Subscribe to the channel",
  "Leave a on the GitHub page",
];

const TASKS = TITLES.map((title, index) => ({ title, index }));

const BACKGROUND_COLOR = "#FAFBFF";

export default function App() {
  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = useCallback((task) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index));
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <ScrollView style={{ flex: 1 }}>
        {tasks.map((task) => (
          <ListItem key={task.index} task={task} onDismiss={onDismiss} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: "5%",
  },
});
