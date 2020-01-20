
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  export const config = isLocalhost ? {
      appId: '2dc36fe8-1938-481a-9eb1-e30af8f2adda',
      redirectUri: 'http://localhost:3000',
      scopes: [
        'user.read',
        'calendars.read',
        'group.read.all',
        'user.readbasic.all'
      ]
    } : {
      appId : '41de09c6-22fa-492e-856e-69b95cfeaf54',
      redirectUri: 'https://teamsimplep3.azurewebsites.net/',
      scopes: [
        'user.read',
        'calendars.read',
        'group.read.all',
        'user.readbasic.all'
      ]
    };