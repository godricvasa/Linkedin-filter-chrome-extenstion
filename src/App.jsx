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

  const addSite = () => {
    if (newSite && !blocklist.includes(newSite)) {
      setBlocklist([...blocklist, newSite]);
      setNewSite("");
    }
  };

  const removeSite = (site) => {
    setBlocklist(blocklist.filter((item) => item !== site));
  };

  return (
    <div className="App">
      <h1>Website Blocker</h1>
      <h3>Manage Sites</h3>

      {blocklist.length === 0 ? (
        <h3>No sites are blocked</h3>
      ) : (
        <h3>The blocked sites are:</h3>
      )}

      <ul>
        {blocklist.map((site, index) => (
          <li key={index}>
            {site}
            <button onClick={() => removeSite(site)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Add New Sites</h3>
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
