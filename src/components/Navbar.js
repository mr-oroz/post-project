import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import {toast} from 'react-toastify';

const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token-mern');
    toast('Вышли из аккаунта')
  }
  const activeColor = {
    color: 'white'
  }
  return (
    <div className='flex py-4 justify-between items-center'>
      <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-rounded-sm'>E</span>
      {
        isAuth && (
          <ul className='flex gap-8'>
            <li><NavLink
              to={'/'}
              style={({ isActive }) => isActive ? activeColor : undefined}
              className='text-xs text-gray-400 hover:text-white'
              href="/">Главная
            </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => isActive ? activeColor : undefined}
                to={'/posts'}
                className='text-xs text-gray-400 hover:text-white'
                href="/">Мои посты
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => isActive ? activeColor : undefined}
                to={'/new'}
                className='text-xs text-gray-400 hover:text-white'
                href="/">Добавить пост
              </NavLink>
            </li>
          </ul>
        )
      }
      <div className='flex justify-center active:opacity-25 items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
        {
          isAuth ? (
            <button
              onClick={logoutHandler}
              className='cursor-pointer '>Выйти</button>
          ) : (
            <Link to={'/login'}>Войти</Link>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;