import React from 'react';
import { Link } from 'react-router-dom';
const PopularPosts = ({title, _id}) => {
  return (
    <div className='bg-gray-600 my-1'>
      <Link to={`${_id}`} className='flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white'>{title}</Link>
    </div>
  );
};

export default PopularPosts;