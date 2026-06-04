import axios from "axios";
import React, { useContext, useState } from 'react';
import AuthContext from "../context/AuthContext";
import { BASE_URL, DOCUMENT } from "../../urls";
import '../../css/theme.css';


const DownloadDoc = ({ documentId }) => {
    const { auth } = useContext(AuthContext);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            const response = await axios.get(BASE_URL + DOCUMENT + documentId + `/download`,
                {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                }
            );
            
            const fileUrl = response.data;
        
            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', '');
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } catch (error) {
            console.error('Download failed:', error);
            alert(`Download failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <button className='download-btn' onClick={handleDownload} disabled={downloading}>
            {downloading ? 'Скачивается...' : 'Скачать'}
        </button>
    );
};

export default DownloadDoc;