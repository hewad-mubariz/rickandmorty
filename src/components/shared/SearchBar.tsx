import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/images/search_icon.png")} style={styles.icon} />
      <TextInput
        testID={"searchField"}
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Search characters..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  input: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  icon: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
});
