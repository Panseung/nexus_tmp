export function getApiUrl() {
  const env = window.localStorage.getItem('env');
  if (env === 'production') {
    return 'https://api.glimpse.rsvp';
  } else {
    return 'https://api.onedegreelabs.io';
    // return 'http://localhost:8080';
  }
}

export function getWebUrl() {
  const env = window.localStorage.getItem('env');
  if (env === 'production') {
    return 'glimpse.rsvp';
  } else {
    return 'onedegreelabs.io';
  }
}
