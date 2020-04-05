import React from "react";

import SearchBar from "./SearchBar";
import youtube from "../api/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

require("dotenv").config();

const API_KEY = process.env.REACT_APP_API_KEY;

const style = {
  overflowY: "scroll",
  maxHeight: 550,
};

class App extends React.Component {
  state = { videos: [], selectedVideo: null };

  //defaults search term 

  componentDidMount() {
    this.onTermSubmit("Carmelo Anthony");
  }

  //makes api search request 

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
        this.setState({
          videos: response.data.items,
          selectedVideo: response.data.items[0],
        });
      });
  };

  //allows to select video from list
  
  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column" style={style}>
              <VideoList
                videos={this.state.videos}
                onVideoSelect={this.onVideoSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
