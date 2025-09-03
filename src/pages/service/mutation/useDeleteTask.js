import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { request } from '../../../config/request';

export default function useDeleteTask() {
  return useMutation({
    mutationFn: (id) => request.delete(`/todos/${id}`).then((res) => res.data),
  });
}
