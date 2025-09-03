import React from 'react';
import { useParams } from 'react-router-dom';
import useGetSingleTask from './query/useGetSingleTask';

const TaskDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleTask(id);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {isLoading ? (
        <h2 className="text-center text-xl font-semibold text-gray-500 animate-pulse">
          Loading...
        </h2>
      ) : (
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            {data.title}
          </h1>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
