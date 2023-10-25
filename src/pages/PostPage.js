import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import Moment from 'react-moment';
import axios from '../utils/axios';
import { useSelector, useDispatch } from 'react-redux';
import { removePost } from '../redux/features/post/postSlice';
import { toast } from 'react-toastify';
import { createComment, getPostComments } from '../redux/features/comment/commentSlice';
import CommentItem from '../components/CommentItem';
const PostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');


  const params = useParams();
  const { user } = useSelector(state => state.auth);
  const { comments } = useSelector(state => state.comment);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const removePostHandler = () => {
    setLoading(true)
    try {
      dispatch(removePost(params.id))
      toast('Пост был удален')
      navigate('/posts')
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const fetchPost = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`/posts/${params.id}`);
      setPost(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }, [params.id])



  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if (loading) {
    return (
      <div className='text-xl text-center text-white py-10'>
        Загрузка...
      </div>
    )
  }

  const handleSubmit = () => {
    try {
      if (comment) {
        const postId = params.id
        dispatch(createComment({ postId, comment }))
        setComment('')
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <button className='flex justify-center items-center text-xs text-white bg-gray-600 rounded-sm px-4 py-2'>
        <Link to={'/'}>Назад</Link>
      </button>
      {post ? (<div className='flex gap-10 py-8'>
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div className={post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounden-sm'}>
              {
                post.imgUrl && (<img className=' object-cover' src={`http://213.171.5.191:3002/${post?.imgUrl}`} alt='img' />)
              }
            </div>
          </div>
          <div className='flex justify-between items-center pt-2'>
            <div className='text-xs text-white opacity-50'>{post.username}</div>
            <div className='text-xs text-white opacity-50'>
              <Moment date={post?.createdAt} format="D MMM YYYY" locale='ru' />
            </div>
          </div>
          <div className='text-white text-xl '>{post?.title}</div>
          <div className='text-white text-xs opacity-50 pt-4'>{post.text}</div>
          <div className='flex gap-3 items-center mt-2 justify-between '>
            <div className='flex gap-3 items-center mt-3'>
              <button className='flex justify-center items-center gap-2 text-xs text-white opacity-50'>
                <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className='flex justify-center items-center gap-2 text-xs text-white opacity-50'>
                <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
              </button>
            </div>
            <div className='flex gap-3 items-center mt-3'>
              {user?._id === post.author && (
                <div className='flex gap-3 items-center mt-2 '>
                  <button className='flex justify-center items-center gap-2 text-xs text-white opacity-50'>
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>
                  <button
                    onClick={removePostHandler}
                    className='flex justify-center items-center gap-2  text-white opacity-50'>
                    <AiFillDelete />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
        <div className="w-1/3 flex gap-2 p-8 bg-gray-700 flex-col rounded-sm">
          <form onSubmit={e => e.preventDefault()} className='flex gap-2'>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='comment'
              className='text-black p-2 w-full rounded-sm bg-gray-400 border text-xs outline-none placeholder:text-gray-700'
              type="text" />
            <button
              onClick={handleSubmit}
              className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
              type='submit' >
              отправить
            </button>
          </form>
          {
            comments?.map((comment, i) => <CommentItem key={i} cmt={comment} />)
          }
        </div>

      </div>)
        :
        (<div className='text-xl text-center text-white py-10'>
          У тебя посты нету
        </div>
        )}
    </div>
  );
};

export default PostPage;