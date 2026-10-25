import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, NavigationTab } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { OverviewDashboard } from '../components/dashboard/OverviewDashboard';
import { AuthenticityLab } from '../components/authenticity/AuthenticityLab';
import { NoticeAnalysisWorkspace } from '../components/analysis/NoticeAnalysisWorkspace';
import { DeadlineCalendar } from '../components/deadlines/DeadlineCalendar';
import { ResponseWorkspace } from '../components/response/ResponseWorkspace';
import { ProfessionalReview } from '../components/professional/ProfessionalReview';
import { DocumentsVault } from '../components/documents/DocumentsVault';
import { QuickUploadModal } from '../components/shared/QuickUploadModal';
import { WorkspaceSettingsModal } from '../components/workspace/WorkspaceSettingsModal';
import { INITIAL_NOTICES } from '../data/mockNotices';
import { Notice } from '../types';
import { Menu } from 'lucide-react';

export const AppWorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  // Default selected notice: Suspicious GST notice
  const [selectedNoticeId, setSelectedNoticeId] = useState<string>('notice-gst-scam-01');
  const [currentTab, setCurrentTab] = useState<NavigationTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [workspaceSettingsOpen, setWorkspaceSettingsOpen] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>('');

  const selectedNotice = notices.find(n => n.id === selectedNoticeId) || notices[0];

  const handleSelectNotice = (id: string, initialTab?: 'analysis' | 'authenticity' | 'response') => {
    setSelectedNoticeId(id);
    if (initialTab) {
      setCurrentTab(initialTab);
    } else {
      setCurrentTab('analysis');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleActionItem = (noticeId: string, actionId: string) => {
    setNotices(prev => prev.map(n => {
      if (n.id !== noticeId) return n;
      return {
        ...n,
        actionItems: n.actionItems.map(act => {
          if (act.id !== actionId) return act;
          return { ...act, completed: !act.completed };
        })
      };
    }));
  };

  const handleUploadAndAnalyze = (newNotice: Notice) => {
    setNotices(prev => [newNotice, ...prev]);
    setSelectedNoticeId(newNotice.id);
    setCurrentTab('authenticity');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteNotice = (id: string) => {
    const remaining = notices.filter(n => n.id !== id);
    setNotices(remaining);
    if (remaining.length > 0) {
      setSelectedNoticeId(remaining[0].id);
    }
    setCurrentTab('overview');
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#171A1F] flex relative selection:bg-[#172C4D] selection:text-white">
      {/* Subtle Warm Ivory Architectural Background Layer — strictly behind content */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/src/assets/images/bg_ivory_architectural_1792861032642.jpg')` }}
      />
      <div className="fixed inset-0 z-0 bg-guilloche pointer-events-none opacity-25" />

      {/* Desktop & Mobile Responsive Sidebar with Close Bar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        mobileOpen={mobileMenuOpen}
        onToggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        urgentCount={notices.filter(n => n.priority === 'urgent' || n.authenticity.outcome === 'suspicious').length}
        onNavigateToLanding={() => navigate('/')}
        onOpenWorkspaceSettings={() => setWorkspaceSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 relative z-10 transition-all duration-200 ${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        {/* Top Header */}
        <Header
          currentView={currentTab}
          onOpenAnalyzeModal={() => setUploadModalOpen(true)}
          notices={notices}
          onSelectNotice={handleSelectNotice}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          sidebarCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onToggleMobile={() => setMobileMenuOpen(true)}
          onNavigateToLanding={() => navigate('/')}
          onOpenWorkspaceSettings={() => setWorkspaceSettingsOpen(true)}
        />

        {/* Mobile Header Bar trigger */}
        <div className="lg:hidden p-3 bg-white border-b border-[#E7E5DF] flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 rounded-md hover:bg-[#F7F6F2] text-[#172C4D] flex items-center gap-2 text-xs font-semibold cursor-pointer"
          >
            <Menu className="w-5 h-5" />
            <span>Lexora Menu</span>
          </button>
          <span className="text-xs font-mono font-semibold text-[#B99A62]">
            {notices.length} Notices Ingested
          </span>
        </div>

        {/* View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'overview' && (
            <OverviewDashboard
              notices={notices}
              onSelectNotice={handleSelectNotice}
              onOpenAnalyzeModal={() => setUploadModalOpen(true)}
            />
          )}

          {currentTab === 'notices' && (
            <OverviewDashboard
              notices={notices}
              onSelectNotice={handleSelectNotice}
              onOpenAnalyzeModal={() => setUploadModalOpen(true)}
            />
          )}

          {currentTab === 'authenticity' && (
            <AuthenticityLab
              selectedNotice={selectedNotice}
              allNotices={notices}
              onSelectNoticeId={setSelectedNoticeId}
              onNavigateToAnalysis={() => setCurrentTab('analysis')}
            />
          )}

          {currentTab === 'analysis' && (
            <NoticeAnalysisWorkspace
              notice={selectedNotice}
              onNavigateToResponse={() => setCurrentTab('response')}
              onNavigateToLab={() => setCurrentTab('authenticity')}
              onNavigateToProfessional={() => setCurrentTab('professional')}
              onToggleActionItem={handleToggleActionItem}
              onDeleteNotice={handleDeleteNotice}
            />
          )}

          {currentTab === 'deadlines' && (
            <DeadlineCalendar
              notices={notices}
              onSelectNotice={handleSelectNotice}
            />
          )}

          {currentTab === 'response' && (
            <ResponseWorkspace
              notice={selectedNotice}
              onNavigateToProfessional={() => setCurrentTab('professional')}
            />
          )}

          {currentTab === 'documents' && (
            <DocumentsVault
              notices={notices}
              onSelectNotice={handleSelectNotice}
            />
          )}

          {currentTab === 'professional' && (
            <ProfessionalReview
              currentNotice={selectedNotice}
              onSelectNoticeId={setSelectedNoticeId}
              allNotices={notices}
            />
          )}
        </main>

        {/* Visible Statutory Decision Support Footer */}
        <footer className="mt-auto py-3.5 px-6 border-t border-[#E7E5DF] bg-white/90 backdrop-blur-xs text-center text-xs text-[#69717D]">
          <p className="max-w-4xl mx-auto leading-relaxed">
            <span className="font-semibold text-[#172C4D]">Legal Disclaimer:</span> Lexora is decision support, not legal advice. Verify notices on official portals and consult a CA or advocate.
          </p>
        </footer>
      </div>

      {/* Quick Upload / Analyze Notice Modal */}
      <QuickUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        sampleNotices={notices}
        onSelectNoticeAndAnalyze={handleUploadAndAnalyze}
      />

      {/* Workspace & Udyam Management Modal (RBAC & Team Access) */}
      <WorkspaceSettingsModal
        isOpen={workspaceSettingsOpen}
        onClose={() => setWorkspaceSettingsOpen(false)}
      />
    </div>
  );
};
