import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/features/post/postSlice';
import { useNavigate } from 'react-router-dom';
const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const clearSubmitHandler = () => {
    setText('')
    setTitle('')
  }

  return (
    <form
      className='w-1/3 mx-auto py-10'
      onSubmit={e => e.preventDefault()}>
      <label className='flex justify-center items-start text-xs text-gray-300 py-2 mt-2 border-2 border-dotted cursor-pointer'>
        Прикрепить изображение
        <input
          onChange={e => setImage(e.target.files[0])}
          type="file"
          hidden />
      </label>
      <div className='object-cover flex py-2'>
        {image && (
          <img src={URL.createObjectURL(image)} alt={image.name} />
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
          className='flex justify-center items-center py-2 px-4 rounded-sm text-xs text-white bg-gray-600'>Добавить</button>
        <button
          onClick={clearSubmitHandler}
          className='flex justify-center items-center py-2 px-4 rounded-sm text-xs text-red-500 bg-gray-600'>Отменить</button>
      </div>
    </form>
  );
};

export default AddPostPage;