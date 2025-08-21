export type FeedbackItem = {
    id: string;
    name: string;
    email: string;
    category: string;
    subject: string;
    content: string;
};

export type Ctx = {
    feedbackList: FeedbackItem[];
    setFeedbackList: React.Dispatch<React.SetStateAction<FeedbackItem[]>>;
};