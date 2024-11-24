import { create } from "zustand";

const useUserStore = create((set) => ({
  followedUsers: {},
  setFollowed: (userId, isFollowed) =>
    set((state) => ({
      followedUsers: {
        ...state.followedUsers,
        [userId]: isFollowed,
      },
    })),
  followersCount: {},
  setFollowersCount: (userId, count) =>
    set((state) => ({
      followersCount: {
        ...state.followersCount,
        [userId]: count,
      },
    })),
}));

export default useUserStore;
