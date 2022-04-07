import type { Chain } from '$lib/chains';
import getChain from '$lib/chains';
import { writable } from 'svelte/store';

export const chain = writable<Chain>(getChain());
