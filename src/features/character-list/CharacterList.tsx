import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from "../../components/shared/SearchBar";
import { useGetCharactersQuery } from "../../../generated/graphql";
import FetchStateWrapper from "../../components/shared/FetchStateWrapper";
import { AppStackParamsList } from "../navigation/AppStack";
import { StackNavigationProp } from "@react-navigation/stack";
import CharacterListItem from "./components/ListItem";
import useDebounce from "../../hooks/useDebounce";

type CharacterDetailScreenNavigationProp = StackNavigationProp<AppStackParamsList, "CharacterDetails">;

export const CharacterList = () => {
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation<CharacterDetailScreenNavigationProp>();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { loading, error, data, fetchMore, refetch } = useGetCharactersQuery({
    variables: { page: 1, name: searchTerm },
    notifyOnNetworkStatusChange: true,
  });
  const characters = data?.characters?.results;

  useEffect(() => {
    setPage(1);
    refetch({ page: 1, name: debouncedSearchTerm });
  }, [debouncedSearchTerm]);

  const loadMoreCharacters = () => {
    setLoadingMore(true);
    fetchMore({
      variables: {
        page: page + 1,
      },
    });
    setPage(page + 1);
  };

  const renderFooter = () => {
    const maxPages = data?.characters?.info?.pages || 1;
    if (!loadingMore || page >= maxPages) return <Text></Text>;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  };
  const onSearchChange = (text: string) => {
    setSearchTerm(text);
  };
  const handleCardPress = (id: string) => {
    navigation.navigate("CharacterDetails", { characterId: id });
  };
  const showLoader = useMemo(() => loading && !loadingMore, [loading]);
  return (
    <FetchStateWrapper loading={showLoader} error={error} loadingType="inline">
      <View style={styles.container} testID={"searchContainer"}>
        <View style={styles.header} testID="character-list-header">
          <Text style={styles.headerTitle}>Characters List</Text>
          <SearchBar value={searchTerm} onChange={onSearchChange} />
        </View>
        <FlatList
          testID="character-list"
          indicatorStyle="black"
          data={characters}
          keyExtractor={(_, index) => `char-${index}`}
          renderItem={({ item }) => {
            return (
              <CharacterListItem
                character={{ id: item?.id!, name: item?.name!, image: item?.image! }}
                onPress={() => handleCardPress(item?.id!)}
              />
            );
          }}
          onEndReached={loadMoreCharacters}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          maxToRenderPerBatch={10}
        />
      </View>
    </FetchStateWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#442749",
  },

  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    marginTop: 20,
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});
