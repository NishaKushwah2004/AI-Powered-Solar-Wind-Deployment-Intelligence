import { profileApi } from "../api/profileApi";

export const profileService = {
  async getProfile() {
    const { data } = await profileApi.getProfile();
    return data;
  },

  async updateProfile(profile) {
    const { data } =
      await profileApi.updateProfile(profile);

    return data;
  },
};