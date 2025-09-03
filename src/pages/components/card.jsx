import React, { useState } from 'react';
import useDeleteTask from '../service/mutation/useDeleteTask';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Form from './form';

const Card = (item) => {
  const { mutate, isPending } = useDeleteTask();
  const client = useQueryClient();

  const [editTask, setEditTask] = useState(false);

  const deleteItem = () => {
    mutate(item.id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ['user_tasks'] });
        toast.success("O'chirildi");
      },
      onError: () => {
        toast.error('Xatolik');
      },
    });
  };
  return (
    <div
      key={item.id}
      className=" bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all border border-gray-100 flex justify-between"
    >
      {editTask ? (
        <Form
          setEditTask={setEditTask}
          defaultValue={item.title}
          editId={item.id}
        />
      ) : (
        <Link to={`/task/${item.id}`}>
          <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600">
            {item.title}
          </h2>
        </Link>
      )}

      <div className="flex gap-[20px]">
        <button
          className="cursor-pointer bg-[blue] text-[#fff] py-[4px] px-[12px] rounded-[8px]"
          onClick={() => setEditTask(!editTask)}
        >
          {!editTask ? 'Edit' : 'Cancel'}
        </button>

        <button
          onClick={() => deleteItem(item.id)}
          className="cursor-pointer bg-[red] text-[#fff] py-[4px] px-[12px] rounded-[8px]"
        >
          {isPending ? 'Loading...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default Card;
