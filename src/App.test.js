import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

test("renders app title", () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );
  const titleElement = getByText(/Funny Movies/i);
  expect(titleElement).toBeInTheDocument();
});
