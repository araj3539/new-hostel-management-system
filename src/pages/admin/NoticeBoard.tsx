import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';

const NoticeBoard = () => {
  const notices = useStore(state => state.notices);
  const { addNotice, updateNotice, deleteNotice } = useStore();

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    important: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateNotice(isEditing, formData);
      setIsEditing(null);
    } else {
      addNotice(formData);
      setIsAdding(false);
    }
    setFormData({ title: '', content: '', important: false });
  };

  const handleEdit = (notice: any) => {
    setIsEditing(notice.id);
    setFormData({
      title: notice.title,
      content: notice.content,
      important: notice.important,
    });
  };

  const handleDelete = (noticeId: string) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      deleteNotice(noticeId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notice Board</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Notice
        </button>
      </div>

      {(isAdding || isEditing) && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Notice' : 'Add New Notice'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="input mt-1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="input mt-1"
                rows={4}
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="important"
                checked={formData.important}
                onChange={e => setFormData(prev => ({ ...prev, important: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="important" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Mark as Important
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setIsEditing(null);
                  setFormData({ title: '', content: '', important: false });
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Update' : 'Add'} Notice
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`card ${
              notice.important ? 'border-2 border-red-500 dark:border-red-700' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{notice.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format(new Date(notice.timestamp), 'PPP')}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(notice)}
                  className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {notice.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;