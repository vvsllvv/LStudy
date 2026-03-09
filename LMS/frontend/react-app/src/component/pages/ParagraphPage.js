import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { BASE_URL, PARAGRAPH } from '../../urls';

const ParagraphPage = (params) => {
    const [paragraph, setParagraph] = useState([]);
    const { paragraphId } = useParams(); 

    function getParagraph(id) {
        axios.get(BASE_URL + PARAGRAPH + id).then((response) => {
                console.log(response);
                setParagraph(response.data);
            }).catch((error) => {
                console.log(error);
                console.log(error.response);
            }
        );
    }

    useEffect(() => {
        getParagraph(paragraphId);
    }, [paragraphId]);


  return(
        <div className="paragraph-container">
            <h2>{paragraph.title}</h2>

            <p className="paragraph-content">{paragraph.content}</p>
        </div>
  );

}

export default ParagraphPage;