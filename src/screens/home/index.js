import React, { useState } from "react";
import Sidebar from "../../components/sidebar/index";
import PlayCard from "../currentplaying/PlayCard"; 
import "./home.css";
import SpotifyLogo from "../../assets/Logo.svg";
import ProfilePicture from "../../assets/Profile.png";

export default function Home() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [bgColor, setBgColor] = useState('rgb(91, 87, 115)');

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  return (
    <div className="main-body" style={{ backgroundColor: bgColor }}>
      <img src={SpotifyLogo} alt="Spotify Logo" className="spotify-logo" />
      <div>
        <img src={ProfilePicture} alt="Profile" className="profile-picture" />
      </div>
      <Sidebar onSongSelect={handleSongSelect} setBgColor={setBgColor} />
      {selectedSong && <PlayCard song={selectedSong} />}
    </div>
  );
}
