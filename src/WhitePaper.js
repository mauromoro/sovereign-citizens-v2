import React from 'react';
import { FileText } from 'lucide-react';

const WhitePaper = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pb-20">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">SOVEREIGN CITIZENS</h1>
              <p className="text-blue-100">A Decentralized LETS Trading Network</p>
              <p className="text-sm text-blue-200">Version 2.0 - June 2025</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Abstract */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-100 pb-2">
              Abstract
            </h2>
            <p className="text-gray-600 leading-relaxed">
              SOVEREIGN CITIZENS reimagines community-based value exchange by combining proven Local Exchange Trading System (LETS) principles with NOSTR protocol communication and blockchain infrastructure. Through a revolutionary three-token architecture that balances opportunity, experience, and economic activity, the system enables global peer-to-peer trading while maintaining the community spirit of traditional LETS. Built as a Progressive Web App on Polygon with NOSTR-based service discovery, SOVEREIGN CITIZENS creates the world's first truly sovereign economic network.
            </p>
          </section>

          {/* Vision Statement */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-100 pb-2">
              Vision Statement
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SOVEREIGN CITIZENS envisions a world where individuals can create and exchange value without dependence on traditional monetary systems, central authorities, or geographic constraints. By combining time-tested mutual credit principles with cutting-edge decentralized technologies, we're building infrastructure for true economic sovereignty.
            </p>
            <blockquote className="bg-blue-50 border-l-4 border-blue-400 p-4 italic text-gray-700">
              "Money is just information. Let's democratize it."
            </blockquote>
          </section>

          {/* Three-Token Architecture */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-100 pb-2">
              Three-Token Architecture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">Grant Tokens</h3>
                <p className="text-sm text-purple-600">
                  Distributed based on remaining lifespan. Formula: (85 - current_age) × 525,600 minutes/year
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Governance Tokens</h3>
                <p className="text-sm text-blue-600">
                  Earned through experience and community participation. Base: current_age × 10 tokens/year
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">LETS Credits</h3>
                <p className="text-sm text-green-600">
                  Mutual credit currency for trading services. Default limit: 500 credits
                </p>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-100 pb-2">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">Decentralized Trading</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Global service marketplace via NOSTR</li>
                  <li>• Blockchain-verified reputation system</li>
                  <li>• Community-based dispute resolution</li>
                  <li>• Automated balance decay (2% monthly)</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700">Progressive Web App</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Works on any device with a browser</li>
                  <li>• Offline functionality with sync</li>
                  <li>• Push notifications for trades</li>
                  <li>• No app store gatekeepers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Roadmap */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-100 pb-2">
              Roadmap
            </h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Q3 2025: Foundation ✅</h3>
                <p className="text-sm text-green-600">
                  Core smart contract development, NOSTR integration, PWA basic functionality, Three-token system implementation
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Q4 2025: Launch</h3>
                <p className="text-sm text-blue-600">
                  Security audit completion, Polygon mainnet deployment, Public beta with first communities
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">Q1 2026: Growth</h3>
                <p className="text-sm text-purple-600">
                  Multi-community support, Enhanced dispute resolution, Service provider verification
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">Q2 2026: Expansion</h3>
                <p className="text-sm text-yellow-600">
                  Cross-chain deployment, Inter-LETS trading protocols, Merchant payment tools
                </p>
              </div>
            </div>
          </section>

          {/* Technical Specs */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-100 pb-2">
              Technical Specifications
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Infrastructure</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Blockchain: Polygon (Ethereum Layer 2)</li>
                    <li>• Communication: NOSTR Protocol</li>
                    <li>• Frontend: React PWA with Web3</li>
                    <li>• Storage: IPFS + Browser storage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Parameters</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Default Credit Limit: 500 LETS Credits</li>
                    <li>• Balance Decay: 2% monthly</li>
                    <li>• Inactivity Period: 180 days</li>
                    <li>• Reputation Range: 0-1000 points</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-100 pb-2">
              Conclusion
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SOVEREIGN CITIZENS represents more than a technological innovation—it's a pathway to economic freedom. By combining the wisdom of traditional LETS systems with the power of modern decentralized technologies, we're creating infrastructure that enables true economic sovereignty.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The future of money is decentralized, community-controlled, and based on mutual aid rather than scarcity. Together, we can build an economy that serves people, not the other way around.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-100 pb-2">
              Contact Information
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-700">
                <div>Website: sovereign-citizens.network</div>
                <div>GitHub: github.com/sovereign-citizens</div>
                <div>Discord: discord.gg/sovereign-citizens</div>
                <div>Email: contact@sovereign-citizens.network</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WhitePaper;