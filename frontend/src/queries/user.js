// This file contains queries for the user profile page.
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

// Custom hook to get a user
export function useGetUser(username) {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get(`/api/user/${username}`);
      return data;
    }
  });
}

// Custom hook to update a user
export const useUpdateUserMutation = (onSuccess = {}) => {
  return useMutation({
    mutationFn: (profileData) => {
      console.log(profileData);
      return axiosApiInstance.put(`/api/user/${profileData.username}`, profileData);
    },
    onSuccess
  });
};
