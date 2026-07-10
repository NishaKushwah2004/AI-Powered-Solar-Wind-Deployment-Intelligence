import { useQuery } from "@tanstack/react-query";

import { profileService } from "../services/profileService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.PROFILE,

    queryFn: profileService.getProfile,
  });
}