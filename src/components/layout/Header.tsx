import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  X, 
  ExternalLink, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Menu,
  ChevronDown,
  UserCheck,
  Building2,
  Lock
} from 'lucide-react';
import { Notice } from '../../types';
import { useAuth, SEEDED_USERS } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

interface HeaderProps {
  currentView: string;
  onOpenAnalyzeModal: () => void;
  notices: Notice[];
  onSelectNotice: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sidebarCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleMobile: () => void;
  onNavigateToLanding?: () => void;
  onOpenWorkspaceSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onOpenAnalyzeModal,
  notices,
  onSelectNotice,
  searchQuery,
  onSearchChange,
  sidebarCollapsed,
  onToggleCollapse,
  onToggleMobile,
  onNavigateToLanding,
  onOpenWorkspaceSettings
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const { currentUser, currentRole, switchRole, businessProfile } = useAuth();

  const urgentCount = notices.filter(n => n.priority === 'urgent' || n.authenticity.outcome === 'suspicious').length;
  
  // Format readable breadcrumb
  const viewTitles: Record<string, string> = {
    overview: 'Overview',
    notices: 'My Notices',
    authenticity: 'Authenticity Lab',
    analysis: 'Notice Analysis Workspace',
    deadlines: 'Deadline Calendar',
    response: 'Response Workspace',
    professional: 'Professional Review',
    documents: 'Documents & Evidence'
  };

  const matchingNotices = searchQuery.trim()
    ? notices.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.issuingAuthority.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-30 bg-[#F7F6F2] border-b border-[#E7E5DF] px-4 lg:px-6 h-14 flex items-center shrink-0">
      <div className="w-full flex items-center justify-between gap-4">
        {/* Zone 1: Sidebar Toggle & Active Page Title */}
        <div className="flex items-center gap-2.5 text-sm min-w-0">
          {/* Mobile open button */}
          <button
            onClick={onToggleMobile}
            className="p-1.5 -ml-1 text-[#69717D] hover:text-[#172C4D] hover:bg-black/5 rounded-md transition-colors lg:hidden flex items-center cursor-pointer"
            title="Open menu"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Desktop Toggle Bar button */}
          {sidebarCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 -ml-1 text-[#69717D] hover:text-[#172C4D] hover:bg-black/5 rounded-md transition-colors hidden lg:flex items-center cursor-pointer"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen className="w-4 h-4 text-[#172C4D]" />
            </button>
          )}

          {/* Active View Title Only */}
          <h1 className="text-sm font-bold text-[#172C4D] tracking-tight truncate">
            {viewTitles[currentView] || 'Legal Intelligence'}
          </h1>
        </div>

        {/* Zone 2: Global Search Bar */}
        <div className="relative flex-1 max-w-md mx-2 hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#69717D] absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search reference, DIN, authority, or issue..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowSearchDropdown(e.target.value.length > 0);
              }}
              onFocus={() => setShowSearchDropdown(searchQuery.length > 0)}
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-white border border-[#E7E5DF] rounded-md text-[#171A1F] placeholder-[#8F97A3] focus:outline-none focus:ring-1 focus:ring-[#172C4D] focus:border-[#172C4D] transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  onSearchChange('');
                  setShowSearchDropdown(false);
                }}
                className="absolute right-2.5 text-[#69717D] hover:text-[#171A1F]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Autocomplete Popover */}
          {showSearchDropdown && matchingNotices.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E7E5DF] rounded-lg shadow-lg py-1 z-50 overflow-hidden">
              <div className="px-3 py-1 text-[11px] font-semibold text-[#69717D] uppercase tracking-wider border-b border-[#E7E5DF]/60">
                Matching Notices ({matchingNotices.length})
              </div>
              <div className="max-h-60 overflow-y-auto">
                {matchingNotices.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      onSelectNotice(n.id);
                      setShowSearchDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#F7F6F2] transition-colors flex items-start gap-2 border-b border-[#E7E5DF]/40 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#171A1F] truncate">{n.title}</div>
                      <div className="text-[11px] text-[#69717D] flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono">{n.referenceNumber}</span>
                        <span>·</span>
                        <span>{n.issuingAuthority.name}</span>
                      </div>
                    </div>
                    {n.authenticity.outcome === 'suspicious' && (
                      <span className="text-[10px] font-semibold text-[#B91C1C] bg-[#FEF2F2] px-1.5 py-0.5 rounded-sm shrink-0">
                        Suspicious
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Zone 3: Actions & Profile */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Analyze Quick CTA */}
          <button
            onClick={onOpenAnalyzeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-xs font-medium rounded-md shadow-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <span className="text-sm font-semibold">+</span>
            <span>Analyze Notice</span>
          </button>

          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1.5 text-[#69717D] hover:text-[#172C4D] rounded-md hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Notification center"
              title="Urgent notice deadlines & alerts"
            >
              <Bell className="w-4 h-4" />
              {urgentCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#B91C1C] rounded-full" />
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E7E5DF] rounded-lg shadow-xl py-2 z-50 text-xs">
                <div className="px-3 py-1.5 font-semibold text-[#171A1F] border-b border-[#E7E5DF] flex items-center justify-between">
                  <span>Urgent Notice Alerts</span>
                  <span className="text-[11px] text-[#69717D] font-normal">{urgentCount} active</span>
                </div>
                <div className="divide-y divide-[#E7E5DF]/60 max-h-72 overflow-y-auto">
                  {notices
                    .filter(n => n.priority === 'urgent' || n.authenticity.outcome === 'suspicious')
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onSelectNotice(item.id);
                          setShowNotifications(false);
                        }}
                        className="p-3 hover:bg-[#F7F6F2] cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-1.5 text-[11px] text-[#B91C1C] font-semibold mb-1">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                          <span>{item.authenticity.outcome === 'suspicious' ? 'Authenticity Alert' : 'Response Approaching'}</span>
                        </div>
                        <div className="text-xs font-medium text-[#171A1F] leading-snug line-clamp-2">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-[#69717D] mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Deadline: {item.responseDeadline}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* DEMO ROLE SWITCHER (Step 3 RBAC) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-semibold transition-all cursor-pointer ${
                currentRole === 'owner'
                  ? 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E] hover:bg-[#FDE68A]'
                  : currentRole === 'advisor'
                  ? 'bg-[#E0F2FE] border-[#BAE6FD] text-[#0369A1] hover:bg-[#BAE6FD]'
                  : 'bg-[#F1F5F9] border-[#E2E8F0] text-[#334155] hover:bg-[#E2E8F0]'
              }`}
              title="Click to switch demo role (Owner / Staff / CA)"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Demo Role:</span>
              <span className="uppercase font-mono">{currentRole}</span>
              <ChevronDown className="w-3 h-3 opacity-75" />
            </button>

            {/* Role Switcher Popover */}
            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E7E5DF] rounded-xl shadow-xl py-2 z-50 text-xs animate-in fade-in-50">
                <div className="px-3 py-1.5 border-b border-[#E7E5DF]">
                  <div className="font-bold text-[#171A1F]">Simulate User Role (Demo Mode)</div>
                  <div className="text-[10px] text-[#69717D] mt-0.5 leading-snug">
                    Udyam login on the official portal is owner-only (Aadhaar OTP). Lexora roles are separate and managed by the owner.
                  </div>
                </div>

                <div className="p-1 space-y-1">
                  {(['owner', 'staff', 'advisor'] as UserRole[]).map((role) => {
                    const u = SEEDED_USERS[role];
                    const isSelected = currentRole === role;
                    return (
                      <button
                        key={role}
                        onClick={() => {
                          switchRole(role);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg transition-colors flex items-start gap-2.5 cursor-pointer ${
                          isSelected ? 'bg-[#F7F6F2] font-semibold text-[#172C4D]' : 'hover:bg-[#F7F6F2] text-[#48505E]'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-[#172C4D] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                          {u.avatarInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#171A1F] truncate">{u.name}</span>
                            <span className="text-[9px] font-mono uppercase bg-gray-100 px-1 py-0.2 rounded font-bold">
                              {role}
                            </span>
                          </div>
                          <div className="text-[10px] text-[#69717D] truncate">{u.roleTitle}</div>
                          <div className="text-[9px] text-[#8F97A3] mt-0.5">
                            {role === 'owner' ? '✓ Can delete data, edit Udyam & billing' : '✕ Read/review only; deletion restricted'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Business & Udyam Management Pill */}
          <button
            onClick={onOpenWorkspaceSettings}
            className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#E7E5DF] hover:opacity-80 transition-opacity cursor-pointer text-left"
            title="Manage Workspace, Udyam Registration & Team Collaborators"
          >
            <div className="w-7 h-7 rounded-full bg-[#172C4D] text-[#F7F6F2] font-semibold text-[11px] flex items-center justify-center border border-[#B99A62]/40 shrink-0">
              {currentUser.avatarInitials}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-[#171A1F] leading-tight truncate max-w-[120px]">
                {businessProfile.companyName.split(' ')[0]} {businessProfile.companyName.split(' ')[1]}
              </span>
              <span className="text-[10px] font-mono text-[#69717D] truncate max-w-[120px]">
                {businessProfile.udyamNumber || businessProfile.gstin.slice(0, 10)}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
