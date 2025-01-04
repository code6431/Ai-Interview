import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  // Text-to-speech function
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  // Log for debugging the data
  console.log("mockInterviewQuestion:", mockInterviewQuestion);
  console.log("activeQuestionIndex:", activeQuestionIndex);

  return (
    <div className="p-5 border rounded-lg my-10">
      {/* Question Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion && mockInterviewQuestion.length > 0 ? (
          mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index ? "bg-primary text-white" : ""
              }`}
            >
              Question #{index + 1}
            </h2>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </div>

      {/* Active Question */}
      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestion?.[activeQuestionIndex]?.text ||
          "No question selected."}
      </h2>

      {/* Text-to-Speech Icon */}
      <Volume2
        className="cursor-pointer"
        onClick={() =>
          textToSpeech(mockInterviewQuestion?.[activeQuestionIndex]?.text || "")
        }
      />

      {/* Note Section */}
      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-blue-700">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE || "No notes available."}
        </h2>
      </div>
    </div>
  );
};

export default QuestionSection;
