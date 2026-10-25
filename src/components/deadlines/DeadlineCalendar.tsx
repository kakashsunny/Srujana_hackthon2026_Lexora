import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  CalendarCheck,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Notice } from '../../types';

interface DeadlineCalendarProps {
  notices: Notice[];
  onSelectNotice: (id: string) => void;
}

export const DeadlineCalendar: React.FC<DeadlineCalendarProps> = ({
  notices,
  onSelectNotice
}) => {
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');
  const [reminderModalNotice, setReminderModalNotice] = useState<Notice | null>(null);
  const [reminderSavedToast, setReminderSavedToast] = useState<string | null>(null);

  // Month navigation state (October/November 2026)
  const [currentMonth, setCurrentMonth] = useState<string>('October 2026');

  // Days in October 2026
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Map deadlines to days
  const getDeadlinesForDay = (day: number) => {
    const dateStr = `2026-10-${day < 10 ? '0' + day : day}`;
    return notices.filter(n => n.responseDeadline === dateStr);
  };

  const handleSaveReminder = (notice: Notice, daysBefore: number) => {
    setReminderModalNotice(null);
    setReminderSavedToast(`Reminder set: Director SMS & Email alert ${daysBefore} days before ${notice.responseDeadline}`);
    setTimeout(() => setReminderSavedToast(null), 3000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E5DF] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B99A62] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B99A62]" />
            <span>Statutory Timeline Command</span>
          </div>
          <h1 className="text-2xl font-bold text-[#171A1F] mt-1">
            Deadline Intelligence &amp; Calendar
          </h1>
          <p className="text-xs text-[#69717D] mt-0.5 max-w-2xl leading-relaxed">
            Monitor statutory response windows, court closures, gazetted holidays, and business-day calculation rules.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-md border border-[#E7E5DF] text-xs">
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1.5 font-medium rounded-sm transition-colors cursor-pointer ${
              viewMode === 'timeline' ? 'bg-[#172C4D] text-[#F7F6F2]' : 'text-[#48505E] hover:text-[#171A1F]'
            }`}
          >
            Milestone Timeline
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 font-medium rounded-sm transition-colors cursor-pointer ${
              viewMode === 'calendar' ? 'bg-[#172C4D] text-[#F7F6F2]' : 'text-[#48505E] hover:text-[#171A1F]'
            }`}
          >
            Monthly Calendar
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {reminderSavedToast && (
        <div className="bg-[#15803D] text-white p-3 rounded-md text-xs font-medium flex items-center justify-between shadow-md">
          <span>✓ {reminderSavedToast}</span>
          <button onClick={() => setReminderSavedToast(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Statutory Rules Notice Banner */}
      <div className="p-4 bg-white rounded-lg border border-[#E7E5DF] shadow-xs flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-[#B99A62] shrink-0 mt-0.5" />
        <div className="text-[#48505E] leading-relaxed">
          <strong className="text-[#171A1F]">Business-Day Rule &amp; General Clauses Act (Sec 10):</strong> If the last day of a statutory notice period falls on a Sunday or gazetted public holiday (e.g. Diwali / Bank Holiday), the period automatically extends to the next working business day. Inferred deadlines must be confirmed against portal service dates.
        </div>
      </div>

      {/* VIEW 1: MILESTONE TIMELINE */}
      {viewMode === 'timeline' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {notices.map((notice) => {
              const isSuspicious = notice.authenticity.outcome === 'suspicious';
              const deadlineDate = new Date(notice.responseDeadline);
              const daysLeft = Math.ceil((deadlineDate.getTime() - new Date('2026-10-24').getTime()) / (1000 * 60 * 60 * 24));

              return (
                <div 
                  key={notice.id}
                  className="bg-white rounded-xl border border-[#E7E5DF] p-6 shadow-xs hover:border-[#172C4D]/40 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E7E5DF]">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#69717D]">
                        <span className="font-semibold text-[#172C4D] uppercase">{notice.category}</span>
                        <span>·</span>
                        <span className="font-mono">{notice.referenceNumber}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#171A1F] mt-1">
                        {notice.title}
                      </h3>
                      <div className="text-xs text-[#69717D] mt-0.5">
                        Issuing Authority: {notice.issuingAuthority.name}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-[10px] text-[#69717D] uppercase font-semibold">Response Deadline</div>
                        <div className="font-mono font-bold text-sm text-[#B91C1C] tabular-nums">
                          {notice.responseDeadline}
                        </div>
                        <div className="text-[10px] text-[#69717D]">
                          {daysLeft > 0 ? `${daysLeft} calendar days remaining` : 'Due today'}
                        </div>
                      </div>

                      <button
                        onClick={() => setReminderModalNotice(notice)}
                        className="p-2 border border-[#E7E5DF] hover:bg-[#F7F6F2] rounded-md text-[#69717D] hover:text-[#172C4D] transition-colors"
                        title="Set Reminder Alert"
                      >
                        <Bell className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onSelectNotice(notice.id)}
                        className="px-3 py-1.5 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <span>Manage</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Progressive Lifecycle Milestone Bar */}
                  <div className="pt-5">
                    <div className="text-[11px] font-semibold text-[#69717D] mb-3">
                      Lifecycle Progress:
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                      {[
                        { step: 'Received', done: true, date: notice.dateReceived },
                        { step: 'Analyzed', done: true, date: '2026-10-24' },
                        { step: 'Evidence Gathered', done: notice.requiredDocuments.some(d => d.isCollected), date: 'In Progress' },
                        { step: 'Draft Prepared', done: notice.status === 'response_drafted' || notice.status === 'submitted', date: 'Pending' },
                        { step: 'CA Signed / Filed', done: notice.status === 'submitted', date: 'Pending' },
                        { step: 'Resolved', done: notice.status === 'resolved', date: 'Pending' }
                      ].map((m, i) => (
                        <div 
                          key={i} 
                          className={`p-2 rounded-md border text-[11px] ${m.done ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#14532D]' : 'bg-[#F7F6F2] border-[#E7E5DF] text-[#69717D]'}`}
                        >
                          <div className="font-bold flex items-center justify-center gap-1">
                            {m.done && <CheckCircle2 className="w-3 h-3 text-[#15803D]" />}
                            <span>{m.step}</span>
                          </div>
                          <div className="text-[9px] font-mono mt-0.5 opacity-80">{m.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deadline Source & Holiday Adjustment Note */}
                  <div className="mt-4 pt-3 border-t border-[#E7E5DF]/60 text-[11px] text-[#69717D] flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <strong>Source: </strong> {notice.deadlineCalculationBasis}
                    </div>
                    <div className="font-mono text-[10px] text-[#172C4D]">
                      Type: {notice.isDeadlineInferred ? 'Inferred Rule' : 'Explicit Statutory Demand'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: MONTHLY CALENDAR GRID */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-xl border border-[#E7E5DF] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#171A1F] flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#B99A62]" />
              <span>{currentMonth}</span>
            </h2>

            <div className="flex items-center gap-1 text-xs text-[#69717D]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" />
              <span>High Risk / Due</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#172C4D] ml-2" />
              <span>Statutory Hearing</span>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#69717D] pb-1 border-b border-[#E7E5DF]">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => {
              const matches = getDeadlinesForDay(day);
              const isToday = day === 24;

              return (
                <div
                  key={day}
                  className={`min-h-[75px] p-2 rounded-lg border text-xs flex flex-col justify-between transition-colors ${
                    isToday
                      ? 'bg-[#EEF2F6] border-[#172C4D] font-bold'
                      : matches.length > 0
                      ? 'bg-[#FEF2F2] border-[#FECACA]'
                      : 'bg-white border-[#E7E5DF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs ${isToday ? 'text-[#172C4D] font-bold' : 'text-[#69717D]'}`}>
                      {day}
                    </span>
                    {isToday && (
                      <span className="text-[9px] bg-[#172C4D] text-white px-1 rounded-xs">Today</span>
                    )}
                  </div>

                  <div className="space-y-1 mt-1">
                    {matches.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => onSelectNotice(m.id)}
                        className="p-1 bg-white border border-[#E7E5DF] rounded text-[10px] leading-tight text-[#171A1F] hover:border-[#172C4D] cursor-pointer shadow-xs truncate"
                        title={m.title}
                      >
                        <span className="font-bold text-[#B91C1C]">Due: </span>
                        {m.category.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reminder Setting Modal */}
      {reminderModalNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E7E5DF] max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E5DF] pb-2">
              <h3 className="text-sm font-bold text-[#171A1F] flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#B99A62]" />
                <span>Configure Statutory Reminders</span>
              </h3>
              <button
                onClick={() => setReminderModalNotice(null)}
                className="text-[#69717D] hover:text-[#171A1F] text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-[#48505E] leading-relaxed">
              Set automated notifications for <strong>{reminderModalNotice.title}</strong> before deadline on <strong>{reminderModalNotice.responseDeadline}</strong>:
            </div>

            <div className="space-y-2">
              {[
                { days: 7, label: '7 days before deadline (Prepare Reconciliation)' },
                { days: 3, label: '3 days before deadline (CA Verification Brief)' },
                { days: 1, label: '24 hours before (Final Portal Submission)' }
              ].map(opt => (
                <button
                  key={opt.days}
                  onClick={() => handleSaveReminder(reminderModalNotice, opt.days)}
                  className="w-full text-left p-2.5 bg-[#F7F6F2] hover:bg-[#EBE8E0] rounded-md border border-[#E7E5DF] text-xs text-[#171A1F] font-medium transition-colors"
                >
                  ✓ {opt.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setReminderModalNotice(null)}
              className="w-full py-2 bg-gray-200 text-[#171A1F] text-xs font-semibold rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
