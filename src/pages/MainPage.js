import React, { useEffect } from 'react';
import PopularPosts from '../components/PopularPosts';
import PostItem from '../components/PostItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/features/post/postSlice';

const MainPage = () => {
  const { posts, popularPosts, loading } = useSelector(state => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (loading) {
    return <div className='text-sm text-white text-center mt-3'>Загрузка...</div>
  }

  if (posts.length === 0) {
    return (
      <div className='text-xl text-white text-center py-10'>Постов не сушествует</div>
    )
  }
  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-10 basis-4/5'>
          {
            posts?.map((post, idx) => <PostItem key={idx} post={post} />)
          }
        </div>
        <div className='basis-1/5'>
          <div className='text-xs uppercase text-white'>
            Популярное:
          </div>
          {
            popularPosts?.map((post, index) => <PopularPosts key={index} {...post} />)
          }
        </div>
      </div>
    </div>
  );
};

export default MainPage;