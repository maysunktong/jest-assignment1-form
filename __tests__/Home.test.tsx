import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Homepage interface", () => {
  beforeEach(() => {
    render(<Home />);
  });

  test("headings exist on homepage", () => {
    const headers = screen.getAllByRole("heading");
    expect(headers.length).toBeGreaterThan(0);
  });

  test("all headings have text content", () => {
    const headers = screen.getAllByRole("heading");
    headers.forEach((header) => {
      expect(header).toHaveTextContent(/\S/);
    });
  });

  test("renders the main h1 heading", () => {
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

  test("check if two buttons exist on homepage", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(2);
  });

  test("first buttons text", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0]).toHaveTextContent(/Read Feedbacks/i);
  });

  test("second buttons text", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[1]).toHaveTextContent(/Go to form/i);
  });

  test("navigation not be on homepage 🙅", () => {
    const navbar = screen.queryByTestId("navigation");
    expect(navbar).not.toBeInTheDocument();
  });
});
