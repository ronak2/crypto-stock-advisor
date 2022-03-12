import React, { useState } from "react";
import '../styles/searchbar.css'



export default function SearchBar({data}){
    const [symbol, symbolState] = useState("")
    const filterSearch = (event) =>{
        const word = event.target.value;
        const newFilter = data.filter((value)=>{
            return value.Meta_Data.Symbol.toLowerCase().includes(word.toLowerCase());

        });
        symbolState(newFilter)
    }
    return(
        <div className="search-container">
            <div>
                <input className = "search-input" type = "text" placeholder="Search Stocks" onChange={filterSearch}></input> 
                <button className = "enter-button" type = "sumbit" onClick={filterSearch}>Search</button>
            </div>
            {symbol.length != 0 &&(
                <div className= "searchResults">
                    {symbol.map((value, key) => {
                        // return <a className ="searchItem"> {value.Meta_Data.Symbol} </a>
                        return <p>$<span id="coinprice"></span></p>
                    })}
                </div> 
            )

            }

        </div>



    );
}