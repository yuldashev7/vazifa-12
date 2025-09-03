import React, { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { useSearch } from '../service/query/useSearch';

const Search = () => {
  const [search, setSearch] = useState('');
  const debounceValue = useDebounce(search, 500);
  const { data, isLoading, error } = useSearch(debounceValue);

  return (
    <div className="flex mr-auto ml-auto relative w-[400px]">
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm
           focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
           placeholder:text-gray-400 transition mb-6"
      />

      {search.length > 1 && (
        <div className="absolute top-[45px] w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {isLoading && <p className="p-3 text-sm text-gray-400">Loading...</p>}
          {error && (
            <p className="p-3 text-sm text-red-500">Xatolik yuz berdi!</p>
          )}
          {data?.length === 0 && !isLoading && (
            <p className="p-3 text-sm text-gray-400">Hech narsa topilmadi</p>
          )}
          {data?.map((item) => (
            <div
              key={item.id}
              className="p-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer transition"
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
