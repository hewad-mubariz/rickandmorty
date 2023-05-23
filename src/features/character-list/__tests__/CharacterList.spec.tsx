import * as React from "react";
import { act, cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react-native";
import { GetCharactersDocument } from "../../../../generated/graphql";
import { CharacterList } from "../CharacterList";
import { renderWithProvider, useQueryWithProvider } from "../../../utils/test-utils";
import {
  allCharactersErrorMock,
  allCharactersFilterMock,
  allCharactersMock,
} from "../../../../__mocks__/query-mocks/characterQueriesMocks";
import { allCharactersData } from "../../../../__mocks__/data/characterMockedData";
const mockedNavigate = jest.fn();
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
describe("CharacterList", () => {
  afterEach(() => {
    cleanup();
    mockedNavigate.mockClear();
  });

  it("Fetchs characters list correctly", async () => {
    const { result } = useQueryWithProvider(allCharactersMock, GetCharactersDocument, { page: 1, name: "" });
    expect(result.current).toBeDefined();
    await waitFor(() => {
      expect(result.current.loading).toEqual(false);
      expect(result.current.error).toBeUndefined();
      expect(result.current.data).toEqual(allCharactersData);
    });
  });

  it("Displays characters when data is fetched", async () => {
    renderWithProvider(<CharacterList />, allCharactersMock);
    expect(await screen.findByTestId("character-list")).toBeTruthy();
  });

  it("Handles error correctly", async () => {
    const { result } = useQueryWithProvider(allCharactersErrorMock, GetCharactersDocument, { page: 1, name: "" });
    await waitFor(() => {
      expect(result.current.error?.message).toBeDefined();
      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeUndefined();
      expect(result.current.loading).toEqual(false);
    });
  });

  it("Displays loading when fetching data", async () => {
    renderWithProvider(<CharacterList />, []);
    await waitFor(() => {
      expect(screen.getByTestId("loading-indicator")).toBeTruthy();
    });
  });

  it("Displays Error when its Error ", async () => {
    renderWithProvider(<CharacterList />, allCharactersErrorMock);
    await waitFor(() => {
      expect(screen.getByTestId("error-text")).toBeTruthy();
    });
  });

  it("Navigates to CharacterDetails Screen On Press", async () => {
    renderWithProvider(<CharacterList />, allCharactersMock);
    const toPress = await screen.findByTestId("character-item1");
    fireEvent(toPress, "press");
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith("CharacterDetails", { characterId: "1" });
  });
  it("Filters data Correctly", async () => {
    renderWithProvider(<CharacterList />, [...allCharactersMock, ...allCharactersFilterMock]);

    const searchField = await screen.findByTestId("searchField");

    await act(async () => {
      fireEvent.changeText(searchField, "Rick");
    });

    // Wait for the component to update and assert
    const listItem = screen.getByTestId("character-item1");
    expect(within(listItem).getByText("Rick Sanchez")).toBeTruthy();
  });
});
