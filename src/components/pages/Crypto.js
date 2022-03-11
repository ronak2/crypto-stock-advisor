import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../../App.css';
import '../styles/Crypto.css';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);
const { default: axios } = require('axios');
//var Chart = require('chart.js');



//'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1590382069&to=1645746572'

export default function Crypto() {

  var myChart;
  var error_helper = 0;
  console.log(myChart);
  const [cryptoName, setCrypto] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    var yourList = document.getElementById("selectedList");
    var items = yourList.getElementsByTagName("li");
    // for(var i = 0; i < items.length; ++i)
    // {
    //   var value = items[i].id;

    //   if ( '#' + value + `:contains(${cryptoName}+' --')`.length != 0 ){ 
    //       yourList.removeChild(items[i+1]);
    //   }
    // }

    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoName}&order=market_cap_desc&per_page=100&page=1&sparkline=false`).then(function (response) {
    let coinp = response.data[0].current_price;
    let coinm = response.data[0].market_cap;
    let coinr = response.data[0].market_cap_rank;
    let coinv = response.data[0].total_volume;

    

    var finalcoin = cryptoName + " -- Price: $" + coinp + " | Market Cap: $" + coinm + " | Overall Rank: " + coinr + " | Total Volume: $" + coinv
    var coinList = document.getElementById("selectedList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(finalcoin));
    // if(coinList.getElementsByTagName("li").length == 2 && error_helper ==0)
    // {
    //   error_helper = 2;
    //   coinList.removeChild(coinList.firstElementChild);
    // }
    coinList.appendChild(li);

    

    }).catch(function (error) {
      console.log(error);
    })
    var new_date, day, month, year, formatted_date;
    var priceArray = []
    var currentUNIXtime = Math.floor(Date.now() / 1000)
    axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart/range?vs_currency=usd&from=1590382069&to=${currentUNIXtime}`).then(function (response) {
      var chartData = response.data.prices;
      for(var i = 0; i < chartData.length; i++)
      {
        new_date = new Date((chartData[i][0]))
        day = new_date.getDate()
        month = new_date.getMonth()
        year = new_date.getFullYear()
        formatted_date = year+"-"+month+"-"+day

        chartData[i][0] = formatted_date
        priceArray[i] = chartData[i][1]

      }
      console.log(chartData[1][0])
      //var canvas = document.createElement("canvas");
  
      // var finalcoin = cryptoName + " -- Price: $" + coinp + " | Market Cap: $" + coinm + " | Overall Rank: " + coinr + " | Total Volume: $" + coinv
      var coinList = document.getElementById("selectedList");
      var li = document.createElement("li");
      var canv = document.createElement("canvas");
      canv.setAttribute('id',cryptoName+'-line-chart');
      console.log(canv.id)
      canv.width = 600;
      canv.height = 300;
      if(myChart != undefined)
      {
        myChart.destroy()
      }
      console.log(myChart)
      li.appendChild(canv);
      myChart = new Chart(document.getElementById(canv.id), {
        type: 'line',
        data: {
          labels: priceArray,
          datasets: [
            {
              label: " "+cryptoName+ " price chart ($usd)",
              borderColor: "goldenrod",
              backgroundColor: "goldenrod",
              data: chartData
            }
          ]
        },
        options: {
          legend: { display: false },
          scales: {
            x: {
              min: '2020-04-26'
            }
          },
          title: {
            display: true,
            text: cryptoName + 'price chart'
          }
        }
      });
      coinList.appendChild(li);

  
      }).catch(function (error) {
        console.log(error);
      })
    
    //alert(`The name you entered was: ${cryptoName}`)
  }
  
  var pholder = 'bitcoin%2C%20ethereum%2C%20cardano%2C%20ripple%2C%20solana'

  // coingecko api called straight from here without using our server
  axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${pholder}&order=market_cap_desc&per_page=100&page=1&sparkline=false`).then(function (response) {
    let btcp = response.data[0].current_price;
    let btcm = response.data[0].market_cap;
    let ethp = response.data[1].current_price;
    let ethm = response.data[1].market_cap;

    document.getElementById("btcprice").innerHTML = btcp
    document.getElementById("btcmarketcap").innerHTML = btcm
    document.getElementById("ethprice").innerHTML = ethp
    document.getElementById("ethmarketcap").innerHTML = ethm


  }).catch(function (error) {
    console.log(error);
  })

 
  return (
    <html>
      <head>

      </head>
      <body>
        <div className='PageContainer'>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
          
          <div className='whole-page'>

            <form onSubmit={handleSubmit}>
              
              <input 
                type="text"
                placeholder='Enter Crypto' 
                value={cryptoName}
                onChange={(e) => setCrypto(e.target.value)}
              />
              
              <input type="submit" />
            </form>
            
            <div className='personlized-stocks'>
              <h2>Your Crypto</h2>
              <ul id="selectedList" style={{ listStyleType: "none"}}>

              </ul>

            </div>

            <div className='trending-stocks'>
              <br></br>
              <h2>Today's Trending Crypto</h2>
            
            <p> Current Price of Bitcoin: $<span id="btcprice"></span> </p>
            <p>     Bitcoin Market Cap: $<span id="btcmarketcap"></span> </p>
            <br></br>
            <p> Current Price of Ethereum: $<span id="ethprice"></span> </p>
            <p>     Ethereum Market Cap: $<span id="ethmarketcap"></span> </p>

            </div>
          </div>
        </div>
      </body>
    </html>
    
    );
}
