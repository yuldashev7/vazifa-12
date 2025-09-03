import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { request } from '../../../config/request';

const UseEditTask = (id) => {
  return useMutation({
    mutationFn: (data) =>
      request.patch(`/todos/${id}`, data).then((res) => res.data),
  });
};

export default UseEditTask;
