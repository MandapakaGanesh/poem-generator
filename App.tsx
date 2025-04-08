import React, { useState } from 'react';
import { Message } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { BookOpen } from 'lucide-react';

function generatePoem(topic: string): string {
  const poems = [
    `Roses are red,\nViolets are blue,\n${topic} is sweet,\nJust like you!`,
    `In gardens of thought,\nWhere ${topic} grows wild,\nNature's beauty unfolds,\nLike a precious child.`,
    `Through misty morning light,\n${topic} appears so clear,\nA moment of pure delight,\nBringing joy so near.`,
    `Whispers in the wind,\nTell tales of ${topic} true,\nIn every gentle breeze,\nA story breaks through.`,
  ];
  return poems[Math.floor(Math.random() * poems.length)];
}

function App() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: "Hello! I'm your poetry companion. Tell me a topic, and I'll create a poem for you!",
    isBot: true,
    timestamp: new Date(),
  }]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Generate and add bot response
    setTimeout(() => {
      const poem = generatePoem(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Here's a poem about ${content}:\n\n${poem}`,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto max-w-4xl p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-4 text-white flex items-center gap-3">
            <BookOpen size={24} />
            <h1 className="text-xl font-semibold">Poetic Chat</h1>
          </div>

          {/* Chat Messages */}
          <div className="h-[600px] overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t p-4 bg-gray-50">
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;