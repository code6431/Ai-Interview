"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]); // Array to hold questions
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));

        if (result.length === 0) {
          console.error("No interview data found");
          return;
        }

        const interviewData = result[0];
        const jsonMockResp = JSON.parse(interviewData.jsonMockResp || "[]");
        setMockInterviewQuestion(jsonMockResp.questions || []); // Extract questions from response
        setInterviewData(interviewData);
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };

    fetchInterviewDetails();
  }, [params.interviewId]); // Include params.interviewId in dependency array

  const handleNextQuestion = () => {
    if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  return (
    <div>
      {interviewData && ( // Conditionally render content only if interview data is available
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <QuestionSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
          />

          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
          />
        </div>
      )}

      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button onClick={handlePreviousQuestion}>Previous Question</Button>
        )}
        {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
          <Button onClick={handleNextQuestion}>Next Question</Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
