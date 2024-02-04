// import css
import "./AddressBook.css";
import { IAddressBookItem, Actions } from "../../types/addressbook";
import { useEffect, useState } from "react";

// interface IAddressBookProps {
//   data: IAddressBookItem[];
//   handleAction: (action: string) => void;
// }

const AddressBook = () => {

  // useState for address book data
  const [addressBookData, setAddressBookData] = useState<IAddressBookItem[]>(
    []
  );
  const [slicedData, setSlicedData] = useState<IAddressBookItem[]>([]);
  const [page, setPage] = useState<number>(1);

  const ITEMS_PER_PAGE = 3;

  const handleAction = (action: string) => {
    const totalPages = Math.ceil(addressBookData.length / ITEMS_PER_PAGE);

    let newPage = page;
    if (action === Actions.NEXT) {
      if (page + 1 <= totalPages) newPage++;
    } else {
      if (page - 1 >= 1) newPage--;
    }
    setPage(newPage);

    const start = (newPage - 1) * ITEMS_PER_PAGE;
    const end = newPage * ITEMS_PER_PAGE;

    setSlicedData(addressBookData.slice(start, end));
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // convert data to addressBookData
        const items: IAddressBookItem[] = data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            address: item.address.street,
            city: item.address.city,
            zip: item.address.zipcode,
            phone: item.phone,
            email: item.email,
          };
        });
        console.log(items);
        setAddressBookData(items);
        setSlicedData(items.slice(0, ITEMS_PER_PAGE));
      });
  }, []);

  return (
    <>
      <div>AddressBook</div>

      <div className="container">
        <button
          className="buttonWithBackground"
          onClick={() => handleAction(Actions.PREV)}
        >
          Prev
        </button>
        {slicedData.map((item) => (
          <div className="addressBookItem" key={item.id}>
            <div>ID:{item.id}</div>
            <div>NAME: {item.name}</div>
            <div>ADDRESS: {item.address}</div>
            <div>CITY: {item.city}</div>
            <div>ZIP: {item.zip}</div>
            <div>PHONE: {item.phone}</div>
            <div>EMAIL: {item.email}</div>
          </div>
        ))}
        <button
          className="buttonWithBackground"
          onClick={() => handleAction(Actions.NEXT)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default AddressBook;
