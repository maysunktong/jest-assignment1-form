import { screen, render } from "@testing-library/react";
import FeedbackPage from "../../app/feedbacks/page";

beforeEach(() => {
  render(<FeedbackPage />);
});

/*✅ UNIT TESTS ✅*/
describe("Feedback page - Unit Tests", () => {
  test("contains exactly TWO child components, first h1 then form", () => {
    const container = screen.getByTestId("feedback-page-container");
    expect(container.children).toHaveLength(2);

    expect(container.children[0]).toHaveTextContent(/Feedbacks/i);
  });

  test("render the main heading h1", () => {
    expect(
      screen.getByRole("heading", { level: 1, name: /Feedback/i })
    ).toBeInTheDocument();
  });

  test("Erase storage button", () => {
    expect(screen.getByRole("button", {name: /Erase storage/i})).toBeInTheDocument();
  });
});
