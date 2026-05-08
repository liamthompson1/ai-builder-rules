import { handlers } from '@/auth';

// Force Node runtime — Auth.js v5 uses Buffer/crypto.
export const runtime = 'nodejs';
export const { GET, POST } = handlers;
