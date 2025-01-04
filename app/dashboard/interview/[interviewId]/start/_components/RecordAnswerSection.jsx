"use client";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/GeminiAiModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { db } from "@/utils/db";
import { toast } from "sonner"; // Assuming this is a valid import

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null); // Store feedback here
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Update userAnswer whenever new results are available
  useEffect(() => {
    if (results.length > 0) {
      const newText = results.map((result) => result.transcript).join(" ");
      setUserAnswer((prev) => `${prev} ${newText}`);
      setResults([]); // Clear results to avoid re-appending
    }
  }, [results, setResults]);

  // Automatically process the answer when recording stops
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording]);

  // Function to handle answer processing and feedback
  const UpdateUserAnswer = async () => {
    setLoading(true);

    // Validate that the question exists and activeQuestionIndex is valid
    if (
      !mockInterviewQuestion ||
      mockInterviewQuestion.length === 0 ||
      !mockInterviewQuestion[activeQuestionIndex]?.question
    ) {
      console.error("Question is missing");
      toast("Error: Question is missing. Please try again.");
      setLoading(false);
      return; // Exit early if no valid question
    }

    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Please provide a rating and feedback (3-5 lines) for the answer in JSON format with 'rating' and 'feedback' fields.`;

    try {
      // Send the prompt to the Gemini AI model
      const result = await chatSession.sendMessage(feedbackPrompt);
      const textResponse = await result.response.text(); // Assuming the response is a text string

      // If the response is a string, we need to parse it
      let mockJsonResp = textResponse;

      if (typeof mockJsonResp === "string") {
        mockJsonResp = mockJsonResp.trim().replace(/`json|`/g, "");
        mockJsonResp = JSON.parse(mockJsonResp); // Parsing it to JSON
      }

      // Now mockJsonResp should be a parsed object with the feedback
      const JsonFeedbackResp = mockJsonResp;

      // Insert user answer and feedback into the database
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question, // Ensure this is valid
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast("User Answer recorded successfully");
        setUserAnswer("");
        setResults([]); // Clear previous results
        setFeedback(JsonFeedbackResp); // Set the feedback to show
      }
    } catch (err) {
      console.error("Error processing feedback:", err);
      toast("Failed to fetch feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle speech-to-text error
  useEffect(() => {
    if (error) {
      console.error("Speech-to-Text error:", error);
      toast.error(
        "Speech Recognition failed. Please check your browser settings."
      );
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-gray-300 rounded-lg p-5">
        <Image
          src={"/image.png"}
          alt="Interview"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className={`my-10 ${
          isRecording ? "bg-red-500 text-white" : "bg-blue-500 text-white"
        }`}
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <h2 className="flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
      {loading && <p className="text-gray-500">Processing your answer...</p>}

      {/* Display user answer and feedback if available */}
      {userAnswer && (
        <div className="my-5 p-4 bg-gray-100 rounded-lg w-full max-w-lg">
          <h3 className="font-semibold text-lg">Your Answer:</h3>
          <p className="text-gray-700">{userAnswer}</p>
        </div>
      )}

      {feedback && (
        <div className="my-5 p-4 bg-green-100 rounded-lg w-full max-w-lg">
          <h3 className="font-semibold text-lg">Feedback:</h3>
          <p className="text-gray-700">Rating: {feedback?.rating}</p>
          <p className="text-gray-700">Feedback: {feedback?.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default RecordAnswerSection;
