import React, { useState, useEffect } from 'react';
import { User, Coins, Vote, MessageCircle, Plus, Search, Settings, Wifi, WifiOff, FileText } from 'lucide-react';
import WhitePaper from './WhitePaper'; 
import TheLastTransaction from './TheLastTransaction';
import Messages from './components/Messages';

// PWA Installation prompt
let deferredPrompt;

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// PWA install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

// Mock data for development
const mockUser = {
  address: '0x742d35Cc',
  birthDate: new Date('1990-01-01'),
  grantTokens: 18396000, // ~35 years remaining
  governanceTokens: 245,  // Accumulated through experience
  letsCredits: 1250,
  reputation: 750,
  totalTrades: 23
};

const mockServices = [
  {
    id: 1,
    provider: 'Alice_Dev',
    title: 'Web Development',
    description: 'React & Node.js development services',
    price: 500,
    category: 'Tech',
    reputation: 890
  },
  {
    id: 2,
    provider: 'Bob_Cook',
    title: 'Home Cooking',
    description: 'Healthy meal prep and cooking lessons',
    price: 150,
    category: 'Food',
    reputation: 720
  },
  {
    id: 3,
    provider: 'Carol_Garden',
    title: 'Garden Consultation',
    description: 'Organic gardening setup and maintenance',
    price: 200,
    category: 'Home',
    reputation: 650
  }
];

const SovereignCitizens = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [user, setUser] = useState(null);
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [canInstall, setCanInstall] = useState(false);
  const [nostrConnected, setNostrConnected] = useState(false);
  const [web3Connected, setWeb3Connected] = useState(false);

  useEffect(() => {
    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check if app can be installed
    if (deferredPrompt) {
      setCanInstall(true);
    }
    
    // Initialize connections
    initializeConnections();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const initializeConnections = async () => {
    // Simulate wallet connection
    setUser(mockUser);
    
    // Initialize NOSTR (would use actual NOSTRClient here)
    try {
      // const nostrClient = new NOSTRClient();
      // await nostrClient.initialize();
      setNostrConnected(true);
    } catch (error) {
      console.error('NOSTR connection failed:', error);
    }
    
    // Initialize Web3 (would connect to actual wallet here)
    try {
      // const web3 = new Web3(window.ethereum);
      // await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWeb3Connected(true);
    } catch (error) {
      console.error('Web3 connection failed:', error);
    }
  };

  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setCanInstall(false);
      }
      deferredPrompt = null;
    }
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    return Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 365.25));
  };

  const calculateRemainingMinutes = (birthDate) => {
    const ageMinutes = (Date.now() - birthDate) / (1000 * 60);
    const lifespanMinutes = 85 * 365.25 * 24 * 60;
    return Math.max(0, Math.floor(lifespanMinutes - ageMinutes));
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TokenDisplay = ({ label, amount, symbol, color }) => (
    <div className={`bg-gradient-to-r ${color} p-4 rounded-lg text-white`}>
      <div className="text-sm opacity-90">{label}</div>
      <div className="text-2xl font-bold">{amount.toLocaleString()}</div>
      <div className="text-xs opacity-75">{symbol}</div>
    </div>
  );

  const ServiceCard = ({ service }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{service.title}</h3>
        <span className="text-green-600 font-bold">{service.price} LC</span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{service.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{service.provider}</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-500">Rep: {service.reputation}</span>
        </div>
      </div>
      <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
        Request Service
      </button>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to NOSTR & Polygon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-800">SOVEREIGN CITIZENS</h1>
              <img 
                src="../public/work-in-progress.png" alt="Work In Progress" className="h-8 w-auto ml-2" title="SOVEREIGN CITIZENS IS CUTRRENTLY IN DEVELOPMENT" 
              />
              {canInstall && (
                <button
                  onClick={installPWA}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Install App
                </button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {/* Connection Status */}
              <div className="flex items-center space-x-1">
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <div className={`w-2 h-2 rounded-full ${nostrConnected ? 'bg-green-500' : 'bg-red-500'}`} title="NOSTR" />
                <div className={`w-2 h-2 rounded-full ${web3Connected ? 'bg-green-500' : 'bg-red-500'}`} title="Web3" />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-600">{user.address}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-around py-3">
            {[
              { id: 'marketplace', icon: Search, label: 'Marketplace' },
              { id: 'dashboard', icon: Coins, label: 'Dashboard' },
              { id: 'governance', icon: Vote, label: 'Governance' },
              { id: 'messages', icon: MessageCircle, label: 'Messages' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center py-2 px-3 rounded-md transition-colors min-w-0 ${
                  activeTab === id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs text-center">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Token Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <TokenDisplay
              label="Grant Tokens"
              amount={user.grantTokens}
              symbol="GT (Lifespan-based)"
              color="from-purple-500 to-purple-600"
            />
            <TokenDisplay
              label="Governance Tokens"
              amount={user.governanceTokens}
              symbol="GOV (Experience-based)"
              color="from-blue-500 to-blue-600"
            />
            <TokenDisplay
              label="LETS Credits"
              amount={user.letsCredits}
              symbol="LC (Trading currency)"
              color="from-green-500 to-green-600"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{calculateAge(user.birthDate)}</div>
                <div className="text-sm text-gray-600">Age (Years)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{user.reputation}</div>
                <div className="text-sm text-gray-600">Reputation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{user.totalTrades}</div>
                <div className="text-sm text-gray-600">Total Trades</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {Math.floor(calculateRemainingMinutes(user.birthDate) / (365.25 * 24 * 60))}
                </div>
                <div className="text-sm text-gray-600">Years Remaining</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marketplace */}
      {activeTab === 'marketplace' && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Service Marketplace</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Post Service</span>
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      )}

      {/* Governance Section */}
      {activeTab === 'governance' && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-4">Governance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Documentation</h3>
                <button 
                  onClick={() => setActiveTab('whitepaper')}
                  className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 text-left hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-800">White Paper</div>
                      <div className="text-sm text-blue-600">Read system documentation</div>
                    </div>
                  </div>
                </button>
                <button 
                  onClick={() => setActiveTab('novel')}
                  className="w-full bg-purple-50 border border-purple-200 rounded-lg p-4 text-left hover:bg-purple-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-purple-800">The Last Transaction</div>
                      <div className="text-sm text-purple-600">A novel about economic revolution</div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-700">Coming Soon</h3>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Proposal creation and voting</li>
                  <li>• Parameter adjustments</li>
                  <li>• Community decisions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* White Paper */}
      {activeTab === 'whitepaper' && <WhitePaper />}

      {/* The Last Transaction Novel */}
      {activeTab === 'novel' && <TheLastTransaction />}

      {/* Placeholder for other tabs */}
      {!['marketplace', 'dashboard', 'governance', 'whitepaper', 'novel'].includes(activeTab) && (
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold mb-2 capitalize">{activeTab}</h2>
            <p className="text-gray-600">Coming soon! This section will include:</p>
            <ul className="mt-4 text-sm text-gray-500 space-y-1">
              {activeTab === 'messages' && <Messages />}
              {activeTab === 'settings' && (
                <>
                  <li>• Profile management</li>
                  <li>• NOSTR relay configuration</li>
                  <li>• Privacy settings</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SovereignCitizens;