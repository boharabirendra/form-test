import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "../Atoms/TextInput";

describe("TextInput", () => {
  const mockOnChange = jest.fn();
  const defaultProps = {
    id: "test-input",
    label: "Test Label",
    name: "testName",
    onChange: mockOnChange,
  };

  it("renders with label and input", () => {
    render(<TextInput {...defaultProps} />);

    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("for", "test-input");

    const inputElement = screen.getByLabelText("Test Label");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("id", "test-input");
    expect(inputElement).toHaveAttribute("name", "testName");
  });

  it("handles onChange event", () => {
    render(<TextInput {...defaultProps} />);

    const inputElement = screen.getByLabelText("Test Label");
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "new value" }),
      })
    );
  });

  it("displays the provided value", () => {
    render(<TextInput {...defaultProps} value="Initial Value" />);

    const inputElement = screen.getByLabelText(
      "Test Label"
    ) as HTMLInputElement;
    expect(inputElement.value).toBe("Initial Value");
  });
});
