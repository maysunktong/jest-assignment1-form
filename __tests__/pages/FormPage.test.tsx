import { screen, render } from "@testing-library/react";
import FormPage from "../../app/form/page";
import { useFeedbackContext } from "../../app/context/FeedbackProvider";

/* ------------------------------------------------------- */
/* Mock useFeedbackContext and setFeedBackList */
jest.mock("../../app/context/FeedbackProvider", () => ({
  useFeedbackContext: jest.fn(),
}));
import * as PageModule from "../../app/form/page";
console.log("PageModule:", PageModule);
let mockSetFeedbackList: jest.Mock;

/* Mock data */
jest.mock("uuid", () => ({
  v4: jest.fn(() => "uuid"),
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
  render(<FormPage />);
});

/*✅ UNIT TESTS ✅*/
describe("FormPage - Unit Tests", () => {
  test("contains exactly TWO child components, first h1 then form", () => {
    const container = screen.getByTestId("form-page-container");
    expect(container.children).toHaveLength(2);

    expect(container.children[0]).toHaveTextContent(/Product Feedback Form/i);
    expect(container.children[1]).toBeInTheDocument();
  });

  test("render the main heading h1", () => {
    expect(
      screen.getByRole("heading", { level: 1, name: /Product Feedback Form/i })
    ).toBeInTheDocument();
  });

  test("render form component", () => {
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});

/* ------------------------------------------------------- */
/*⭐️ INTEGRATION TESTS ⭐️*/
describe("FormPage - Integration Tests", () => {
  test("renders the container, check labels, placeholders", () => {
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
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
