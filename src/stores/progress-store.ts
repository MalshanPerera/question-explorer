import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressStore {
  completed: Record<number, boolean>;
  isCompleted: (questionId: number) => boolean;
  toggleCompleted: (questionId: number) => void;
  markCompleted: (questionId: number) => void;
  markIncomplete: (questionId: number) => void;
  getCompletedCount: () => number;
  getCompletedIds: () => number[];
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completed: {},

      isCompleted: (questionId: number) => {
        return get().completed[questionId] === true;
      },

      toggleCompleted: (questionId: number) => {
        set((state) => {
          const isCurrentlyCompleted = state.completed[questionId] === true;

          if (isCurrentlyCompleted) {
            const { [questionId]: _, ...rest } = state.completed;
            return { completed: rest };
          }

          return {
            completed: { ...state.completed, [questionId]: true },
          };
        });
      },

      markCompleted: (questionId: number) => {
        set((state) => ({
          completed: { ...state.completed, [questionId]: true },
        }));
      },

      markIncomplete: (questionId: number) => {
        set((state) => {
          const { [questionId]: _, ...rest } = state.completed;
          return { completed: rest };
        });
      },

      getCompletedCount: () => {
        return Object.keys(get().completed).length;
      },

      getCompletedIds: () => {
        return Object.keys(get().completed).map(Number);
      },
    }),
    {
      name: "question-progress",
    },
  ),
);

