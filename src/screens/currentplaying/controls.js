import React from "react";
import { HiVolumeUp, HiVolumeOff, HiPause, HiPlay  } from "react-icons/hi";
import { IoPlayForward, IoPlayBack } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { IconContext } from 'react-icons';
import "./controls.css";

const Controls = ({ audioRef, isPlaying, setIsPlaying, isMuted, setIsMuted }) => {

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePlayBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; 
    }
  };

  const handlePlayForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; 
    }
  };

  return (
    <IconContext.Provider value={{ size: "2em", className: "icon-class" }}>
      <div className="controls-wrapper">
        <BsThreeDots className="more-options" />
        <IoPlayBack className="playBack-icon" onClick={handlePlayBack} />
        {isPlaying ? (
          <HiPause className="control-icon" onClick={togglePlayPause} />
        ) : (
          <HiPlay className="control-icon" onClick={togglePlayPause} />
        )}
        <IoPlayForward className="playForward-icon" onClick={handlePlayForward} />
        {isMuted ? (
          <HiVolumeOff className="volume-icon" onClick={toggleMute} />
        ) : (
          <HiVolumeUp className="volume-icon" onClick={toggleMute} />
        )}
      </div>
    </IconContext.Provider>
  );
};

export default Controls;
