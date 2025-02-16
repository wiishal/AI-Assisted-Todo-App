import { useState, useEffect } from "react";

export function useFormatDate() {
  const [formatDate, setFormatDate] = useState("");
  const [formatDateTomorrow, setFormatDateTomorrow] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const tomorrow = new Date(today); 
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tyear = tomorrow.getFullYear();
    const tmonth = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const tday = String(tomorrow.getDate()).padStart(2, "0");
    const formattedDatetomorrow = `${tyear}-${tmonth}-${tday}`;

    setFormatDate(formattedDate);
    setFormatDateTomorrow(formattedDatetomorrow);

  }, []);

  return { formatDate, formatDateTomorrow };
}
