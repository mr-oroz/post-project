import React, {useEffect, useCallback, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../utils/axios';
import { updatePost } from '../redux/features/post/postSlice';
const EditPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  const submitHandler = () => {
    try {
      const updatedPost =  new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      dispatch(updatePost(updatedPost))
      navigate('/posts')
    } catch (error) {
      console.log(error);
    }
  }

  const clearSubmitHandler = () => {
    setTitle('')
    setText('')
  }

  return (
    <form
      className='w-1/3 mx-auto py-10'
      onSubmit={e => e.preventDefault()}>
      <label className='flex justify-center items-start text-xs text-gray-300 py-2 mt-2 border-2 border-dotted cursor-pointer'>
        Прикрепить изображение
        <input
          onChange={e => {
            setNewImage(e.target.files[0])
            setOldImage('')
          }}
          type="file"
          hidden />
      </label>
      <div className='object-cover flex py-2'>
      { oldImage && (
          <img src={`http://213.171.5.191:3002/${oldImage}`} alt={oldImage.name} />
        )}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
      </div>

      <label className='text-xs opacity-70 text-white'>
        Заголовок
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Заголовок'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 outline-none placeholder:text-gray-700'
          type="text" />
      </label>

      <label className='text-xs opacity-70 text-white'>
        Текс поста
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Текс поста'
          className='mt-1 resize-none h-40 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 outline-none placeholder:text-gray-700'
        />
      </label>
      <div className='flex justify-center gap-8 items-center mt-4'>
        <button
          onClick={submitHandler}
          className='flex justify-center items-center py-2 px-4 rounded-sm text-xs text-white bg-gray-600'>Обновить</button>
        <button
          onClick={clearSubmitHandler}
          className='flex justify-center items-center py-2 px-4 rounded-sm text-xs text-red-500 bg-gray-600'>Отменить</button>
      </div>
    </form>
  );
};

export default EditPostPage;