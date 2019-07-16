import Config from '../config';
import FetchApi from './FetchApi';

const playlistService = new FetchApi(Config.api, '/playlists');
const playlistTrackService = new FetchApi(Config.api, '/playlists', '/tracks');
const searchService = new FetchApi(Config.api, '/search');
const artistService = new FetchApi(Config.api, '/artists');
const artistAlbumsService = new FetchApi(Config.api, '/artists', '/albums');
const albumService = new FetchApi(Config.api, '/albums');
const albumTrackService = new FetchApi(Config.api, '/albums', '/tracks');
const userService = new FetchApi(Config.api, '/user');

export default {
  playlistService,
  playlistTrackService,
  searchService,
  artistService,
  artistAlbumsService,
  albumService,
  albumTrackService,
  userService
};
