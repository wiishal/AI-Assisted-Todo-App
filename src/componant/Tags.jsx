import React, { useState, useEffect } from "react";

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
    if (tagInputValue.trim() !== "") {
      setTags((prevTags) => [...prevTags, tagInputValue.trim()]);
      setTagInputValue("");
      setIsTagInputDiv(false);
    }
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
        <ul>
          {tags.map((tag, i) => (
            <li className="nav-tagitem" key={i}>
              {tag} 
            </li>
          ))}
        </ul>
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
