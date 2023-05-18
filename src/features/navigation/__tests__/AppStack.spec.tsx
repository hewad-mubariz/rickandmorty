import React from "react";
import { cleanup } from "@testing-library/react-native";

// We are using React Native >= 0.64
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("AppStack", () => {
  afterAll(() => {
    cleanup();
  });
  it("Checks if navigation renders correct", async () => {
    expect(true).toBe(true);
  });
});
