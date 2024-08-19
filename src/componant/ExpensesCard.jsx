import { useState } from "react";
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
const apiUrl = import.meta.env.VITE_API_KEY;

function ExpensesCard({ item }) {
  const [spends, setSpends] = useState(item.expenses);
  const [spendInput, setSpendInput] = useState();
  const [totolExpense, setTotalExpense] = useState();

  async function getAIresult(){
     let arrofexpenses = promptForAI();
     console.log(arrofexpenses)
     const genAI = new GoogleGenerativeAI(apiUrl);
     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
     const prompt = `${arrofexpenses}. calculate total spending give responce in json  `;
     const result = await model.generateContent(prompt);
     const response = await result.response;
     const text = response.text();
     console.log(text)
    let expence = text.match(/"total_spending":\s*(\d+)/)[1];
     console.log(expence);
     if(expence){
        setTotalExpense(expence)
     }
  }
  function promptForAI() {
    let prompt = spends.join(', ',);
   return prompt
  }
  function addSpends() {
    setSpends([...spends, spendInput]);
  }

  function handleSpendInput(e) {
    setSpendInput(e.target.value);
  }
  return (
    <div className="expenses-card">
      <h4>card</h4>
      <h4>{totolExpense}</h4>
      <div className="expenses-cardContent">
        {spends.map((item) => (
          <p>{item}</p>
        ))}
      </div>
      <div className="expenses-cardInputs">
        <input
          value={spendInput}
          onChange={handleSpendInput}
          type="text"
          name=""
          id=""
        />
        <button onClick={() => addSpends()}>add</button>
        <button onClick={getAIresult}>calculateExpenses</button>
      </div>
    </div>
  );
}

export default ExpensesCard;
