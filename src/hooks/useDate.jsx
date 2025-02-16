import { useState, useEffect } from "react";

export function useDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    setDate(formattedDate);
  }, []); 

  return date;
}
