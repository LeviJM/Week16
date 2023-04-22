import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CommentPage from './components/CommentPage';
import CommunityPage from './components/CommunityPage';

const App = () => {
  const [count, setCount] = useState(0);
  const apiUrl = 'https://643ec4ae6c30feced832c180.mockapi.io/button/clicks/1';

  const fetchCounter = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCount(data.count);
    } catch (error) {
      console.error('Error fetching counter:', error);
    }
  };

  useEffect(() => {
    fetchCounter();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage count={count} setCount={setCount} />
        </Route>
        <Route path="/comment">
          <CommentPage clickCount={count} />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;