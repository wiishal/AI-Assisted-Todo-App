import "../style/expenses.css";
import ExpensesCard from "../componant/ExpensesCard";
import { useState } from "react";

function Expenses() {

  const [card,setCard]=useState(1)

  return (
    <div className="expenses-main">
      <h1 className="expenses-mainTitle">Expenses</h1>


      <div className="expenses-cardDiv">
          car
      </div>
    </div>
  );
}

export default Expenses;