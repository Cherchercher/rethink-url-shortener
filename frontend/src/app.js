import React, { useState } from "react";
import axios from "axios";
import "./app.css";

function App() {
  const [destinationURL, setDestinationURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [errors, setErrors] = useState([]);

  const getValidUrl = (url = "") => {
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, "");

    if (/^(:\/\/)/.test(newUrl)) {
      return `http${newUrl}`;
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
      return `http://${newUrl}`;
    }
    return newUrl;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1337/shortLink/create", {
        destinationURL: destinationURL,
      })
      .then((res) => {
        return setShortURL(res.data.shortened);
      })
      .catch((err) => {
        setErrors([err.response.data]);
      });
  };

  return (
    <div className="container">
      <form className="form">
        <ul className="errors">
          {errors.map((err, i) => (
            <li key={`error-${i}`}>{err}</li>
          ))}
        </ul>
        <label>
          <input
            type="text"
            className="input"
            value={destinationURL}
            placeholder={"https://"}
            onChange={(e) => setDestinationURL(getValidUrl(e.target.value))}
          />
        </label>
        <button className="submit" onClick={(e) => handleSubmit(e)}>
          Get Short Link
        </button>
      </form>
      <div className="container-short-url">
        <p>
          <strong>Short Link: </strong>
          <a href={shortURL}>{shortURL}</a>
          {shortURL && (
            <button
              className="copyToClip"
              onClick={() => navigator.clipboard.writeText(shortURL)}
            >
              {" "}
              copy to clipboard
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

export default App;
