import { Notice } from '../types';

export interface CalendarReminderConfig {
  noticeId: string;
  noticeTitle: string;
  referenceNumber: string;
  deadlineDate: string;
  reminderDaysBefore: number;
  channel: 'browser_notification' | 'calendar_ics' | 'email_sms';
  createdAt: string;
}

const STORAGE_KEY = 'lexora_calendar_reminders';

export function getSavedReminders(): CalendarReminderConfig[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveReminder(reminder: CalendarReminderConfig): void {
  try {
    const current = getSavedReminders();
    const updated = [reminder, ...current.filter(r => !(r.noticeId === reminder.noticeId && r.reminderDaysBefore === reminder.reminderDaysBefore))];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving reminder:', e);
  }
}

export function deleteReminder(noticeId: string, reminderDaysBefore: number): void {
  try {
    const current = getSavedReminders();
    const updated = current.filter(r => !(r.noticeId === noticeId && r.reminderDaysBefore === reminderDaysBefore));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting reminder:', e);
  }
}

/**
 * Generates an RFC 5545 compliant .ics file content for a statutory deadline
 */
export function generateIcsFile(notice: Notice, reminderDaysBefore: number = 3): string {
  const deadline = notice.responseDeadline.replace(/-/g, '');
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `lexora-deadline-${notice.id}-${notice.referenceNumber}@lexora.in`;

  // Start at 09:00 AM IST on deadline date
  const dtStart = `${deadline}T033000Z`; // 09:00 AM IST = 03:30 AM UTC
  const dtEnd = `${deadline}T113000Z`;   // 05:00 PM IST = 11:30 AM UTC

  const title = `[STATUTORY DEADLINE] Reply Due: ${notice.title} (${notice.referenceNumber})`;
  const description = [
    `Notice Title: ${notice.title}`,
    `Reference Number: ${notice.referenceNumber}`,
    notice.din ? `DIN: ${notice.din}` : '',
    `Issuing Authority: ${notice.issuingAuthority.name}`,
    `Official Portal: ${notice.issuingAuthority.portalUrl}`,
    `Authenticity Assessment: ${notice.authenticity.outcome.toUpperCase()}`,
    `Statutory Basis: ${notice.deadlineCalculationBasis}`,
    '',
    'Lexora Legal Decision Support: Verify directly on official portals before taking compliance actions.'
  ].filter(Boolean).join('\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lexora//Legal Notice Intelligence//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${notice.issuingAuthority.name} - ${notice.issuingAuthority.portalUrl}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    `TRIGGER:-P${reminderDaysBefore}D`,
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: Statutory Reply due in ${reminderDaysBefore} days for ${notice.referenceNumber}`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:URGENT: Statutory Reply due tomorrow for ${notice.referenceNumber}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

/**
 * Triggers a browser file download for the .ics calendar file
 */
export function downloadIcsCalendar(notice: Notice, reminderDaysBefore: number = 3): void {
  const icsData = generateIcsFile(notice, reminderDaysBefore);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeRef = notice.referenceNumber.replace(/[^a-zA-Z0-9_-]/g, '_');
  link.setAttribute('download', `Lexora_Deadline_${safeRef}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Triggers browser notification if permissions allow
 */
export async function requestAndSendBrowserNotification(title: string, body: string): Promise<boolean> {
  if (!('Notification' in window)) {
    return false;
  }

  try {
    let permission = Notification.permission;
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico'
      });
      return true;
    }
    return false;
  } catch (e) {
    console.error('Notification error:', e);
    return false;
  }
}
