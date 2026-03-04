import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BASE_URL, GET_PARAGRAPH } from '../../urls';

const ParagraphPage = (param) => {
    const [paragraph, setParagraph] = useState([]);

    function getParagraph(id) {
        axios.get(BASE_URL + GET_PARAGRAPH + id).then((response) => {
                console.log(response);
                setParagraph(response.data);
            }).catch((error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    useEffect(() => {
        getParagraph();
    }, []);


  return(
        <div className="container">
            <h2>{paragraph.id}</h2>

            <p>{paragraph.content}</p>
        </div>
  );

}

export default ParagraphPage;