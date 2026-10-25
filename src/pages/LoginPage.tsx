import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, UserCheck, Briefcase, Building, Info } from 'lucide-react';
import { BrandLogo } from '../components/layout/BrandLogo';
import { useAuth, SEEDED_USERS } from '../context/AuthContext';
import { UserRole } from '../types/auth';

export const LoginPage: React.FC = () => {
  const { currentRole, switchRole, businessProfile } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(selectedRole);
    navigate('/app');
  };

  return (
    <div className="py-16 sm:py-24 max-w-md mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl border border-[#E7E5DF] shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <BrandLogo size="md" showTagline={false} />
          </div>
          <h1 className="text-xl font-bold text-[#171A1F]">Sign In to Notice Vault</h1>
          <p className="text-xs text-[#69717D]">
            Access your company's notice register, authenticity laboratory, and response briefs.
          </p>
        </div>

        {/* Company Pill */}
        <div className="p-3 bg-[#F7F6F2] rounded-xl border border-[#E7E5DF] flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-[#171A1F]">{businessProfile.companyName}</div>
            <div className="text-[10px] font-mono text-[#69717D]">
              GSTIN: {businessProfile.gstin} · {businessProfile.udyamNumber}
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#B99A62] bg-white px-2 py-0.5 rounded border border-[#E7E5DF] font-bold">
            {businessProfile.plan}
          </span>
        </div>

        {/* Demo Mode Notice */}
        <div className="p-3 bg-[#FFFBEB] rounded-lg border border-[#FDE68A] flex items-start gap-2.5 text-xs">
          <Info className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
          <div className="text-[#92400E] leading-relaxed text-[11px]">
            <strong>Demo Login Mode:</strong> Seeded users provided for hackathon evaluation. 
            <p className="mt-0.5">
              Udyam login on the official portal is owner-only (Aadhaar OTP). Lexora roles are separate and managed by the owner.
            </p>
          </div>
        </div>

        {/* Role Selection Form */}
        <form onSubmit={handleSignIn} className="space-y-4 text-xs">
          <label className="text-[11px] font-bold text-[#69717D] uppercase tracking-wider block">
            Select Your Active Role (Demo Login):
          </label>

          <div className="space-y-2">
            <div
              onClick={() => setSelectedRole('owner')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                selectedRole === 'owner' 
                  ? 'bg-[#F7F6F2] border-[#172C4D] ring-1 ring-[#172C4D]' 
                  : 'bg-white border-[#E7E5DF] hover:bg-[#F7F6F2]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                RS
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#171A1F]">Rajesh Sharma (Owner)</span>
                  <span className="text-[9px] font-mono uppercase bg-[#FEF3C7] text-[#92400E] px-1.5 py-0.2 rounded font-bold">
                    Full Control
                  </span>
                </div>
                <div className="text-[11px] text-[#69717D] mt-0.5">
                  Managing Director. Can delete notices, modify company Udyam details, invite team members, and manage billing.
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedRole('staff')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                selectedRole === 'staff' 
                  ? 'bg-[#F7F6F2] border-[#172C4D] ring-1 ring-[#172C4D]' 
                  : 'bg-white border-[#E7E5DF] hover:bg-[#F7F6F2]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                PN
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#171A1F]">Priya Nair (Staff)</span>
                  <span className="text-[9px] font-mono uppercase bg-[#F1F5F9] text-[#475569] px-1.5 py-0.2 rounded font-bold">
                    View &amp; Draft
                  </span>
                </div>
                <div className="text-[11px] text-[#69717D] mt-0.5">
                  Accounts Executive. Ingest notices, prepare reconciliations, and review drafts; cannot delete data or edit billing.
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedRole('advisor')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                selectedRole === 'advisor' 
                  ? 'bg-[#F7F6F2] border-[#172C4D] ring-1 ring-[#172C4D]' 
                  : 'bg-white border-[#E7E5DF] hover:bg-[#F7F6F2]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                AM
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#171A1F]">CA Arvind Mehta, FCA (Advisor)</span>
                  <span className="text-[9px] font-mono uppercase bg-[#E0F2FE] text-[#0369A1] px-1.5 py-0.2 rounded font-bold">
                    CA Review
                  </span>
                </div>
                <div className="text-[11px] text-[#69717D] mt-0.5">
                  External Chartered Accountant. Inspect forensic lab findings, sign-off on legal replies; cannot delete data.
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#172C4D] hover:bg-[#112038] text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <span>Enter Workspace as {selectedRole.toUpperCase()}</span>
            <ArrowRight className="w-4 h-4 text-[#B99A62]" />
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-[#69717D]">
          <Link to="/" className="hover:text-[#172C4D] underline font-medium">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
};
