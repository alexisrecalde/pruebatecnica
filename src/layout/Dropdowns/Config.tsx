import { useState } from 'react';
import ConfirmDialog from '../../components/ConfirmDialog';
import NewChatModal from '../../components/HomeChat/NewChatModal';
import { DropDownProps } from '../../types/chat';
import { deleteUser } from '../../queries/users/users.queries';
import { useRouter } from 'next/dist/client/router';

function ConfigDropdown(dropDownProps: DropDownProps) {
  const { getChatsData, userData, isOpen, setConfigOpen } = dropDownProps;
  
  console.log();
const router = useRouter()

  const [delDialogIsOpen, setDelDialogIsOpen] = useState(false);
  const [newChatModalIsOpen, setNewChatModalIsOpen] = useState(false);

 const {userId, token} = userData
  

  const handleDeleteUser = () => {
    setDelDialogIsOpen(true);
  };

  const handleNewChatModal = () => {
    setNewChatModalIsOpen(true);
    setConfigOpen(false)
  };

  const handleConfirmDelete = () => {
    /* 
      TODO: 
      1. Get current user data 
      2. Delete user 
    */
    
    deleteUser(token)
    .then(()=> router.push("./"))
  };

  return (
    <div className={isOpen ? 'configDropdown scale1' : 'configDropdown'}>
      <ul>
        <li onClick={handleNewChatModal}>
          <div>Nuevo chat</div>
        </li>
        <li onClick={handleDeleteUser}>
          <div>Eliminar cuenta</div>
        </li>
      </ul>

      <NewChatModal
        isOpen={newChatModalIsOpen}
        setIsOpen={setNewChatModalIsOpen}
        userData={userData}
        getChatsData={getChatsData}
      />
      <ConfirmDialog
        title="Eliminar Usuario"
        text="¿Está seguro que desea eliminar la cuenta?"
        isOpen={delDialogIsOpen}
        handleCancel={setDelDialogIsOpen}
        handleOk={handleConfirmDelete}
      />
    </div>
  );
}

export default ConfigDropdown;
