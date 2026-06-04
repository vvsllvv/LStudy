import axios from 'axios';
import React, { useContext, useState } from 'react';
import AuthContext from "../context/AuthContext";
import { BASE_URL, THEME } from '../../urls';
import '../../css/theme.css';

const UploadDoc = ({ themeId, onSuccess }) => {
    const { auth, logout } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Максимальный размер: 10MБ');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      await axios.post(BASE_URL + THEME + `${themeId}/upload`, formData, {
        headers: { 'Authorization': `Bearer ${auth.token}` },
      });

      alert('Документ загружен.');
      setFile(null);
      setTitle('');
      onSuccess?.();
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='doc-data'>
    <form onSubmit={handleSubmit}>
      <input className='doc-form'
        type="text"
        placeholder="Название документа"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input className='upload-doc'
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Загрузка...' : 'Загрузить документ'}
      </button>
    </form></div>
  );
};

export default UploadDoc;