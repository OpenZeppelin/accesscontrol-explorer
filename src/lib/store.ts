import { DEFAULT_CHAIN } from '$lib/chains';
import { writable } from 'svelte/store';

export const chain = writable(DEFAULT_CHAIN);
