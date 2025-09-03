import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { request } from '../../../config/request';

export default function useCreateTask() {
  return useMutation({
    mutationFn: (data) => request.post('/todos', data).then((res) => res.data),
  });
}
