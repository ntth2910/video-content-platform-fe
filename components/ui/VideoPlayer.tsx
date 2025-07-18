import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  src: string | null; // URL của file HLS (.m3u8)
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
    console.log("Quyhehe", src)
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (!src) return;

    let hls: Hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoElement);
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]); 

  if (!src) {
    return (
      <div className="w-full bg-black aspect-video rounded-lg flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-lg">Video is being processed...</p>
          <p className="text-sm text-gray-400">Please come back later.</p>
        </div>
      </div>
    );
  }

  return <video ref={videoRef} controls className="w-full rounded-lg shadow-lg bg-black" />;
};

export default VideoPlayer;
