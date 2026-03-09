import axios from "axios";
import { BASE_URL, PARAGRAPH, CREATE } from "../../urls";
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateParagraoh = () => {
    const { themeId } = useParams();
    const [paragraph, setParagraph] = useState({
        title: '',
        content: ''
    });

    function createParagraph(id) {
        axios.post(BASE_URL + PARAGRAPH + id + "/" + CREATE, paragraph)
        .then()
        .catch((error) => {
            console.log(error);
            console.log(error.response);
        });
    }

     const handleChange = (e) => {
        const { name, value } = e.target;
        setParagraph(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return(
        <div className="create-paragraph">
            <h2>Создание новой главы</h2>
            <form id="paragraph-form" action={() => createParagraph(themeId)}>
                <label>
                    Название:
                    <input type="text" name="title" value={paragraph.title} onChange={handleChange} placeholder="Название главы"/>
                </label>
                <label>
                    Содержание:
                    <textarea
                        name="content"
                        value={paragraph.content} 
                        onChange={handleChange}
                        required
                        rows="5"
                        cols="40"
                    />
                </label>

                <button type="submit">Создать</button>
            </form>
        </div>
    );

}

export default CreateParagraoh;