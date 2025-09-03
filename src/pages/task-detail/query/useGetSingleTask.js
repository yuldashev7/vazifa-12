import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { request } from '../../../config/request';

const useGetSingleTask = (id) => {
  return useQuery({
    queryKey: ['single-task', id],
    queryFn: () => request.get(`/todos/${id}`).then((res) => res.data),
  });
};

export default useGetSingleTask;
