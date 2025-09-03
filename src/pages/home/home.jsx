import React from 'react';
import { toast } from 'react-toastify';
import { useGetTasks } from '../service/query/useGetTasks';
import { Link } from 'react-router-dom';
import Form from '../components/form';
import useDeleteTask from '../service/mutation/useDeleteTask';
import { useQueryClient } from '@tanstack/react-query';
import Card from '../components/card';

const Home = () => {
  const { data, isLoading, error } = useGetTasks();

  if (error) {
    return toast.error(`${error.message}`);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6 bg-white shadow-lg rounded-2xl p-5 border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-700"></h2>
        <Form />
      </div>

      {isLoading ? (
        <h2 className="text-center text-xl font-semibold text-gray-500 animate-pulse">
          Loading...
        </h2>
      ) : (
        <div className="space-y-4">
          {data.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
