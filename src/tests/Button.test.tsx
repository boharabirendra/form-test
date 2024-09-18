import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../Atoms/Button";

const clickHandler = jest.fn();

describe("Button", () => {
  it("should render button with provided label", () => {
    render(<Button>test text</Button>);
    const btn = screen.getByRole("button", { name: "test text" });
    expect(btn).toHaveTextContent("test text");
    expect(btn).toBeInTheDocument();
  });

  it("should execute onclick handler once when button clicked", () => {
    render(<Button onClick={clickHandler}>Click me</Button>);

    const btn = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(btn);

    expect(btn).toBeInTheDocument();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
