import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronRight } from 'lucide-react';

const WhitePaper = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const Section = ({ id, title, children, defaultExpanded = false }) => {
    const isExpanded = expandedSections[id] ?? defaultExpanded;
    
    return (
      <section className="border border-gray-200 rounded-lg mb-4">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-gray-100">
            {children}
          </div>
        )}
      </section>
    );
  };

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
        <div className="p-6 space-y-4">
          {/* Abstract - Always Expanded */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-100 pb-2">
              Abstract
            </h2>
            <p className="text-gray-600 leading-relaxed">
              SOVEREIGN CITIZENS reimagines community-based value exchange by combining proven Local Exchange Trading System (LETS) principles with NOSTR protocol communication and blockchain infrastructure. Through a revolutionary three-token architecture that balances opportunity, experience, and economic activity, the system enables global peer-to-peer trading while maintaining the community spirit of traditional LETS. Built as a Progressive Web App on Polygon with NOSTR-based service discovery, SOVEREIGN CITIZENS creates the world's first truly sovereign economic network.
            </p>
          </section>

          {/* Collapsible Sections */}
          <Section id="introduction" title="1. Introduction" defaultExpanded={true}>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">1.1 Vision Statement</h3>
                <p className="text-gray-600 leading-relaxed">
                  SOVEREIGN CITIZENS envisions a world where individuals can create and exchange value without dependence on traditional monetary systems, central authorities, or geographic constraints. By combining time-tested mutual credit principles with cutting-edge decentralized technologies, we're building infrastructure for true economic sovereignty.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">1.2 Core Philosophy</h3>
                <blockquote className="bg-blue-50 border-l-4 border-blue-400 p-4 italic text-gray-700">
                  "Money is just information. Let's democratize it."
                </blockquote>
                <p className="text-gray-600 leading-relaxed mt-2">
                  Our system treats economic exchange as information flow, enabling any individual to participate in value creation regardless of their access to traditional currency.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">1.3 Revolutionary Innovation</h3>
                <p className="text-gray-600 leading-relaxed mb-2">
                  Unlike traditional LETS systems limited to local communities, SOVEREIGN CITIZENS creates a global network where:
                </p>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Anyone can trade with anyone through NOSTR-based discovery</li>
                  <li>• Trust scales globally through blockchain-verified reputation</li>
                  <li>• Value reflects life itself through lifespan-based token distribution</li>
                  <li>• Wisdom guides decisions through experience-weighted governance</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="problem" title="2. Problem Statement">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">2.1 The Monetary Sovereignty Crisis</h3>
                <p className="text-gray-600 leading-relaxed mb-2">Modern individuals face unprecedented economic dependency:</p>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• <strong>Artificial Scarcity:</strong> Abundant skills and needs constrained by money supply</li>
                  <li>• <strong>Centralized Control:</strong> Economic participation controlled by banks and governments</li>
                  <li>• <strong>Geographic Barriers:</strong> Local communities isolated from global opportunities</li>
                  <li>• <strong>Wealth Extraction:</strong> Value created locally flows to distant financial centers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">2.2 Traditional LETS Limitations</h3>
                <p className="text-gray-600 leading-relaxed mb-2">While LETS systems address monetary scarcity, they suffer critical weaknesses:</p>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• <strong>Trust Bottlenecks:</strong> Difficulty assessing unknown members' creditworthiness</li>
                  <li>• <strong>Scale Constraints:</strong> Limited to small, local communities</li>
                  <li>• <strong>Administrative Burden:</strong> Manual bookkeeping and dispute resolution</li>
                  <li>• <strong>Isolation:</strong> No interaction between different LETS networks</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="architecture" title="4. Three-Token Architecture">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">Grant Tokens (GT)</h3>
                  <p className="text-sm text-purple-600 mb-2">Opportunity Based</p>
                  <p className="text-xs text-purple-600">
                    <strong>Formula:</strong> (85 - current_age) × 525,600 minutes/year
                  </p>
                  <p className="text-xs text-purple-600 mt-2">
                    Rewards remaining lifespan potential. Non-transferable, one-time allocation.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">Governance Tokens (GOV)</h3>
                  <p className="text-sm text-blue-600 mb-2">Experience Based</p>
                  <p className="text-xs text-blue-600">
                    <strong>Base:</strong> current_age × 10 tokens/year
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    Earned through experience and participation. Transferable for delegation.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">LETS Credits (LC)</h3>
                  <p className="text-sm text-green-600 mb-2">Activity Based</p>
                  <p className="text-xs text-green-600">
                    <strong>Default Limit:</strong> 500 credits
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    Mutual credit currency for trading. Created at moment of transaction.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Token Interaction Examples</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Young User (Age 25):</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Grant Tokens: 31,536,000 (60 years remaining)</li>
                        <li>• Governance Tokens: 250 (base allocation)</li>
                        <li>• LETS Credits: Earned through trading</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Experienced User (Age 55):</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Grant Tokens: 15,768,000 (30 years remaining)</li>
                        <li>• Governance Tokens: 550+ (base + activity)</li>
                        <li>• LETS Credits: Earned through trading</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="nostr" title="5. NOSTR Integration">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">5.1 Why NOSTR?</h3>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• <strong>Decentralized Communication:</strong> No central servers or gatekeepers</li>
                  <li>• <strong>Global Reach:</strong> Connect with traders worldwide</li>
                  <li>• <strong>Censorship Resistance:</strong> Cannot be shut down by authorities</li>
                  <li>• <strong>Interoperability:</strong> Works with existing NOSTR infrastructure</li>
                  <li>• <strong>Privacy:</strong> Users control their data and identity</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">5.2 Service Discovery Protocol</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2"><strong>Service Listings (Kind 30023):</strong></p>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4">
                    <li>• Decentralized service marketplace</li>
                    <li>• Private messaging for trade details</li>
                    <li>• Public reputation events</li>
                    <li>• Verifiable trading history</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          <Section id="technical" title="6. Technical Implementation">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">6.1 Smart Contract Architecture</h3>
                <p className="text-gray-600 mb-2">SovereignCitizensLETS.sol provides:</p>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Member management with birth date tracking</li>
                  <li>• Three-token balance accounting</li>
                  <li>• Credit limit enforcement based on reputation</li>
                  <li>• Automated balance decay (2% monthly on positive balances)</li>
                  <li>• Dispute resolution with community arbitration</li>
                  <li>• Governance proposals and voting</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">6.2 Progressive Web App Features</h3>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Installable on all devices without app stores</li>
                  <li>• Offline functionality with background sync</li>
                  <li>• Push notifications for trades and governance</li>
                  <li>• Service worker caching for performance</li>
                  <li>• Cross-platform consistency</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="economics" title="7. Economic Model">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">7.1 Credit Creation Mechanics</h3>
                <p className="text-gray-600 mb-2">Traditional LETS principles with blockchain verification:</p>
                <ol className="text-gray-600 space-y-1 ml-4 list-decimal">
                  <li>Service provider offers service via NOSTR</li>
                  <li>Service requester finds provider through global search</li>
                  <li>Private messaging to agree on terms</li>
                  <li>Smart contract creates credits for provider, debits for requester</li>
                  <li>Both parties update reputation</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">7.2 Balance Decay System</h3>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Positive balances decay 2% monthly (configurable)</li>
                  <li>• Encourages circulation over hoarding</li>
                  <li>• No decay on negative balances (no interest charges)</li>
                  <li>• Decay proceeds fund community initiatives</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="governance" title="8. Governance Framework">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">8.1 Proposal System</h3>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Any member with 100+ governance tokens can propose</li>
                  <li>• 3-day voting period</li>
                  <li>• Simple majority with 10% quorum</li>
                  <li>• Automatic execution via smart contract</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">8.2 Governance Token Rewards</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <ul className="text-gray-600 space-y-1">
                    <li>• Trade Completion: 1-2 tokens per trade</li>
                    <li>• Dispute Resolution: 5-10 tokens for arbitrators</li>
                    <li>• Governance Proposal: 10-20 tokens for proposers</li>
                    <li>• Voting Participation: 2-4 tokens per vote</li>
                    <li>• Profile Verification: 5 tokens one-time</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          <Section id="security" title="10. Security Considerations">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">10.1 Smart Contract Security</h3>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Professional security audit before mainnet deployment</li>
                  <li>• Proxy pattern for critical bug fixes</li>
                  <li>• Pause functionality for crisis management</li>
                  <li>• Distinct permissions for different functions</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">10.2 Privacy and Data Protection</h3>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Self-sovereign identity: Users control their keys and data</li>
                  <li>• NOSTR privacy: Optional pseudonymous participation</li>
                  <li>• Minimal data collection: Only necessary information stored</li>
                  <li>• Right to be forgotten: Users can delete their accounts</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="roadmap" title="11. Roadmap">
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Q3 2025: Foundation ✅</h3>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• Core smart contract development</li>
                  <li>• NOSTR integration</li>
                  <li>• PWA basic functionality</li>
                  <li>• Three-token system implementation</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Q4 2025: Launch</h3>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• Security audit completion</li>
                  <li>• Polygon mainnet deployment</li>
                  <li>• Public beta with first communities</li>
                  <li>• Full PWA offline capabilities</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">Q1 2026: Growth</h3>
                <ul className="text-sm text-purple-600 space-y-1">
                  <li>• Multi-community support</li>
                  <li>• Enhanced dispute resolution</li>
                  <li>• Service provider verification</li>
                  <li>• API for third-party integrations</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">Q2 2026: Expansion</h3>
                <ul className="text-sm text-yellow-600 space-y-1">
                  <li>• Cross-chain deployment (Ethereum, Arbitrum)</li>
                  <li>• Inter-LETS trading protocols</li>
                  <li>• Merchant payment tools</li>
                  <li>• Advanced analytics and insights</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="technical-specs" title="A. Technical Specifications">
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
                  <h4 className="font-semibold text-gray-700 mb-2">Economic Parameters</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Default Credit Limit: 500 LETS Credits</li>
                    <li>• Balance Decay: 2% monthly</li>
                    <li>• Inactivity Period: 180 days</li>
                    <li>• Reputation Range: 0-1000 points</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          {/* Conclusion - Always Expanded */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-blue-100 pb-2">
              12. Conclusion
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              SOVEREIGN CITIZENS represents more than a technological innovation—it's a pathway to economic freedom. By combining the wisdom of traditional LETS systems with the power of modern decentralized technologies, we're creating infrastructure that enables true economic sovereignty.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our three-token architecture solves the fundamental challenge of balancing opportunity with experience, ensuring fair distribution while maintaining incentives for participation and good governance. The integration of NOSTR communication enables global reach while preserving the community spirit that makes LETS systems successful.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The future of money is decentralized, community-controlled, and based on mutual aid rather than scarcity. Together, we can build an economy that serves people, not the other way around.
            </p>
            <blockquote className="bg-blue-50 border-l-4 border-blue-400 p-4 italic text-gray-700 mt-4">
              "The most revolutionary act in our time is to introduce a new economic system that serves people rather than profit."
            </blockquote>
          </section>

          {/* Contact Information */}
          <section className="mt-6">
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