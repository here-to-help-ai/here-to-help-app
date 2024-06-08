import React, { useRef, useEffect } from 'react';

interface AudioPlayerProps {
    src: string;
  isPlaying: boolean;
  onTimeUpdate?: (currentTime: number) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, isPlaying, onTimeUpdate }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      if (audioElement && onTimeUpdate) {
        onTimeUpdate(audioElement.currentTime);
      }
    };

    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [onTimeUpdate]);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying]);

 

  return <audio src={src} ref={audioRef} />;
};

export default AudioPlayer;
