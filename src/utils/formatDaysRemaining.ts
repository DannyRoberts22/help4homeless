export const formatDaysRemaining = (expiryTimestamp: number): string => {
  if (!expiryTimestamp) return 'No expiry date set';

  const now = Date.now();
  const diffInMs = expiryTimestamp - now;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) return 'is expired';
  if (diffInDays === 0) return 'expires today';
  if (diffInDays === 1) return 'has one day remaining before expiring';
  return `has ${diffInDays} days remaining before expiring`;
};
