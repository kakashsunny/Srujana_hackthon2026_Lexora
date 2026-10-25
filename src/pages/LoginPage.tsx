import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck, UserCheck, Briefcase, Building } from 'lucide-react';
import { BrandLogo } from '../components/layout/BrandLogo';

export const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'director' | 'accountant' | 'advisor'>('director');
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
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
            <div className="font-bold text-[#171A1F]">Apex Precision Tools Pvt Ltd</div>
            <div className="text-[10px] font-mono text-[#69717D]">GSTIN: 07AAACA4912K1Z8</div>
          </div>
          <span className="text-[10px] font-mono text-[#B99A62] bg-white px-2 py-0.5 rounded border border-[#E7E5DF] font-bold">
            MSME Pro
          </span>
        </div>

        {/* Role Selection Form */}
        <form onSubmit={handleSignIn} className="space-y-4 text-xs">
          <label className="text-[11px] font-bold text-[#69717D] uppercase tracking-wider block">
            Select Your Active Role:
          </label>

          <div className="space-y-2">
            <div
              onClick={() => setSelectedRole('director')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                selectedRole === 'director' 
                  ? 'bg-[#F7F6F2] border-[#172C4D] ring-1 ring-[#172C4D]' 
                  : 'bg-white border-[#E7E5DF] hover:bg-[#F7F6F2]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center shrink-0 mt-0.5">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#171A1F]">Managing Director / Founder</div>
                <div className="text-[11px] text-[#69717D] mt-0.5">
                  Executive overview, urgent deadline triage, and CA consultation briefs.
                </div>
              </div>
            </div>

            <div
              onClick={() => setSelectedRole('accountant')}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                selectedRole === 'accountant' 
                  ? 'bg-[#F7F6F2] border-[#172C4D] ring-1 ring-[#172C4D]' 
                  : 'bg-white border-[#E7E5DF] hover:bg-[#F7F6F2]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center shrink-0 mt-0.5">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#171A1F]">Finance &amp; Tax Accountant</div>
                <div className="text-[11px] text-[#69717D] mt-0.5">
                  Reconciliation files, statutory response outlines, and exhibit uploads.
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
              <div className="w-8 h-8 rounded-lg bg-[#172C4D] text-[#B99A62] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#171A1F]">External Legal / Tax Counsel</div>
                <div className="text-[11px] text-[#69717D] mt-0.5">
                  Reviewing statutory briefs, e-Proceeding replies, and court summons.
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#172C4D] hover:bg-[#112038] text-white font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <span>Enter Enterprise Workspace</span>
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
