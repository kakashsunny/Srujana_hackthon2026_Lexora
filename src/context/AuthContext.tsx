import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, UserProfile, TeamMember, BusinessProfile } from '../types/auth';

export const SEEDED_USERS: Record<UserRole, UserProfile> = {
  owner: {
    id: 'user-owner-01',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@balajitools.in',
    phone: '+91 98450 12345',
    role: 'owner',
    roleTitle: 'Managing Director & Founder',
    avatarInitials: 'RS',
    organizationName: 'Shree Balaji Precision Tools Pvt Ltd',
    badge: 'Workspace Owner'
  },
  staff: {
    id: 'user-staff-02',
    name: 'Priya Nair',
    email: 'priya.nair@balajitools.in',
    phone: '+91 98451 98765',
    role: 'staff',
    roleTitle: 'Accounts & Compliance Executive',
    avatarInitials: 'PN',
    organizationName: 'Shree Balaji Precision Tools Pvt Ltd',
    badge: 'Staff'
  },
  advisor: {
    id: 'user-ca-03',
    name: 'CA Arvind Mehta, FCA',
    email: 'arvind.mehta@amassociates.in',
    phone: '+91 98200 44321',
    role: 'advisor',
    roleTitle: 'External Chartered Accountant (ICAI: 054812)',
    avatarInitials: 'AM',
    organizationName: 'A.M. & Associates, Chartered Accountants',
    badge: 'CA / Legal Advisor'
  }
};

export const INITIAL_BUSINESS_PROFILE: BusinessProfile = {
  companyName: 'Shree Balaji Precision Tools Pvt Ltd',
  tradeName: 'Balaji Precision Works',
  gstin: '29AABCS1429B1Z2',
  pan: 'AABCS1429B',
  udyamNumber: 'UDYAM-KR-03-0012345',
  registeredAddress: 'Plot 44-B, Peenya Industrial Area Phase 2, Bengaluru, Karnataka - 560058',
  state: 'Karnataka',
  plan: 'MSME Pro'
};

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@balajitools.in',
    phone: '+91 98450 12345',
    role: 'owner',
    roleTitle: 'Managing Director & Founder',
    status: 'active',
    addedAt: '2024-01-15'
  },
  {
    id: 'team-2',
    name: 'Priya Nair',
    email: 'priya.nair@balajitools.in',
    phone: '+91 98451 98765',
    role: 'staff',
    roleTitle: 'Accounts & Compliance Executive',
    status: 'active',
    addedAt: '2024-04-10'
  },
  {
    id: 'team-3',
    name: 'CA Arvind Mehta, FCA',
    email: 'arvind.mehta@amassociates.in',
    phone: '+91 98200 44321',
    role: 'advisor',
    roleTitle: 'External Chartered Accountant',
    status: 'active',
    addedAt: '2024-02-01'
  }
];

export function validateUdyamFormat(udyam: string): boolean {
  if (!udyam) return false;
  // Official format: UDYAM-XX-00-0000000 (UDYAM followed by 2-letter state code, 2-digit district/sub code, 7-digit registration number)
  const pattern = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/i;
  return pattern.test(udyam.trim());
}

interface AuthContextType {
  currentUser: UserProfile;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  businessProfile: BusinessProfile;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => boolean;
  teamMembers: TeamMember[];
  inviteTeamMember: (member: Omit<TeamMember, 'id' | 'status' | 'addedAt'>) => boolean;
  canDeleteNotice: boolean;
  canEditBusinessDetails: boolean;
  canManageBilling: boolean;
  canInviteTeam: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('owner');
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(INITIAL_BUSINESS_PROFILE);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);

  const currentUser = SEEDED_USERS[currentRole];

  // RBAC permissions matrix
  const canDeleteNotice = currentRole === 'owner';
  const canEditBusinessDetails = currentRole === 'owner';
  const canManageBilling = currentRole === 'owner';
  const canInviteTeam = currentRole === 'owner';

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const updateBusinessProfile = (profile: Partial<BusinessProfile>): boolean => {
    if (!canEditBusinessDetails) {
      return false;
    }
    setBusinessProfile(prev => ({ ...prev, ...profile }));
    return true;
  };

  const inviteTeamMember = (member: Omit<TeamMember, 'id' | 'status' | 'addedAt'>): boolean => {
    if (!canInviteTeam) {
      return false;
    }
    const newMember: TeamMember = {
      ...member,
      id: `team-${Date.now()}`,
      status: 'invited',
      addedAt: new Date().toISOString().split('T')[0]
    };
    setTeamMembers(prev => [...prev, newMember]);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        businessProfile,
        updateBusinessProfile,
        teamMembers,
        inviteTeamMember,
        canDeleteNotice,
        canEditBusinessDetails,
        canManageBilling,
        canInviteTeam
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
