export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatDistanceKm(km: number): string {
  if (km >= 1_000_000_000) {
    return `${(km / 1_000_000_000).toFixed(2)} billion km`;
  }
  if (km >= 1_000_000) {
    return `${(km / 1_000_000).toFixed(1)} million km`;
  }
  return `${formatNumber(km)} km`;
}

export function formatPeriod(days: number): string {
  if (days === 0) return 'Stationary (Primary)';
  if (days < 1) {
    const hours = (days * 24).toFixed(1);
    return `${hours} hours`;
  }
  if (days < 365.25) {
    return `${days.toFixed(1)} Earth days`;
  }
  const years = (days / 365.25).toFixed(1);
  return `${years} Earth years (${formatNumber(Math.round(days))} days)`;
}

export function formatRotation(hours: number): string {
  const isRetrograde = hours < 0;
  const absHours = Math.abs(hours);
  const suffix = isRetrograde ? ' (Retrograde ↻)' : '';

  if (absHours >= 24) {
    const days = (absHours / 24).toFixed(1);
    return `${days} Earth days (${absHours.toFixed(1)}h)${suffix}`;
  }
  const wholeHours = Math.floor(absHours);
  const minutes = Math.round((absHours - wholeHours) * 60);
  return `${wholeHours}h ${minutes}m${suffix}`;
}
