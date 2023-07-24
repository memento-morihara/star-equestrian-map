import PocketBase from './lib/pocketbase.js'

const pb = new PocketBase('https://panicky-potato.pockethost.io');

const locations = await pb.collection('list_new').getFullList();

export default locations;