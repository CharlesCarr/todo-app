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
  console.log(id);

  const removeItem = (itemState: listData) => {
    const filteredItems = listItems.filter(
      (item: listData) => item.text !== itemState.text
    );
    setListItems(filteredItems);
  };

  const saveEditHandler = () => {
    // local list item update
    setItemState((prev) => ({ ...prev, edit: false }));
    // full list update
    const updatedList = listItems.map((item: listData) => {
      if (item.id === itemState.id) {
        item.text = itemState.text;
      }
      return item;
    });
    setListItems(updatedList);
  };

  return (
    <li className="w-full border-b border-black flex justify-between items-center">
      {itemState.edit ? (
        <input
          value={itemState.text}
          onChange={(e) =>
            setItemState((prev) => ({ ...prev, text: e.target.value }))
          }
          className="border border-black pl-2 ml-4"
        />
      ) : (
        <p className="pl-4">{itemState.text}</p>
      )}

      <div className="w-20 flex justify-between items-center pr-4 py-2">
        {itemState.edit ? (
          <button
            onClick={saveEditHandler}
            className="border border-black py-1 px-2"
          >
            Save
          </button>
        ) : (
          <>
            <FaPencilAlt
              className="w-4 h-4 cursor-pointer"
              onClick={() => setItemState((prev) => ({ ...prev, edit: true }))}
            />

            <IoMdTrash
              className="w-4 h-4 cursor-pointer"
              onClick={() => removeItem(itemState)}
            />
          </>
        )}
      </div>
    </li>
  );
};

export default ListItem;
