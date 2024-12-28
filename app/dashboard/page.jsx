import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';

const Dashboard = () => {
  return (
    <div className="p-10">
      {/* Top section with user info and page title */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-2xl">Dashboard</h2>
          <h2 className="text-gray-500">Create and Start your AI Mockup interview</h2>
        </div>
       {/* UserButton from Clerk for user management */}
      </div>

      {/* Add New Interview section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
        <AddNewInterview />
      </div>

      {/* Interview List section */}
      <div className="my-8">
        <InterviewList />
      </div>
    </div>
  );
};

export default Dashboard;
