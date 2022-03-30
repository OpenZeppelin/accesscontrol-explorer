import { writable } from 'svelte/store';

export const chain = writable<string>('mainnet');
