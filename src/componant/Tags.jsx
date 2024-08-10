import { useState } from "react";

function Tags(){
    const [tags, setTags] = useState(["tags1", "tag2"]);
    const [istagInputDiv, setIstagInputDiv]=useState(false)
    const [tagInputValue , setTagInputValue] = useState()
    function displayTagInputDiv(){
        setIstagInputDiv(prev => !prev)
    }
    function tagInputHandler(e){
        setTagInputValue(e.target.value);
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
          <ul key={"tag"}>
            {tags.map((tag, i) => (
              <li className="nav-tagitem" key={i}>
                {tag}
              </li>
            ))}
          </ul>
          {istagInputDiv != false ? (
            <div className="nav-tagInputDiv">
              <input
                value={tagInputValue}
                onChange={() => tagInputHandler}
                className="tag-input"
                type="text"
              />
              <img
                onClick={displayTagInputDiv}
                src="/assets/plus.png"
                alt=""
                width={15}
                height={15}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
}

export default Tags