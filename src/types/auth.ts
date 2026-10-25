export type UserRole = 'owner' | 'staff' | 'advisor';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  roleTitle: string;
  avatarInitials: string;
  organizationName: string;
  badge?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  roleTitle: string;
  status: 'active' | 'invited';
  addedAt: string;
}

export interface BusinessProfile {
  companyName: string;
  tradeName: string;
  gstin: string;
  pan: string;
  udyamNumber: string; // Format: UDYAM-XX-00-0000000
  registeredAddress: string;
  state: string;
  plan: 'MSME Pro' | 'Enterprise';
}
