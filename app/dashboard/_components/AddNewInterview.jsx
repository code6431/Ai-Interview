"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ConsoleLogWriter } from "drizzle-orm";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [insertedId, setInsertedId] = useState(null);
  const [jsonResponse, setJsonResponse] = useState([])
  const router = useRouter();
  const { user } = useUser();

  // Function to clean and parse the AI response
  

  // Submit handler for adding new interview details
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInsertedId(null); // Reset insertedId before submission
    console.log(jobPosition, jobDesc,jobExperience)

    // Modified prompt to ensure AI returns a JSON-formatted response
    const InputPrompt = "Job position:" + jobPosition + "  Job Description:" + jobDesc + ", Years of Experience: "+jobExperience +". Based on this, provide 5 interview questions and answers in valid JSON format with 'questions' as an array and 'answers' as an array. Please ensure the response is in JSON format and nothing else."

    
      const result = await chatSession.sendMessage(InputPrompt);

      // Log the raw AI response to check its format
      console.log("AI Response:", result.response.text());

      
      

    const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
    
    console.log(JSON.parse(mockJsonResp));

    setJsonResponse(mockJsonResp);
    

    if (mockJsonResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: mockJsonResp,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });
    
      console.log("Inserted Id " + resp)
      
      if (resp) {
        const insertedId = resp[0]?.mockId;
        setOpenDialog(false);

         router.push(`/dashboard/interview/${insertedId}/start`);
        
      }
       // Get the inserted ID
      setInsertedId(resp[0]?.mockId); // Set the inserted ID in state
      console.log("Inserted ID:", insertedId); // Print the inserted ID to the console

      // Redirect to the interview page
      // Redirect to the desired URL

      // Reset form fields
      setJobPosition("");
      setJobDesc("");
      setJobExperience("");
       // Close the dialog after redirection
    }
    else {
      console.log("Mock Interview Response is empty");
    }

    setLoading(false);
  } 
  
  
     

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-sm cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center ">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2 className="mb-4">
                    Add Details about your job position/role, Job description
                    and year of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. Reactjs, Nextjs, Nodejs etc.."
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex. 5"
                      max="50"
                      type="number"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {insertedId && (
                  <p className="text-green-500">Inserted ID: {insertedId}</p>
                )}

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
