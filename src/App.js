import React from "react";
import "./App.css";
import { gapi } from "gapi-script";
function App() {
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";
  const clickHandler = () => {
    gapi.load("client:auth2", () => {
      console.log("object");
      gapi.client.init({
        apiKey: process.env.REACT_APP_API_KEY,
        clienId: process.env.REACT_APP_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      gapi.client.load("calendar", "v3", () => {
        console.log("loaded");
      });
    });
  };
  return (
    <div className="App">
      <h2>Hello react!</h2>
      <button onClick={clickHandler}>Get calendar</button>
    </div>
  );
}

export default App;
