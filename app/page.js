import React from "react";
import {
  FaYoutube,
  FaReddit,
  FaLinkedin,
  FaGithub,
  FaRobot,
} from "react-icons/fa";
import { Brain, Target, Users, Award, ArrowRight } from "lucide-react";


export default function HomePage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-indigo-600" />,
      title: "AI-Powered Feedback",
      description:
        "Get instant, personalized feedback on your interview responses from our advanced AI system",
    },
    {
      icon: <Target className="w-8 h-8 text-indigo-600" />,
      title: "Industry-Specific Questions",
      description:
        "Practice with questions tailored to your industry and experience level",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Mock Interviews",
      description: "Simulate real interview scenarios with our AI interviewer",
    },
    {
      icon: <Award className="w-8 h-8 text-indigo-600" />,
      title: "Performance Analytics",
      description: "Track your progress and identify areas for improvement",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed w-full z-50 flex justify-between items-center py-4 px-6 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="flex items-center">
          <FaRobot className="h-8 w-8 mr-2 text-indigo-600" />
          <span className="text-xl font-bold text-indigo-600">AI-MOCK</span>
        </div>
        <div className="flex space-x-8 text-gray-600 justify-center flex-1">
          <a
            href="/dashboard"
            className="hover:text-indigo-600 transition-colors"
          >
            Dashboard
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Questions
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Upgrade
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            How it Works?
          </a>
        </div>
        <button
          onClick={""}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <a href="/sign-in">Sign In</a>
        </button>
      </nav>

      {/* Hero Section */}
      <section
        className="relative text-center pt-32 pb-24 px-6 bg-cover bg-center min-h-[90vh] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 to-indigo-950/90" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="bg-indigo-100 inline-block py-1 px-3 rounded-full text-sm font-semibold text-indigo-700">
            New Feature
          </div>
          <p className="mt-2 text-indigo-300 text-xl font-semibold">
            AI-Powered Interview Preparation Platform
          </p>
          <h1 className="text-6xl font-bold text-white mt-6 leading-tight">
            Master Your Interviews with
            <span className="text-indigo-400"> AI Technology</span>
          </h1>
          <p className="text-gray-200 mt-6 text-xl max-w-2xl mx-auto leading-relaxed">
            Practice with our AI interviewer, receive instant feedback, and
            improve your interview skills. Used by professionals at top
            companies worldwide.
          </p>

          <div className="mt-10 flex justify-center space-x-6">
            <button className="bg-indigo-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 text-lg flex items-center">
              <a href="/sign-in" >Start Free Trial</a> <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-white/20 transition-all transform hover:scale-105 text-lg flex items-center">
              Watch Demo <span className="ml-2">🎥</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose AI-MOCK?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-gray-50">
        <p className="text-center text-gray-500 text-xl font-medium">
          TRUSTED BY LEADING COMPANIES
        </p>
        <div className="flex justify-center space-x-12 mt-8">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 text-3xl transition-colors"
          >
            <FaYoutube />
            <span className="text-lg font-semibold">YouTube</span>
          </a>
          <a
            href="https://reddit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 text-3xl transition-colors"
          >
            <FaReddit />
            <span className="text-lg font-semibold">Reddit</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-700 text-3xl transition-colors"
          >
            <FaLinkedin />
            <span className="text-lg font-semibold">LinkedIn</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-black text-3xl transition-colors"
          >
            <FaGithub />
            <span className="text-lg font-semibold">GitHub</span>
          </a>
        </div>
      </section>
    </div>
  );
}
