import { render, screen, waitFor } from "@testing-library/react";
import { useFeedbackContext } from "../context/FeedbackProvider";
import FormPage from "../app/form/page";
import FormBody from "../components/ui/FormBody";
import userEvent from "@testing-library/user-event";

jest.mock("../context/FeedbackProvider", () => ({
  useFeedbackContext: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => "id uuid"),
}));

const mockToLocaleString = jest.fn(() => "1/1/2024, 12:00:00 PM");
Date.prototype.toLocaleString = mockToLocaleString;

let mockSetFeedbackList: jest.Mock;

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

/* Unit Tests */
describe("FormBody Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSetFeedbackList = jest.fn();
    (useFeedbackContext as jest.Mock).mockReturnValue({
      feedbackList: [],
      setFeedbackList: mockSetFeedbackList,
    });
    render(<FormBody />);
  });

  test("render the main heading h1", () => {
    render(<FormPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Feedback Form/i })
    ).toBeInTheDocument();
  });

  test("render form's heading", () => {
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /give your feedback below/i,
      })
    ).toBeInTheDocument();
  });

  test("render form fields and labels correctly", () => {
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Subject")).toBeInTheDocument();
    expect(screen.getByText("Feedback")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Subject")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your content")).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
  });

  test("required fields have required attribute", () => {
    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
  });

  test("renders a submit button only one button", () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();

    const submitButtons = screen.queryAllByRole("button", { name: /submit/i });
    expect(submitButtons).toHaveLength(1);
  });

  test("renders star rating buttons", () => {
    const starButtons = screen
      .getAllByRole("button")
      .filter((button) => button.getAttribute("type") === "button");
    expect(starButtons).toHaveLength(5);
  });

  test("renders category dropdown with options", () => {
    expect(screen.getByDisplayValue("General")).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
  });
});

/* Integration Tests */
describe("form submission, required input, form reset", () => {
  test("form submission works with complete data", async () => {
    render(<FormBody />);
    const user = userEvent.setup();

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const subjectInput = screen.getByPlaceholderText("Subject");
    const contentInput = screen.getByPlaceholderText("Your content");

    await user.type(nameInput, "May");
    await user.type(emailInput, "may@gmail.com");
    await user.type(subjectInput, "Subject");
    await user.type(contentInput, "Writing review");

    const starButtons = screen
      .getAllByRole("button")
      .filter((button) => button.getAttribute("type") === "button");
    await user.click(starButtons[4]);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSetFeedbackList).toHaveBeenCalledWith([
        {
          name: "May",
          email: "may@gmail.com",
          rating: 5,
          category: "General",
          subject: "Subject",
          content: "Writing review",
          id: "id uuid",
          timestamp: new Date().toLocaleString(),
        },
      ]);
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "feedbacks",
      expect.stringContaining('"name":"May"')
    );
  });

  test("form submission for required name and email", async () => {
    render(<FormBody />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Name"), "may");
    await user.type(screen.getByPlaceholderText("Email"), "may@gmail.com");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSetFeedbackList).toHaveBeenCalledWith([
        expect.objectContaining({
          name: "may",
          email: "may@gmail.com",
          rating: 0,
          category: "General",
          subject: "",
          content: "",
        }),
      ]);
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "feedbacks",
      expect.stringContaining('"name":"may"')
    );
  });

  test("form resets after successful submission", async () => {
    render(<FormBody />);
    const user = userEvent.setup();

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const subjectInput = screen.getByPlaceholderText("Subject");
    const contentInput = screen.getByPlaceholderText("Your content");

    await user.type(nameInput, "May");
    await user.type(emailInput, "may@gmail.com");
    await user.type(subjectInput, "Subject");
    await user.type(contentInput, "Writing review");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(subjectInput).toHaveValue("");
      expect(contentInput).toHaveValue("");
      expect(screen.getByDisplayValue("General")).toBeInTheDocument();
    });
  });
});
