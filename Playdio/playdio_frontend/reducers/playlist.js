export default function(playlist =[],action){
    if(action.type== 'addName'){        
        return action.info

    }
    else if(action.type == 'addInfoPlaylistSpotify'){
        playlist.idSpotifPlaylist=action.info
        return playlist
    }

    else if(action.type == 'addSong'){
      //console.log("ajout son", action.info)
        
        playlist.listMusic.push(action.info)
        return playlist
    }
    else if(action.type == 'deleteSong'){
        //console.log("deleteredux",playlist)
       
         let newPlaylist=playlist

        newPlaylist.listMusic.splice(action.info,1)
       // console.log(newPlaylist)
        return playlist
    }
    else if(action.type == 'addUrl'){
        console.log("ajout URL", action.info.idRadio)
    
        
        playlist.urlPlaylist=action.info.idRadio

       // console.log("redux playlist----------------",playlist)

          return playlist
      }

    else{
        return playlist
    }
}