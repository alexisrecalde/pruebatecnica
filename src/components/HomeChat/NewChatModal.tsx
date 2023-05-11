import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import FormData from 'form-data';

import { ChatModalProps } from '../../types/chat';
import { postNewChat } from '../../queries/users/chats/chats.queries';
import { useAppSelector } from '../../redux/hooks';
import { getUser, setUserData } from '../../redux/userSlice';
import { setChatsData } from '../../redux/chatsSlice';
import { connect } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

function NewChatModal(chatModalProps: ChatModalProps) {
  const { isOpen, setIsOpen, setChatsData } = chatModalProps;

const rounter = useRouter()
 
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [newChatName, setNewChatName] = useState<string | null>();

  const data = new FormData();

   const userData = useAppSelector(getUser);
  const { token } = userData
 
  const createChat = () => {
    data.append('name', newChatName);
    data.append('image', selectedImage);

    postNewChat({data, token, setChatsData}).then(()=>rounter.reload())
    setIsOpen(false)
    resetForm()
  };

   const resetForm = () => {
    data.delete('name');
   data.delete('image');
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChatName(e.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal className="text-chatter-black" show={isOpen} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title>Agregar Nuevo Chat</Modal.Title>
      </Modal.Header>

      <Modal.Body className="justify-content-center text-center">
        <input
          type="text"
          placeholder="Ingrese Nombre y Apellido"
          className="form-control mb-3"
          onChange={handleNameChange}
        />
        <input
          type="file"
          placeholder="Subir foto de perfil"
          className="form-control"
          onChange={handleImageChange}
        />
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <button className="btn btn-green bg-chatter-blue text-white px-4" onClick={createChat}>
          Agregar
        </button>
        <button className="btn btn-secondary px-4" onClick={handleClose}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
}


const mapStateToProps = (dispatch: any) => ({
 
  setChatsData: (state: any) => dispatch(setChatsData(state))
  
})

export default connect(null, mapStateToProps)(NewChatModal);
