import { AiFillPlusCircle } from "react-icons/ai";
import Navbar from "./Components/Navbar";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/fireBase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactCard from "./Components/ContactCard";
import AddAndUpdateContact from "./Components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import NotFoundContact from "./Components/NotFoundContact";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const conatctLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(conatctLists);
          return conatctLists
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);
  const filterContacts=(e)=>{
    const value=e.target.value;
    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const conatctLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filterdContacts=conatctLists.filter((contacts)=>
        contacts.name.toLowerCase().includes(value.toLowerCase())
      )
      setContacts(filterdContacts);
      return filterdContacts
    });
  }

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4 ">
        <Navbar />
        <div className="flex gap-2">
          <div className=" relative flex flex-grow  items-center">
            <FiSearch className="text-white text-3xl ml-1 absolute" />
            <input onChange={filterContacts}
              type="text"
              className="h-10 text-white pl-10 flex-grow rounded-md bg-transparent border border-white"
            />
          </div>

          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl cursor-pointer text-white "
          />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          { contacts.length <=0 ? (<NotFoundContact/>):contacts.map((contacts) => (
            <ContactCard key={contacts.id} contacts={contacts} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer
      position="top-center"
      />
    </>
  );
};

export default App;
