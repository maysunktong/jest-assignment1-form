export type FeedbackItem = {
    id: string;
    name: string;
    email: string;
    categiry: string;
    subject: string;
    cntent: string;
};

export type Ctx = {
    feedbackList: FeedbackItem[];
    setFeedbackList: React.Dispatch<React.SetStateAction<FeedbackItem[]>>;
};