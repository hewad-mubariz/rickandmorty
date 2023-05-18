import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useGetCharacterDetailsQuery } from "../../../generated/graphql";
import FetchStateWrapper from "../../components/shared/FetchStateWrapper";
import { AppStackParamsList } from "../navigation/AppStack";
type CharacterDetailsRouteProps = RouteProp<AppStackParamsList, "CharacterDetails">;

export const CharacterDetails = () => {
  const route = useRoute<CharacterDetailsRouteProps>();
  const { characterId } = route.params;
  const { loading, error, data } = useGetCharacterDetailsQuery({
    variables: { id: characterId },
  });

  return (
    <FetchStateWrapper loading={loading} error={error}>
      <ScrollView
        testID="character-detail-container"
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}>
        <Text style={styles.name}>{data?.character?.name}</Text>
        <Image testID="character-image" source={{ uri: data?.character?.image! }} style={styles.image} />
        <View style={styles.detailContainer}>
          <Text style={styles.details}>Species: {data?.character?.species}</Text>
          <Text style={styles.details}>Gender: {data?.character?.gender}</Text>
        </View>
        <Text style={styles.episodeTitle}>Episodes:</Text>

        {data?.character?.episode.map((episode, index) => {
          return (
            <View key={index} style={styles.episode}>
              <Text style={styles.episodeName}>{episode?.name}</Text>
              <Text style={styles.episodeDate}>{episode?.air_date}</Text>
            </View>
          );
        })}
      </ScrollView>
    </FetchStateWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    marginBottom: 15,
  },
  details: {
    fontSize: 16,
    color: "#4a4a4a",
  },
  episodeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginBottom: 10,
  },
  episode: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  episodeName: {
    fontSize: 16,
    color: "#4a4a4a",
  },
  episodeDate: {
    fontSize: 14,
    color: "grey",
  },
});
