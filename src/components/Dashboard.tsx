import React from 'react';
import { Trophy, Award, Target, Book } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { User, Challenge } from '../types';

interface DashboardProps {
  user: User;
  recentChallenges: Challenge[];
}

export function Dashboard({ user, recentChallenges }: DashboardProps) {
  const mockProgressData = [
    { day: 'Mon', points: 120 },
    { day: 'Tue', points: 180 },
    { day: 'Wed', points: 200 },
    { day: 'Thu', points: 350 },
    { day: 'Fri', points: 410 },
    { day: 'Sat', points: 490 },
    { day: 'Sun', points: 520 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Trophy className="text-purple-600" size={24} />
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Total Points</h3>
            <p className="text-2xl font-bold text-gray-900">{user.points}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Award className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Badges Earned</h3>
            <p className="text-2xl font-bold text-gray-900">{user.badges.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Target className="text-green-600" size={24} />
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Completion Rate</h3>
            <p className="text-2xl font-bold text-gray-900">78%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Book className="text-orange-600" size={24} />
          </div>
          <div>
            <h3 className="text-sm text-gray-600">Challenges Done</h3>
            <p className="text-2xl font-bold text-gray-900">{user.completedChallenges.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="points" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Challenges</h3>
          <div className="space-y-4">
            {recentChallenges.map((challenge) => (
              <div key={challenge.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{challenge.title}</h4>
                  <p className="text-sm text-gray-600">{challenge.points} points</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${challenge.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    challenge.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                  {challenge.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}