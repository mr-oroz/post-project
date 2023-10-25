import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className='text-xl text-white text-center py-10'>Загрузка...</div>
    )
  }
  return (
    <Link to={`/${post._id}`}>
      <div className='flex flex-col basis-1/4 flex-grow'>
        <div className={post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounden-sm'}>
          {
            post.imgUrl && (<img className='w-80 object-cover' src={`http://213.171.5.191:3002/${post.imgUrl}`} alt='img' />)
          }
        </div>
        <div className='flex justify-between items-center pt-2'>
          <div className='text-xs text-white opacity-50'>{post.username}</div>
          <div className='text-xs text-white opacity-50'>
            <Moment date={post.createdAt} format="D MMM YYYY" locale='ru' />
          </div>
        </div>
        <div className='text-white text-xl '>{post.title}</div>
        <div className='text-white text-xs opacity-50 pt-4 line-clamp-4'>{post.text}</div>
        <div className='flex gap-3 items-center mt-2 '>
          <button className='flex justify-center items-center gap-2 text-xs text-white opacity-50'>
            <AiFillEye /> <span>{post.views}</span>
          </button>
         
          <button className='flex justify-center items-center gap-2 text-xs text-white opacity-50'>
            <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;