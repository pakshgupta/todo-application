
import React from 'react';

const Landing= () => {
  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <section className="flex items-center justify-center h-screen bg-blue-500">
        <div className="text-center text-white px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Manage Your Tasks Efficiently
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Stay organized and boost your productivity with our intuitive to-do application. Simple, effective, and designed for your needs.
          </p>
          <a href="#features" className="bg-white text-blue-500 py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition duration-300">
            Get Started
          </a>
        </div>
      </section>
      <section id="features" className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
              <h3 className="text-xl font-semibold mb-4">Task Management</h3>
              <p className="text-gray-700">Organize your tasks into lists, set deadlines, and mark them as complete.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
              <h3 className="text-xl font-semibold mb-4">Reminders</h3>
              <p className="text-gray-700">Receive reminders for your tasks to ensure you never miss a deadline.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3">
              <h3 className="text-xl font-semibold mb-4">Collaborate</h3>
              <p className="text-gray-700">Share your task lists with others and collaborate on projects effectively.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 To-Do Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
