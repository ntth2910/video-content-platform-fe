import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import VideoPlayer from '../../components/ui/VideoPlayer';
import CommentForm from './CommentForm';


interface Comment {
    id: number;
    content: string;
    user: {
      username: string;
    };
}
interface VideoDetail {
    id: string;
    title: string;
    description: string;
    status: string;
    videoUrl: string | null;
    uploader: {
      username: string;
    };
    comments: Comment[];
  }

const VideoDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      setLoading(true);
      api.getVideoById(id)
        .then(data => {
          setVideo(data);
        })
        .catch(err => {
          setError(err.message || 'Không thể tải chi tiết video.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleCommentPosted = (newComment: Comment) => {
    setVideo(currentVideo => {
      if (!currentVideo) return null;
      // Thêm bình luận mới vào đầu danh sách để hiển thị ngay lập tức
      return {
        ...currentVideo,
        comments: [newComment, ...currentVideo.comments],
      };
    });
  };

  if (loading) {
    return <div className="text-center mt-20">Đang tải thông tin video...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  if (!video) {
    return <div className="text-center mt-20">Không tìm thấy video.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
        <div className="lg:col-span-2">
          <VideoPlayer src={video.videoUrl} />
          <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-900">{video.title}</h1>
            <p className="text-gray-600 mt-2">
              Upload by:  <span className="font-semibold">{video.uploader?.username || 'Unknow'}</span>
            </p>
            <p className="mt-4 text-gray-700 whitespace-pre-wrap">{video.description}</p>
          </div>
        </div>

       
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Comment ({video.comments.length})</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {video.comments.length > 0 ? (
              video.comments.map(comment => (
                <div key={comment.id} className="border-b border-gray-200 pb-2">
                  <p className="font-semibold text-gray-800">{comment.user.username}</p>
                  <p className="text-gray-600">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
       
          
          {/* Form comment */}
          <CommentForm videoId={video.id} onCommentPosted={handleCommentPosted} />

         
        </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;
