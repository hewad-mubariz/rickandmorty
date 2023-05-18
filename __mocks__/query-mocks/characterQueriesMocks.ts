import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import { MockedResponse } from "@apollo/client/testing";
import { GetCharacterDetailsDocument, GetCharactersDocument } from "../../generated/graphql";
import { allCharactersData, characterDetailsData, filteredCharactersData } from "../data/characterMockedData";

export const allCharactersMock: MockedResponse[] = [
  {
    request: {
      query: GetCharactersDocument,
      variables: { page: 1, name: "" },
    },
    result: {
      data: allCharactersData,
    },
  },
];

export const allCharactersFilterMock: MockedResponse[] = [
  {
    request: {
      query: GetCharactersDocument,
      variables: { page: 1, name: "Rick Sanchez" },
    },
    result: {
      data: filteredCharactersData,
    },
  },
];

export const allCharactersErrorMock: MockedResponse[] = [
  {
    request: {
      query: GetCharactersDocument,
      variables: { page: 1, name: "" },
    },
    error: new ApolloError({
      graphQLErrors: [new GraphQLError("Oops! something went wrong ")],
    }),
  },
];

export const characterDetailsMock = [
  {
    request: {
      query: GetCharacterDetailsDocument,
      variables: { id: "1" },
    },
    result: {
      data: characterDetailsData,
    },
  },
];

export const characterDetailsErrorMock: MockedResponse[] = [
  {
    request: {
      query: GetCharacterDetailsDocument,
      variables: { id: "1" },
    },
    error: new ApolloError({
      graphQLErrors: [new GraphQLError("Oops! something went wrong ")],
    }),
  },
];
