import { render } from "@testing-library/react-native";
import React from "react";

import RootLayout from "../_layout";

jest.mock("expo-router", () => ({
  Stack: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
}));

describe("RootLayout", () => {
  test("renders without crashing", () => {
    const { container } = render(<RootLayout />);
    expect(container).toBeTruthy();
  });
});
