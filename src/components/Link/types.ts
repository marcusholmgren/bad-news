
interface CommentData {
  postedBy: {
    id: string;
    name: string;
  };
  created: number;
  text: string;
}

interface Vote {
  votedBy: {
    id: string;
    name: string;
  };
}

export interface LinkData {
    id: string;
    url: string;
    description: string;
    created: number;
    voteCount: number;
    postedBy: {
        id: string;
        name: string;
    };
    comments: CommentData[];
    votes: Vote[];
}