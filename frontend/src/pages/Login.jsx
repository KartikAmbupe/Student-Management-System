import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await dispatch(loginUser(form));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    } else {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && (
          <div className="bg-red-600 p-2 rounded text-sm text-white">
            {error}
          </div>
        )}
        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="w-full p-2 rounded bg-gray-700"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button className="bg-blue-500 w-full py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
