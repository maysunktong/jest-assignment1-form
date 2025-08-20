import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackList from "@/app/utils/types";

beforeEach(() => {
  const mockFeedbacks = [
    {
      id: "uuid",
      name: "May",
      email: "may@may.com",
      category: "General",
      subject: "Test Subject",
      content: "Awesome app",
      timestamp: "date",
    },
  ];
  localStorage.setItem("feedbacks", JSON.stringify(mockFeedbacks));

  render(<FeedbackList />);
});

afterEach(() => {
  localStorage.clear();
});

/* ------------------------------------------------------- */
/*✅ UNIT TESTS ✅*/
describe("test on FeedbackList to fetch data from local storage", () => {
  test("renders feedback from localStorage", () => {
    expect(screen.getByText(/May/)).toBeInTheDocument();
    expect(screen.getByText(/may@may.com/)).toBeInTheDocument();
    expect(screen.getByText(/General/)).toBeInTheDocument();
    expect(screen.getByText(/Test Subject/)).toBeInTheDocument();
    expect(screen.getByText(/Awesome app/)).toBeInTheDocument();
  });
});

/* ------------------------------------------------------- */
/*⭐️ INTEGRATION TESTS ⭐️*/
describe("Test local storage remove Item button ", () => {
  test("clicking Erase Storage emptys local storage", () => {
    const button = screen.getByRole("button", { name: /Erase Storage/i });

    fireEvent.click(button);

    expect(screen.queryByText(/ohyeahhh/)).not.toBeInTheDocument();
    expect(localStorage.getItem("feedbacks")).toBeNull();
  });
});
