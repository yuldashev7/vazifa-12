import { request } from '../../../config/request';
import { useQuery } from '@tanstack/react-query';

export const useGetTasks = (page = 1) => {
  return useQuery({
    queryKey: ['user_tasks', page],
    queryFn: async () => {
      const res = await request.get('/todos', {
        params: {
          _limit: 4,
          _page: page,
        },
      });
      const pageSize = await res.headers.get('X-Total-count');

      const data = await res.data;

      return { userList: data, pageSize: Math.ceil(Number(pageSize) / 4) };
    },
  });
};
