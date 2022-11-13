import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "../components/ListItem";
export interface listData {
  id: number;
  text: string;
  edit: boolean;
}

const sampleListData2: listData[] = [
  {
    id: 0,
    text: "Workout",
    edit: false,
  },
  {
    id: 1,
    text: "Laundry",
    edit: false,
  },
  {
    id: 2,
    text: "Walk Dog",
    edit: false,
  },
];

const ListPage = () => {
  const [listItems, setListItems] = useState<listData[]>(sampleListData2);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<listData[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput != '') {
      const lowerSearch = searchInput.toLowerCase();
      const filteredListItems = listItems.filter((item: listData) => (item.text.toLowerCase().includes(lowerSearch)));
      setFilteredItems(filteredListItems);
    } else {
      setFilteredItems(null);
    }
  }, [searchInput]);

  const addItem = () => {
    setListItems((prev) => [
      ...prev,
      { id: listItems.length + 1, text: "", edit: true },
    ]);
  };

  const logoutHandler = () => {
    // navigate to login page
    navigate("/");
    // TO DO: prob also want to logout user (some global state that is then switched off)
    // maybe using local storage here???
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      <h1 className="text-3xl mt-10 mb-5">My To-Do List</h1>
      <button
        className="absolute right-4 top-4 border border-black rounded py-2 px-4"
        onClick={logoutHandler}
      >
        Logout
      </button>

      <div className="border border-black rounded-2xl w-1/2 flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center p-6">
          <input
            placeholder="search"
            className="border border-black rounded-xl pl-2"
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <button
            className="border border-black rounded p-y-2 px-4"
            onClick={addItem}
          >
            New
          </button>
        </div>

        <ul className="m-0 p-0 w-full mb-52">
          {searchInput && filteredItems
            ? filteredItems.map((item: listData) => (
                <ListItem
                  key={item.id}
                  id={item.id}
                  item={item}
                  listItems={listItems}
                  setListItems={setListItems}
                />
              ))
            : listItems.map((item: listData) => (
                <ListItem
                  key={item.id}
                  id={item.id}
                  item={item}
                  listItems={listItems}
                  setListItems={setListItems}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default ListPage;
