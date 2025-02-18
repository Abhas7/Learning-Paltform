import React, { useState } from 'react';
import { ChallengeViewer } from './components/ChallengeViewer';
import { Dashboard } from './components/Dashboard';
import { Leaderboard } from './components/Leaderboard';
import { Layout, Code, Home, Trophy } from 'lucide-react';
import type { Challenge, User, Submission } from './types';

// Mock data for demonstration
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop&q=80',
  points: 520,
  completedChallenges: ['1', '2', '3'],
  badges: [
    { id: '1', name: 'Early Bird', icon: '🌅', description: 'Completed 5 challenges before 9 AM' },
    { id: '2', name: 'Code Warrior', icon: '⚔️', description: 'Solved 10 hard challenges' },
    { id: '3', name: 'Quick Learner', icon: '🚀', description: 'Completed 3 challenges in one day' },
  ],
};

const mockChallenge: Challenge = {
  id: '1',
  title: 'Array Sum Calculator',
  description: '# Challenge: Array Sum\n\nWrite a function that calculates the sum of all numbers in an array.\n\n## Example:\n```javascript\nsum([1, 2, 3, 4]) // should return 10\n```',
  difficulty: 'beginner',
  type: 'code',
  content: 'function sum(numbers) {\n  // Your code here\n}',
  points: 100,
};

const mockSubmissions: Submission[] = [
  {
    id: '1',
    userId: '1',
    challengeId: '1',
    code: 'function sum(numbers) { return numbers.reduce((a, b) => a + b, 0); }',
    status: 'success',
    timestamp: new Date('2024-03-10T10:00:00'),
  },
  {
    id: '2',
    userId: '1',
    challengeId: '1',
    code: 'function sum(numbers) { return numbers.reduce((a, b) => a + b); }',
    status: 'failed',
    timestamp: new Date('2024-03-10T09:45:00'),
  },
];

const mockUsers: User[] = [
  mockUser,
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&fit=crop&q=80',
    points: 650,
    completedChallenges: ['1', '2', '3', '4'],
    badges: [
      { id: '4', name: 'Problem Solver', icon: '🧩', description: 'Solved 20 challenges' },
      { id: '5', name: 'Top Contributor', icon: '⭐', description: 'Helped 10 other users' },
    ],
  },
  // Add more mock users as needed
];

const mockRecentChallenges: Challenge[] = [
  mockChallenge,
  {
    id: '2',
    title: 'String Reversal',
    description: 'Write a function to reverse a string',
    difficulty: 'beginner',
    type: 'code',
    content: 'function reverse(str) {\n  // Your code here\n}',
    points: 80,
  },
  {
    id: '3',
    title: 'Binary Search',
    description: 'Implement binary search algorithm',
    difficulty: 'intermediate',
    type: 'code',
    content: 'function binarySearch(arr, target) {\n  // Your code here\n}',
    points: 150,
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'challenges' | 'leaderboard'>('dashboard');

  const handleSubmit = (code: string) => {
    console.log('Submitted code:', code);
    // Here you would typically send the code to your backend for evaluation
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Layout className="text-indigo-600" size={24} />
              <span className="text-xl font-bold text-gray-800">CodeQuest</span>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${activeTab === 'dashboard' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Home size={20} />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('challenges')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${activeTab === 'challenges' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Code size={20} />
                Challenges
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${activeTab === 'leaderboard' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Trophy size={20} />
                Leaderboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {activeTab === 'dashboard' && (
          <Dashboard user={mockUser} recentChallenges={mockRecentChallenges} />
        )}
        {activeTab === 'challenges' && (
          <ChallengeViewer
            challenge={mockChallenge}
            onSubmit={handleSubmit}
            submissions={mockSubmissions}
          />
        )}
        {activeTab === 'leaderboard' && (
          <Leaderboard users={mockUsers} />
        )}
      </main>
    </div>
  );
}

export default App;