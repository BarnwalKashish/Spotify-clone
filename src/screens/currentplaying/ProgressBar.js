import React, { useEffect, useState, useRef } from "react";
import "./ProgressBar.css";
const ProgressBar = ({ audioRef }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    };

    const ref = audioRef.current; 

    if (ref) {
      ref.addEventListener("timeupdate", updateTime);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [audioRef]);

  const handleSeek = (event) => {
    const progressRect = progressRef.current.getBoundingClientRect();
    const clickX = event.clientX - progressRect.left;
    const newTime = (clickX / progressRect.width) * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="progress-bar" onClick={handleSeek} ref={progressRef}>
      <progress value={currentTime} max={duration} className="song-progress" />
    </div>
  );
};

export default ProgressBar;
