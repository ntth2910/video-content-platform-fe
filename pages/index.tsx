import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../lib/api';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

interface Video {
  id: string;
  title: string;
  uploader: {
    username: string;
  };
}

const HomePage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await api.getVideos();
        setVideos(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Video could not be loaded.');
        } else {
          setError('Video could not be loaded.');
        }
      }
        finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Latest Video</h1>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonLoader key={i} />)
        ) : (
          videos.map((video) => (
            <Link href={`/videos/${video.id}`} key={video.id} className="block bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  {/* Placeholder cho thumbnail */}
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg truncate" title={video.title}>{video.title}</h3>
                  <p className="text-gray-600 text-sm">
                    by {video.uploader?.username || 'Anonymous'}
                  </p>
                </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
