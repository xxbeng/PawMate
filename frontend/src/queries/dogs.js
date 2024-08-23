// This file contains all the queries related to dogs.
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

// Custom hook to get all the dogs
export function useGetDogs() {
  return useQuery({
    queryKey: ['me', 'dogs'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get('/api/dog');
      return data;
    }
  });
}

// Custom hook to get a dog by ID
export function useGetDogById(dogId, options = {}) {
  return useQuery({
    queryKey: ['dogs', dogId],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get(`/api/dog/${dogId}`);
      return data;
    },
    ...options
  });
}

// Custom hook to update a dog
export function useGetDog(id) {
  return useQuery({
    queryKey: ['dog'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get(`/api/dog/${id}`);
      return data;
    }
  });
}

// Custom hook to update a dog
export function useUpdateDogMutation(dogId, options) {
  return useMutation({
    mutationFn: async (updatedDog) => {
      const { data } = await axiosApiInstance.put(`/api/dog/${dogId}`, updatedDog);
      return data;
    },
    ...options
  });
}

// Custom hook to create a dog
export function useCreateDogMutation(options) {
  return useMutation({
    mutationFn: async (newDog) => {
      const { data } = await axiosApiInstance.post('/api/dog', newDog);
      return data;
    },
    ...options
  });
}

// Custom hook to upload a dog profile picture
export function useUploadDogProfilePictureMutation(options) {
  return useMutation({
    mutationFn: async ({ dogId, profilePicture }) => {
      const uploadData = new FormData();
      uploadData.append('profilePicture', profilePicture);
      const { data } = await axiosApiInstance.put(`/api/dog/${dogId}`, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return data;
    },
    ...options
  });
}

// Custom hook to delete a dog
export function useDeleteDogMutation(dogId, options) {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosApiInstance.delete(`/api/dog/${dogId}`);
      return data;
    },
    ...options
  });
}
