import { useState, useMemo } from "react";

const SearchItems = [
  "Apple",
  "Banana",
  "Carrot",
  "Dinosaur toy",
  "Eiffel Tower",
  "Football",
  "Guitar",
  "Hiking boots",
  "Ice cream",
  "Jelly beans",
  "Kangaroo plush",
  "Laptop",
  "Mountain bike",
  "Notebook",
  "Orange juice",
  "Pizza",
  "Quilted blanket",
  "Running shoes",
  "Sunglasses",
  "Tennis racket",
  "Umbrella",
  "Video game",
  "Wireless earbuds",
  "Xylophone",
  "Yoga mat",
  "Zebra print pillow",
  "Avocado toast",
  "Basketball",
  "Coffee mug",
  "Drum set",
  "Electric scooter",
  "Fishing rod",
  "Garden gnome",
  "Hamburger",
  "Indoor plant",
  "Jigsaw puzzle",
  "Kitchen knife",
  "Lemonade",
  "Microphone",
  "Night lamp",
  "Ocean painting",
  "Portable charger",
  "Quinoa salad",
  "Robot vacuum",
  "Smartwatch",
  "Table lamp",
  "Ukulele",
  "Vegetable peeler",
  "Waffle maker",
  "X-ray film",
  "Yellow raincoat",
  "Zucchini noodles"
];

function App() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [isExactMatch, setIsExactMatch] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Filter items
  const FilteredItems = useMemo(() => {

    return SearchItems.filter((item) => {

      const itemStr = item.trim();

      // Returns everything when input is empty
      if (searchValue.trim() === "") return true;
  
      const searchStr = isCaseSensitive ? searchValue.trim() : searchValue.trim().toLowerCase();
      const itemToCheck = isCaseSensitive ? itemStr : itemStr.toLowerCase();
  
      // returns exact match 
      if (isExactMatch) return searchStr === itemToCheck;
      
      return itemToCheck.startsWith(searchStr) || itemToCheck.includes(searchStr);

    });
  }, [searchValue, isCaseSensitive, isExactMatch]); // Runs only when any of these values change


  return (
    <div className="con">
      <label htmlFor="search">Search:</label>{" "}
      <input 
        id="search" 
        type="text" 
        onChange={handleSearch}
        value={searchValue}
      />
      <br />
      Filters:{" "}
      <label>
        <input 
          type="checkbox" 
          onChange={(e) => setIsCaseSensitive(e.target.checked)}
          checked={isCaseSensitive} 
        />
        Case-Sensitive
      </label>{" "}
      <label>
        <input 
          type="checkbox" 
          onChange={(e) => setIsExactMatch(e.target.checked)}
          checked={isExactMatch} 
        />
        Exact Match
      </label>
      <br /><br />
      <ul className="list-group">
        {FilteredItems.length > 0 ? (
          FilteredItems.map((item, index) => (
            <li
              key={index}
              className="list-group-item"
            >{item}</li>
          ))
        ) : (
          // If no results were found
          <li className="list-group-item">No results were found</li>
        )}
      </ul>
    </div>
  );
}

export default App;
