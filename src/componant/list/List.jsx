import { useState } from "react";

export default function List({ listSelect, setListSelect }) {
  const [listState, setListState] = useState({ personal: false, work: false });

  function addtoList(item) {
    if (!item) return false;
    const isItemPresent = listSelect.findIndex((listItem) => listItem == item);

    if (isItemPresent == -1) {
      setListSelect((prev) => [...prev, item]);
      setListState((prev) => ({ ...prev, [item]: !prev[item] }));
    } else {
      const updatedList = listSelect.filter((listItem) => listItem !== item);
      setListSelect(updatedList);
      setListState((prev) => ({ ...prev, [item]: !prev[item] }));
    }
  }
  console.log(listSelect)

  return (
    <div className="addtask-list">
      <label htmlFor="">list</label>
      <div className="addtask-listoption">
        <div className="addtask-listItem">
          <img
            onClick={() => addtoList("personal")}
            src={
              listState.personal
                ? "/assets/check-box-with-check-sign.png"
                : "/assets/check-box-empty.png"
            }
            alt=""
            width={15}
            height={15}
          />
          <p>Personal</p>
        </div>
        <div className="addtask-listItem">
          <img
            onClick={() => addtoList("work")}
            src={
              listState.work
                ? "/assets/check-box-with-check-sign.png"
                : "/assets/check-box-empty.png"
            }
            alt=""
            width={15}
            height={15}
          />
          <p>Work</p>
        </div>
      </div>
    </div>
  );
}