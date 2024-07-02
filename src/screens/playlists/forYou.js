import React from "react";
import "./playlists.css"; 
import ColorThief from "colorthief"; 

const ForYou = ({ records, onSongClick, selectedSong }) => {
  const handleSongClick = (song) => {
    onSongClick(song);
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    img.src = `https://cms.samespace.com/assets/${song.cover}`;

    img.onload = () => {
      const dominantColor = colorThief.getColor(img); 
      const rgbColor = `rgb(${dominantColor.join(",")})`;
      document.documentElement.style.setProperty('--sidebar-bg-color', rgbColor); // Update CSS variable
    };
  };

  return (
    <div className="song-content">
      <ul className="song-list">
        {records.map((song) => (
          <li
            key={song.id}
            className={`song-item ${selectedSong === song.id ? "selected" : ""}`}
            onClick={() => handleSongClick(song)}
          >
            <div className="song-cover">
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt="Song Cover"
              />
            </div>
            <div className="song-details">
              <h3>{song.name}</h3>
              <p>{song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForYou;
