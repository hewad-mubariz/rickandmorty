import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";

import { AppStack } from "./src/features/navigation/AppStack";
import { client } from "./src/services/network/client";

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </ApolloProvider>
  );
};
