import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useGetTasks } from '../service/query/useGetTasks';
import { Link } from 'react-router-dom';
import Form from '../components/form';
import useDeleteTask from '../service/mutation/useDeleteTask';
import { useQueryClient } from '@tanstack/react-query';
import Card from '../components/card';
import Search from '../../components/search';

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetTasks(page);
  const pages = Array(data?.pageSize || 1).fill(null);

  if (error) {
    return toast.error(`${error.message}`);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6 bg-white shadow-lg rounded-2xl p-5 border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-700"></h2>
        <Form />
      </div>
      <Search />

      {isLoading ? (
        <h2 className="text-center text-xl font-semibold text-gray-500 animate-pulse">
          Loading...
        </h2>
      ) : (
        <div className="space-y-4">
          {data.userList.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      )}
      {pages.length === 1 ? (
        ''
      ) : (
        <div className="flex items-center gap-2 mt-6 justify-center ">
          {pages.map((_, index) => (
            <p
              onClick={() => setPage(index + 1)}
              key={index}
              className={`px-3 py-1 rounded-lg border border-gray-300 cursor-pointer hover:bg-blue-500 hover:text-white transition ${
                index + 1 === page ? 'bg-blue-700 text-[#fff]' : ''
              }`}
            >
              {index + 1}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
