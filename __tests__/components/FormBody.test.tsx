import { render, screen, waitFor, within } from "@testing-library/react";
import { useFeedbackContext } from "../../app/context/FeedbackProvider";
import FormBody from "../../app/components/ui/FormBody";
import userEvent from "@testing-library/user-event";

/* ------------------------------------------------------- */
/* Mock useFeedbackContext and setFeedBackList */
jest.mock("../../app/context/FeedbackProvider", () => ({
  useFeedbackContext: jest.fn(),
}));

let mockSetFeedbackList: jest.Mock;

/* Mock data */
jest.mock("uuid", () => ({
  v4: jest.fn(() => "id uuid"),
}));

/* Mock Local storage */
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});
/* ------------------------------------------------------- */

beforeEach(() => {
  jest.clearAllMocks();
  mockSetFeedbackList = jest.fn();
  (useFeedbackContext as jest.Mock).mockReturnValue({
    feedbackList: [],
    setFeedbackList: mockSetFeedbackList,
  });
  render(<FormBody />);
});

/*✅ UNIT TESTS ✅*/
describe("FormBody component - Unit Tests", () => {
  test("render form fields and labels correctly", () => {
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Subject")).toBeInTheDocument();
    expect(screen.getByText("Feedback")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Subject")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your content")).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  test("renders a submit button only one button", () => {
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeInTheDocument();

    const submitButtons = screen.queryAllByRole("button", { name: /submit/i });
    expect(submitButtons).toHaveLength(1);
  });

  test("renders category dropdown with options", () => {
    expect(screen.getByDisplayValue("General")).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
  });
});

/* ------------------------------------------------------- */
/*⭐️ INTEGRATION TESTS ⭐️*/
describe("FormBody component - functionality tests", () => {
  test("renders category label and it is a dropdown list, default category is ", () => {
    const select = screen.getByLabelText(/category/i);

    expect(select).toBeInTheDocument();
    expect(select).toHaveRole("combobox");

    const options = within(select).getAllByRole("option");
    expect(options).toHaveLength(4);
    const optionValues = options.map((opt) => opt.getAttribute("value"));
    expect(optionValues).toEqual(["general", "bugs", "improvement", "other"]);

    const optionLabels = options.map((opt) => opt.textContent);
    expect(optionLabels).toEqual(["General", "Bugs", "Improvement", "Other"]);

    expect((select as HTMLSelectElement).value).toBe("general");
  });

  test("render default value of Category === `General`", () => {
    const select = screen.getByLabelText(/category/i);
    expect((select as HTMLSelectElement).value).toBe("general");
  });

  test("form submission works with complete data", async () => {
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
      expect(mockSetFeedbackList).toHaveBeenCalledWith([
        {
          name: "May",
          email: "may@gmail.com",
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

  test("form resets after successful submission", async () => {
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
    });
  });
});
