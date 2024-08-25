import React, { useState, useEffect } from "react";
import "../style/listDetail.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Tags({ Tags = [] }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(Tags);
  }, [Tags]);

  const [isTagInputDiv, setIsTagInputDiv] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");

  function displayTagInputDiv() {
    setIsTagInputDiv((prev) => !prev);
  }

  function tagInputHandler(e) {
    setTagInputValue(e.target.value);
  }

 function addTag() {
   const trimmedValue = tagInputValue.trim();

   console.log(trimmedValue);

   if (trimmedValue !== "") {
     setTags((prevTags) => [...prevTags, trimmedValue]);
     setTagInputValue(""); 
     saveTag(trimmedValue); 
     setIsTagInputDiv(false); 
   }
 }
 function saveTag(tagInputValue) {
   axios
     .post(
       "http://localhost:3001/api/interface/addTag",
       { tag: tagInputValue },
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     )
     .then((res) => {
       console.log(res.data);
     })
     .catch((err) => {
       console.error(err);
     });
 }

  return (
    <div>
      <div className="nav-tagTitle">
        <p>Tags</p>
        <img
          onClick={displayTagInputDiv}
          src="/assets/plus.png"
          alt=""
          width={15}
          height={15}
        />
      </div>
      <div className="nav-tagitemDiv">
      
          {tags.map((tag, i) => (
            <div className="nav-tagitem" key={i}>
              <Link to={`/Tags/${tag}`}>{tag}</Link>
            </div>
          ))}

        {isTagInputDiv && (
          <div className="nav-tagInputDiv">
            <input
              value={tagInputValue}
              onChange={tagInputHandler}
              className="tag-input"
              type="text"
            />
            <img
              onClick={addTag}
              src="/assets/plus.png"
              alt=""
              width={15}
              height={15}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tags;
