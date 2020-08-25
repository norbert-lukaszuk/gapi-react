import React, { useState } from "react";
import "./App.css";

function App() {
  const [eventsArray, setEventsArray] = useState([]);
  const gapi = window.gapi;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";
  const onClickHanler = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("bam!"));
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() =>
          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: "startTime",
            })
            .then((response) => {
              const events = response.result.items;
              console.log("EVENTS: ", events);
              setEventsArray(events);
            })
        );
    });
  };
  const onClickLogoutHandler = () => {};
  return (
    <div className="App">
      {eventsArray.map((event) => {
        return (
          <div key={event.id}>
            <span>{event.start.dateTime.slice(0, 10)}</span>
            <p>{event.summary}</p>
          </div>
        );
      })}
      <button onClick={onClickHanler}>Get calendar</button>
      <button onClick={onClickLogoutHandler}>Logout</button>
    </div>
  );
}

export default App;
