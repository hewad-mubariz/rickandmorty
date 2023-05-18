import { cleanup, screen, waitFor } from "@testing-library/react-native";
import { CharacterDetails } from "../CharacterDetails";
import { GetCharacterDetailsDocument } from "../../../../generated/graphql";
import { renderWithProvider, useQueryWithProvider } from "../../../utils/test-utils";
import React from "react";
import {
  characterDetailsErrorMock,
  characterDetailsMock,
} from "../../../../__mocks__/query-mocks/characterQueriesMocks";
import { characterDetailsData } from "../../../../__mocks__/data/characterMockedData";
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: () => ({
    params: {
      characterId: "1",
    },
  }),
}));

describe("CharacterDetails", () => {
  afterEach(() => {
    cleanup();
  });
  it("Fetchs character Details correctly", async () => {
    const { result } = useQueryWithProvider(characterDetailsMock, GetCharacterDetailsDocument, { id: "1" });
    expect(result.current).toBeDefined();
    await waitFor(() => {
      expect(result.current.loading).toEqual(false);
      expect(result.current.error).toBeUndefined();
      expect(result.current.data).toEqual(characterDetailsData);
    });
  });

  it("Handles error correctly", async () => {
    const { result } = useQueryWithProvider(characterDetailsErrorMock, GetCharacterDetailsDocument, { id: "1" });
    expect(result.current).toBeDefined();
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeUndefined();
      expect(result.current.loading).toEqual(false);
    });
  });

  // it("Displays loading state when fetching data", async () => {
  //   renderWithProvider(<CharacterDetails />, []);
  //   await waitFor(() => {
  //     expect(await screen.findByTestId("loading-indicator")).toBeTruthy();
  //   });
  // });

  it("Displays Error state when its Error ", async () => {
    renderWithProvider(<CharacterDetails />, characterDetailsErrorMock);
    await waitFor(() => {
      expect(screen.getByTestId("error-text")).toBeTruthy();
    });
  });

  it("Renders all components correctly", async () => {
    renderWithProvider(<CharacterDetails />, characterDetailsMock);
    const characterContainer = await screen.findByTestId("character-detail-container");
    expect(characterContainer).toBeTruthy();
  });
});
