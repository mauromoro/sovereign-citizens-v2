// NOSTR Integration for SOVEREIGN CITIZENS
// Handles service discovery, messaging, and reputation through NOSTR protocol

import { SimplePool, getEventHash, getSignature, getPublicKey, generatePrivateKey } from 'nostr-tools';

class NOSTRClient {
  constructor() {
    this.pool = new SimplePool();
    this.relays = [
      'wss://relay.damus.io',
      'wss://nos.lol', 
      'wss://relay.snort.social',
      'wss://relay.nostr.band',
      'wss://nostr-pub.wellorder.net'
    ];
    
    this.privateKey = null;
    this.publicKey = null;
    this.connectedRelays = new Set();
    this.subscriptions = new Map();
    
    // Service-related event kinds
    this.EVENT_KINDS = {
      SERVICE_LISTING: 30023,    // Classifieds/marketplace
      SERVICE_REQUEST: 30024,    // Request for service
      TRADE_OFFER: 30025,        // Specific trade offer
      REPUTATION: 30026,         // Reputation/review
      DIRECT_MESSAGE: 4,         // Private messaging
      PROFILE: 0,                // User profile
      SHORT_NOTE: 1              // General posts
    };
  }

  // Initialize NOSTR connection
  async initialize() {
    try {
      // Try to load existing key from storage
      const savedKey = localStorage.getItem('nostr_private_key');
      
      if (savedKey) {
        this.privateKey = savedKey;
      } else {
        // Generate new key pair
        this.privateKey = generatePrivateKey();
        localStorage.setItem('nostr_private_key', this.privateKey);
      }
      
      this.publicKey = getPublicKey(this.privateKey);
      
      // Connect to relays
      await this.connectToRelays();
      
      console.log('NOSTR initialized:', this.publicKey);
      return true;
    } catch (error) {
      console.error('Failed to initialize NOSTR:', error);
      return false;
    }
  }

  // Connect to NOSTR relays
  async connectToRelays() {
    const connectionPromises = this.relays.map(async (relay) => {
      try {
        await this.pool.ensureRelay(relay);
        this.connectedRelays.add(relay);
        console.log('Connected to relay:', relay);
      } catch (error) {
        console.warn('Failed to connect to relay:', relay, error);
      }
    });
    
    await Promise.allSettled(connectionPromises);
    console.log(`Connected to ${this.connectedRelays.size}/${this.relays.length} relays`);
  }

  // Publish a service listing
  async publishService(serviceData) {
    const event = {
      kind: this.EVENT_KINDS.SERVICE_LISTING,
      content: JSON.stringify({
        title: serviceData.title,
        description: serviceData.description,
        category: serviceData.category,
        price: serviceData.price,
        currency: 'LETS_CREDITS',
        location: serviceData.location || 'global',
        tags: serviceData.tags || [],
        contact_method: 'nostr_dm'
      }),
      tags: [
        ['d', serviceData.id || Date.now().toString()], // Replaceable event identifier
        ['title', serviceData.title],
        ['category', serviceData.category],
        ['price', serviceData.price.toString()],
        ['currency', 'LETS_CREDITS'],
        ...(serviceData.tags || []).map(tag => ['t', tag])
      ],
      created_at: Math.floor(Date.now() / 1000),
      pubkey: this.publicKey
    };

    return this.publishEvent(event);
  }

  // Request a service
  async publishServiceRequest(requestData) {
    const event = {
      kind: this.EVENT_KINDS.SERVICE_REQUEST,
      content: JSON.stringify({
        title: requestData.title,
        description: requestData.description,
        category: requestData.category,
        budget: requestData.budget,
        currency: 'LETS_CREDITS',
        deadline: requestData.deadline,
        location: requestData.location || 'global'
      }),
      tags: [
        ['d', requestData.id || Date.now().toString()],
        ['title', requestData.title],
        ['category', requestData.category],
        ['budget', requestData.budget.toString()],
        ['currency', 'LETS_CREDITS']
      ],
      created_at: Math.floor(Date.now() / 1000),
      pubkey: this.publicKey
    };

    return this.publishEvent(event);
  }

  // Publish trade offer
  async publishTradeOffer(tradeData) {
    const event = {
      kind: this.EVENT_KINDS.TRADE_OFFER,
      content: JSON.stringify({
        service_id: tradeData.serviceId,
        provider_pubkey: tradeData.providerPubkey,
        requester_pubkey: this.publicKey,
        amount: tradeData.amount,
        terms: tradeData.terms,
        escrow: tradeData.escrow || false,
        status: 'pending'
      }),
      tags: [
        ['d', tradeData.id || Date.now().toString()],
        ['p', tradeData.providerPubkey], // Tag the service provider
        ['e', tradeData.serviceId], // Reference the service listing
        ['amount', tradeData.amount.toString()],
        ['status', 'pending']
      ],
      created_at: Math.floor(Date.now() / 1000),
      pubkey: this.publicKey
    };

    return this.publishEvent(event);
  }

  // Publish reputation/review
  async publishReputation(reputationData) {
    const event = {
      kind: this.EVENT_KINDS.REPUTATION,
      content: JSON.stringify({
        trade_id: reputationData.tradeId,
        rated_pubkey: reputationData.ratedPubkey,
        rating: reputationData.rating, // 1-5 stars
        review: reputationData.review,
        trade_amount: reputationData.tradeAmount,
        completion_time: reputationData.completionTime
      }),
      tags: [
        ['d', reputationData.id || Date.now().toString()],
        ['p', reputationData.ratedPubkey], // Person being rated
        ['e', reputationData.tradeId], // Trade reference
        ['rating', reputationData.rating.toString()],
        ['trade_amount', reputationData.tradeAmount.toString()]
      ],
      created_at: Math.floor(Date.now() / 1000),
      pubkey: this.publicKey
    };

    return this.publishEvent(event);
  }

  // Send direct message
  async sendDirectMessage(recipientPubkey, message) {
    // Note: This is a simplified DM implementation
    // In production, you'd want proper encryption
    const event = {
      kind: this.EVENT_KINDS.DIRECT_MESSAGE,
      content: message,
      tags: [
        ['p', recipientPubkey]
      ],
      created_at: Math.floor(Date.now() / 1000),
      pubkey: this.publicKey
    };

    return this.publishEvent(event);
  }

  // Generic event publisher
  async publishEvent(event) {
    try {
      // Add event hash and signature
      event.id = getEventHash(event);
      event.sig = getSignature(event, this.privateKey);

      // Publish to all connected relays
      const publishPromises = Array.from(this.connectedRelays).map(relay =>
        this.pool.publish([relay], event)
      );

      await Promise.allSettled(publishPromises);
      console.log('Event published:', event.id);
      return event;
    } catch (error) {
      console.error('Failed to publish event:', error);
      throw error;
    }
  }

  // Subscribe to service listings
  subscribeToServices(callback, filters = {}) {
    const filter = {
      kinds: [this.EVENT_KINDS.SERVICE_LISTING],
      limit: 100,
      ...filters
    };

    const sub = this.pool.sub(Array.from(this.connectedRelays), [filter]);
    
    sub.on('event', (event) => {
      try {
        const serviceData = JSON.parse(event.content);
        callback({
          id: event.id,
          pubkey: event.pubkey,
          created_at: event.created_at,
          ...serviceData
        });
      } catch (error) {
        console.error('Failed to parse service event:', error);
      }
    });

    this.subscriptions.set('services', sub);
    return sub;
  }

  // Subscribe to trade offers for current user
  subscribeToTradeOffers(callback) {
    const filter = {
      kinds: [this.EVENT_KINDS.TRADE_OFFER],
      '#p': [this.publicKey], // Offers directed to us
      limit: 50
    };

    const sub = this.pool.sub(Array.from(this.connectedRelays), [filter]);
    
    sub.on('event', (event) => {
      try {
        const tradeData = JSON.parse(event.content);
        callback({
          id: event.id,
          pubkey: event.pubkey,
          created_at: event.created_at,
          ...tradeData
        });
      } catch (error) {
        console.error('Failed to parse trade offer:', error);
      }
    });

    this.subscriptions.set('trade_offers', sub);
    return sub;
  }

  // Subscribe to direct messages
  subscribeToDirectMessages(callback) {
    const filter = {
      kinds: [this.EVENT_KINDS.DIRECT_MESSAGE],
      '#p': [this.publicKey],
      limit: 100
    };

    const sub = this.pool.sub(Array.from(this.connectedRelays), [filter]);
    
    sub.on('event', (event) => {
      callback({
        id: event.id,
        from: event.pubkey,
        to: this.publicKey,
        content: event.content,
        created_at: event.created_at
      });
    });

    this.subscriptions.set('direct_messages', sub);
    return sub;
  }

  // Get reputation for a specific pubkey
  async getReputation(pubkey) {
    const filter = {
      kinds: [this.EVENT_KINDS.REPUTATION],
      '#p': [pubkey],
      limit: 100
    };

    return new Promise((resolve) => {
      const reviews = [];
      const sub = this.pool.sub(Array.from(this.connectedRelays), [filter]);
      
      sub.on('event', (event) => {
        try {
          const reputationData = JSON.parse(event.content);
          reviews.push({
            id: event.id,
            reviewer: event.pubkey,
            created_at: event.created_at,
            ...reputationData
          });
        } catch (error) {
          console.error('Failed to parse reputation event:', error);
        }
      });

      sub.on('eose', () => {
        // Calculate average rating
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
        
        resolve({
          average_rating: averageRating,
          total_reviews: reviews.length,
          reviews: reviews
        });
        
        sub.unsub();
      });
    });
  }

  // Get user profile
  async getUserProfile(pubkey) {
    const filter = {
      kinds: [this.EVENT_KINDS.PROFILE],
      authors: [pubkey],
      limit: 1
    };

    return new Promise((resolve) => {
      const sub = this.pool.sub(Array.from(this.connectedRelays), [filter]);
      
      sub.on('event', (event) => {
        try {
          const profile = JSON.parse(event.content);
          resolve(profile);
          sub.unsub();
        } catch (error) {
          console.error('Failed to parse profile:', error);
          resolve(null);
        }
      });

      sub.on('eose', () => {
        resolve(null);
        sub.unsub();
      });
    });
  }

  // Update user profile
  async updateProfile(profileData) {
    const event = {
      kind: this.EVENT_KINDS.PROFILE,
      content: JSON.stringify({
        name: profileData.name,
        about: profileData.about,
        picture: profileData.picture,
        nip05: profileData.nip05,
        lud16: profileData.lud16,
        // LETS-specific fields
        skills: profileData.skills || [],
        location: profileData.location,
        sovereign_citizen_since: profileData.joinDate,
        lets_reputation: profileData.letsReputation
      }),
      tags: [],
      created_at: Math.floor(Date.now() / 1000),
      pubkey: this.publicKey
    };

    return this.publishEvent(event);
  }

  // Close subscription
  closeSubscription(name) {
    const sub = this.subscriptions.get(name);
    if (sub) {
      sub.unsub();
      this.subscriptions.delete(name);
    }
  }

  // Close all subscriptions
  closeAllSubscriptions() {
    for (const [name, sub] of this.subscriptions) {
      sub.unsub();
    }
    this.subscriptions.clear();
  }

  // Disconnect from all relays
  disconnect() {
    this.closeAllSubscriptions();
    this.pool.close(Array.from(this.connectedRelays));
    this.connectedRelays.clear();
  }

  // Get current user's public key (for UI display)
  getCurrentUserPubkey() {
    return this.publicKey;
  }

  // Check if client is initialized
  isInitialized() {
    return this.publicKey !== null && this.connectedRelays.size > 0;
  }
}

// Utility functions
export const formatPubkey = (pubkey) => {
  if (!pubkey) return '';
  return `${pubkey.slice(0, 8)}...${pubkey.slice(-8)}`;
};

export const formatTimestamp = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

// Export the NOSTR client class
export default NOSTRClient;