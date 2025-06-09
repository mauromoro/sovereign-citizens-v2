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
    { id: 'chapter20', title: 'Chapter 20: Looking Forward', icon: '🆕' },
    { id: 'chapter21', title: 'Chapter 21: Generational Change', icon: '🆕' },
    { id: 'chapter22', title: 'Chapter 22: Institutional Adoption', icon: '🆕' },
    { id: 'chapter23', title: 'Chapter 23: Personal Evolution', icon: '🆕' },
    { id: 'chapter24', title: 'Chapter 24: Global Crisis', icon: '🌪️' },
    { id: 'chapter25', title: 'Chapter 25: Mainstream Recognition', icon: '🏆' },
    { id: 'chapter26', title: 'Chapter 26: Love and Partnership', icon: '💕' },
    { id: 'chapter27', title: 'Chapter 27: The Next Generation', icon: '👶' },
    { id: 'chapter28', title: 'Chapter 28: Institutional Transformation', icon: '🏦' },
    { id: 'chapter29', title: 'Chapter 29: Global Federation', icon: '🆕' },
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

          {/* Chapter 5: The Network Effect */}
          <ChapterSection id="chapter5" title="Chapter 5: The Network Effect" icon="🌪️">
             <p>
                Word spread through Maya's social networks like wildfire. Her Twitter thread about the SOVEREIGN CITIZENS trade received hundreds of retweets, her Instagram story got thousands of views, and her Reddit post in r/antiwork went viral overnight.
             </p>
              <p>
                The responses revealed a generation hungry for alternatives:
             </p>
             <p>
                "Finally, something that doesn't require family money or connections."
             </p>
             <p>
                "As a 22-year-old, this is the first economic system that actually advantages me."
             </p>
             <p>
                "I'm 58 and unemployed. The governance token calculation makes me feel valued instead of discarded."
             </p>
             <p>
                "This is what economic democracy looks like."
             </p>
              <p>
                But skepticism came too:
             </p>
              <p>
                "Another crypto scam targeting desperate people."
             </p>
              <p>
                "This can't scale. What happens when governments ban it?"
             </p>
              <p>
                "Sounds like bartering with extra steps."
             </p>
             <p>
                Maya found herself becoming an evangelist, responding to comments and questions with growing expertise. She realized this wasn't just about personal economic benefit—she was part of something larger, a fundamental shift in how humans organized value exchange.
             </p>
             <p>
                Her first website project for David's nonprofit became a case study. She documented the entire process: service discovery through NOSTR, negotiation through encrypted messaging, execution through smart contracts, and mutual reputation building. The transparency was revolutionary—every transaction was verifiable, every reputation score was earned, every governance decision was democratic.
             </p>
             <p>
                Other freelancers began joining. Marcus, a graphic designer from Atlanta, created stunning logos for LETS Credits. Sarah, a writer from rural Montana, offered editing services. James, a retired mechanic from Detroit, provided automotive consulting. Each new member increased the network's value for everyone else.
             </p>
             <p>
                Maya started tracking the network's growth: 50 members in week one, 200 in week two, 800 in week three. The exponential curve reminded her of early social media adoption, but this felt more consequential. Social media connected people to share information; SOVEREIGN CITIZENS connected people to share value.
             </p>
          </ChapterSection>

          {/* Chapter 6: The Establishment Pushes Back */}
          <ChapterSection id="chapter6" title="Chapter 6: The Establishment Pushes Back" icon="🌪️">
             <p>
                The first sign of institutional resistance came through Maya's traditional freelance platforms. Upwork suspended her account for "promoting competing services." Fiverr followed with a similar ban. PayPal flagged her account for "suspicious activity" after she mentioned LETS Credits in a payment memo.
             </p>
             <p>
                The message was clear: the existing system wouldn't tolerate alternatives peacefully.
             </p>
             <p>
                "They're scared," Maya told David during one of their regular video calls. "When platforms start banning people for even mentioning alternatives, you know you're threatening their business model."
             </p>
             <p>
                Local news picked up the story after Maya's Twitter thread reached 50,000 retweets. The coverage was predictably dismissive: "Young Woman Promotes Alternative Currency Scheme," "Local Freelancer Falls for Cryptocurrency Scam," "Economic Experts Warn Against Digital Bartering System."
             </p>
             <p>
                The experts they quoted were professors from business schools, bank economists, and policy think tank fellows—exactly the people whose careers depended on the current system's continuation. None had actually used SOVEREIGN CITIZENS or understood its technical architecture.
             </p>
             <p>
                "It's textbook," David observed. "First they ignore you, then they laugh at you, then they fight you, then you win."
             </p>
             <p>
                But the fighting was getting serious. Maya received messages from family members worried about her involvement in a "scam." Her college friends questioned her judgment. Even some potential clients backed away after googling her name and finding the news coverage.
             </p>
             <p>
                The psychological pressure was intense. Maya found herself doubting not the system's technical merits—those were mathematically sound—but her own judgment. Was she deluding herself? Was this really revolutionary change or just another failed experiment?
             </p>
             <p>
                The answer came when she checked her LETS Credit balance: 2,847 credits earned from twelve completed projects. In three weeks, she'd earned more actual purchasing power than her last two months of traditional freelancing. More importantly, she'd built a reputation in a system that couldn't be manipulated by corporate algorithms or payment processor politics.
             </p>
          </ChapterSection>

          {/* Chapter 7: Building Community */}
          <ChapterSection id="chapter7" title="Chapter 7: Building Community" icon="🌪️">
             <p>
                Maya's apartment became an unofficial SOVEREIGN CITIZENS meetup location. Every Thursday evening, local members gathered to share experiences, troubleshoot technical issues, and discuss governance proposals.
             </p>
             <p>
                The group was beautifully diverse: recent college graduates like Maya, career changers in their thirties, laid-off workers in their fifties, and retirees looking for meaningful engagement. What united them wasn't demographics but philosophy—a shared belief that economic systems should serve human flourishing rather than capital accumulation.
             </p>
             <p>
                "I spent thirty years climbing the corporate ladder," said Jennifer, a former marketing executive who'd been laid off at 54. "Now I make more from LETS consulting than I ever did in salary, and I actually enjoy the work."
             </p>
             <p>
                "The governance aspect is huge for me," added Robert, a retired professor. "My governance tokens mean my experience actually counts for something. I'm not just a consumer anymore—I'm a participant in designing the system."
             </p>
             <p>
                Young members like Maya appreciated the intergenerational knowledge transfer. The traditional economy segregated people by age and competition; SOVEREIGN CITIZENS encouraged collaboration across generations. Maya learned business strategy from Jennifer and academic rigor from Robert, while they learned technical skills from her.
             </p>
             <p>
                The Thursday meetings evolved into workshops: technical training for blockchain interaction, philosophy discussions about post-capitalist economics, and practical sessions on service marketing and reputation building. Maya realized they were creating something unprecedented—an economic education system controlled by participants rather than institutions.
             </p>
             <p>
                Governance participation became addictive. Maya found herself reading every proposal, participating in every vote, and even submitting her own suggestions for system improvements. The democracy was real and immediate—changes approved by token holders were implemented through smart contracts within days.
             </p>
             <p>
                One particularly heated debate concerned credit limits for new members. Older members with established reputations wanted higher initial limits to attract more professionals. Younger members wanted lower limits to prevent debt accumulation and maintain system stability.
             </p>
             <p>
                The discussion revealed the system's elegant balance. Grant tokens gave young people initial advantages, governance tokens gave experienced people decision-making weight, but the voting process required compromise and consensus. No single generation could dominate.
             </p>
             <p>
                Maya proposed a graduated system: initial credit limits based on age and experience, with rapid increases based on successful trading history. The proposal passed with 73% support and was implemented the following week.
             </p>
             <p>
                "This is what actual democracy feels like," Maya told her parents during a tense family dinner. "Not choosing between pre-selected candidates every four years, but continuously participating in decisions that affect your daily life."
             </p>
          </ChapterSection>

          {/* Chapter 8: Scaling Challenges */}
          <ChapterSection id="chapter8" title="Chapter 8: Scaling Challenges" icon="🌪️">
             <p>
                By month two, the network faced growing pains. Transaction volume was increasing exponentially, but Polygon network fees remained manageable. More challenging were social dynamics: disputes over service quality, disagreements about reputation scoring, and coordination problems with global membership.
             </p>
             <p>
                Maya found herself mediating conflicts between members who'd never met in person. Cultural differences created misunderstandings—payment timelines that seemed reasonable in one country felt insulting in another. Time zone coordination complicated real-time services. Language barriers limited service discovery efficiency.
             </p>
             <p>
                The technical solutions were impressive. NOSTR's decentralized messaging handled global communication without central servers. Smart contract automation resolved most payment disputes through predefined escrow mechanisms. Reputation systems gradually sorted reliable traders from problematic ones.
             </p>
             <p>
                But human challenges remained stubbornly human. Maya witnessed her first major dispute when a web developer from Eastern Europe delivered work that an American client considered substandard. Both parties had legitimate perspectives shaped by different economic contexts and cultural expectations.
             </p>
             <p>
                The community-based arbitration system worked, eventually. Three randomly selected members with high governance token holdings reviewed the evidence, interviewed both parties, and reached a compromise solution. The process took two weeks and required dozens of hours of volunteer labor.
             </p>
             <p>
                "This is the messiness of democracy," Robert observed during one Thursday meeting. "It's inefficient compared to corporate hierarchy, but it's fair in ways that corporate hierarchy can never be."
             </p>
             <p>
                Maya began to understand that SOVEREIGN CITIZENS wasn't just an economic system—it was a social technology for large-scale cooperation. Every successful dispute resolution strengthened trust. Every governance decision created precedent for future choices. Every new member expanded possibilities for value exchange.
             </p>
             <p>
                The network effects were becoming undeniable. Maya's second month earnings: 4,923 LETS Credits from twenty-eight projects. Her reputation score: 847 out of 1000. Her governance token balance: 267 (base age allocation plus activity rewards).
             </p>
             <p>
                More importantly, her traditional dollar earnings: $0. She hadn't touched her bank account in six weeks. Everything she needed—groceries, rent, utilities, transportation—was available through SOVEREIGN CITIZENS or could be purchased with LETS Credits converted through other members.
             </p>
          </ChapterSection>

          {/* Chapter 9: The Tipping Point */}
          <ChapterSection id="chapter9" title="Chapter 9: The Tipping Point" icon="🌪️">
             <p>
                The breakthrough came when Maya discovered a local grocery store owner who'd joined the network. Elena Rodriguez (no relation) had immigrated from Guatemala five years earlier and struggled with traditional business financing. Banks considered her small neighborhood market too risky despite her dedicated customer base and strong community ties.
             </p>
             <p>
                "The loan applications ask for things I don't have," Elena explained. "Credit history, collateral, financial statements. But I know this community. I provide good food at fair prices. I employ local teenagers. I just need working capital."
             </p>
             <p>
                Maya proposed something revolutionary: Elena could pay her suppliers partially in LETS Credits if they joined the network. Maya helped Elena create service listings for grocery delivery, meal preparation, and small business consulting. Within weeks, Elena was earning credits faster than she could spend them.
             </p>
             <p>
                The ripple effects were extraordinary. Elena's teenage employees joined to earn credits for college expenses. Her suppliers—local farmers and food distributors—joined to expand their customer base. Elena's customers joined to support local business and access Elena's services.
             </p>
             <p>
                Maya watched a complete economic ecosystem emerge around Elena's grocery store. The farmers earned credits selling directly to members. The teenagers earned credits tutoring younger students. Elena earned credits providing business consulting to other immigrant entrepreneurs. Everyone earned credits serving the broader network.
             </p>
             <p>
                Traditional economic metrics couldn't capture the transformation. Elena's dollar revenue remained modest, but her economic security increased dramatically. She had multiple income streams, loyal customers, and a support network of other entrepreneurs facing similar challenges.
             </p>
             <p>
                "This is how local economies should work," Elena told Maya. "Money staying in the community, everyone helping everyone else succeed."
             </p>
             <p>
                Maya realized they'd accidentally recreated something economics textbooks called "embedded markets"—economic exchange integrated with social relationships rather than abstracted from them. But unlike traditional examples constrained by geography, SOVEREIGN CITIZENS created embedded markets at global scale.
             </p>
             <p>
                The model spread rapidly. Other neighborhood businesses joined: barbershops, repair services, tutoring centers, art studios. Each business became a node connecting local community to global network, enabling both intimate economic relationships and access to worldwide opportunities.
             </p>
          </ChapterSection>

          {/* Chapter 10: Personal Transformation */}
          <ChapterSection id="chapter10" title="Chapter 10: Personal Transformation" icon="🌪️">
             <p>

             </p>
          </ChapterSection>

          {/* Chapter 11: Facing the Critics */}
          <ChapterSection id="chapter11" title="Chapter 11: Facing the Critics" icon="🌪️">
             <p>

             </p>
          </ChapterSection>

          {/* Chapter 12: Government Attention */}
          <ChapterSection id="chapter12" title="Chapter 12: Government Attention" icon="🌪️">
             <p>

             </p>
          </ChapterSection>

          {/* Chapter 13: International Growth */}
          <ChapterSection id="chapter13" title="Chapter 13: International Growth" icon="🌪️">
             <p>

             </p>
          </ChapterSection>

          {/* Chapter 14: Technical Evolution */}
          <ChapterSection id="chapter14" title="Chapter 14: Technical Evolution" icon="🌪️">
             <p>

             </p>
          </ChapterSection>

          {/* Chapter 15: Economic Impact */}
          <ChapterSection id="chapter15" title="Chapter 15: Economic Impact" icon="🌪️">
             <p>

             </p>
          </ChapterSection>

          {/* Chapter 16: Personal Challenges */}
          <ChapterSection id="chapter16" title="Chapter 16: Personal Challenges" icon="🌪️">
             <p>

             </p>
          </ChapterSection>

          {/* Chapter 17: Institutional Response */}
          <ChapterSection id="chapter17" title="Chapter 17: Institutional Response" icon="🌪️">
             <p>

             </p>
          </ChapterSection>

          {/* Chapter 18: Scaling Solutions */}
          <ChapterSection id="chapter18" title="Chapter 18: Scaling Solutions" icon="🌪️">
             <p>

             </p>
          </ChapterSection>

          {/* Chapter 19: The New Normal */}
          <ChapterSection id="chapter19" title="Chapter 19: The New Normal" icon="🌪️">
             <p>

             </p>
          </ChapterSection>

          {/* Chapter 20: Looking Forward */}
          <ChapterSection id="chapter20" title="Chapter 20: Looking Forward" icon="🌪️">
             <p>

             </p>
          </ChapterSection>

          {/* Chapter 21: Generational Change */}
          <ChapterSection id="chapter21" title="Chapter 21: Generational Change" icon="🌪️">
            <p>

            </p>
          </ChapterSection>

          {/* Chapter 22: Institutional Adoption */}
          <ChapterSection id="chapter22" title="Chapter 22: Institutional Adoption" icon="🌪️">
            <p>

            </p>
          </ChapterSection>

          {/* Chapter 23: Personal Evolution */}
          <ChapterSection id="chapter23" title="Chapter 23: Personal Evolution" icon="🌪️">
            <p>

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

          {/* Chapter 25: Mainstream Recognition */}
          <ChapterSection id="chapter25" title="Chapter 25: Mainstream Recognition" icon="🌪️">
            <p></p>
          </ChapterSection>

          {/* Chapter 26: Love and Partnership */}
          <ChapterSection id="chapter26" title="Chapter 26: Love and Partnership" icon="🌪️">
            <p></p>
          </ChapterSection>

          {/* Chapter 27: The Next Generation */}
          <ChapterSection id="chapter27" title="Chapter 27: The Next Generation" icon="🌪️">
            <p></p>
          </ChapterSection>

          {/* Chapter 28: Institutional Transformation */}
          <ChapterSection id="chapter28" title="Chapter 28: Institutional Transformation" icon="🌪️">
            <p></p>
          </ChapterSection>

          {/* Chapter 29: Global Federation */}
          <ChapterSection id="chapter29" title="Chapter 29: Global Federation" icon="🌪️">
            <p></p>
          </ChapterSection>

          {/* Chapter 30: Legacy and Continuation */}
          <ChapterSection id="chapter30" title="Chapter 30: Legacy and Continuation" icon="🌪️">
            <p></p>
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