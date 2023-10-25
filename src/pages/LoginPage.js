import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, checkIsAuth } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';


const initialState = {
  username: '',
  password: ''
}
const LoginPage = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch()
  const { status, isLoading } = useSelector(state => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate()
  useEffect(() => {
    if (status) toast(status)
    if(isAuth) navigate('/')
  }, [status, isAuth , navigate])

  const handelChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleSubmit = () => {
    try {
      const { username, password } = form;
      dispatch(loginUser({ username, password }))
    } catch (e) {
      console.log();
    }
  }
  return (
    <form
      className='w-1/4 mx-auto h-60 mt-40'
      onSubmit={(e) => e.preventDefault()}>
      <h1 className='text-lg text-center text-white'>Авторизация</h1>
      <label className='text-gray-400 text-xs'>
        Username:
        <input
          name="username"
          value={form.username}
          onChange={handelChange}
          placeholder='Username'
          className='py-1 mt-1 px-2 text-black bg-gray-400 border rounded-lg w-full text-xs outline-none placeholder:text-gray-700'
          type="text" />
      </label>
      <label className='text-gray-400 text-xs'>
        Password:
        <input
          name="password"
          value={form.password}
          onChange={handelChange}
          placeholder='Password'
          className='py-1 px-2 text-black bg-gray-400 border rounded-lg w-full text-xs outline-none placeholder:text-gray-700'
          type="password" />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          onClick={handleSubmit}
          type='submit'
          className='flex justify-center items-center py-2 px-4 bg-gray-600 text-xs text-white'>
          {isLoading ? 'Загрузка' : 'Войти'}
        </button>
        <Link
          className='flex justify-center items-center text-xs text-white'
          to='/register'>Нет аккаунта ?</Link>
      </div>
    </form>
  );
};

export default LoginPage;