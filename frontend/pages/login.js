import { useForm } from 'react-hook-form';
import api from '../lib/api';
import { useRouter } from 'next/router';
import { useAuth } from '../components/AuthProvider';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/login', data);
      login(res.data.token);
      router.push('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-white rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <input {...register('email')} placeholder="Email" className="mb-2 w-full p-2 border rounded" />
        <input {...register('password')} type="password" placeholder="Password" className="mb-2 w-full p-2 border rounded" />
        <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}
