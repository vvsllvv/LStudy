import axios from "axios";


const Question = ({
    question, 
    index
}) => {

    function finishAttempt() {
        axios.post();
    }

    return(
         <div className="question-card">
            <div className="question-header">
                <h3 className="question-number">Вопрос №{index + 1}</h3>
            </div>

            <div className="question-text">
                <p>{question.description}</p>
            </div>

            <div className="answers-list">
                {question.answers?.map((answer) => (
                    <label key={answer.id} className="answer-option">
                        <input
                            type="radio"
                            value={answer.content}
                        />
                        <span className="answer-text">{answer.content}</span>
                    </label>
                ))}
            </div>



        </div>
    );
}

export default Question;