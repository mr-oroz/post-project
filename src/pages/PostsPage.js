import React, { useState, useEffect, useCallback } from 'react';
import PostItem from '../components/PostItem';
import axios from '../utils/axios';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const onLoad = useCallback(async () => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get('posts/user/me');
        setPosts(data)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])


  useEffect(() => {
    onLoad()
  }, [onLoad]);

  if (loading) {
    return <div className='text-sm text-white text-center mt-3'>Загрузка...</div>
  }

  if (posts.length === 0) {
    return <div className='text-sm text-white text-center mt-3'>Постов нет</div>
  }

  return (
    <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
      {
        posts?.map((post, idx) => <PostItem key={idx} post={post} />)
      }
    </div>
  );
};

export default PostsPage;