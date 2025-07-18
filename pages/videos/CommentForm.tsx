/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';

interface CommentFormProps {
  videoId: string;
  onCommentPosted: (newComment: any) => void; 
}

const CommentForm = ({ videoId, onCommentPosted }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !token) return;

    setLoading(true);
    setError('');

    try {
      const newComment = await api.postComment({ content, videoId }, token);
      onCommentPosted(newComment); 
      setContent('');
    }catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Cannot send comment.');
      } else {
        setError('Cannot send comment.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <p className="text-center text-gray-500 mt-4">
        Please <a href="/login" className="text-blue-600 hover:underline">Login</a> to comment.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        required
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {loading ? 'Sending...' : 'Comment'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
