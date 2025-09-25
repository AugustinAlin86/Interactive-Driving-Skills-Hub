
'use client';

import { useState, useRef } from 'react';
import axios from 'axios';

export default function AskOpenAi({
  prompt, 
  presetMessage = "Quick answer: Tap for more details.", 
  buttonLabel = "More details (AI)"
}) {
  const [aiResponse, setAiResponse] = useState('');         
  const [isLoading, setIsLoading] = useState(false);          
  const hasFetchedExtraDetails = useRef(false);               

  
  const fetchExtraDetails = async () => {
    
    if (hasFetchedExtraDetails.current) return;

    
    let cleanedQuestion = '';
    if (prompt) {
      cleanedQuestion = prompt.trim(); 
    }

   
    if (cleanedQuestion === '') return;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/ask-chatgpt', { question: cleanedQuestion });
      setAiResponse(response.data?.answer || 'No extra details available.');
      hasFetchedExtraDetails.current = true; 
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
        
        <p style={{ marginTop: 8 }}>
          <strong>AI details:</strong> {aiResponse}
        </p>
      ) : (
        
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
