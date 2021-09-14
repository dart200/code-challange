
interface Track {
  diskNum: number;
  cost: number;
  name: string;
  artist: string;
}

interface Coin {
  value: number;
};

class Jukebox {
  // ready = ready to accept next track
  // starting = placing track from storage => player
  // playing = playing track
  // ending = moving track from player => storage 
  state: 'playing' | 'ready' | 'starting' | 'ending' = 'ready';
  robotState: {
    x: number
    y: number
    z: number
  };

  // list of tracks in this jukebox
  tracks: Track[] = [];
  // current track
  curTrack?: Track;

  // inserted into coin slot, but not yet accepted 
  insertedCoins: Coin[] = [];
  // accepted coins after play is hit
  acceptedCoins: Coin[] = [];

  private moveTrackToPlayer() {}
  private returnTrackFromPlayer() {}

  // insert coin into slot
  insertCoin(coin: Coin) {}
  // cancel 
  cancelCoins() {}

  // checks to see if enough coins have been inserted.
  //  - if not enough, throw error
  //  - if just enough, accept coins, start track playing process
  //  - if too much, reject whole coins until cost is met
  playTrack(trackNum: number) {}
}