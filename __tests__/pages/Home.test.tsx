import { render, screen } from "@testing-library/react";
import Home from "../../app/page";

beforeEach(() => {
  render(<Home />);
});

/*✅ UNIT TESTS ✅*/
describe("Homepage - Unit Tests", () => {
  /* General styling on homepage */
  test("renders main container with correct classes", () => {
    const main = screen.getByRole("main");
    expect(main).toHaveClass(
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "h-full"
    );
  });

  /* H1 and H2 headings */
  test("Two headings exist on homepage", () => {
    const headers = screen.getAllByRole("heading");
    expect(headers.length).toBe(2);
  });

  test("renders the h1 heading", () => {
    const h1 = screen.getByRole("heading", {
      level: 1,
      name: /Product Feedback Platform/i,
    });
    expect(h1).toBeInTheDocument();
  });

  test("renders the h2 subheading", () => {
    const h2 = screen.getByRole("heading", {
      level: 2,
      name: /Your opinion matters\./i,
    });
    expect(h2).toBeInTheDocument();
  });

  /* Buttons */
  test("check if TWO buttons exist on homepage", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });

  test("renders buttons container with classes", () => {
    const buttonsContainer = screen.getByTestId("home-buttons-container");
    expect(buttonsContainer).toHaveClass("flex", "gap-6");
  });

  test("first button to the left's text", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0]).toHaveTextContent(/Read Feedbacks/i);
  });

  test("second button to the right's text", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[1]).toHaveTextContent(/Go to form/i);
  });

  /* ❌ These should not be in homepage ❌ */
  /* they should be in LAYOUT */
  test("No navigation bar with buttons `Home`, `Form` & `Feedbacks` in homepage", () => {
    expect(
      screen.queryByRole("button", { name: /^Home$/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /^Form$/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /^Feedbacks$/i })
    ).not.toBeInTheDocument();
  });

  test("No images or logo should be in homepage", () => {
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByAltText(/logo/i)).not.toBeInTheDocument();
  });
});

/* ------------------------------------------------------- */
/*⭐️ INTEGRATION TESTS ⭐️*/
describe("Homepage - Integration Tests", () => {
  /* Button redirect and not disabled */
  test("both buttons are clikeable", () => {
    const feedbackButton = screen.getByRole("button", {
      name: /Read Feedbacks/i,
    });
    const formButton = screen.getByRole("button", { name: /Go to form/i });

    expect(feedbackButton).not.toBeDisabled();
    expect(formButton).not.toBeDisabled();
  });

  test("first button redirect", () => {
    expect(
      screen.getByRole("link", { name: /Read Feedbacks/i })
    ).toHaveAttribute("href", "/feedbacks");
  });

  test("second button redirect", () => {
    expect(screen.getByRole("link", { name: /Go to form/i })).toHaveAttribute(
      "href",
      "/form"
    );
  });
});
