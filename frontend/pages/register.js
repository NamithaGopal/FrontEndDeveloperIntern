import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../lib/api';
import { useRouter } from 'next/router';
import { useAuth } from '../components/AuthProvider';

const schema = yup.object().shape({
  name: yup.string().required('Name required'),
  email: yup.string().email().required('Email required'),
  password: yup.string().min(6).required('Password required')
});

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/register', data);
      login(res.data.token);
      router.push('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-white rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Register</h2>
        <input {...register('name')} placeholder="Name" className="mb-2 w-full p-2 border rounded" />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
        <input {...register('email')} placeholder="Email" className="mb-2 w-full p-2 border rounded" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
        <input {...register('password')} type="password" placeholder="Password" className="mb-2 w-full p-2 border rounded" />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
        <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded">Create account</button>
      </form>
    </div>
  );
}
