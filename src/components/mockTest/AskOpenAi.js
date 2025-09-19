// AskOpenAi.js
'use client';

import { useState, useRef } from 'react';
import axios from 'axios';

export default function AskOpenAi({
  prompt, 
  presetMessage = "Quick answer: Tap for more details.", 
  buttonLabel = "More details (AI)"
}) {
  const [aiResponse, setAiResponse] = useState('');           // The detailed answer from AI
  const [isLoading, setIsLoading] = useState(false);          // Loading state for button
  const hasFetchedExtraDetails = useRef(false);               // Tracks if we already fetched extra details

  // Function to fetch extra AI details
  const fetchExtraDetails = async () => {
    // Prevent duplicate requests
    if (hasFetchedExtraDetails.current) return;

    // Prepare the question from prompt
    let cleanedQuestion = '';
    if (prompt) {
      cleanedQuestion = prompt.trim(); // Remove extra spaces
    }

    // Skip if question is empty
    if (cleanedQuestion === '') return;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/ask-chatgpt', { question: cleanedQuestion });
      setAiResponse(response.data?.answer || 'No extra details available.');
      hasFetchedExtraDetails.current = true; // Mark as fetched
    } catch {
      setAiResponse('Error getting extra details from AI.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      {/* The short preset message */}
      <p>{presetMessage}</p>

      {aiResponse ? (
        // Show AI answer if we have it
        <p style={{ marginTop: 8 }}>
          <strong>AI details:</strong> {aiResponse}
        </p>
      ) : (
        // Show button if no answer yet
        <button
          onClick={fetchExtraDetails}
          disabled={isLoading}
          style={{ marginTop: 8, padding: '8px 14px', cursor: 'pointer' }}
        >
          {isLoading ? 'Fetching…' : buttonLabel}
        </button>
      )}
    </div>
  );
}
