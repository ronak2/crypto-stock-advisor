import React, { useEffect, useState } from 'react';
import * as JSC from "jscharting";
import '../../App.css';
import '../styles/Stocks.css'
import StockTile from "../elements/StockTile"
import { Link } from 'react-router-dom';
import moment from 'moment';
const { default: axios } = require('axios');
JSC.defaults({ baseUrl: './js/jsc/' });

export default function Stocks() {

    function csvToSeries(text) {

        let dataAsJson = JSC.csv2Json(text);
        let datas = [];
        dataAsJson.forEach(function (row) {
            var date = new Date(row.time);
            var d = moment(date).format("yy-MM-DD");
            datas.push({ x: date, y: row.OBV / 10000 })
        });
        return [
            { name: '', points: datas }
        ];
    }

    function renderChart(series) {
        JSC.Chart('chartDiv', {
            title_label_text: 'Trendline for ' + stockName,
            annotations: [{
                label_text: 'Source: Alpha Vantage API HL_TRENDLINE',
                position: 'bottom left'
            }],
            legend_visible: false,
            xAxis_crosshair_enabled: true,
            defaultSeries_lastPoint_label_text: '<b>%seriesName</b>',
            defaultPoint_tooltip: '%seriesName <b>%yValue</b> time',
            xAxis_scale_type: "time",
            series: series

        });
    }

    const [stockName, setStock] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + stockName + '&interval=5min&apikey=JBOW40V0V428S6ZM').then(function (response) {
            var firstDate;
            let timeSeriesData = response.data["Time Series (5min)"]
            let metaData = response.data["Meta Data"]
            console.log(metaData)
            for (var i in timeSeriesData) {
                var key = i;
                firstDate = i;
            }
            let curSymbol = metaData["2. Symbol"]
            let curPrice = timeSeriesData[firstDate];
            let open = curPrice["1. open"]
            let high = curPrice["2. high"]
            let low = curPrice["3. low"]
            let close = curPrice["4. close"]
            let vol = curPrice["5. volume"] * open

            var stockListing = curSymbol + " -- Open: $" + open + " | High: $" + high + " | Low: $" + low + " | Total Volume: $" + vol;
            var stockList = document.getElementById("selectedList");
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(stockListing));
            stockList.appendChild(li);

        }).catch(function (error) {
            console.log(error);
        })

        axios.get('https://www.alphavantage.co/query?function=OBV&symbol=' + stockName + '&datatype=csv&interval=weekly&apikey=JBOW40V0V428S6ZM').then(function (response) {
            console.log("this is res:");
            let series = csvToSeries(response.data);
            console.log(series);
            renderChart(series);

        }).catch(function (error) {
            console.log(error);
        })

    }

    return (
        <div className='PageContainer'>

            <div className='whole-page'>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder='Search Stocks'
                        value={stockName}
                        onChange={(e) => setStock(e.target.value)}
                    />

                    <input type="submit" />
                </form>

                {/* stock search results */}
                <div id="chartDiv">

                </div>

                <div className='personlized-stocks'>
                    <h2>Your Stocks</h2>


                    <div className='personal-container'>
                        {/*<Link to="/t">*/}
                        <ul id="selectedList">
                            {/*<div className='tile'><StockTile className="tile" symbol={stockName}/></div>*/}
                        </ul>

                        {/*</Link>*/}
                        {/*<Link to="/f">*/}
                        {/*    <div className='tile'><StockTile className="tile" symbol={"F"}/></div>*/}
                        {/*</Link>*/}
                    </div>

                </div>

                <div className='trending-stocks'>

                    {/*<h2>Popular Stocks</h2>*/}
                    {/*<div className='trending-container'>*/}
                    {/*    <Link to="/tsla">*/}
                    {/*        <div className='tile'><StockTile className="tile" symbol={"TSLA"}/></div>*/}
                    {/*    </Link>*/}
                    {/*    <Link to="/ibm">*/}
                    {/*        <div className='tile'><StockTile className="tile" symbol={"IBM"}/></div>*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );

}