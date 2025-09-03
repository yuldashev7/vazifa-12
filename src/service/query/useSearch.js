import { useQuery } from '@tanstack/react-query';
import { request } from '../../config/request';

export const useSearch = (key = '') => {
  return useQuery({
    queryKey: ['search', key],
    queryFn: () =>
      request
        .get('/todos', {
          params: {
            title_like: key,
          },
        })
        .then((res) => res.data),
  });
};
