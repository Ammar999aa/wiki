import { Component } from "react";

// pages.js's routes are React.lazy() — each fetched by a content-hashed
// filename built at deploy time. A tab left open across a new deploy still
// holds the old index bundle, so navigating into a route it hasn't fetched
// yet requests a chunk hash that no longer exists on the server: a 404 that
// rejects the lazy import's promise. With no boundary above it that's an
// uncaught error and React unmounts the whole tree — not just the route,
// the entire page goes blank. This catches exactly that failure and reloads
// once to pick up the new deploy, instead of crashing silently. A
// sessionStorage flag stops a repeat failure (offline, real 404, etc.) from
// reload-looping — it renders nothing rather than looping forever.
export const RELOAD_FLAG = "chunk-error-reload";

export default class ChunkErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    try {
      if (!sessionStorage.getItem(RELOAD_FLAG)) {
        sessionStorage.setItem(RELOAD_FLAG, "1");
        window.location.reload();
      }
    } catch {
      // sessionStorage unavailable (private mode, etc.) — fall through to
      // rendering null rather than throwing again.
    }
  }

  render() {
    return this.state.hasError ? null : this.props.children;
  }
}
