import { Image, Pressable, StyleSheet, Text } from "react-native";
import React, { FC } from "react";
type Props = {
  character: {
    name: string;
    image: string;
    id: string;
  };
  onPress: () => void;
};
const CharacterListItem: FC<Props> = ({ character, onPress }) => {
  return (
    <Pressable
      testID={`character-item${character.id}`}
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button">
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
    </Pressable>
  );
};

export default CharacterListItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "300",
    color: "white",
  },
});
