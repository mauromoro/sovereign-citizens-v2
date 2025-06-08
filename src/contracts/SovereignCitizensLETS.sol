// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SovereignCitizensLETS
 * @dev Main contract implementing the three-token LETS system:
 * 1. Grant Tokens (lifespan-based, non-transferable)
 * 2. Governance Tokens (experience-based, transferable)
 * 3. LETS Credits (mutual credit, zero-sum trading)
 */
contract SovereignCitizensLETS is Ownable, ReentrancyGuard, Pausable {
    
    // ============ STRUCTS ============
    
    struct Member {
        uint256 birthTimestamp;      // Birth date for grant calculation
        uint256 joinedAt;            // When they joined the system
        int256 letsBalance;          // Can be negative (mutual credit)
        uint256 creditLimit;         // Maximum negative balance allowed
        uint256 reputation;          // 0-1000 reputation score
        uint256 totalTrades;         // Number of completed trades
        uint256 disputesAgainst;     // Number of disputes filed against them
        bool isActive;               // Active membership status
        uint256 lastActivityAt;     // Last trade timestamp
        uint256 grantTokens;         // Lifespan-based tokens (non-transferable)
        uint256 governanceTokens;    // Experience tokens (transferable)
    }
    
    struct Trade {
        address from;                // Service provider
        address to;                  // Service receiver  
        uint256 amount;             // LETS credits amount
        string serviceDescription;   // What was traded
        uint256 timestamp;          // When trade occurred
        bool disputed;              // If trade is under dispute
        bool completed;             // If trade is finalized
        bytes32 nostrEventId;       // Link to NOSTR event
    }
    
    struct Dispute {
        uint256 tradeId;            // Related trade
        address complainant;        // Who filed dispute
        address respondent;         // Who dispute is against
        string reason;              // Dispute description
        uint256 timestamp;          // When filed
        bool resolved;              // Resolution status
        address arbitrator;         // Assigned arbitrator
        string resolution;          // Resolution details
    }
    
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 deadline;
        bool executed;
        mapping(address => bool) hasVoted;
        bytes proposalData;         // Encoded function call
    }
    
    // ============ STATE VARIABLES ============
    
    // Constants
    uint256 public constant LIFESPAN_YEARS = 85;
    uint256 public constant LIFESPAN_SECONDS = LIFESPAN_YEARS * 365.25 days;
    uint256 public constant DEFAULT_CREDIT_LIMIT = 500;
    uint256 public constant MAX_REPUTATION = 1000;
    uint256 public constant DECAY_RATE_BASIS_POINTS = 200; // 2% monthly
    uint256 public constant INACTIVITY_PERIOD = 180 days;
    
    // Member management
    mapping(address => Member) public members;
    mapping(address => bool) public isMember;
    address[] public memberList;
    uint256 public totalMembers;
    
    // Trading system
    Trade[] public trades;
    mapping(uint256 => Dispute) public disputes;
    uint256 public totalTrades;
    uint256 public totalDisputes;
    
    // Governance
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public governanceTokenBalances;
    mapping(address => mapping(address => uint256)) public governanceAllowances;
    uint256 public proposalCount;
    uint256 public totalGovernanceTokens;
    
    // System parameters (configurable via governance)
    uint256 public defaultCreditLimit = DEFAULT_CREDIT_LIMIT;
    uint256 public decayRate = DECAY_RATE_BASIS_POINTS;
    uint256 public inactivityPeriod = INACTIVITY_PERIOD;
    uint256 public proposalDuration = 3 days;
    uint256 public quorumPercentage = 10; // 10% of tokens needed for quorum
    
    // Arbitrators
    mapping(address => bool) public isArbitrator;
    address[] public arbitrators;
    
    // ============ EVENTS ============
    
    event MemberJoined(address indexed member, uint256 birthTimestamp, uint256 grantTokens);
    event TradeExecuted(uint256 indexed tradeId, address indexed from, address indexed to, uint256 amount);
    event DisputeFiled(uint256 indexed disputeId, uint256 indexed tradeId, address indexed complainant);
    event DisputeResolved(uint256 indexed disputeId, address indexed arbitrator, string resolution);
    event ReputationUpdated(address indexed member, uint256 oldReputation, uint256 newReputation);
    event BalanceDecayed(address indexed member, uint256 decayAmount);
    event GovernanceTokensTransferred(address indexed from, address indexed to, uint256 amount);
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId);
    
    // ============ MODIFIERS ============
    
    modifier onlyMember() {
        require(isMember[msg.sender], "Not a member");
        require(members[msg.sender].isActive, "Member not active");
        _;
    }
    
    modifier onlyArbitrator() {
        require(isArbitrator[msg.sender], "Not an arbitrator");
        _;
    }
    
    modifier validMember(address _member) {
        require(isMember[_member], "Invalid member");
        _;
    }
    
    // ============ CONSTRUCTOR ============
    
    constructor() Ownable(msg.sender) {
        // Set deployer as initial arbitrator
        isArbitrator[msg.sender] = true;
        arbitrators.push(msg.sender);
    }
    
    // ============ MEMBER MANAGEMENT ============
    
    /**
     * @dev Join the LETS system with birth date for grant calculation
     * @param _birthTimestamp Unix timestamp of birth date (honor system)
     */
    function joinSystem(uint256 _birthTimestamp) external {
        require(!isMember[msg.sender], "Already a member");
        require(_birthTimestamp > 0, "Invalid birth timestamp");
        require(_birthTimestamp < block.timestamp, "Birth date cannot be in future");
        
        // Calculate age and remaining lifespan
        uint256 age = block.timestamp - _birthTimestamp;
        require(age < LIFESPAN_SECONDS, "Age exceeds maximum lifespan");
        
        uint256 remainingSeconds = LIFESPAN_SECONDS - age;
        uint256 grantTokens = remainingSeconds / 60; // Minutes remaining
        
        // Calculate initial governance tokens based on age (experience)
        uint256 ageYears = age / (365.25 days);
        uint256 initialGovernanceTokens = ageYears * 10; // 10 tokens per year of life
        
        // Create member
        members[msg.sender] = Member({
            birthTimestamp: _birthTimestamp,
            joinedAt: block.timestamp,
            letsBalance: 0,
            creditLimit: defaultCreditLimit,
            reputation: 500, // Start with neutral reputation
            totalTrades: 0,
            disputesAgainst: 0,
            isActive: true,
            lastActivityAt: block.timestamp,
            grantTokens: grantTokens,
            governanceTokens: initialGovernanceTokens
        });
        
        isMember[msg.sender] = true;
        memberList.push(msg.sender);
        totalMembers++;
        
        // Add governance tokens to balance
        governanceTokenBalances[msg.sender] = initialGovernanceTokens;
        totalGovernanceTokens += initialGovernanceTokens;
        
        emit MemberJoined(msg.sender, _birthTimestamp, grantTokens);
    }
    
    /**
     * @dev Update member's credit limit based on reputation and governance decision
     */
    function updateCreditLimit(address _member, uint256 _newLimit) external onlyOwner validMember(_member) {
        members[_member].creditLimit = _newLimit;
    }
    
    /**
     * @dev Deactivate member (emergency function)
     */
    function deactivateMember(address _member) external onlyOwner validMember(_member) {
        members[_member].isActive = false;
    }
    
    // ============ TRADING SYSTEM ============
    
    /**
     * @dev Execute a trade between two members
     * @param _to Service receiver
     * @param _amount LETS credits amount
     * @param _serviceDescription Description of service provided
     * @param _nostrEventId NOSTR event ID for reference
     */
    function executeTrade(
        address _to,
        uint256 _amount,
        string calldata _serviceDescription,
        bytes32 _nostrEventId
    ) external onlyMember validMember(_to) nonReentrant {
        require(_to != msg.sender, "Cannot trade with yourself");
        require(_amount > 0, "Amount must be positive");
        require(bytes(_serviceDescription).length > 0, "Service description required");
        
        Member storage provider = members[msg.sender];
        Member storage receiver = members[_to];
        
        // Check credit limits
        require(
            int256(_amount) <= int256(receiver.creditLimit) + receiver.letsBalance,
            "Receiver credit limit exceeded"
        );
        
        // Update balances (zero-sum)
        provider.letsBalance += int256(_amount);
        receiver.letsBalance -= int256(_amount);
        
        // Update activity timestamps
        provider.lastActivityAt = block.timestamp;
        receiver.lastActivityAt = block.timestamp;
        
        // Update trade counts
        provider.totalTrades++;
        receiver.totalTrades++;
        
        // Create trade record
        trades.push(Trade({
            from: msg.sender,
            to: _to,
            amount: _amount,
            serviceDescription: _serviceDescription,
            timestamp: block.timestamp,
            disputed: false,
            completed: true,
            nostrEventId: _nostrEventId
        }));
        
        uint256 tradeId = totalTrades;
        totalTrades++;
        
        // Reward governance tokens for trading
        _rewardGovernanceTokens(msg.sender, 2); // Provider gets 2 tokens
        _rewardGovernanceTokens(_to, 1);        // Receiver gets 1 token
        
        emit TradeExecuted(tradeId, msg.sender, _to, _amount);
    }
    
    /**
     * @dev File a dispute against a trade
     */
    function fileDispute(uint256 _tradeId, string calldata _reason) external onlyMember {
        require(_tradeId < totalTrades, "Invalid trade ID");
        Trade storage trade = trades[_tradeId];
        require(!trade.disputed, "Trade already disputed");
        require(trade.from == msg.sender || trade.to == msg.sender, "Not party to this trade");
        require(bytes(_reason).length > 0, "Reason required");
        
        trade.disputed = true;
        
        disputes[totalDisputes] = Dispute({
            tradeId: _tradeId,
            complainant: msg.sender,
            respondent: trade.from == msg.sender ? trade.to : trade.from,
            reason: _reason,
            timestamp: block.timestamp,
            resolved: false,
            arbitrator: address(0),
            resolution: ""
        });
        
        // Increment dispute count against respondent
        members[disputes[totalDisputes].respondent].disputesAgainst++;
        
        emit DisputeFiled(totalDisputes, _tradeId, msg.sender);
        totalDisputes++;
    }
    
    /**
     * @dev Resolve a dispute (arbitrator only)
     */
    function resolveDispute(
        uint256 _disputeId,
        string calldata _resolution,
        int256 _adjustment
    ) external onlyArbitrator {
        require(_disputeId < totalDisputes, "Invalid dispute ID");
        Dispute storage dispute = disputes[_disputeId];
        require(!dispute.resolved, "Dispute already resolved");
        
        dispute.resolved = true;
        dispute.arbitrator = msg.sender;
        dispute.resolution = _resolution;
        
        // Apply balance adjustment if needed
        if (_adjustment != 0) {
            Trade storage trade = trades[dispute.tradeId];
            members[trade.from].letsBalance += _adjustment;
            members[trade.to].letsBalance -= _adjustment;
        }
        
        // Update reputations based on resolution
        _updateReputationAfterDispute(_disputeId);
        
        emit DisputeResolved(_disputeId, msg.sender, _resolution);
    }
    
    // ============ GOVERNANCE TOKEN SYSTEM ============
    
    /**
     * @dev Transfer governance tokens between members
     */
    function transferGovernanceTokens(address _to, uint256 _amount) external onlyMember validMember(_to) {
        require(governanceTokenBalances[msg.sender] >= _amount, "Insufficient balance");
        
        governanceTokenBalances[msg.sender] -= _amount;
        governanceTokenBalances[_to] += _amount;
        
        emit GovernanceTokensTransferred(msg.sender, _to, _amount);
    }
    
    /**
     * @dev Approve governance token spending
     */
    function approveGovernance(address _spender, uint256 _amount) external {
        governanceAllowances[msg.sender][_spender] = _amount;
    }
    
    /**
     * @dev Transfer governance tokens on behalf of another address
     */
    function transferGovernanceFrom(address _from, address _to, uint256 _amount) external {
        require(governanceAllowances[_from][msg.sender] >= _amount, "Insufficient allowance");
        require(governanceTokenBalances[_from] >= _amount, "Insufficient balance");
        
        governanceAllowances[_from][msg.sender] -= _amount;
        governanceTokenBalances[_from] -= _amount;
        governanceTokenBalances[_to] += _amount;
        
        emit GovernanceTokensTransferred(_from, _to, _amount);
    }
    
    // ============ GOVERNANCE SYSTEM ============
    
    /**
     * @dev Create a governance proposal
     */
    function createProposal(
        string calldata _title,
        string calldata _description,
        bytes calldata _proposalData
    ) external onlyMember {
        require(governanceTokenBalances[msg.sender] >= 100, "Need 100 governance tokens to propose");
        
        uint256 proposalId = proposalCount;
        Proposal storage proposal = proposals[proposalId];
        
        proposal.id = proposalId;
        proposal.proposer = msg.sender;
        proposal.title = _title;
        proposal.description = _description;
        proposal.deadline = block.timestamp + proposalDuration;
        proposal.proposalData = _proposalData;
        
        proposalCount++;
        
        // Reward proposer with governance tokens
        _rewardGovernanceTokens(msg.sender, 20);
        
        emit ProposalCreated(proposalId, msg.sender, _title);
    }
    
    /**
     * @dev Vote on a proposal
     */
    function vote(uint256 _proposalId, bool _support) external onlyMember {
        require(_proposalId < proposalCount, "Invalid proposal ID");
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp <= proposal.deadline, "Voting period ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        
        uint256 weight = governanceTokenBalances[msg.sender];
        require(weight > 0, "No governance tokens");
        
        proposal.hasVoted[msg.sender] = true;
        
        if (_support) {
            proposal.votesFor += weight;
        } else {
            proposal.votesAgainst += weight;
        }
        
        // Reward voter with governance tokens
        _rewardGovernanceTokens(msg.sender, 4);
        
        emit VoteCast(_proposalId, msg.sender, _support, weight);
    }
    
    /**
     * @dev Execute a passed proposal
     */
    function executeProposal(uint256 _proposalId) external {
        require(_proposalId < proposalCount, "Invalid proposal ID");
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.deadline, "Voting still active");
        require(!proposal.executed, "Already executed");
        
        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
        uint256 requiredQuorum = (totalGovernanceTokens * quorumPercentage) / 100;
        
        require(totalVotes >= requiredQuorum, "Quorum not reached");
        require(proposal.votesFor > proposal.votesAgainst, "Proposal rejected");
        
        proposal.executed = true;
        
        // Execute proposal (this would call other functions based on proposalData)
        // Implementation depends on specific governance actions needed
        
        emit ProposalExecuted(_proposalId);
    }
    
    // ============ BALANCE DECAY SYSTEM ============
    
    /**
     * @dev Apply monthly decay to positive balances
     */
    function applyBalanceDecay(address _member) external validMember(_member) {
        Member storage member = members[_member];
        
        if (member.letsBalance <= 0) return; // Only decay positive balances
        
        uint256 monthsSinceLastActivity = (block.timestamp - member.lastActivityAt) / 30 days;
        if (monthsSinceLastActivity == 0) return;
        
        uint256 decayAmount = (uint256(member.letsBalance) * decayRate * monthsSinceLastActivity) / 10000;
        
        if (decayAmount > 0) {
            member.letsBalance -= int256(decayAmount);
            if (member.letsBalance < 0) member.letsBalance = 0;
            
            emit BalanceDecayed(_member, decayAmount);
        }
    }
    
    // ============ INTERNAL FUNCTIONS ============
    
    function _rewardGovernanceTokens(address _member, uint256 _amount) internal {
        governanceTokenBalances[_member] += _amount;
        totalGovernanceTokens += _amount;
    }
    
    function _updateReputationAfterDispute(uint256 _disputeId) internal {
        Dispute storage dispute = disputes[_disputeId];
        
        // This is a simplified reputation update
        // In practice, you'd want more sophisticated reputation calculations
        if (keccak256(abi.encodePacked(dispute.resolution)) == keccak256(abi.encodePacked("complainant_wins"))) {
            // Reduce respondent reputation
            if (members[dispute.respondent].reputation > 50) {
                members[dispute.respondent].reputation -= 50;
            }
        } else if (keccak256(abi.encodePacked(dispute.resolution)) == keccak256(abi.encodePacked("respondent_wins"))) {
            // Reduce complainant reputation for false complaint
            if (members[dispute.complainant].reputation > 25) {
                members[dispute.complainant].reputation -= 25;
            }
        }
    }
    
    // ============ VIEW FUNCTIONS ============
    
    function getMember(address _member) external view returns (Member memory) {
        return members[_member];
    }
    
    function getTrade(uint256 _tradeId) external view returns (Trade memory) {
        require(_tradeId < totalTrades, "Invalid trade ID");
        return trades[_tradeId];
    }
    
    function getDispute(uint256 _disputeId) external view returns (Dispute memory) {
        require(_disputeId < totalDisputes, "Invalid dispute ID");
        return disputes[_disputeId];
    }
    
    function getGovernanceBalance(address _member) external view returns (uint256) {
        return governanceTokenBalances[_member];
    }
    
    function getTotalGovernanceTokens() external view returns (uint256) {
        return totalGovernanceTokens;
    }
    
    // ============ ADMIN FUNCTIONS ============
    
    function addArbitrator(address _arbitrator) external onlyOwner {
        require(!isArbitrator[_arbitrator], "Already an arbitrator");
        isArbitrator[_arbitrator] = true;
        arbitrators.push(_arbitrator);
    }
    
    function removeArbitrator(address _arbitrator) external onlyOwner {
        require(isArbitrator[_arbitrator], "Not an arbitrator");
        isArbitrator[_arbitrator] = false;
        
        // Remove from arbitrators array
        for (uint i = 0; i < arbitrators.length; i++) {
            if (arbitrators[i] == _arbitrator) {
                arbitrators[i] = arbitrators[arbitrators.length - 1];
                arbitrators.pop();
                break;
            }
        }
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
}