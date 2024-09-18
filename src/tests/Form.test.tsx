import { render, screen, fireEvent, createEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { currentFormState } from "../Store/formSlice";
import Form from "../Molecules/Form";
import { store } from "../Store/store";
import Dashboard from "../Molecules/Dashboard";

jest.spyOn(store, "dispatch");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Form", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it("renders form fields correctly", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("updates form data on input change", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const usernameInput = screen.getByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });

    expect(usernameInput).toHaveValue("testuser");
  });

  it("dispatches currentFormState action on form submission", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      currentFormState({ username: "testuser", email: "test@example.com" })
    );
  });

  it("should navigate to dashboard on successful login", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(store.dispatch).toHaveBeenCalledWith(
      currentFormState({ username: "testuser", email: "test@example.com" })
    );
    fireEvent.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("dashboard should render correct username", () => {
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Welcome, testuser");
  });

  it("prevents default form submission behavior", () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const form = screen.getByRole("form");
    const submitEvent = createEvent.submit(form);
    fireEvent(form, submitEvent);
    expect(submitEvent.defaultPrevented).toBe(true);
  });
});
