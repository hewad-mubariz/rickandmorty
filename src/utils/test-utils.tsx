import React from "react";
import { render, renderHook } from "@testing-library/react-native";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { NavigationContainer } from "@react-navigation/native";
import { DocumentNode, OperationVariables, useQuery } from "@apollo/client";

const renderWithProvider = (component: JSX.Element, mocks: MockedResponse[] = []) => {
  const wrapper = ({ children }: React.PropsWithChildren<{}>) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <NavigationContainer>{children}</NavigationContainer>
    </MockedProvider>
  );

  return render(component, { wrapper });
};


const useQueryWithProvider = <TData = any, TVariables = OperationVariables>(
  mocks: MockedResponse[] = [],
  query: DocumentNode,
  variables?: TVariables
) => {
  const wrapper = ({ children }: React.PropsWithChildren<{}>) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <NavigationContainer>{children}</NavigationContainer>
    </MockedProvider>
  );

  const { result } = renderHook(() => useQuery<TData, TVariables>(query, { variables }), { wrapper });

  return { result };
};


export { renderWithProvider, useQueryWithProvider };
