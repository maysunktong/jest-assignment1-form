import { render, screen } from "@testing-library/react";
import Navigation from "@/app/components/ui/Navigation";

beforeEach(() => {
  render(<Navigation />);
});

/*✅ UNIT TESTS ✅*/
describe("Navigation bar - Unit Tests", () => {
  test("render navigation bar", () => {
    const navbar = screen.getByTestId("navigation");
    expect(navbar).toBeInTheDocument();
  });

  test("render 3 buttons", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(3);
  });

  test("each button has correct text and link", () => {
    expect(screen.getAllByRole("button")[0]).toHaveTextContent(/Home/i);

    expect(screen.getAllByRole("button")[1]).toHaveTextContent(/Form/i);
    expect(screen.getAllByRole("button")[2]).toHaveTextContent(/Feedbacks/i);

    expect(screen.getByRole("link", { name: /Home/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: /Form/i })).toHaveAttribute(
      "href",
      "/form"
    );
    expect(screen.getByRole("link", { name: /Feedbacks/i })).toHaveAttribute(
      "href",
      "/feedbacks"
    );
  });

  test("render logo with alt text", () => {
    const image = screen.getByRole("img", { name: /logo/i });
    expect(image).toBeInTheDocument();
  });

  test("render logo redirect to /home", () => {
    const link = screen.getByRole("link", { name: /logo/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
