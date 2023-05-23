import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CharacterList } from "../character-list/CharacterList";
import { CharacterDetails } from "../character-details/CharacterDetails";

export type AppStackParamsList = {
  CharacterList: undefined;
  CharacterDetails: { characterId: string };
};

const Stack = createStackNavigator<AppStackParamsList>();

export const AppStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="CharacterList">
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CharacterList" component={CharacterList} />
        <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
