import React, { useState } from "react";
import "../styles/Tile.css"

export default function StockTile({symbol}){
    return(
        <div className = "tile-container">
            <div className= "heading">
                <h3>{symbol}</h3>
            </div>
            
        </div>
    );
}