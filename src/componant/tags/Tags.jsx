import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addtag } from "../../services/userStrService";

function Tags({ Tags }) {
  const [tags, setTags] = useState(Tags);
  const [isTagInputDiv, setIsTagInputDiv] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");

  useEffect(() => {
    setTags(Tags || []);
  }, [Tags]);
  


function addTag() {
    const trimmedValue = tagInputValue.trim();
    if (trimmedValue !== "") {
      setTags((prevTags) => [...prevTags, trimmedValue]);
      setTagInputValue("");
      saveTag(trimmedValue);
      setIsTagInputDiv(false);
    }
  }

async function saveTag(tagInputValue) {
      if(!tagInputValue) {
        alert("enter something")
        return
      }
      const responce = await addtag(tagInputValue)
      if(!responce) {
        alert("error whle saving");
        return;
      }
      alert("tag added",tagInputValue)
  }

  return (
    <div>
      <div className="nav-tagTitle">
        <p>Tags</p>
        <img
          style={{ cursor: "pointer" }}
          onClick={() => setIsTagInputDiv((prev) => !prev)}
          src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965627/plus_ofocwp.png"
          alt=""
          width={15}
          height={15}
        />
      </div>
      {tags.length > 0 ? (
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
                onChange={(e) => setTagInputValue(e.target.value)}
                className="tag-input"
                type="text"
              />
              <img
                style={{ cursor: "pointer" }}
                onClick={addTag}
                src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965627/plus_ofocwp.png"
                alt=""
                width={15}
                height={15}
              />
            </div>
          )}
        </div>
      ) : (
        <div>there is no tags</div>
      )}
    </div>
  );
}

export default Tags;
