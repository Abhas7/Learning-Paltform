import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import type { User } from '../types';

interface LeaderboardProps {
  users: User[];
}

export function Leaderboard({ users }: LeaderboardProps) {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const topUsers = sortedUsers.slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Global Leaderboard</h2>
      </div>

      <div className="space-y-4">
        {topUsers.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 text-center">
                {index < 3 ? (
                  <Medal
                    size={24}
                    className={
                      index === 0 ? 'text-yellow-500' :
                      index === 1 ? 'text-gray-400' :
                      'text-amber-600'
                    }
                  />
                ) : (
                  <span className="text-gray-600 font-medium">{index + 1}</span>
                )}
              </div>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-800">{user.name}</h3>
                <div className="flex items-center gap-2">
                  {user.badges.slice(0, 3).map((badge) => (
                    <span
                      key={badge.id}
                      className="inline-block"
                      title={badge.name}
                    >
                      {badge.icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-800">{user.points}</p>
              <p className="text-sm text-gray-600">points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}