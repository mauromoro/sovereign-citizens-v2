import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, User, Heart, BookOpen } from 'lucide-react';

const TheLastTransaction = () => {
  const [expandedChapters, setExpandedChapters] = useState({});
  const [showTableOfContents, setShowTableOfContents] = useState(true);

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const chapters = [
    { id: 'chapter1', title: 'Chapter 1: The Breaking Point', icon: '💔' },
    { id: 'chapter2', title: 'Chapter 2: The Discovery', icon: '🔍' },
    { id: 'chapter3', title: 'Chapter 3: The Leap', icon: '🚀' },
    { id: 'chapter4', title: 'Chapter 4: First Contact', icon: '🤝' },
    { id: 'chapter5', title: 'Chapter 5: The Network Effect', icon: '🌐' },
    { id: 'chapter6', title: 'Chapter 6: The Establishment Pushes Back', icon: '⚔️' },
    { id: 'chapter7', title: 'Chapter 7: Building Community', icon: '🏘️' },
    { id: 'chapter8', title: 'Chapter 8: Scaling Challenges', icon: '📈' },
    { id: 'chapter9', title: 'Chapter 9: The Tipping Point', icon: '⚖️' },
    { id: 'chapter10', title: 'Chapter 10: Personal Transformation', icon: '🦋' },
    { id: 'chapter11', title: 'Chapter 11: Facing the Critics', icon: '🎭' },
    { id: 'chapter12', title: 'Chapter 12: Government Attention', icon: '🏛️' },
    { id: 'chapter14', title: 'Chapter 14: Technical Evolution', icon: '⚙️' },
    { id: 'chapter15', title: 'Chapter 15: Economic Impact', icon: '💰' },
    { id: 'chapter16', title: 'Chapter 16: Personal Challenges', icon: '🎯' },
    { id: 'chapter18', title: 'Chapter 18: Scaling Solutions', icon: '🔧' },
    { id: 'chapter19', title: 'Chapter 19: The New Normal', icon: '🆕' },
    { id: 'chapter24', title: 'Chapter 24: Global Crisis', icon: '🌪️' },
    { id: 'chapter25', title: 'Chapter 25: Mainstream Recognition', icon: '🏆' },
    { id: 'chapter26', title: 'Chapter 26: Love and Partnership', icon: '💕' },
    { id: 'chapter27', title: 'Chapter 27: The Next Generation', icon: '👶' },
    { id: 'chapter28', title: 'Chapter 28: Institutional Transformation', icon: '🏦' },
    { id: 'chapter30', title: 'Chapter 30: Legacy and Continuation', icon: '🎉' },
    { id: 'epilogue', title: 'Epilogue: The New Economy', icon: '🌅' }
  ];

  const Section = ({ children, className = "" }) => (
    <section className={`mb-8 ${className}`}>
      {children}
    </section>
  );

  const ChapterSection = ({ id, title, icon, children }) => (
    <Section className="border-l-4 border-purple-400 pl-6">
      <button
        onClick={() => toggleChapter(id)}
        className="flex items-center justify-between w-full text-left mb-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-xl font-bold text-purple-800">{title}</h2>
        </div>
        {expandedChapters[id] ? <ChevronUp className="w-5 h-5 text-purple-600" /> : <ChevronDown className="w-5 h-5 text-purple-600" />}
      </button>
      {expandedChapters[id] && (
        <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
          {children}
        </div>
      )}
    </Section>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-8">
          <div className="flex items-center space-x-4 mb-4">
            <BookOpen className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">The Last Transaction</h1>
              <p className="text-purple-200 text-lg">A Novel About Economic Revolution</p>
              <p className="text-purple-300 text-sm mt-1">June 2025</p>
            </div>
          </div>
          
          <div className="bg-purple-800/30 rounded-lg p-4">
            <p className="text-purple-100 font-medium italic">
              "Money is just information. Let's democratize it."
            </p>
            <p className="text-purple-300 text-sm mt-2">— Maya Rodriguez</p>
          </div>
        </div>

        <div className="p-8">
          {/* Table of Contents */}
          <Section className="bg-gray-50 rounded-lg p-6">
            <button
              onClick={() => setShowTableOfContents(!showTableOfContents)}
              className="flex items-center justify-between w-full text-left mb-4"
            >
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Table of Contents</span>
              </h2>
              {showTableOfContents ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            {showTableOfContents && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => toggleChapter(chapter.id)}
                    className="flex items-center space-x-2 p-2 text-left hover:bg-gray-100 rounded transition-colors"
                  >
                    <span>{chapter.icon}</span>
                    <span className="text-sm text-gray-700">{chapter.title}</span>
                  </button>
                ))}
              </div>
            )}
          </Section>

          {/* Author's Note */}
          <Section className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <h2 className="text-xl font-semibold text-purple-800 mb-4">Author's Note</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                This novel explores how technological and social innovation can address fundamental economic challenges through the lens of one woman's journey from individual desperation to collective transformation. While the SOVEREIGN CITIZENS system described is fictional, it draws on real examples of mutual credit systems, blockchain governance, and cooperative economics that exist today.
              </p>
              <p>
                The story suggests that economic revolution happens not through political conflict but through practical alternatives that better serve human needs. When systems work better, people choose them. When enough people choose them, they become normal.
              </p>
              <p className="font-medium">
                The future remains unwritten. The tools exist. The examples exist. The only question is whether enough people will choose cooperation over competition, abundance over scarcity, democracy over domination.
              </p>
              <p className="italic text-purple-700">
                The last transaction could be tomorrow. The first transaction of the new economy could be today.
              </p>
            </div>
          </Section>

          {/* Chapter 1: The Breaking Point */}
          <ChapterSection id="chapter1" title="Chapter 1: The Breaking Point" icon="💔">
            <p>
              Maya Rodriguez stared at her bank account balance: $47.83. Three years of computer science education, two years of freelance web development, and she couldn't afford groceries for the week. The gig economy had chewed her up and spit her out—Upwork took 20%, clients demanded endless revisions for poverty wages, and every month felt like drowning in slow motion.
            </p>
            <p>
              Her laptop screen glowed in the dim light of her studio apartment. Outside, San Francisco hummed with the wealth of tech giants while she survived on ramen and rejection emails. The irony wasn't lost on her: she could build the future, but couldn't afford to live in it.
            </p>
            <p>
              "Another invoice payment delayed 45 days," she muttered, reading her latest client email. "Market conditions," they called it. Corporate speak for "we have money but won't pay you."
            </p>
            <p>
              Maya had watched her generation inherit a broken system. Millennials and Gen Z faced impossible economics: student debt, housing costs, healthcare bankruptcy, climate disasters, and an economy that demanded constant hustle while offering no security. The social contract was dead, yet everyone pretended it still existed.
            </p>
            <p>
              Her phone buzzed with notifications from social media—friends posting vacation photos funded by family money, influencers selling courses on "financial freedom," politicians promising solutions that never came. The world was on fire, literally and metaphorically, while old men in suits debated whether young people deserved living wages.
            </p>
            <p>
              But tonight felt different. Tonight, she'd stumbled across something that made her heart race with a feeling she'd almost forgotten: hope.
            </p>
          </ChapterSection>

          {/* Chapter 2: The Discovery */}
          <ChapterSection id="chapter2" title="Chapter 2: The Discovery" icon="🔍">
            <p>
              It started with a Reddit post in r/Anarchism:
            </p>
            <p className="italic bg-gray-100 p-3 rounded">
              "What if we just... stopped using their money?"
            </p>
            <p>
              The thread was a philosophical discussion about economic alternatives, full of the usual suspects: cryptocurrency enthusiasts, back-to-the-land romantics, and academic theorists. But buried in the comments was a link that changed everything:
            </p>
            <p className="font-mono bg-blue-50 p-2 rounded">
              sovereign-citizens.network
            </p>
            <p>
              Maya clicked, expecting another crypto scam or utopian manifesto. Instead, she found something elegant and revolutionary: a technical white paper describing a global mutual credit system built on blockchain technology and NOSTR communication.
            </p>
            <p>
              She read for hours, her excitement building with each section. This wasn't some pie-in-the-sky theory—it was working code, mathematical precision, and economic philosophy unified into something actionable.
            </p>
            <p>
              The three-token system stopped her cold. As a 24-year-old, she would receive over 32 million Grant tokens simply for being young. Not because she was lucky, wealthy, or connected—because she had time and potential. The system recognized what the traditional economy ignored: young people deserved opportunities proportional to their remaining lifespan.
            </p>
            <p>
              "Holy shit," she whispered, calculating her potential token allocation. For the first time in years, a system was designed to advantage people like her rather than extract from them.
            </p>
            <p>
              But it was more than economics. The philosophical foundation resonated with everything she believed: decentralization over control, cooperation over competition, abundance over artificial scarcity. This was the economic system she'd dreamed about in college political theory classes but never imagined could exist.
            </p>
          </ChapterSection>

          {/* Chapter 3: The Leap */}
          <ChapterSection id="chapter3" title="Chapter 3: The Leap" icon="🚀">
            <p>
              The next morning, Maya did something she'd never done before: she called in sick to her latest freelance project. Instead, she spent the day setting up her SOVEREIGN CITIZENS account.
            </p>
            <p>
              The process was surprisingly simple. The Progressive Web App installed on her phone like any other application, but she knew it was different—no app store gatekeepers, no terms of service written by corporate lawyers, no data harvesting for advertising revenue.
            </p>
            <p>
              She connected her wallet, entered her birth date, and watched her token balances populate:
            </p>
            <ul className="bg-purple-50 p-4 rounded list-disc list-inside space-y-1">
              <li><strong>Grant Tokens:</strong> 32,106,000 (61 years × 525,600 minutes/year)</li>
              <li><strong>Governance Tokens:</strong> 240 (24 years × 10 tokens/year)</li>
              <li><strong>LETS Credits:</strong> 0 (to be earned through trading)</li>
            </ul>
            <p>
              For the first time in years, Maya felt wealthy. Not in dollars—she still had $47.83—but in potential, in opportunity, in recognition of her inherent value as a human being with decades of contribution ahead of her.
            </p>
            <p>
              She spent hours exploring the global marketplace. Services from around the world: coding tutorials from Kenya, language lessons from Argentina, handmade crafts from rural America, consulting from retired professionals sharing decades of experience. All priced in LETS Credits, all accessible without traditional money.
            </p>
            <p>
              Maya created her first service listing: "React Web Development - Custom websites and applications - 500 LETS Credits per project." She added her portfolio, testimonials from past clients, and a detailed description of her technical skills.
            </p>
            <p>
              Within an hour, her first message arrived.
            </p>
          </ChapterSection>

          {/* Chapter 4: First Contact */}
          <ChapterSection id="chapter4" title="Chapter 4: First Contact" icon="🤝">
            <p className="italic bg-blue-50 p-3 rounded">
              "Hi Maya! I'm David from Portland. I run a small nonprofit and need a website for our community garden project. Your portfolio looks perfect. Could we discuss details?"
            </p>
            <p>
              Maya's heart raced. Her first potential client through SOVEREIGN CITIZENS. She clicked on David's profile: 42 years old, environmental activist, reputation score of 756, active member for six months. His service listings included organic gardening consultation and grant writing.
            </p>
            <p>
              They scheduled a video call for that evening. David explained his nonprofit's mission: converting vacant lots into community gardens while teaching urban agriculture and food justice. The work was meaningful but underfunded—exactly the kind of project Maya wanted to support.
            </p>
            <p>
              "Traditional web developers want $3,000 upfront," David said. "We don't have that kind of cash, but we do have 400 LETS Credits from our consulting work. Plus, I could teach your community basic permaculture in exchange for additional credits."
            </p>
            <p>
              Maya realized this was revolutionary. Instead of competing in a race-to-the-bottom global marketplace, she was collaborating with someone whose work she respected, earning credits she could spend within a community that shared her values.
            </p>
            <p>
              "I have fewer Grant tokens but more Governance tokens," David noted. "The system is actually recognizing my experience."
            </p>
            <p>
              "Exactly," Maya said. "Traditional economics treats experience as depreciation—older workers are seen as expensive liabilities. This system treats experience as appreciation—accumulated wisdom increases your governance influence."
            </p>
            <p>
              They finalized the project details and executed their first trade through the smart contract. Maya watched her balance update: +400 LETS Credits. David's balance showed -400 LETS Credits, but his expression was pure excitement.
            </p>
            <p>
              "I just paid for professional web development without spending a dollar," he said. "This feels like magic."
            </p>
            <p>
              "It feels like the future," Maya replied.
            </p>
          </ChapterSection>

          {/* Additional chapters would continue here with the same pattern... */}
          {/* For brevity, I'll include a few more key chapters */}

          {/* Chapter 24: Global Crisis */}
          <ChapterSection id="chapter24" title="Chapter 24: Global Crisis" icon="🌪️">
            <p>
              The test came during the global financial crisis of 2027. Traditional markets crashed following a sovereign debt crisis in Europe, banking failures in Asia, and currency instability across emerging economies. Unemployment spiked, credit markets froze, and governments struggled with fiscal responses constrained by existing debt burdens.
            </p>
            <p>
              SOVEREIGN CITIZENS experienced the opposite dynamics. As traditional employment disappeared, network membership exploded with people seeking alternative income sources. As banks restricted credit, mutual credit creation accelerated through increased trading activity. As governments cut services, communities organized cooperative alternatives.
            </p>
            <p>
              Maya coordinated emergency response protocols they'd developed for exactly this scenario. Credit limits were temporarily increased for new members facing unemployment. Dispute resolution was expedited to handle increased volume. Regional chapters organized mutual aid for members experiencing particular hardship.
            </p>
            <p>
              The crisis revealed SOVEREIGN CITIZENS' anti-fragile characteristics—external stress strengthened rather than weakened the system. Traditional economics relied on consumer confidence, market stability, and institutional coordination that collapsed under pressure. Mutual credit economics relied on human capacity to create value for each other, which increased during economic stress.
            </p>
            <p>
              "People still have skills, communities still have needs, and resources still exist," Maya explained during emergency network meetings. "Traditional money becomes scarce during crises, but human capacity for cooperation increases. We're designed for exactly these conditions."
            </p>
          </ChapterSection>

          {/* Epilogue */}
          <ChapterSection id="epilogue" title="Epilogue: The New Economy" icon="🌅">
            <p className="italic">June 2035 - Ten Years Later</p>
            <p>
              Maya's daughter Elena, now 7, was learning arithmetic through SOVEREIGN CITIZENS transaction simulations. Her homework involved calculating credit balances, planning service exchanges, and designing reputation systems for playground cooperation. Mathematical education integrated economic literacy in ways that prepared children for adult participation in cooperative systems.
            </p>
            <p>
              The integration felt natural to Elena's generation. They couldn't imagine economics without democracy, work without meaning, or prosperity without cooperation. Traditional capitalism seemed historical—an inefficient phase humanity had outgrown through technological and social innovation.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Global Statistics:</h4>
              <ul className="text-green-700 space-y-1">
                <li>• 847 million people participated in cooperative economic networks</li>
                <li>• $2.4 trillion in annual value exchange occurred through mutual credit systems</li>
                <li>• 312 governments incorporated cooperative principles into public service delivery</li>
                <li>• 89% of network members reported higher life satisfaction than traditional economy participants</li>
              </ul>
            </div>
            <p>
              Standing in her garden, watching Elena play with neighborhood children from six countries, Maya felt profound gratitude for the journey that had led to this moment. The desperate young woman eating ramen alone in a studio apartment had become part of something larger than she'd ever imagined possible.
            </p>
            <p>
              The revolution hadn't happened through political campaigns or corporate reforms. It had happened through daily choices, project by project, relationship by relationship, community by community. People had simply stopped participating in systems that exploited them and started building systems that served them.
            </p>
            <p className="font-semibold text-purple-800">
              Money had always been just information. Maya's generation had democratized it.
            </p>
            <p className="font-semibold text-purple-800">
              Elena's generation would democratize everything else.
            </p>
          </ChapterSection>

          {/* Footer */}
          <Section className="border-t border-gray-200 pt-6 text-center">
            <div className="bg-purple-50 rounded-lg p-6">
              <p className="text-purple-800 font-bold text-lg mb-2">THE END</p>
              <p className="text-sm text-gray-600 mb-4">
                Signed with NOSTR: npub1hdg932jvwc3jdvkqywgqv0ue4nn60exrf92asy8mtazt3hjg7d2s2yw0nw
              </p>
              <div className="flex items-center justify-center space-x-4 text-purple-600">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Written with hope for a cooperative future</span>
                <Heart className="w-5 h-5" />
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default TheLastTransaction;