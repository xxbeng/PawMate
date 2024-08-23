// Code to interact with the backend for photos
import { useQuery, useMutation } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

// Custom hook to get all photos for a dog
export function useGetPhotos(dogId) {
  return useQuery({
    queryKey: ['dogs', dogId, 'photos'],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get(`/api/dog/${dogId}/photos`);
      return data;
    }
  });
}

// Custom hook to create a photo
export function useCreatePhotoMutation(dogId) {
  return useMutation({
    mutationFn: async (newPhoto) => {
      const { data } = await axiosApiInstance.post(`/api/dog/${dogId}/photos`, newPhoto);
      return data;
    }
  });
}

// Custom hook to delete a photo
export function useDeletePhotoMutation(dogId, photoId) {
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosApiInstance.delete(`/api/dog/${dogId}/photos/${photoId}`);
      return data;
    }
  });
}
