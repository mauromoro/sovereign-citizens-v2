import React, { useState, useEffect, useRef } from 'react';
import { Send, Hash, Lock, Users, Search, Phone, Video, MoreVertical } from 'lucide-react';

// Mock data - replace with actual Nostr data
const mockChannels = [
  { id: 'general', name: 'general', type: 'channel', unread: 3, lastMessage: 'Looking for web dev services' },
  { id: 'trading', name: 'trading', type: 'channel', unread: 1, lastMessage: 'New service listing posted' },
  { id: 'help', name: 'help', type: 'channel', unread: 0, lastMessage: 'How do I verify my profile?' }
];

const mockContacts = [
  { 
    pubkey: '742d35cc...', 
    name: 'Alice Chen', 
    status: 'online', 
    lastSeen: Date.now(),
    services: ['Web Development', 'Design'],
    unread: 2,
    lastMessage: 'Sure, I can help with that React project'
  },
  { 
    pubkey: '8a9b12ef...', 
    name: 'Bob Smith', 
    status: 'away', 
    lastSeen: Date.now() - 1800000,
    services: ['Photography', 'Video Editing'],
    unread: 0,
    lastMessage: 'Thanks for the recommendation!'
  },
  { 
    pubkey: 'c3d4e5f6...', 
    name: 'Carol Williams', 
    status: 'offline', 
    lastSeen: Date.now() - 7200000,
    services: ['Legal Consulting', 'Writing'],
    unread: 1,
    lastMessage: "I'll review the contract tomorrow"
  }
];

const mockMessages = {
  'general': [
    { id: 1, author: 'Alice Chen', content: 'Looking for web dev services', timestamp: Date.now() - 3600000, type: 'message' },
    { id: 2, author: 'Bob Smith', content: 'I can help with React/Node.js projects', timestamp: Date.now() - 3000000, type: 'message' },
    { id: 3, author: 'You', content: 'What are your rates?', timestamp: Date.now() - 1800000, type: 'message' }
  ],
  '742d35cc...': [
    { id: 1, author: 'Alice Chen', content: 'Hi! I saw your service listing for React development', timestamp: Date.now() - 7200000, type: 'dm', encrypted: true },
    { id: 2, author: 'You', content: 'Yes, I specialize in React and Node.js. What kind of project do you have?', timestamp: Date.now() - 7000000, type: 'dm', encrypted: true },
    { id: 3, author: 'Alice Chen', content: 'It is an e-commerce platform. Would 500 LETS credits work?', timestamp: Date.now() - 6800000, type: 'dm', encrypted: true },
    { id: 4, author: 'You', content: 'That sounds reasonable. Can you share more details about the requirements?', timestamp: Date.now() - 6600000, type: 'dm', encrypted: true },
    { id: 5, author: 'Alice Chen', content: 'Sure, I can help with that React project', timestamp: Date.now() - 300000, type: 'dm', encrypted: true }
  ]
};

export default function MessagesInterface() {
  const [selectedConversation, setSelectedConversation] = useState('general');
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if current conversation is DM (encrypted)
    setIsEncrypted(selectedConversation.includes('...'));
    scrollToBottom();
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      author: 'You',
      content: messageInput,
      timestamp: Date.now(),
      type: isEncrypted ? 'dm' : 'message',
      encrypted: isEncrypted
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMessage]
    }));

    setMessageInput('');

    // Here you would integrate with NOSTRClient
    // if (isEncrypted) {
    //   await nostrClient.sendDirectMessage(selectedConversation, messageInput);
    // } else {
    //   await nostrClient.publishChannelMessage(selectedConversation, messageInput);
    // }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = (now - date) / (1000 * 60 * 60);
    
    if (diffHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  const filteredChannels = mockChannels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const currentConversation = selectedConversation.includes('...') 
    ? mockContacts.find(c => c.pubkey === selectedConversation)
    : mockChannels.find(c => c.id === selectedConversation);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Channels Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <div className="flex items-center mb-2">
              <Hash className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Channels</span>
            </div>
            {filteredChannels.map(channel => (
              <div
                key={channel.id}
                onClick={() => setSelectedConversation(channel.id)}
                className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${
                  selectedConversation === channel.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
              >
                <Hash className="w-4 h-4 text-gray-500 mr-3" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {channel.name}
                    </span>
                    {channel.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                        {channel.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{channel.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contacts Section */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center mb-2">
              <Users className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Direct Messages</span>
            </div>
            {filteredContacts.map(contact => (
              <div
                key={contact.pubkey}
                onClick={() => setSelectedConversation(contact.pubkey)}
                className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 ${
                  selectedConversation === contact.pubkey ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
              >
                <div className="relative mr-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {contact.name}
                    </span>
                    {contact.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                    <span className="text-xs text-gray-400">{formatTime(contact.lastSeen)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {contact.services.slice(0, 2).map(service => (
                      <span key={service} className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            {isEncrypted ? (
              <>
                <div className="relative mr-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {currentConversation?.name?.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(currentConversation?.status)}`}></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{currentConversation?.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Lock className="w-3 h-3 mr-1" />
                    <span>Encrypted • {currentConversation?.status}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Hash className="w-6 h-6 text-gray-500 mr-3" />
                <h3 className="font-semibold text-gray-900">#{currentConversation?.name}</h3>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {isEncrypted && (
              <>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                  <Video className="w-5 h-5" />
                </button>
              </>
            )}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(messages[selectedConversation] || []).map(message => (
            <div
              key={message.id}
              className={`flex ${message.author === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${
                message.author === 'You' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-900'
              } rounded-lg px-4 py-2`}>
                {message.author !== 'You' && !isEncrypted && (
                  <div className="text-xs font-medium mb-1 opacity-80">
                    {message.author}
                  </div>
                )}
                <div className="text-sm">{message.content}</div>
                <div className={`text-xs mt-1 flex items-center justify-end ${
                  message.author === 'You' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.encrypted && <Lock className="w-3 h-3 mr-1" />}
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                placeholder={`Message ${isEncrypted ? currentConversation?.name : `#${currentConversation?.name}`}...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              />
              {isEncrypted && (
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              )}
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!messageInput.trim()}
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          {isEncrypted && (
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Messages are end-to-end encrypted using NIP-04
            </p>
          )}
        </div>
      </div>
    </div>
  );
}