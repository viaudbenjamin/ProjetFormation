export default function(songId = "", action) {
    if(action.type === 'play') {
      return action.songId;
    } else {
      return songId;
    }
  }