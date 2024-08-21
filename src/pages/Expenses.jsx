import "../style/expenses.css";
import ExpensesCard from "../componant/ExpensesCard";
import axios from "axios";
import { useEffect, useState } from "react";
import AddSpendCard from "../componant/AddSpendCard";
function Expenses() {
  useEffect(() => {
   fetchSpends();
  }, []);
  function fetchSpends(){
     axios.get("http://localhost:3001/api/expenses").then((res) => {
       console.log(res.data);
       setCards(res.data.expenses);
     });
  }
  const [cards, setCards] = useState([]);
   const [isAddSpendCard, setIsAddSpendCard] = useState(true);
  
  return (
    <div className="expenses-main">
      <h1 className="expenses-mainTitle">Expenses</h1>

      <AddSpendCard fetchSpends={fetchSpends}></AddSpendCard>
      <div className="expenses-cardDiv">
        {cards.map((item) => (
          <ExpensesCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default Expenses;
