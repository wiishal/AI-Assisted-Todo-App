import { useParams } from "react-router-dom";

function ListDetails() {
  const { item } = useParams(); 

  return (
    <div>
      <h2>Details for {item}</h2>
     
      <p>This is the detail view for the {item} list.</p>
    </div>
  );
}

export default ListDetails;
