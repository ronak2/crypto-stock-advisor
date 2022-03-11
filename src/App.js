import React,{useState} from 'react';
import Navbar from './components/elements/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Crypto from './components/pages/Crypto';
import Stocks from './components/pages/Stocks';
import Forum from './components/pages/Forum';
import About from './components/pages/About';
import SignIn from './components/pages/SignIn';

// const express = require('express');
// const app = express();

// const publicPath = path.join(__dirname, '..', 'public');
// const port = process.env.PORT || 3000;
// app.use(express.static(publicPath));
// app.get('*', (req, res) => {
//    res.sendFile(path.join(publicPath, 'index.html'));
// });
// app.listen(port, () => {
//    console.log('Server is up!');
// });


function App() {
  // const [token, setToken] = useState();
  // if(!token) {
  //   return <SignIn setToken={setToken} />
  // }
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/crypto' element={<Crypto />} />
          <Route path='/stocks' element={<Stocks />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} /> 
        </Routes>
      </Router>
    </>
  );
}


export default App;
