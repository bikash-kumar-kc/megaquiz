import { useSelector } from "react-redux";
import config from "../../config/config";

const fetchQuestions = async ({
  totalquestions,
  categoryCode,
  difficultyMode,
}) => {
  
  

  try {
    const response =
      await fetch(`https://opentdb.com/api.php?amount=${totalquestions}&category=${categoryCode}&difficulty=${difficultyMode}&type=multiple
`);
    const data = await response.json();
    const apiQuestions = data.results;
    let finalQuestions = [];
    for (let i = 0; i < apiQuestions.length; i++) {
      const allOptions = [
        apiQuestions[i].correct_answer,
        ...apiQuestions[i].incorrect_answers,
      ];

      for (let j = allOptions.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [allOptions[j], allOptions[k]] = [allOptions[k], allOptions[j]];
      }
      let obj = {
        category: apiQuestions[i].category,
        question: apiQuestions[i].question,
        difficulty: apiQuestions[i].difficulty,
        correctAnswer: apiQuestions[i].correct_answer,
        questionNo: i + 1,
        opt1: allOptions[0],
        opt2: allOptions[1],
        opt3: allOptions[2],
        opt4: allOptions[3],
      };

      finalQuestions.push(obj);
    }
    return finalQuestions;
  } catch (error) {
    console.log("we get error in fetchingQuestions::" + error);
  }
};

export default fetchQuestions;
