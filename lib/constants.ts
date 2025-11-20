/**
 * Application constants
 */

export const WEBSOCKET_UPDATE_INTERVAL = 1000; // 1 second base interval
export const WEBSOCKET_UPDATE_VARIANCE = 1000; // Random variance in ms

export const PRICE_UPDATE_TRANSITION_DURATION = 300; // ms
export const PRICE_CHANGE_THRESHOLD = 0.01; // Minimum change to trigger animation

export const TABLE_PAGE_SIZE = 50; // Number of tokens per page
export const SKELETON_ROWS = 5; // Number of skeleton rows to show

export const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  new: "New Pairs",
  "final-stretch": "Final Stretch",
  migrated: "Migrated",
};

