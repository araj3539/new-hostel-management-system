import React from 'react';
import useStore from '../../store/useStore';
import { format } from 'date-fns';

const NoticeBoard = () => {
  const notices = useStore(state => state.notices);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notice Board</h1>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`card ${
              notice.important ? 'border-2 border-red-500 dark:border-red-700' : ''
            }`}
          >
            <div>
              <h3 className="text-lg font-semibold">{notice.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {format(new Date(notice.timestamp), 'PPP')}
              </p>
            </div>
            <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {notice.content}
            </p>
          </div>
        ))}

        {notices.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No notices available </div>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;