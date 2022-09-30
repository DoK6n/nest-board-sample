import moment from 'moment-timezone';
// timezone name list 유효성 체크
export function isValidTimezone(timezone: string): boolean {
  return moment.tz.zone(timezone) != null;
}
