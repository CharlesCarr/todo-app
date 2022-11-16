import { useState } from "react";
import { listData } from "../pages/ListPage";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";

interface ListItemProps {
  id: number;
  item: listData;
  listItems: listData[];
  setListItems: React.Dispatch<React.SetStateAction<listData[]>>;
}

const ListItem = ({ id, item, listItems, setListItems }: ListItemProps) => {
  const [itemState, setItemState] = useState(item);

  const removeItem = (itemState: listData) => {
    const filteredItems = listItems.filter(
      (item: listData) => item.text !== itemState.text
    );
    setListItems(filteredItems);
    localStorage.setItem("list", JSON.stringify(filteredItems));
  };

  const saveEditHandler = () => {
    // local list item update
    setItemState((prev) => ({ ...prev, edit: false }));
    // full list update
    const updatedList = listItems.map((item: listData) => {
      if (item.id === itemState.id) {
        item.text = itemState.text;
        item.edit = false;
      }
      return item;
    });
    setListItems(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
  };

  return (
    <li className="w-full border-b border-white flex justify-between items-center px-4 min-h-[50px]">
      {itemState.edit ? (
        <input
          value={itemState.text}
          // need to have check for character count
          onChange={(e) =>
            setItemState((prev) => ({ ...prev, text: e.target.value }))
          }
          className="border border-white pl-2 ml-4 bg-[#0b131b] outline-none"
        />
      ) : (
        <p className="pl-4">{itemState.text}</p>
      )}

      <div className="w-20 flex justify-between items-center pr-4 py-2">
        {itemState.edit ? (
          <button
            onClick={saveEditHandler}
            className="border border-white py-1 px-2"
          >
            Save
          </button>
        ) : (
          <>
            <FaPencilAlt
              className="w-5 h-5 cursor-pointer"
              onClick={() => setItemState((prev) => ({ ...prev, edit: true }))}
            />

            <IoMdTrash
              className="w-5 h-5 cursor-pointer"
              onClick={() => removeItem(itemState)}
            />
          </>
        )}
      </div>
    </li>
  );
};

export default ListItem;
