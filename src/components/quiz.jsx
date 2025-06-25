import {useState} from "react";
import Results from "./results";

function Quiz() {
    const questionBank = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "London", "Paris", "Rome"],
            answer: "Paris",
        },
        {
            question: "Which language is used for web apps?",
            options: ["PHP", "Python", "Javascript", "All"],
            answer: "All",
        },
        {
            question: "What does JSX stand for?",
            options: [
                "JavaScript XML",
                "Java Syntax eXtension", 
                "Just a Simple eXample",
                "None of the above"],
            answer: "JavaScript XML", 
        },
    ];

    const initialAnswers = [null, null, null];
    const [userAnswers, setUserAnswers] = useState(initialAnswers);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isQuizFinished, setIsQuizFinished] = useState(false);

    const selectedAnswer = userAnswers[currentQuestion];

    function handleSelectOption(option) {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[currentQuestion] = option;

        setUserAnswers(newUserAnswers);
    }

    // Check to see if the Quiz is finished or if it needs to go to the next question
    function goToNext() { 
        if (currentQuestion === questionBank.length - 1) {
            setIsQuizFinished(true);
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    function goToPrev() {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }
    
    // Reset all functions to return to null state when the "Restart Quiz" button is pressed.
    function restartQuiz() {
        setUserAnswers(initialAnswers);
        setCurrentQuestion(0);
        setIsQuizFinished(false);
    }

    // Checks to see if the quiz is finished before displaying results.
    if (isQuizFinished) {
        return( 
            <Results 
                userAnswers={userAnswers} 
                questionBank={questionBank} 
                restartQuiz={restartQuiz}
            />
        );
    }

    return (
        <div>

            <h2>Question {currentQuestion + 1}</h2>
            <p className="question"> {questionBank[currentQuestion].question} </p>

            {questionBank[currentQuestion].options.map((option) => (
                <button 
                    className={"option" + (selectedAnswer === option ? " selected" : "")} 
                    onClick={() => handleSelectOption(option)}
                >
                    {option}
                </button>
            ))}

            <div className="nav-buttons">
                <button onClick={goToPrev} disabled={currentQuestion === 0}>
                    Previous 
                </button>
                <button onClick={goToNext} disabled={!selectedAnswer}> 
                    {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}
                </button>
            </div>
        </div>
    );
}


export default Quiz;
