import * as AuthSession from 'expo-auth-session';


const scopesArr = ['streaming', 'user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                  'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                  'playlist-modify-private','user-read-recently-played','user-top-read','user-read-email'];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async (clientId,redirectURI) => {

try {
    const result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectURI),
    })
    return result.params.code
  } catch (err) {
    console.error(err)
  }
}

export default getAuthorizationCode