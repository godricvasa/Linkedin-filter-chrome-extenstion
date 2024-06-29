import React, { useState } from "react";

const blocky = () => {
  //creating states to manage
  const [blocklist, setBlocklist] = new useState([]);

  return (
    <div>
      <h1>
        Welcome to SiteMan
        <span>
          <h3>manage the site that you visit</h3>
        </span>
      </h1>

      <form action="view.jsx" method="get">
        <label htmlFor="">To view the blocklist</label>
        <button type="submit">View blocklist</button>
      </form>
      <form action="create.jsx" method="post">
        <label htmlFor="">To add new block list </label>
      </form>
    </div>
  );
};

export default blocky;
