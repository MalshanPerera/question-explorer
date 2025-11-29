import { create } from "zustand";
import { persist } from "zustand/middleware";

export type VoteState = "up" | "down" | null;

interface VoteRecord {
  [questionId: number]: VoteState;
}

interface VoteStore {
  votes: VoteRecord;
  getVoteState: (questionId: number) => VoteState;
  getAdjustedVotes: (questionId: number, baseVotes: number) => number;
  upvote: (questionId: number) => void;
  downvote: (questionId: number) => void;
  clearVote: (questionId: number) => void;
}

function getVoteAdjustment(state: VoteState): number {
  if (state === "up") return 1;
  if (state === "down") return -1;
  return 0;
}

export const useVoteStore = create<VoteStore>()(
  persist(
    (set, get) => ({
      votes: {},

      getVoteState: (questionId: number) => {
        return get().votes[questionId] ?? null;
      },

      getAdjustedVotes: (questionId: number, baseVotes: number) => {
        const voteState = get().votes[questionId] ?? null;
        return baseVotes + getVoteAdjustment(voteState);
      },

      upvote: (questionId: number) => {
        set((state) => {
          const currentVote = state.votes[questionId];
          const newVote = currentVote === "up" ? null : "up";

          if (newVote === null) {
            const { [questionId]: _, ...rest } = state.votes;
            return { votes: rest };
          }

          return {
            votes: { ...state.votes, [questionId]: newVote },
          };
        });
      },

      downvote: (questionId: number) => {
        set((state) => {
          const currentVote = state.votes[questionId];
          const newVote = currentVote === "down" ? null : "down";

          if (newVote === null) {
            const { [questionId]: _, ...rest } = state.votes;
            return { votes: rest };
          }

          return {
            votes: { ...state.votes, [questionId]: newVote },
          };
        });
      },

      clearVote: (questionId: number) => {
        set((state) => {
          const { [questionId]: _, ...rest } = state.votes;
          return { votes: rest };
        });
      },
    }),
    {
      name: "question-votes",
    },
  ),
);

