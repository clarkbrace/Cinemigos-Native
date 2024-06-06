import { View, Text, StyleSheet } from "react-native";

const Divider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ddd",
  },
});
