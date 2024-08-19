import "../style/expenses.css";
import ExpensesCard from "../componant/ExpensesCard";
import axios from "axios";
import { useEffect, useState } from "react";

function Expenses() {
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/expenses")
      .then((res) =>
        
     {   console.log(res.data)
        setCards(res.data.expenses);}

    );
  }, []);
  const [cards, setCards] = useState([]);

  return (
    <div className="expenses-main">
      <h1 className="expenses-mainTitle">Expenses</h1>

      <div className="expenses-cardDiv">
        {cards.map((item)=>(
          <ExpensesCard item={item}/>
        ))}
      
      </div>
    </div>
  );
}

export default Expenses;
