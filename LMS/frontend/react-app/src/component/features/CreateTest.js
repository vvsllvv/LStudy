import axios from "axios";
import { BASE_URL, TEST, CREATE } from "../../urls";
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

//      : (

const CreateTest = () => {
    const { themeId } = useParams();
    const [test, setTest] = useState({
        title: '',
        active: true,
        timeout: 120,
        questions: []
    });

    function createParagraph(id) {
        axios.post(BASE_URL + TEST + id + "/" + CREATE, test)
        .then()
        .catch((error) => {
            console.log(error);
            console.log(error.response);
        });
    }

    // return(
    //     <div className="test-form-container">
    //         <form onSubmit={test} className="test-form">

    //             <div className="form-group">
    //                 <label htmlFor="title">Тема теста</label>
    //                     <input type="text" name="title" value={test.title} onChange={test} placeholder="Тема теста"/>
    //                     <input type="text" name="" value={test.timeout} onChange={test} placeholder="Количество минут на тест"/>
    //             </div>

    //             <button type="submit">Создать тест</button>
    //         </form>
    //     </div>
    // );

}

export default CreateTest;