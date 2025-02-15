import { useEffect, useState } from "react";
import "../style/selectTags.css"
import { getUserTaskStr } from "../../services/userStrService";

function SelectTags({tagStack, setTagStack }) {
  const [tags, setTags] = useState([]);
  const [isLoading,setIsLoading] = useState(true)

 useEffect(() => {
    async function getStr() {
      const Str = await getUserTaskStr()
      if (Str) {
        setTags(Str.userStr.tags);
        setIsLoading(false);
        return;
      }
       setTags([]);
       setIsLoading(false)
    }
    getStr()
  }, []);

function handleTagClick(tag) {
 
   if (!tag) return false;
   const isItemPresent = tagStack.findIndex((Item) => Item == tag);

   if (isItemPresent == -1) {
     setTagStack((prev) => [...prev, tag]);
     
   } else {
     const updatedList = tagStack.filter((Item) => Item !== tag);
     setTagStack(updatedList);
     
   }
}
  console.log(tagStack)
  if (isLoading) return <div className="loading-div">Loadiing...</div>
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
