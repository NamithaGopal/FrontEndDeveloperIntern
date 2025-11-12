import { useState } from 'react';
import api from '../lib/api';

export default function NoteForm({ onSaved, initial }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');
  const [tags, setTags] = useState((initial?.tags || []).join(', '));

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (initial) {
        const res = await api.put(`/notes/${initial._id}`, { title, content, tags: tags.split(',').map(t=>t.trim()).filter(Boolean) });
        onSaved(res.data);
      } else {
        const res = await api.post('/notes', { title, content, tags: tags.split(',').map(t=>t.trim()).filter(Boolean) });
        onSaved(res.data);
        setTitle(''); setContent(''); setTags('');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving note');
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow">
      <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full mb-2 p-2 border" placeholder="Title" />
      <textarea value={content} onChange={e=>setContent(e.target.value)} className="w-full mb-2 p-2 border" placeholder="Content" />
      <input value={tags} onChange={e=>setTags(e.target.value)} className="w-full mb-2 p-2 border" placeholder="Tags (comma separated)" />
      <button className="py-2 px-4 bg-green-600 text-white rounded">{initial ? 'Update' : 'Create'}</button>
    </form>
  );
}
