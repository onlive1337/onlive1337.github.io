const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_ID;

interface SteamGameInfo {
  name: string;
  gameId: string;
  imageUrl: string;
  isPlaying: boolean;
  playTime2Weeks?: number;
}

export async function getCurrentGame(): Promise<SteamGameInfo | null> {
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`
    );
    const data = await response.json();
    
    if (!data?.response?.players?.[0]) {
      throw new Error('No player data found');
    }

    const player = data.response.players[0];

    if (player.gameextrainfo && player.gameid) {
      return {
        name: player.gameextrainfo,
        gameId: player.gameid,
        imageUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${player.gameid}/header.jpg`,
        isPlaying: true,
      };
    }

    const recentGamesResponse = await fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&format=json`
    );
    const recentGames = await recentGamesResponse.json();

    if (recentGames?.response?.games && recentGames.response.games.length > 0) {
      const topGame = recentGames.response.games.sort(
        (a: any, b: any) => b.playtime_2weeks - a.playtime_2weeks
      )[0];

      if (topGame) {
        return {
          name: topGame.name,
          gameId: topGame.appid.toString(),
          imageUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${topGame.appid}/header.jpg`,
          isPlaying: false,
          playTime2Weeks: topGame.playtime_2weeks,
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching Steam data:', error);
    return null;
  }
}