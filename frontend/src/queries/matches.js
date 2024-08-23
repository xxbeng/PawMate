// Code for fetching potential mates
import { useQuery } from '@tanstack/react-query';
import axiosApiInstance from '../utils/axiosApiInstance';

// Custom hook to get potential mates
export function useGetPotentialMates(manualMatch = false) {
  return useQuery({
    queryKey: ['potential-mates', manualMatch],
    queryFn: async () => {
      const { data } = await axiosApiInstance.get('/api/potential-mates', {
        params: {
          manualMatch
        }
      });
      return data;
    }
  });
}
