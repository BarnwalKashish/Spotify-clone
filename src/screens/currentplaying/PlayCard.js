import React, { useEffect, useState, useRef } from "react";
import "./PlayCard.css"; 
import Controls from "./controls";
import ProgressBar from "./ProgressBar";
const PlayCard = ({ song, bgColor }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
      });
      setIsPlaying(true);
    }
  }, [song]);

  return (
    <div className={`playcard ${song ? 'show' : ''}`} style={{ '--card-bg-color': bgColor }}>
      {song && (
        <>
          <div className="playcard-details">
            <h3>{song.name}</h3>
            <p>{song.artist}</p>
          </div>
          <div className="playcard-cover">
            <img
              src={`https://cms.samespace.com/assets/${song.cover}`}
              alt="Song Cover"
            />
          </div>
          <Controls
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
          />
          <ProgressBar audioRef={audioRef} />
          <audio ref={audioRef} controls style={{ display: "none" }} />
        </>
      )}
    </div>
  );
};

export default PlayCard;