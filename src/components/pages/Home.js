import React from 'react';
import { useResolvedPath } from 'react-router-dom';
import '../../App.css';
import '../styles/Page.css';
const { default: axios } = require('axios');


export default function SignIn() {
  axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=T&interval=5min&apikey=JBOW40V0V428S6ZM').then(function (response) {
    var firstDate;
    let timeSeriesData = response.data["Time Series (5min)"]
    let metaData = response.data["Meta Data"]
    console.log(metaData)
    for(var i in timeSeriesData){
        var key = i;
        firstDate = i;
    }
    let curSymbol = metaData["2. Symbol"]
    let curPrice = timeSeriesData[firstDate];
    let open = curPrice["1. open"]
    let high = curPrice["2. high"]
    let low = curPrice["3. low"]
    let close = curPrice["4. close"]
    let volume = curPrice["5. volume"] * open

    document.getElementById("topen").innerHTML = open;
    document.getElementById("thigh").innerHTML = high;
    document.getElementById("tlow").innerHTML = low;
    document.getElementById("tclose").innerHTML = close;
    document.getElementById("tvolume").innerHTML = volume;

  }).catch(function (error) {
      console.log(error);
  })
  
  axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=5min&apikey=JBOW40V0V428S6ZM').then(function (response) {
    var firstDate;
    let timeSeriesData = response.data["Time Series (5min)"]
    let metaData = response.data["Meta Data"]
    console.log(metaData)
    for(var i in timeSeriesData){
        var key = i;
        firstDate = i;
    }
    let curSymbol = metaData["2. Symbol"]
    let curPrice = timeSeriesData[firstDate];
    let open = curPrice["1. open"]
    let high = curPrice["2. high"]
    let low = curPrice["3. low"]
    let close = curPrice["4. close"]
    let volume = curPrice["5. volume"] * open

    document.getElementById("tsopen").innerHTML = open;
    document.getElementById("tshigh").innerHTML = high;
    document.getElementById("tslow").innerHTML = low;
    document.getElementById("tsclose").innerHTML = close;
    document.getElementById("tsvolume").innerHTML = volume;

  }).catch(function (error) {
      console.log(error);
  })

  axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether%2C%20solana&order=market_cap_desc&per_page=100&page=1&sparkline=false`).then(function (response) {
    let teprice = response.data[0].current_price;
    let tecap = response.data[0].market_cap;
    let solPrice = response.data[1].current_price;
    let solCap = response.data[1].market_cap;

    document.getElementById("usdtprice").innerHTML = teprice
    document.getElementById("usdtmarketcap").innerHTML = tecap
    document.getElementById("solprice").innerHTML = solPrice
    document.getElementById("solmarketcap").innerHTML = solCap


  }).catch(function (error) {
    console.log(error);
  })


  return (
    <div className='page-container'>
      <h1 >Welcome</h1>
      <br></br>
      <h3> Here's some information related to "User Preferences" </h3>
      <h5>Crypto</h5>
      <div className='container'>
        <section>
          <h5>USDT</h5>
          <p> Current Price: $<span id="usdtprice"></span> </p>
          <p> Market Cap: $<span id="usdtmarketcap"></span> </p>
        </section>
        <section>
          <h5>SOL</h5>
          <p> Current Price: $<span id="solprice"></span> </p>
          <p> Market Cap: $<span id="solmarketcap"></span> </p>
        </section>
      </div>
      <h5>Stocks</h5>
      <div className='container'>
        <section>
        <h5>T</h5>
          <p>Open: <span id="topen"></span></p>
          <p>High: <span id="thigh"></span></p>
          <p>Low: <span id="tlow"></span></p>
          <p>Close: <span id="tclose"></span></p>
          <p>Volume: <span id="tvolume"></span></p>
        </section>
       <section>
          <h5>TSLA</h5>
          <p>Open: <span id="tsopen"></span></p>
          <p>High: <span id="tshigh"></span></p>
          <p>Low: <span id="tslow"></span></p>
          <p>Close: <span id="tsclose"></span></p>
          <p>Volume: <span id="tsvolume"></span></p>
        </section>
      </div>

      <br></br>
      <h3>Suggestions</h3>
      <h5>Crypto</h5>
      <h5>Stocks</h5>

    </div>


  );
}