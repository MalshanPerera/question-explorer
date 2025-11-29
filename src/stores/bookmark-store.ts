import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarkStore {
  bookmarks: Record<number, boolean>;
  isBookmarked: (questionId: number) => boolean;
  toggleBookmark: (questionId: number) => void;
  getBookmarkedIds: () => number[];
  getBookmarkCount: () => number;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: {},

      isBookmarked: (questionId: number) => {
        return get().bookmarks[questionId] === true;
      },

      toggleBookmark: (questionId: number) => {
        set((state) => {
          const isCurrentlyBookmarked = state.bookmarks[questionId] === true;

          if (isCurrentlyBookmarked) {
            const { [questionId]: _, ...rest } = state.bookmarks;
            return { bookmarks: rest };
          }

          return {
            bookmarks: { ...state.bookmarks, [questionId]: true },
          };
        });
      },

      getBookmarkedIds: () => {
        return Object.keys(get().bookmarks)
          .map(Number)
          .filter((id) => get().bookmarks[id] === true);
      },

      getBookmarkCount: () => {
        return Object.keys(get().bookmarks).length;
      },
    }),
    {
      name: "question-bookmarks",
    },
  ),
);

