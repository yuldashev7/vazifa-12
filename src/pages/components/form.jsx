import React from 'react';
import { useForm } from 'react-hook-form';
import useCreateTask from '../service/mutation/useCreateTask';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import UseEditTask from '../service/mutation/useEditTask';

const Form = ({ defaultValue, editId, setEditTask }) => {
  const { mutate: editMutate, isPending: editPending } = UseEditTask(editId);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      title: defaultValue,
    },
  });
  const { isPending, mutate } = useCreateTask();
  const client = useQueryClient();
  const submit = (data) => {
    if (!defaultValue) {
      return mutate(data, {
        onSuccess: () => {
          toast.success("Qo'shildi");
          client.invalidateQueries({ queryKey: ['user_tasks'] });
          reset();
        },
        onError: () => {
          toast.error('Xatolik');
        },
      });
    }
    editMutate(data, {
      onSuccess: () => {
        toast.success("O'zgardi");
        client.setQueriesData(['user_tasks'], (oldData) => {
          return oldData.map((item) =>
            item.id === editId ? { ...item, title: data.title } : item
          );
        });

        setEditTask(false);
        reset();
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="flex items-center gap-3">
        <input
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          type="text"
          placeholder="Enter task..."
          {...register('title')}
        />
        {defaultValue ? (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition scale-95"
          >
            {editPending ? 'Loading...' : 'Edit'}
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition scale-95"
          >
            {isPending ? 'Loading...' : 'Send'}
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
