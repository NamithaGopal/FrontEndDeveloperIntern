import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../components/AuthProvider';
import api from '../lib/api';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const fetchNotes = async () => {
    const params = {};
    if (q) params.q = q;
    if (tagFilter) params.tag = tagFilter;
    const res = await api.get('/notes', { params });
    setNotes(res.data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const onSaved = (note) => {
    // if exists update local, else unshift
    setNotes(prev => {
      const idx = prev.findIndex(n => n._id === note._id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = note;
        return copy;
      }
      return [note, ...prev];
    });
    setEditing(null);
  };

  const onDelete = async (id) => {
    if (!confirm('Delete note?')) return;
    await api.delete(`/notes/${id}`);
    setNotes(prev => prev.filter(n => n._id !== id));
  };

  return (
    <ProtectedRoute>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl">Dashboard — {user?.name}</h1>
          <div>
            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
          </div>
        </div>

        <div className="mb-4">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search notes..." className="p-2 border mr-2" />
          <input value={tagFilter} onChange={e=>setTagFilter(e.target.value)} placeholder="Filter tag" className="p-2 border mr-2" />
          <button onClick={fetchNotes} className="px-3 py-1 bg-indigo-600 text-white rounded">Search/Filter</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg mb-2">{editing ? 'Edit note' : 'Create note'}</h2>
            <NoteForm onSaved={onSaved} initial={editing} />
          </div>

          <div>
            <h2 className="text-lg mb-2">Your notes</h2>
            <div className="space-y-3">
              {notes.map(n => (
                <NoteCard key={n._id} note={n} onEdit={(note)=>setEditing(note)} onDelete={onDelete} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
