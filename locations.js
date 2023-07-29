import PocketBase from 'pocketbase'

const pb = new PocketBase('https://panicky-potato.pockethost.io');

export const locations = await pb.collection('list_new').getFullList();
export const counts = await pb.collection('count').getFullList();
