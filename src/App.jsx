// src/App.jsx
import React, { useState } from "react";

const App = () => {
  const [blocklist, setBlocklist] = useState([]);
  const [newSite, setNewSite] = useState("");

  // useEffect(() => {
  //   // Fetch the blocklist from Chrome storage when the component mounts
  //   chrome.storage.sync.get(["blocklist"], (result) => {
  //     if (result.blocklist) {
  //       setBlocklist(result.blocklist);
  //     }
  //   });
  // }, []);

  // const addSite = () => {
  //   const updatedBlocklist = [...blocklist, newSite];
  //   setBlocklist(updatedBlocklist);
  //   chrome.storage.sync.set({ blocklist: updatedBlocklist });
  //   setNewSite("");
  // };

  // const removeSite = (site) => {
  //   const updatedBlocklist = blocklist.filter((item) => item !== site);
  //   setBlocklist(updatedBlocklist);
  //   chrome.storage.sync.set({ blocklist: updatedBlocklist });
  // };

  //adding a site for blocking
  const addSite = () => {
    const siteToAdd = newSite;
    alert(siteToAdd);
    blocklist.push(siteToAdd);
    setNewSite("");
  };
  //removing a site from the blocked ones
  const removeSite = (site) => {
    let list = blocklist;
    let delIndex = list.indexOf(site);
    alert(delIndex);
    blocklist.splice(delIndex, 1);
    setBlocklist([...blocklist]);
  };

  return (
    <div className="App">
      <h1>Website Blocker</h1>
      {/* 
      listing all the sites that are currently in the blocklist */}
      <h3>Manage sites</h3>
      <ul>
        {blocklist.map((site, index) => (
          <li key={index}>
            {site}
            <button onClick={() => removeSite(site)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Add new Sites</h3>
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
