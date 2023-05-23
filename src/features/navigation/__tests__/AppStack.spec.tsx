import React from "react";
import { cleanup, screen, waitFor } from "@testing-library/react-native";
import { AppStack } from "../AppStack";
import { renderWithProvider } from "../../../utils/test-utils";
import { allCharactersMock } from "../../../../__mocks__/query-mocks/characterQueriesMocks";
// We are using React Native >= 0.64
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("AppStack", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  it("Checks if navigation renders Correctly", async () => {
    renderWithProvider(<AppStack />, allCharactersMock);
    await waitFor(() => expect(screen.getByTestId("character-list")).toBeTruthy());
  });
});
