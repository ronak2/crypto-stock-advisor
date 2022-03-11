import React from 'react';
import '../../App.css';

export default function About() {
  return(
    <div className='PageContainer'> 
      <div class="about-section">
    <h1>Overview</h1>
    <p>Our application allows you to search, select, and view your favorite cryptocurrencies and stocks.</p>
    <p>Real-time price action and statistics are aggregated and displayed from trusted APIs.</p>


  </div>
  <br></br>
  <h1 >Our Team</h1>
  <div class="row">
    <div class="column">
      <div class="card">
        <div class="container">
          <h3>•   Ronak Trivedi</h3>
          <h3>•   Patryk Konieczny</h3>
          <h3>•   Maddy Wikstrom</h3>
          <h3>•   Adrian Kmita</h3>
          
        </div>
      </div>
    </div>

    
    
  </div>
</div>

    
  );
}