import React from "react";

import SearchBar from "./SearchBar"
import youtube from "../api/youtube"
import VideoList from "./VideoList"

require("dotenv").config();

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  state = { videos: [] };

  onTermSubmit = (term) => {
    youtube
      .get("/search", {
        params: {
          part: "snippet",
          type: "video",
          maxResults: 25,
          key: `${API_KEY}`,
          q: term,
        },
      })
      .then((response) => {
        console.log(response.data.items)
        this.setState({ videos: response.data.items });
      });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onFormSubmit={this.onTermSubmit} />
        Found: {this.state.videos.length} videos
        <VideoList videos={this.state.videos}/>
      </div>
    );
  }
}

export default App;