import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
// import { robots } from "./robots";

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {return response.json();})
      .then((users) => {setRobots(users);});
      console.log(count);
  },[count]);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  return !robots.length ? (
    <h1 className="tc">Loading ...</h1>
  ) : (
    <div className="tc">
      <h1>RoboFriends</h1>
      <button onClick={()=>setCount(count+1)}>Click me</button>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  );
}

export default App;
