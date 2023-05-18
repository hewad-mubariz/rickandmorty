import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "../AppStack";
import { MockedProvider } from "@apollo/client/testing";
import { allCharactersMock } from "../../../../__mocks__/query-mocks/characterQueriesMocks";
import { renderWithProvider } from "../../../utils/test-utils";
allCharactersMock;
// We are using React Native >= 0.64
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("AppStack", () => {
  afterAll(() => {
    cleanup();
  });
  it("Checks if navigation renders correct", async () => {
    //todo remove warning for act
    renderWithProvider(<AppStack />, []);
  });
});
