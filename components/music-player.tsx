"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, List } from 'lucide-react';

interface Widget {
  pause: () => void;
  play: () => void;
  load: (url: string, options: { auto_play: boolean }) => void;
  setVolume: (volume: number) => void;
  bind: (event: string, callback: () => void) => void;
}

interface Track {
  url: string;
  title: string;
}

interface MusicPlayerProps {
  playlist: Track[];
  height?: number;
}

const MusicPlayer = ({ playlist }: MusicPlayerProps) => {
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [widget, setWidget] = useState<Widget | null>(null);
  const [volume, setVolume] = useState(50);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(166);

  useEffect(() => {
    const updateHeight = () => {
      setIframeHeight(window.innerWidth < 640 ? 120 : 166);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleNext = useCallback(() => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
      widget?.load(playlist[currentTrackIndex + 1].url, { auto_play: true });
    }
  }, [currentTrackIndex, playlist, widget]);
	
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-expect-error: SC no está tipado
      const SC = window.SC;
      if (SC) {
		const playerWidget = SC.Widget("soundcloud-player");
        setWidget(playerWidget);

        playerWidget.bind(SC.Widget.Events.READY, () => {
          playerWidget.setVolume(volume);
        });

        playerWidget.bind(SC.Widget.Events.PLAY, () => {
          setIsPlaying(true);
        });

        playerWidget.bind(SC.Widget.Events.PAUSE, () => {
          setIsPlaying(false);
        });

        playerWidget.bind(SC.Widget.Events.FINISH, () => {
          handleNext();
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [handleNext, volume]);

  const handlePlayPause = () => {
    if (widget) {
      if (isPlaying) {
        widget.pause();
      } else {
        widget.play();
      }
    }
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
      widget?.load(playlist[currentTrackIndex - 1].url, { auto_play: true });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    widget?.setVolume(newVolume / 100);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 px-2 sm:px-0">
      <div className="bg-modGreen shadow-lg rounded-lg p-2 sm:p-4">
        {/* Título de la canción actual - visible en móvil */}
        <div className="mb-2 md:hidden">
          <h3 className="font-semibold text-xs truncate">
            {playlist[currentTrackIndex].title}
          </h3>
        </div>

        {/* Reproductor SoundCloud */}
		  <iframe
  		  id="soundcloud-player"
  		  ref={iframeRef}
 		  width="100%"        
          height={iframeHeight}
          scrolling="no"
          frameBorder="no"
          src={`https://w.soundcloud.com/player/?url=${playlist[currentTrackIndex].url}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
          className="rounded-lg"
        />
        
        {/* Controles personalizados */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-2 sm:mt-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
              onClick={handlePrevious}
              disabled={currentTrackIndex === 0}
              className="p-1 sm:p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <SkipBack className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            
            <button 
              onClick={handlePlayPause}
              className="p-1 sm:p-2 rounded-full hover:bg-gray-100"
            >
              {isPlaying ? 
                <Pause className="w-4 h-4 sm:w-6 sm:h-6" /> : 
                <Play className="w-4 h-4 sm:w-6 sm:h-6" />
              }
            </button>
            
            <button 
              onClick={handleNext}
              disabled={currentTrackIndex === playlist.length - 1}
              className="p-1 sm:p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <SkipForward className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-24"
              />
            </div>
            
            <button 
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="sm:hidden p-1 rounded-full hover:bg-gray-100"
            >
              <List className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Lista de reproducción - responsive */}
      <div className={`bg-modGreen shadow-lg rounded-lg p-2 sm:p-4 ${!showPlaylist && 'hidden sm:block'}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-sm sm:text-base">Lista de reproducción</h3>
          <button 
            onClick={() => setShowPlaylist(false)}
            className="sm:hidden p-1 hover:bg-modGreen2 rounded text-sm"
          >
            ×
          </button>
        </div>
        <div className="space-y-1 sm:space-y-2 max-h-48 sm:max-h-60 overflow-y-auto">
          {playlist.map((track, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTrackIndex(index);
                widget?.load(track.url, { auto_play: true });
                setShowPlaylist(false);
              }}
              className={`w-full text-left p-1.5 sm:p-2 rounded hover:bg-modGreen2 text-xs sm:text-sm ${
                currentTrackIndex === index ? 'bg-modGreen2' : ''
              }`}
            >
              {index + 1}. {track.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
