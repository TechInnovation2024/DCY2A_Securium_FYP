// Import necessary libraries
import React from 'react';
import YouTube from 'react-youtube';
import './Watch.css';

// Define the video data including video IDs and titles
const videos = [
  { id: 'SSo_EIwHSd4?si'  , text: 'How does a blockchain work'},
  { id: 'wcDtLMraTkQ?si',   text: 'What is a Password Manager?'},
  { id: 'xHSnHj-zKF4?si',  text: 'How stop memorizing your passwords'},
  { id: 'H7Xy__sqtdk?si',  text: 'Are password managers actually SAFE to use?'},
  { id: 'iBFhmZCL-6c?si',  text: 'Why EVERYONE Should Use a Password Manager?'},
  { id: 'xUp5S0nBnfc?si',  text: 'How to make passwords more secure?'},
];


const Watch = () => {
  // Options for the YouTube player
  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  // Function to handle click on video container
  const handleVideoClick = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(videoUrl, '_blank');
  };

  return (
    <div>
    <div className="main-top">
          <h1>Demo</h1>
        </div>
        
    <div className="youtube-container">
      
      {videos.map((video, index) => (
        <div key={index} className="youtube-video" onClick={() => handleVideoClick(video.id)}>
          <h3 className="video-title">{video.title}</h3>
          <YouTube videoId={video.id} opts={opts} />
          <h3 className="video-title">{video.text}</h3>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Watch;
