import React, { useState, useEffect } from "react";
import SidebarButton from "./sidebarButton";
import "./sidebar.css";
import "../../screens/playlists/playlists.css";
import ForYou from "../../screens/playlists/forYou";
import TopTracks from "../../screens/playlists/topTracks";
import { fetchSongData } from "../../utils/api";
import SearchBar from "./SearchBar";
import ColorThief from "colorthief";


export default function Sidebar({ onSongSelect, setBgColor }) {
  const [activeButton, setActiveButton] = useState("For you");
  const [searchQuery, setSearchQuery] = useState("");
  const [songData, setSongData] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  // const [showPlayCard, setShowPlayCard] = useState(false);
  const [showSongList, setShowSongList] = useState(false); 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSongData();
        setSongData(data);
        setRecords(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterRecords(query, activeButton);
  };

  const filterRecords = (query, button) => {
    if (button === "For you") {
      setRecords(songData.filter((f) => f.name.toLowerCase().includes(query)));
    } else if (button === "Top tracks") {
      setRecords(
        songData.filter((f) => f.top_track && f.name.toLowerCase().includes(query))
      );
    }
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
    filterRecords(searchQuery, button);
  };

  const handleSongClick = async (song) => {
    onSongSelect(song);
    setSelectedSong(song.id);

    const colorThief = new ColorThief();
    const img = document.createElement("img");
    img.crossOrigin = "Anonymous";
    img.src = `https://cms.samespace.com/assets/${song.cover}`;
    img.onload = () => {
      const color = colorThief.getColor(img);
      const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      setBgColor(rgbColor);
    };

    // setShowPlayCard(true);
  };

  const renderContent = () => {
    switch (activeButton) {
      case "For you":
        return (
          <ForYou
            records={records}
            onSongClick={handleSongClick}
            selectedSong={selectedSong}
          />
        );
      case "Top tracks":
        return (
          <TopTracks
            records={records}
            onSongClick={handleSongClick}
            selectedSong={selectedSong}
          />
        );
      default:
        return (
          <ForYou
            records={records}
            onSongClick={handleSongClick}
            selectedSong={selectedSong}
          />
        );
    }
  };


  const toggleSongList = () => {
    setShowSongList(!showSongList);
  };

  return (
    <div className="sidebar-container">

      <div className="buttons">
        <div onClick={() => handleButtonClick("For you")}>
          <SidebarButton
            title="For you"
            to="/forYou"
            icon={null}
            isActive={activeButton === "For you"}
          />
        </div>
        <div onClick={() => handleButtonClick("Top tracks")}>
          <SidebarButton
            title="Top tracks"
            to="/topTracks"
            icon={null}
            isActive={activeButton === "Top tracks"}
          />
        </div>
      </div>


      <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />


      <div className="content">
        {renderContent()}
         
      </div>

      {window.innerWidth <= 768 && (
        <button className="menu-button" onClick={toggleSongList}>
          {showSongList ? "Hide Song List" : "Show Song List"}
        </button>
      )}

      {showSongList && (
        <div className="song-list">

          <ul>
            {records.map((song) => (
              <li key={song.id}>{song.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
