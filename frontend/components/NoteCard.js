export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{note.title}</h3>
        <div>
          <button onClick={()=>onEdit(note)} className="mr-2 text-blue-600">Edit</button>
          <button onClick={()=>onDelete(note._id)} className="text-red-600">Delete</button>
        </div>
      </div>
      <p className="text-sm mt-2">{note.content}</p>
      <div className="text-xs mt-2 text-gray-500">{note.tags?.join(', ')}</div>
    </div>
  );
}
