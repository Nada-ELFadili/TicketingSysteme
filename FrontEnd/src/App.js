import './App.css';
//Routing system elements
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes/Routes';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes />
      </div>
    </Router>
  );
}

export default App;
