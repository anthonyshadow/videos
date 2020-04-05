import React from "react";

const VideoDetail = ({ video }) => {
  
  //conditional render as state starts in null and no video selected
  if (!video) {
    return <div></div>;
  }

  //helper
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div>
      <div className="ui embed">
        <iframe
          title="Video Player"
          src={videoSrc}
          allowfullscreen="allowfullscreen"
        />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
