import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {db} from "../config/fireBase";
import { toast } from "react-toastify";
import * as Yup from 'yup'
const contactSchemaValidation= Yup.object().shape({
  name:Yup.string().required('Name is Required'),
  email:Yup.string().required('Email  is Required'),
})
const AddAndUpdateContact = ({ isOpen, onClose,isUpdate,contacts }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose()
      toast.success('Contact Added SucessFully!')
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact,id) => {
    try {
      const contactRef = doc(db, "contacts",id);
      await updateDoc(contactRef, contact);
      onClose()
      toast.success('Contact Updated  SucessFully!')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={contactSchemaValidation}
          initialValues= {isUpdate?{
           name:contacts.name,
           email:contacts.email
          }:{
            name:'',
            email:''
          }}
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContact(values,contacts.id):
            addContact(values)
          }}
        >
          <Form>
            <div className="flex flex-col gap-1">
              <label className="text-lg" htmlFor="name">
                Name
              </label>
              <Field name="name" className="h-10 border" />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-lg" htmlFor="email">
                Email
              </label>
              <Field name="email" className="h-10 border" />
              <div  className="text-red-500 text-sm">
                <ErrorMessage name="email"/>
              </div>
            </div>
            <button className="bg-orange px-3 py-2  border mt-2">
            {isUpdate ? 'update Contacts' :'addContacts'} 
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
