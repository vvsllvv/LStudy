import axios from 'axios';
import React, { useContext, useState } from 'react';
import AuthContext from "../context/AuthContext";
import { BASE_URL, DELETE, DOCUMENT } from '../../urls';

const DeleteDoc = ({ documentId, onSuccess }) => {
    const { auth, logout } = useContext(AuthContext);
    const handleDelete = async () => {
        try {
        await axios.delete(BASE_URL + DOCUMENT + `${documentId}/` + DELETE, {
                    headers: {
                    'Authorization': `Bearer ${auth.token}`
                    }
                });
        onSuccess?.();
        } catch (error) {
        console.error('Ошибка удаления:', error);
        }
    };

  return <button onClick={handleDelete} className="delete-btn">Удалить</button>;
};

export default DeleteDoc;