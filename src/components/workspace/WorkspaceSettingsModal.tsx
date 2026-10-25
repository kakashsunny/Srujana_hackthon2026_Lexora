import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  UserPlus, 
  X,
  CreditCard,
  Info,
  ShieldAlert
} from 'lucide-react';
import { useAuth, validateUdyamFormat } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

interface WorkspaceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'profile' | 'team' | 'billing' | 'roles';
}

export const WorkspaceSettingsModal: React.FC<WorkspaceSettingsModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'profile'
}) => {
  const { 
    currentUser, 
    currentRole, 
    businessProfile, 
    updateBusinessProfile, 
    teamMembers, 
    inviteTeamMember,
    canEditBusinessDetails,
    canInviteTeam,
    canManageBilling
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'team' | 'billing' | 'roles'>(defaultTab);

  // Form states for business profile
  const [companyName, setCompanyName] = useState(businessProfile.companyName);
  const [gstin, setGstin] = useState(businessProfile.gstin);
  const [pan, setPan] = useState(businessProfile.pan);
  const [udyamNumber, setUdyamNumber] = useState(businessProfile.udyamNumber);
  const [address, setAddress] = useState(businessProfile.registeredAddress);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Invite member state
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePhone, setInvitePhone] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('staff');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  if (!isOpen) return null;

  const isUdyamValid = validateUdyamFormat(udyamNumber);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEditBusinessDetails) return;

    const ok = updateBusinessProfile({
      companyName,
      gstin: gstin.toUpperCase(),
      pan: pan.toUpperCase(),
      udyamNumber: udyamNumber.toUpperCase().trim(),
      registeredAddress: address
    });

    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canInviteTeam || !inviteName || !inviteEmail) return;

    const roleTitleMap: Record<UserRole, string> = {
      owner: 'Co-Owner',
      staff: 'Finance & Compliance Associate',
      advisor: 'External Legal / Tax Consultant'
    };

    inviteTeamMember({
      name: inviteName,
      email: inviteEmail,
      phone: invitePhone,
      role: inviteRole,
      roleTitle: roleTitleMap[inviteRole]
    });

    setInviteName('');
    setInviteEmail('');
    setInvitePhone('');
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setShowInviteForm(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-[#E7E5DF] shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in-50 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E7E5DF] flex items-center justify-between bg-[#F7F6F2]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#172C4D] text-[#F7F6F2] flex items-center justify-center font-bold text-xs">
              <Building2 className="w-4 h-4 text-[#B99A62]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#171A1F]">Workspace & Business Identity</h2>
              <div className="text-[11px] text-[#69717D] flex items-center gap-2">
                <span>Active Role: <strong className="text-[#172C4D] uppercase">{currentUser.role}</strong> ({currentUser.name})</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#69717D] hover:text-[#171A1F] hover:bg-black/5 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-[#E7E5DF] px-6 bg-white gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#172C4D] text-[#172C4D]'
                : 'border-transparent text-[#69717D] hover:text-[#171A1F]'
            }`}
          >
            Business & Udyam Details
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'team'
                ? 'border-[#172C4D] text-[#172C4D]'
                : 'border-transparent text-[#69717D] hover:text-[#171A1F]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team Access ({teamMembers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'roles'
                ? 'border-[#172C4D] text-[#172C4D]'
                : 'border-transparent text-[#69717D] hover:text-[#171A1F]'
            }`}
          >
            Role Permissions
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'billing'
                ? 'border-[#172C4D] text-[#172C4D]'
                : 'border-transparent text-[#69717D] hover:text-[#171A1F]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Plan & Billing</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: Business Profile & Udyam */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              {/* Permission Banner for Staff / CA */}
              {!canEditBusinessDetails && (
                <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg text-xs text-[#92400E] flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0 text-[#B45309]" />
                  <span>
                    <strong>Read-Only Access:</strong> You are currently logged in as <strong>{currentUser.roleTitle} ({currentUser.role.toUpperCase()})</strong>. Only the business Owner can modify corporate identifiers or Udyam records.
                  </span>
                </div>
              )}

              {saveSuccess && (
                <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg text-xs text-[#15803D] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Business profile and Udyam record updated successfully.</span>
                </div>
              )}

              {/* In-App Udyam Statutory Architecture Callout */}
              <div className="p-4 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] space-y-2">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#B99A62] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#48505E] leading-relaxed">
                    <strong className="text-[#171A1F]">Udyam Registration & Access Architecture:</strong>
                    <p className="mt-1">
                      Udyam login on the official portal is owner-only (Aadhaar OTP). Lexora roles are separate and managed by the owner.
                    </p>
                    <p className="mt-1 text-[11px] text-[#69717D]">
                      Lexora does not claim to verify Udyam registration, Aadhaar, or enterprise ownership via external APIs. Lexora enforces strict format-level structural validation and deep-links directly to the Ministry of MSME official portal.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#171A1F] mb-1">
                      Registered Company Name
                    </label>
                    <input
                      type="text"
                      disabled={!canEditBusinessDetails}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-[#E7E5DF] rounded-md bg-white disabled:bg-gray-100 disabled:text-[#69717D] focus:ring-1 focus:ring-[#172C4D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#171A1F] mb-1">
                      GSTIN (State Code + PAN + Entity Code)
                    </label>
                    <input
                      type="text"
                      disabled={!canEditBusinessDetails}
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono border border-[#E7E5DF] rounded-md bg-white disabled:bg-gray-100 disabled:text-[#69717D] focus:ring-1 focus:ring-[#172C4D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#171A1F] mb-1">
                      Company Permanent Account Number (PAN)
                    </label>
                    <input
                      type="text"
                      disabled={!canEditBusinessDetails}
                      value={pan}
                      onChange={(e) => setPan(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono border border-[#E7E5DF] rounded-md bg-white disabled:bg-gray-100 disabled:text-[#69717D] focus:ring-1 focus:ring-[#172C4D] focus:outline-none"
                    />
                  </div>

                  {/* Udyam Registration with Format Validation & Official Portal Link */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-[#171A1F]">
                        Udyam Registration Number
                      </label>
                      <span className="text-[10px] text-[#69717D]">UDYAM-XX-00-0000000</span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        disabled={!canEditBusinessDetails}
                        value={udyamNumber}
                        onChange={(e) => setUdyamNumber(e.target.value)}
                        placeholder="UDYAM-KR-03-0012345"
                        className={`w-full px-3 py-2 text-xs font-mono border rounded-md bg-white disabled:bg-gray-100 disabled:text-[#69717D] focus:outline-none ${
                          isUdyamValid 
                            ? 'border-[#15803D] focus:ring-1 focus:ring-[#15803D]' 
                            : udyamNumber ? 'border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C]' : 'border-[#E7E5DF]'
                        }`}
                      />
                    </div>

                    {/* Format Validation Label & Status */}
                    <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                      {isUdyamValid ? (
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Format checked, not verified with the government</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#B91C1C]">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Invalid syntax. Required: UDYAM-XX-00-0000000</span>
                        </div>
                      )}

                      {/* Official Udyam Portal Verification Link */}
                      <a
                        href="https://udyamregistration.gov.in/Udyam_Verify.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#172C4D] hover:underline font-semibold"
                      >
                        <span>Verify on Udyam portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171A1F] mb-1">
                    Registered Factory / Office Address
                  </label>
                  <textarea
                    rows={2}
                    disabled={!canEditBusinessDetails}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E7E5DF] rounded-md bg-white disabled:bg-gray-100 disabled:text-[#69717D] focus:ring-1 focus:ring-[#172C4D] focus:outline-none"
                  />
                </div>

                {canEditBusinessDetails && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
                    >
                      Save Business Profile
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* TAB 2: Team Members & Role Invitations */}
          {activeTab === 'team' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#171A1F]">Workspace Collaborators</h3>
                  <p className="text-[11px] text-[#69717D]">
                    Staff and external CAs can review notices and drafts. Only the Owner can delete notices or edit business data.
                  </p>
                </div>
                {canInviteTeam ? (
                  <button
                    onClick={() => setShowInviteForm(!showInviteForm)}
                    className="px-3 py-1.5 bg-[#172C4D] text-[#F7F6F2] hover:bg-[#112038] text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Invite Staff or CA</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-[#69717D] flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                    <Lock className="w-3 h-3" />
                    <span>Invitations Owner Only</span>
                  </span>
                )}
              </div>

              {/* Invite Form Drawer */}
              {showInviteForm && (
                <form onSubmit={handleSendInvite} className="p-4 bg-[#F7F6F2] rounded-lg border border-[#E7E5DF] space-y-3">
                  <div className="text-xs font-bold text-[#171A1F]">Send Workspace Invitation</div>
                  {inviteSuccess && (
                    <div className="p-2 bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs rounded">
                      ✓ Invitation dispatched via email & SMS.
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#171A1F] mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={inviteName}
                        onChange={(e) => setInviteName(e.target.value)}
                        placeholder="e.g. Suresh Kumar"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E7E5DF] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#171A1F] mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="suresh@company.in"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E7E5DF] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#171A1F] mb-1">Role Type</label>
                      <select
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value as UserRole)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E7E5DF] rounded-md"
                      >
                        <option value="staff">Staff (View Notices & Drafts)</option>
                        <option value="advisor">CA / Legal Advisor (Review & Annotate)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowInviteForm(false)}
                      className="px-3 py-1.5 text-xs text-[#69717D] hover:text-[#171A1F]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#172C4D] text-[#F7F6F2] text-xs font-semibold rounded-md hover:bg-[#112038]"
                    >
                      Send Invitation
                    </button>
                  </div>
                </form>
              )}

              {/* Members List */}
              <div className="border border-[#E7E5DF] rounded-lg overflow-hidden divide-y divide-[#E7E5DF]">
                {teamMembers.map((member) => (
                  <div key={member.id} className="p-3.5 flex items-center justify-between hover:bg-[#F7F6F2] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#172C4D] text-white flex items-center justify-center text-xs font-semibold">
                        {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#171A1F] flex items-center gap-2">
                          <span>{member.name}</span>
                          {member.role === 'owner' && (
                            <span className="text-[10px] bg-[#FEF3C7] text-[#92400E] px-1.5 py-0.2 rounded font-mono uppercase font-bold">
                              Owner
                            </span>
                          )}
                          {member.role === 'advisor' && (
                            <span className="text-[10px] bg-[#E0F2FE] text-[#0369A1] px-1.5 py-0.2 rounded font-mono uppercase font-bold">
                              CA / Advisor
                            </span>
                          )}
                          {member.role === 'staff' && (
                            <span className="text-[10px] bg-[#F1F5F9] text-[#475569] px-1.5 py-0.2 rounded font-mono uppercase font-bold">
                              Staff
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#69717D]">
                          {member.email} {member.phone && `· ${member.phone}`} · {member.roleTitle}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        member.status === 'active' ? 'bg-[#F0FDF4] text-[#15803D]' : 'bg-[#FFFBEB] text-[#B45309]'
                      }`}>
                        {member.status === 'active' ? 'Active' : 'Invited (Pending)'}
                      </span>
                      <div className="text-[10px] text-[#8F97A3] mt-0.5">Added: {member.addedAt}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Role Permission Matrix */}
          {activeTab === 'roles' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold text-[#171A1F]">Role-Based Access Control (RBAC) Matrix</h3>
                <p className="text-[11px] text-[#69717D]">
                  Strict enterprise security principles protect your business identity, bank details, and statutory records.
                </p>
              </div>

              <div className="overflow-x-auto border border-[#E7E5DF] rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F6F2] border-b border-[#E7E5DF] text-[#171A1F] font-semibold">
                    <tr>
                      <th className="p-3">Platform Capability</th>
                      <th className="p-3 text-center">Owner</th>
                      <th className="p-3 text-center">Staff</th>
                      <th className="p-3 text-center">CA / Advisor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E5DF]">
                    <tr>
                      <td className="p-3 font-medium">Ingest & View Notices (DRC-01, Sec 143(2), Sec 138)</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Full</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Full</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Full</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">View Forensic Evidence & Authenticity Scores</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Full</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Full</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Full</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Draft & Download Rebuttals / Adjournments</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Full</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ View/Export</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Edit/Annotate</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Delete Statutory Notices & Evidence History</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Owner Only</td>
                      <td className="p-3 text-center text-[#B91C1C]">✕ Restricted</td>
                      <td className="p-3 text-center text-[#B91C1C]">✕ Restricted</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Edit Company Details & Udyam Identifier</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Owner Only</td>
                      <td className="p-3 text-center text-[#B91C1C]">✕ Restricted</td>
                      <td className="p-3 text-center text-[#B91C1C]">✕ Restricted</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Manage Team Invites & Role Assignment</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Owner Only</td>
                      <td className="p-3 text-center text-[#B91C1C]">✕ Restricted</td>
                      <td className="p-3 text-center text-[#B91C1C]">✕ Restricted</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Subscription Billing & Payment Methods</td>
                      <td className="p-3 text-center text-[#15803D] font-bold">✓ Owner Only</td>
                      <td className="p-3 text-center text-[#B91C1C]">✕ Restricted</td>
                      <td className="p-3 text-center text-[#B91C1C]">✕ Restricted</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Plan & Billing */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              {!canManageBilling && (
                <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg text-xs text-[#92400E] flex items-center gap-2">
                  <Lock className="w-4 h-4 shrink-0 text-[#B45309]" />
                  <span>Only the business Owner can modify billing, upgrade plans, or update invoices.</span>
                </div>
              )}

              <div className="p-4 bg-white rounded-lg border border-[#E7E5DF] flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-[#172C4D] text-white px-2 py-0.5 rounded font-bold">
                    Active Subscription
                  </span>
                  <h4 className="text-base font-bold text-[#171A1F] mt-1.5">MSME Pro Plan</h4>
                  <p className="text-xs text-[#69717D] mt-0.5">
                    Unlimited notice scans, 5-pillar forensic authenticity lab, multilingual intelligence, and 7-step rebuttal drafter.
                  </p>
                  <div className="text-xs text-[#171A1F] font-mono mt-2">
                    ₹999 / month · Billed to Shree Balaji Precision Tools Pvt Ltd
                  </div>
                </div>

                <button
                  disabled={!canManageBilling}
                  onClick={() => alert('Plan management is restricted to business owner credentials.')}
                  className="px-3 py-1.5 border border-[#E7E5DF] hover:bg-[#F7F6F2] rounded-md text-xs font-semibold text-[#172C4D] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Manage Invoices
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#E7E5DF] bg-[#F7F6F2] flex items-center justify-between text-xs">
          <div className="text-[#69717D]">
            Official Udyam verification: <a href="https://udyamregistration.gov.in/Udyam_Verify.aspx" target="_blank" rel="noopener noreferrer" className="text-[#172C4D] hover:underline">udyamregistration.gov.in</a>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#172C4D] text-[#F7F6F2] text-xs font-semibold rounded-md hover:bg-[#112038]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
