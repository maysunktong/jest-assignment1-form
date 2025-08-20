export type FeedbackItems = {
    id: string;
    name: string;
    email: string;
    categiry: string;
    subject: string;
    cntent: string;
    timestamp: string;
};

export type Ctx = {
    feedbackList: FeedbackItems[];
    setFeedbackList: React.Dispatch<React.SetStateAction<FeedbackItems[]>>;
};