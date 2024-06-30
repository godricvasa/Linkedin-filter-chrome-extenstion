import React, { useState, useEffect } from "react";

const App = () => {
  const [blocklist, setBlocklist] = useState([]);
  const [newSite, setNewSite] = useState("");

  // Load blocklist from storage on component mount
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.sync.get(["blocklist"], (result) => {
        if (result.blocklist) {
          setBlocklist(result.blocklist);
        }
      });
    }
  }, []);

  // Save blocklist to storage whenever it changes
  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.sync.set({ blocklist });
    }
  }, [blocklist]);

  //add new sites to storage
  const addSite = () => {
    if (newSite && !blocklist.includes(newSite)) {
      setBlocklist([...blocklist, newSite]);
      setNewSite("");
    }
  };

  //removing blocked site
  const removeSite = (site) => {
    setBlocklist(blocklist.filter((item) => item !== site));
  };

  return (
    <div className="App">
      <h1>SiteMan-Website Blocker</h1>
      <h3>Blocked Sites</h3>

      {blocklist.length === 0 ? (
        <h5>No sites are blocked</h5>
      ) : (
        <h5>The blocked sites are:</h5>
      )}

      <ul>
        {blocklist.map((site, index) => (
          <li key={index}>
            {site}
            <button className="butto" onClick={() => removeSite(site)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h3>Add a site to blocklist</h3>
      <input
        type="text"
        value={newSite}
        onChange={(e) => setNewSite(e.target.value)}
      />
      <button onClick={addSite}>Add</button>
    </div>
  );
};

export default App;
