import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackList from "../components/ui/FeedbackList";

beforeEach(() => {
  const mockFeedbacks = [
    {
      id: "uuid",
      name: "May",
      email: "may@may.com",
      rating: 2,
      category: "General",
      subject: "Test Subject",
      message: "Awesome app",
      timestamp: "date",
    },
  ];
  localStorage.setItem("feedbacks", JSON.stringify(mockFeedbacks));
});

afterEach(() => {
  localStorage.clear();
});

describe("test on FeedbackList to fetch data from local storage", () => {
  test("renders feedback from localStorage", () => {
    render(<FeedbackList />);

    expect(screen.getByText(/May/)).toBeInTheDocument();
    expect(screen.getByText(/may@may.com/)).toBeInTheDocument();
    expect(screen.getByText(/General/)).toBeInTheDocument();
        expect(screen.getByText(/Test Subject/)).toBeInTheDocument();
    expect(screen.getByText(/Awesome app/)).toBeInTheDocument();
  });

  test("clicking Erase Storage emptys local storage", () => {
    render(<FeedbackList />);
    const button = screen.getByRole("button", { name: /Erase Storage/i });

    fireEvent.click(button);

    expect(screen.queryByText(/ohyeahhh/)).not.toBeInTheDocument();
    expect(localStorage.getItem("feedbacks")).toBeNull();
  });
});
