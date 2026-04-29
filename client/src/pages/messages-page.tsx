import { useState } from 'react';

import { clsx } from 'clsx';

import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';
import ChatList from '../components/dashboard/messages/chatList/chatList';
import ChatWindow from '../components/dashboard/messages/chatWindow/chatWindow';

const initialConversations = [
  {
    id: '1',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150',
    lastMessage: 'See you today at 11! \ud83d\udc4b',
    time: '2m ago',
    unreadCount: 2,
    status: "Alzheimer's Care \u00b7 Active client"
  },
  {
    id: '2',
    name: 'Robert Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150',
    lastMessage: 'Running 5 minutes late, sorry!',
    time: '15m ago',
    unreadCount: 3,
    status: "Post-Surgery Recovery \u00b7 Active client"
  },
  {
    id: '3',
    name: 'Mary Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150',
    lastMessage: 'Thank you for everything \ud83d\ude4f',
    time: 'Yesterday',
    status: "Companion Care \u00b7 Past client"
  },
  {
    id: '4',
    name: 'myPSW Support',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150',
    lastMessage: 'Your payment has been processed',
    time: 'Mon',
    status: "Official Support Channel"
  },
  {
    id: '5',
    name: 'Peter Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150',
    lastMessage: 'Can we reschedule Thursday?',
    time: 'Sun',
    status: "Dementia Care \u00b7 Active client"
  }
];

const initialMessages: Record<string, any[]> = {
  '1': [
    { id: 'm1', text: 'Good morning! Just confirming our appointment today at 11am \u2600\ufe0f', time: '9:42 am', type: 'incoming' },
    { id: 'm2', text: 'Good morning Jane! Yes, I\'ll be there at 11. Should I bring the BP monitor as well?', time: '9:45 am', type: 'outgoing', status: 'read' },
    { id: 'm3', text: 'Yes please! And maybe the stretching equipment too?', time: '9:46 am', type: 'incoming' },
    { id: 'm4', text: 'Of course! See you soon \ud83d\udc4d', time: '9:48 am', type: 'outgoing', status: 'read' },
    { id: 'm5', text: 'See you today at 11! \ud83d\udc4b', time: '9:50 am', type: 'incoming' },
  ],
  '2': [
    { id: 'r1', text: 'Hello Robert, how are you feeling today?', time: '8:00 am', type: 'outgoing', status: 'delivered' },
    { id: 'r2', text: 'Running 5 minutes late, sorry!', time: '8:15 am', type: 'incoming' },
  ]
};

const MessagesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isChatOpenOnMobile, setIsChatOpenOnMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState(initialMessages);

  const filteredConversations = initialConversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChat = initialConversations.find(c => c.id === activeConversationId) || null;
  const activeMessages = activeConversationId ? messages[activeConversationId] || [] : [];

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setIsChatOpenOnMobile(true);
  };

  const handleSendMessage = (text: string) => {
    if (!activeConversationId) return;

    const newMessage = {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'outgoing',
      status: 'read'
    };

    setMessages(prev => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), newMessage]
    }));
  };

  return (
    <div className="flex h-screen w-full bg-[#f8f7ff] font-dm overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 p-0 sm:p-6 lg:p-10 flex flex-col overflow-hidden">
          <h1 className="hidden sm:block text-3xl lg:text-4xl font-bold text-gray-900 font-playfair mb-8">Messages</h1>

          <div className="flex-1 flex sm:shadow-logs sm:rounded-xl overflow-hidden bg-white">

            <div className={clsx(
              "w-full md:w-80 lg:w-96 border-r border-gray-100 duration-300",
              isChatOpenOnMobile ? "hidden md:block" : "block"
            )}>
              <ChatList
                conversations={filteredConversations}
                activeId={activeConversationId || ''}
                onSelect={handleSelectConversation}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>


            <div className={clsx(
              "flex-1 min-w-0 duration-300",
              !isChatOpenOnMobile ? "hidden md:block" : "block"
            )}>
              <ChatWindow
                activeChat={activeChat}
                messages={activeMessages}
                onSendMessage={handleSendMessage}
                onBack={() => setIsChatOpenOnMobile(false)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;
