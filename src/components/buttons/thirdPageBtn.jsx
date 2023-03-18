import React from "react";
import { Link } from "react-router-dom";

function ThirdPageBtn(){
    return(
        <Link to={'/uploadPage'}>
            <button className="third--btn"> Upload to Ipfs</button>
        </Link>
    )
}

export default ThirdPageBtn;