import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

interface Props {
  loading: boolean;
  error: Error | undefined;
  loadingType?: "fullscreen" | "inline";
}

const FetchStateWrapper: React.FC<Props> = ({ loading, error, loadingType = "fullscreen", children }) => {
  if (loading && loadingType === "fullscreen") {
    return (
      <View style={styles.fullscreenLoading}>
        <ActivityIndicator testID="loading-indicator" size="large" color="white" />
      </View>
    );
  }

  if (error) {
    return <Text testID="error-text">Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      {children}
      {loading && loadingType === "inline" && (
        <View style={styles.inlineLoading}>
          <ActivityIndicator testID="loading-indicator" size="large" color="white" />
        </View>
      )}
    </View>
  );
};

export default FetchStateWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullscreenLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#442749",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  inlineLoading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
