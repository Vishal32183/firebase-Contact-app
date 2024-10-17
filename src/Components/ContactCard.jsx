/* eslint-disable react/prop-types */
import { deleteDoc, doc } from "firebase/firestore"
import { HiOutlineUserCircle } from "react-icons/hi"
import { IoMdTrash } from "react-icons/io"
import { RiEditCircleLine } from "react-icons/ri"
import { db  } from "../config/fireBase"
import useDisclouse from "../hooks/useDisclouse"
import AddAndUpdateContact from "./AddAndUpdateContact"
import { toast } from "react-toastify"




// eslint-disable-next-line react/prop-types
const ContactCard = ({contacts}) => {
 const {isOpen,onClose,onOpen}=useDisclouse();
  

  const deleteContact= async(id)=>{
    try{
      const deleteRef = doc(db, "contacts",id);
      await deleteDoc(deleteRef, id);
      toast.success('Contact Deleted Successfullly')
    }
    catch(error){
      console.log(error);
      
    }
  }
  return (
   <>
    <div>
      <div key={contacts.id} className="bg-yellow flex items-center justify-between rounded-lg p-2">
     <div className="flex gap-1">
     < HiOutlineUserCircle className="text-orange text-5xl"/>
          <div className="">
            <h2 className="font-medium">{contacts.name}</h2>
            <p className="text-sm">{contacts.email}</p>
          </div>
     </div>
          <div className="flex text-3xl">
            <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
            <IoMdTrash onClick={()=>deleteContact(contacts.id)} className="text-orange cursor-pointer"/>
          </div>
        </div>
    </div>
  <AddAndUpdateContact  contacts={contacts}isUpdate isOpen={isOpen} onClose={onClose} />
   </>
  )
}

export default ContactCard
