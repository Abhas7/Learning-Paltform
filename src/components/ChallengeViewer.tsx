import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { Play, CheckCircle, XCircle } from 'lucide-react';
import type { Challenge, Submission } from '../types';

interface ChallengeViewerProps {
  challenge: Challenge;
  onSubmit: (code: string) => void;
  submissions: Submission[];
}

export function ChallengeViewer({ challenge, onSubmit, submissions }: ChallengeViewerProps) {
  const [code, setCode] = useState('');

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">{challenge.title}</h2>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${challenge.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              challenge.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'}`}>
            {challenge.difficulty}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-600">{challenge.points} points</span>
        </div>
      </div>

      <div className="prose max-w-none">
        <ReactMarkdown>{challenge.description}</ReactMarkdown>
      </div>

      <div className="h-[400px] border rounded-lg overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => onSubmit(code)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Play size={20} />
          Submit Solution
        </button>

        <div className="flex items-center gap-4">
          <span className="text-gray-600">Previous submissions:</span>
          {submissions.slice(-3).map((submission) => (
            <div
              key={submission.id}
              className="flex items-center gap-1"
              title={submission.status === 'success' ? 'Passed' : 'Failed'}
            >
              {submission.status === 'success' ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <XCircle className="text-red-500" size={20} />
              )}
              <span className="text-sm text-gray-500">
                {new Date(submission.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}