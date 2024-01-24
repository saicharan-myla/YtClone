import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { YT_SEARCH_API } from "../utils/constants";
const Head = () => {
  const [queryText, SetqueryText] = useState("");
  const [suggestions, Setsuggestions] = useState([]);
  const [visibleSuggestions, SetVisibleSuggestions] = useState(false);
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
    
  useEffect(()=> {
    const tout = setTimeout(()=>{getSearchSuggestions()},200);
    return ()=>clearTimeout(tout);
  }, [queryText]);


  const getSearchSuggestions = async ()=> {
    console.log("api-call"+ queryText)
    const data = await fetch(YT_SEARCH_API+queryText);
    const json = await data.json();
    // console.log(json[1]);
    Setsuggestions(json[1]);
  }

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII="
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="youtube-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
        <input
          className="w-1/2 border border-gray-400 p-2 rounded-l-full"
          type="text"
          value={queryText}
          onFocus={()=>SetVisibleSuggestions(true)}
          onBlur={()=>SetVisibleSuggestions(false)}
          onChange={(e)=> SetqueryText(e.target.value)}
        />

        <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
          🔍
        </button>
      </div>
      {visibleSuggestions && (<div className="w-1/2 p-2 m-2">
        {suggestions.map((s)=>(
                    <li  key= {s} className="list-none py-2 px-3 shadow-sm hover:bg-gray-100">{s}</li>

        ))}

      </div>)
}
      </div>

      <div className="col-span-1">
        <img
          className="h-8"
          alt="user"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
      </div>
      </div>
  );
};


export default Head;