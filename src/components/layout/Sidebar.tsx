import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  ShieldCheck, 
  Edit3, 
  CalendarDays, 
  FolderArchive, 
  Briefcase, 
  HelpCircle, 
  Settings, 
  Menu, 
  X,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronLeft
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export type NavigationTab = 
  | 'overview' 
  | 'notices' 
  | 'authenticity' 
  | 'analysis' 
  | 'response' 
  | 'deadlines' 
  | 'documents' 
  | 'professional';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  urgentCount?: number;
  onNavigateToLanding?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  mobileOpen,
  onToggleMobile,
  collapsed,
  onToggleCollapse,
  urgentCount = 1,
  onNavigateToLanding
}) => {
  const navItems = [
    {
      id: 'overview' as NavigationTab,
      label: 'Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'notices' as NavigationTab,
      label: 'My Notices',
      icon: FileText,
      badge: '4'
    },
    {
      id: 'authenticity' as NavigationTab,
      label: 'Authenticity Lab',
      icon: ShieldCheck,
      badge: 'Signature',
      badgeColor: 'text-[#B99A62] bg-[#B99A62]/10 font-bold'
    },
    {
      id: 'analysis' as NavigationTab,
      label: 'Notice Analysis',
      icon: Sparkles,
      badge: null
    },
    {
      id: 'deadlines' as NavigationTab,
      label: 'Deadline Calendar',
      icon: CalendarDays,
      badge: urgentCount > 0 ? `${urgentCount} urgent` : null,
      badgeColor: 'text-[#B91C1C] bg-[#FEF2F2]'
    },
    {
      id: 'response' as NavigationTab,
      label: 'Response Workspace',
      icon: Edit3,
      badge: null
    },
    {
      id: 'documents' as NavigationTab,
      label: 'Documents & Vault',
      icon: FolderArchive,
      badge: null
    },
    {
      id: 'professional' as NavigationTab,
      label: 'Professional Review',
      icon: Briefcase,
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div 
          onClick={onToggleMobile}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-[#E7E5DF] flex flex-col justify-between
        transition-all duration-200 ease-in-out lg:translate-x-0
        ${collapsed ? 'lg:w-16 w-64' : 'lg:w-64 w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top: Brand Header & Close Bar */}
        <div className={`h-14 border-b border-[#E7E5DF] shrink-0 flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
          {collapsed ? (
            <button 
              onClick={onToggleCollapse}
              className="p-1 rounded-lg hover:bg-[#F7F6F2] transition-colors cursor-pointer flex items-center justify-center text-[#172C4D]"
              title="Expand Lexora sidebar"
              aria-label="Expand sidebar"
            >
              <BrandLogo size="sm" showText={false} showTagline={false} />
            </button>
          ) : (
            <>
              <BrandLogo size="md" />
              <div className="flex items-center gap-1">
                {/* Desktop Close/Collapse Bar Button */}
                <button 
                  onClick={onToggleCollapse}
                  className="hidden lg:flex items-center gap-1 p-1.5 text-[#69717D] hover:text-[#172C4D] hover:bg-[#F7F6F2] rounded-md transition-colors cursor-pointer"
                  title="Close sidebar (Collapse)"
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
                {/* Mobile Close Button */}
                <button 
                  onClick={onToggleMobile}
                  className="lg:hidden p-1.5 text-[#69717D] hover:text-[#171A1F] hover:bg-[#F7F6F2] rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Middle: Navigation Links */}
        <div className={`flex-1 ${collapsed ? 'px-2' : 'px-3'} py-4 space-y-1 overflow-y-auto`}>
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-semibold text-[#8F97A3] tracking-wider uppercase">
              Platform Navigation
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (mobileOpen) onToggleMobile();
                }}
                title={item.label}
                className={`
                  w-full flex items-center ${collapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'} text-xs font-medium rounded-md transition-colors cursor-pointer text-left relative group
                  ${isActive 
                    ? 'bg-[#172C4D] text-[#F7F6F2] shadow-xs' 
                    : 'text-[#48505E] hover:bg-[#F7F6F2] hover:text-[#171A1F]'}
                `}
              >
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-2.5'} min-w-0`}>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#B99A62]' : 'text-[#69717D]'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!collapsed && item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-sm whitespace-nowrap ${item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-[#E7E5DF]/70 text-[#69717D]')}`}>
                    {item.badge}
                  </span>
                )}

                {/* Collapsed Indicator dot for badges */}
                {collapsed && item.badge && (
                  <span className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${item.badgeColor ? 'bg-[#B91C1C]' : 'bg-[#B99A62]'}`} />
                )}

                {/* Collapsed Tooltip popover on hover */}
                {collapsed && (
                  <span className="hidden lg:group-hover:flex absolute left-full ml-2 px-2.5 py-1 bg-[#172C4D] text-white text-[11px] font-medium rounded-md shadow-md whitespace-nowrap z-50 pointer-events-none items-center gap-1.5">
                    {item.label}
                    {item.badge && <span className="opacity-75 font-mono text-[9px]">({item.badge})</span>}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section: Plan, User, & Guidance */}
        <div className={`p-3 border-t border-[#E7E5DF] space-y-2 ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? (
            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={() => onSelectTab('documents')} 
                className="p-2 text-[#69717D] hover:text-[#172C4D] hover:bg-[#F7F6F2] rounded-md transition-colors cursor-pointer"
                title="Guidance"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <div 
                className="w-7 h-7 rounded-full bg-[#172C4D] text-[#F7F6F2] font-semibold text-[10px] flex items-center justify-center border border-[#B99A62]/40"
                title="Apex Precision Tools"
              >
                AP
              </div>
            </div>
          ) : (
            <>
              {/* Quick link buttons */}
              <div className="flex items-center justify-between px-2 text-xs text-[#69717D]">
                <button 
                  onClick={() => onSelectTab('documents')} 
                  className="flex items-center gap-1.5 hover:text-[#172C4D] transition-colors py-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Guidance</span>
                </button>
                <button 
                  onClick={() => alert('Settings: Compliance notifications, DIN verification webhooks, and team access are configured for Apex Precision Tools Pvt Ltd.')} 
                  className="flex items-center gap-1.5 hover:text-[#172C4D] transition-colors py-1 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </button>
              </div>

              {/* Business & Plan Card */}
              <div className="p-2.5 bg-[#F7F6F2] rounded-md border border-[#E7E5DF] text-xs">
                <div className="flex items-center justify-between font-semibold text-[#171A1F] text-[11px]">
                  <span className="truncate">Apex Precision Tools</span>
                  <span className="text-[10px] text-[#B99A62] font-mono uppercase bg-white px-1.5 py-0.2 rounded-xs border border-[#E7E5DF]">MSME Pro</span>
                </div>
                <div className="text-[10px] text-[#69717D] mt-1 font-mono">
                  DIN Auto-Scan: Active
                </div>
              </div>

              {onNavigateToLanding && (
                <button
                  onClick={onNavigateToLanding}
                  className="w-full text-center py-1.5 px-2 bg-white hover:bg-[#F7F6F2] border border-[#E7E5DF] rounded-md text-[11px] font-semibold text-[#172C4D] transition-colors cursor-pointer"
                >
                  ← Return to Public Website
                </button>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
};
