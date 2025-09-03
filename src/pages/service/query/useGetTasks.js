import { request } from '../../../config/request';
import { useQuery } from '@tanstack/react-query';

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['user_tasks'],
    queryFn: () => request.get('/todos').then((res) => res.data),
  });
};
