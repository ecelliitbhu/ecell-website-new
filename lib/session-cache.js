import { getSession } from "next-auth/react";

// next-auth's getSession() performs a fresh fetch("/api/auth/session") on every
// call, and the axios interceptor in lib/api.js calls it once per request. A
// single dashboard load was therefore making 4-5 session requests.
//
// This dedupes concurrent calls and briefly reuses a resolved session so one
// page load makes one session request. Only authenticated sessions are cached —
// a null result is never cached, so a client-side sign-in is picked up straight
// away instead of being masked by a stale "logged out" entry.

const TTL_MS = 60_000;

let cached = null; // { session, at }
let inFlight = null; // Promise<Session | null>

export const getCachedSession = async () => {
  if (cached && Date.now() - cached.at < TTL_MS) {
    return cached.session;
  }
  if (inFlight) {
    return inFlight;
  }

  inFlight = getSession()
    .then((session) => {
      cached = session ? { session, at: Date.now() } : null;
      return session;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
};

export const clearCachedSession = () => {
  cached = null;
  inFlight = null;
};
