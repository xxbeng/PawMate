// This file contains queries related to users
import { useQuery } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

// Custom hook to get a user
const fetchUserProfileById = async (userId) => {
  const { data } = await axiosApiInstance.get(`/api/user/${userId}/profile`);
  return data;
};
// Custom hook to get a user
export const useGetUserProfile = (userId) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfileById(userId),
    enabled: !!userId
  });
};
