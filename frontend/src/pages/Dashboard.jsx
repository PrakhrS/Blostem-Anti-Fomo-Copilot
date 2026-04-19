import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="p-10 bg-surface rounded-2xl shadow-2xl border border-gray-800 text-center max-w-lg w-full relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-danger rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

        <h1 className="text-4xl font-bold text-white mb-4 relative z-10 tracking-tight">Welcome to Anti-FOMO Copilot</h1>
        <p className="text-gray-400 text-lg relative z-10">Your AI-powered portfolio companion.</p>
      </div>
    </div>
  );
};

export default Dashboard;
