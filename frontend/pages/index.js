// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Frontend Intern Task</h1>
        <p className="mb-4">Use the links below to register or login and open the dashboard.</p>

        <div className="space-x-3">
          <Link href="/register" className="px-4 py-2 bg-indigo-600 text-white rounded inline-block">
            Register
          </Link>

          <Link href="/login" className="px-4 py-2 bg-gray-200 rounded inline-block">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
