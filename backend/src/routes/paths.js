// path.js contains all the paths for the backend routes. This file is used to keep track of all the paths in one place.
export const buildPathWithBase = (authPaths) => {
  const { base, ...paths } = authPaths;
  return Object.keys(paths).reduce((acc, key) => {
    acc[key] = `${base}${paths[key]}`;
    return acc;
  }, {});
};

// Paths for the backend routes
export const AUTH_PATHS = {
  base: '/api/auth',
  register: '/register',
  login: '/login',
  profile: '/profile'
};

// Paths for the external APIs
export const THIRD_PARTY_APIS = {
  base: '/api/external',
  getWeather: '/get-weather',
  promptQuestion: '/ask-chat-gpt'
};

// Paths for the dog routes
export const DOG_PATHS = {
  base: '/api/dog',
  create: '/',
  getAll: '/',
  getOne: '/:id',
  update: '/:id',
  remove: '/:id',
  getOthers: '/user/:userId',
  getOneOther: '/:userId/:dogId'
};

// Paths for the photo routes
export const DOG_POTENTIAL_MATES_PATHS = {
  base: '/api/potential-mates',
  getAll: '/'
};

// Paths for the photo routes
export const PHOTO_PATHS = {
  base: '/',
  create: '/',
  getAll: '/',
  remove: ':photoId'
};

// Paths for the user routes
export const USER_PATHS = {
  base: '/api/user',
  getUser: '/:username',
  updateUser: '/:username'
};

// Paths for the match routes
export const MATCH_PATHS = {
  base: '/api/match',
  match: '/:dogId',
  friends: '/',
  unfriend: '/:currentUserId/:friendId'
};
