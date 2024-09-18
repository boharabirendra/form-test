import { render, screen } from "@testing-library/react";
import Dashboard from "../Molecules/Dashboard";
import { Provider } from "react-redux";
import { store } from "../Store/store";

describe("Dashboard", () => {
  it("should render", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Welcome,");
  });
});
