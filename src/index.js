import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Challenge1 from  './challanges/challenge1';
import Challenge2 from  './challanges/challenge2';
import Challenge3 from  './challanges/challenge3';
import Challenge4 from  './challanges/challenge4';
import Challenge5 from  './challanges/challenge5';
import Challenge6 from  './challanges/challenge6';
import Home from  './challanges/home';
import './index.css';
import './chalenges.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Challenge7 from './challanges/challenge7';
import {Results} from './challanges/challenge7';
import Challenge8 from './challanges/challenge8';
import {Employee,Ids} from './challanges/challenge8';
import Challenge9 from './challanges/challenge9';
import Challenge10 from './challanges/challenge10';
import Pra11 from './challanges/pra11';


export function Application() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}>
          <Route path="challenge1" element={<Challenge1 />} />
          <Route path="challenge2" element={<Challenge2 />} />
          <Route path="challenge3" element={<Challenge3 />} />
          <Route path="challenge4" element={<Challenge4 />} />
          <Route path="challenge5" element={<Challenge5 />} />
          <Route path="challenge6" element={<Challenge6 />} />
          <Route path="challenge7" element={<Challenge7 />} />
          <Route path="challenge8" element={<Challenge8 />} />
          <Route path="challenge9" element={<Challenge9 />} />
          <Route path="challenge10" element={<Challenge10 />} />
          <Route path="pra11" element={<Pra11 />} />
          <Route path="results" element={<Results />} />
          <Route path="/:name" element={<Employee />} />
        <Route path="/Idss/:id" element={<Ids />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Application />);