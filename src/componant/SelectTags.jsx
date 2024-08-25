import axios from "axios";
import { useEffect, useState } from "react";
import "../style/selectTags.css"
function SelectTags({tagStack, setTagStack }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  function fetch() {
    axios
      .get("http://localhost:3001/api/interface")
      .then((response) => {
        console.log(response.data.interface);
        setTags(response.data.interface[0].tags);
      })
      .catch((error) => {
        console.log(error);
      });
  }
function handleTagClick(tag) {
 
  if (!tagStack.includes(tag)) {
    setTagStack([...tagStack, tag]);
    console.log("Tag added:", tag);
  } else {
    console.log("Tag already present:", tag);
  }
}
  return (
    <div className="tag-itemDiv">
      {tags.map((tag, index) => (
        <p
          onClick={() => handleTagClick(tag)}
          key={index}
          className="tag-item"
        >
          {tag}
        </p>
      ))}
    </div>
  );

}
export default SelectTags;
