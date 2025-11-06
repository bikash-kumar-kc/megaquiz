
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userresponse, correctresponse, questionnumber } from "../store/userResponseSlice";
import ServerStateManagement from "./ServerStateManagement";
import imagevisit from "../assets/visit.svg";

const QuestionCard = ({ questions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux selectors
  const userId = useSelector((store) => store.userAuth.userData?.$id);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);


  // Handle option click
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Handle next question
  const nextQuestion = () => {

    const currentQuestion = questions[index];

    // Dispatch current response
    dispatch(userresponse(selectedOption));
    dispatch(correctresponse(currentQuestion.correctAnswer));
    dispatch(questionnumber(currentQuestion.questionNo));

    // Move to next question or finish
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
      setSelectedOption(null); // Reset selection for next question
    } else {
      navigate("/userattempt");
    }
  };

  // Render safely if questions are not ready
  if (!questions || questions.length === 0) {
    return (
      <ServerStateManagement
        image={imagevisit}
        message={"Visit quiz page and select your requirement."}
      />
    );
  }

  // Get current question
  const currentQuestion = questions[index];

  // Dynamically build options array from opt1–opt4
  const options = [currentQuestion.opt1, currentQuestion.opt2, currentQuestion.opt3, currentQuestion.opt4];
  console.log(currentQuestion)

  return (
    <div className="container">
      <div className="question">
        <h2>Category: {currentQuestion.category}</h2>
        <h3>Question {currentQuestion.questionNo}</h3>
        <p className="paraQuestion">{currentQuestion.question}</p>

        <ul>
          {options.map((opt, i) => (
            <li
              key={i}
              className="option hover:bg-gray-200 p-2 rounded cursor-pointer list-none"
              onClick={() => handleOptionClick(opt)}
              style={{
                background: selectedOption === opt ? "green" : "black",
                color: "white",
                marginBottom: "5px",
              }}
            >
              {opt}
            </li>
          ))}
        </ul>

        <button
          onClick={nextQuestion}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {index < questions.length - 1 ? "Next" : "Show Attempt"}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
