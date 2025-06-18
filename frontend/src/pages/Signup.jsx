import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    const result = await dispatch(signupUser(form));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    } else {
      setError('Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        {error && (
          <div className="bg-red-600 p-2 rounded text-sm text-white">{error}</div>
        )}
        <input
          className="w-full p-2 rounded bg-gray-700"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
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
        <button className="bg-green-500 w-full py-2 rounded hover:bg-green-600">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;