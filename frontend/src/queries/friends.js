// Code for fetching friends and managing friend requests
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

// Custom hook to get all friends
export function useGetFriends() {
  return useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get('/api/match');
      return data;
    }
  });
}

// Custom hook to get all friend requests
export function useUnfriendMutation() {
  return useMutation({
    mutationKey: ['unfriend'],
    mutationFn: async ({ currentUserId, friendId }) => {
      const { data } = await axiosApiInstance.delete(`/api/match/${currentUserId}/${friendId}`);
      return data;
    },
    onSuccess: () => {
      console.log('Friend removed successfully.');
    },
    onError: (error) => {
      console.error('Error removing the friend:', error);
    }
  });
}

// Custom hook to get all friend requests
export function useLikeDogMutation() {
  return useMutation({
    mutationKey: ['likeDog'],
    mutationFn: async (dogId) => {
      const { data } = await axiosApiInstance.post(`/api/match/${dogId}`);
      return data;
    },
    onSuccess: () => {
      console.log('Dog liked successfully.');
    },
    onError: (error) => {
      console.error('Error liking the dog:', error);
    }
  });
}

// Custom hook to get all friend requests
export function useUnlikeDogMutation() {
  return useMutation({
    mutationKey: ['unlikeDog'],
    mutationFn: async (dogId) => {
      const { data } = await axiosApiInstance.delete(`/api/match/${dogId}`);
      return data;
    },
    onSuccess: () => {
      console.log('Dog unliked successfully.');
    },
    onError: (error) => {
      console.error('Error unliking the dog:', error);
    }
  });
}
