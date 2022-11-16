import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItem from "../components/ListItem";
import { AiOutlineSearch } from "react-icons/ai";
import { LoginContext } from "../App";
import { v4 as uuidv4 } from "uuid";
export interface listData {
  id: string;
  text: string;
  edit: boolean;
}

const defaultData: listData[] = [
  {
    id: uuidv4(),
    text: "Workout",
    edit: false,
  },
  {
    id: uuidv4(),
    text: "Pay bills",
    edit: false,
  },
  {
    id: uuidv4(),
    text: "Get lunch",
    edit: false,
  },
];

const ListPage = () => {
  const [listItems, setListItems] = useState<listData[]>(() => {
    // getting stored value from local storage
    const saved = localStorage.getItem("list");
    const initialValue = saved ? JSON.parse(saved) : null;
    return initialValue || defaultData;
  });
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<listData[] | null>(null);
  const navigate = useNavigate();
  const { setLoginStatus } = useContext(LoginContext);

  useEffect(() => {
    if (searchInput !== "") {
      const lowerSearch = searchInput.toLowerCase();
      const filteredListItems = listItems.filter((item: listData) =>
        item.text.toLowerCase().includes(lowerSearch)
      );
      setFilteredItems(filteredListItems);
    } else {
      setFilteredItems(null);
    }
  }, [searchInput]);

  const addItem = () => {
    setListItems((prev) => [...prev, { id: uuidv4(), text: "", edit: true }]);
  };

  const logoutHandler = () => {
    // TO DO: prob also want to logout user (some global state that is then switched off)
    setLoginStatus("logged out");
    // navigate to login page
    navigate("/login");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative py-20">
      <h1 className="text-5xl mt-10 mb-8">My To-Do List</h1>
      <button
        className="absolute right-6 top-6 border border-white rounded py-2 px-4 hover:bg-white hover:text-[#0b131b] hover:shadow-2xl hover:duration-150"
        onClick={logoutHandler}
      >
        Logout
      </button>

      <div className="border border-white rounded-2xl w-5/6 md:w-3/4 xl:w-1/2 flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center p-6 border-b border-white">
          <div className="flex justify-start items-center border border-white rounded-full px-2">
            <AiOutlineSearch className="pl-4 w-10 h-10 mr-2" />
            <input
              placeholder="search"
              className="pl-2 w-24 sm:w-full border-none outline-none bg-[#0b131b] placeholder:text-[#398ebb] placeholder:font-light"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <button
            className="border border-white rounded-lg py-2 px-4 sm:px-6 bg-[#398ebb] hover:bg-white hover:text-[#0b131b] hover:shadow-2xl hover:duration-150"
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
