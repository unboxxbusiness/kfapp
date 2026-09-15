'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Clock,
  Phone,
  User,
  MapPin,
  IndianRupee,
  X,
} from 'lucide-react';

interface LeadFormState {
  name: string;
  phone: string;
  email: string;
  targetCourse: string;
  preferredLocation: string;
  budgetRange: string;
}

interface GlobalLeadCaptureProps {
  variant?: 'card' | 'inline' | 'hero';
  title?: string;
  subtitle?: string;
  className?: string;
  onClose?: () => void;
}

export function GlobalLeadCapture({
  variant = 'card',
  title = 'Get Free College Shortlist',
  subtitle = 'Get genuine cutoffs, official placement benchmarks & fee breakdowns curated for your profile.',
  className = '',
  onClose,
}: GlobalLeadCaptureProps) {
  const [formData, setFormData] = useState<LeadFormState>({
    name: '',
    phone: '',
    email: '',
    targetCourse: 'B.Tech',
    preferredLocation: 'Delhi NCR',
    budgetRange: '₹5L - ₹10L',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'visitor',
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          targetCourse: formData.targetCourse,
          preferredLocation: formData.preferredLocation,
          budgetRange: formData.budgetRange,
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const res = await response.json();

      if (response.ok && res.success) {
        setSubmitted(true);
        // Trigger subtle celebration confetti via dynamic import
        try {
          const confettiModule = (await import('canvas-confetti')).default;
          confettiModule({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#fca311', '#14213d', '#000000', '#e5e5e5'],
          });
        } catch {
          // ignore if canvas not supported
        }
      } else {
        setErrorMsg(res.error || 'Failed to submit details. Please try again.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error submitting lead';
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] text-center space-y-4 animate-in fade-in zoom-in-95 duration-300 ${className}`}
      >
        {onClose && (
          <button
            suppressHydrationWarning
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#14213d]/10 hover:bg-[#fca311] text-[#14213d] hover:text-[#000000] flex items-center justify-center border border-[#14213d]/20 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="w-14 h-14 rounded-full bg-[#fca311] border-2 border-[#14213d] flex items-center justify-center mx-auto text-[#14213d] shadow-[3px_3px_0_0_#14213d]">
          <CheckCircle className="w-8 h-8 text-[#14213d]" />
        </div>

        <div className="space-y-1">
          <span className="inline-block px-3 py-0.5 rounded-full bg-[#14213d] text-[#fca311] border border-[#000000] text-[10px] font-black uppercase tracking-wider">
            Request Confirmed &amp; Received
          </span>
          <h3 className="font-serif text-2xl font-black text-[#14213d]">
            Shortlist Request Confirmed!
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-[#14213d]/80 max-w-md mx-auto font-medium leading-relaxed">
          Thanks <strong>{formData.name}</strong>! Our college advisory desk will analyze your preference for <strong>{formData.targetCourse}</strong> in <strong>{formData.preferredLocation}</strong> and WhatsApp your custom roadmap.
        </p>

        <div className="pt-2">
          <button
            suppressHydrationWarning
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                targetCourse: 'B.Tech',
                preferredLocation: 'Delhi NCR',
                budgetRange: '₹5L - ₹10L',
              });
            }}
            className="px-5 py-2 rounded-full bg-[#14213d] text-white hover:bg-[#000000] font-black text-xs uppercase tracking-wider border-2 border-[#000000] shadow-[2px_2px_0_0_#fca311] transition-all cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  const isHero = variant === 'hero';

  return (
    <div
      className={`rounded-2xl sm:rounded-3xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] sm:shadow-[8px_8px_0_0_#14213d] overflow-hidden ${className}`}
    >
      {/* Top Banner Header */}
      <div className="bg-[#fca311] p-4 sm:p-5 border-b-2 sm:border-b-3 border-[#14213d] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-[#14213d] text-white flex items-center justify-center border border-[#000000] shadow-[1px_1px_0_0_#000000] shrink-0">
            <GraduationCap className="w-4 h-4 text-[#fca311]" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#14213d]/80 block truncate">
              Direct Advisory Desk
            </span>
            <h4 className="font-serif text-base sm:text-lg font-black text-[#14213d] leading-tight truncate">
              {title}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#14213d] text-[10px] font-black text-[#14213d] uppercase tracking-wider shadow-[1px_1px_0_0_#14213d]">
            <Clock className="w-3 h-3 text-[#14213d]" />
            <span>2027 Batch</span>
          </span>

          {onClose && (
            <button
              suppressHydrationWarning
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#14213d] hover:text-white border-2 border-[#14213d] text-[#14213d] flex items-center justify-center shadow-[2px_2px_0_0_#14213d] hover:shadow-[3px_3px_0_0_#000000] transition-all cursor-pointer shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Form Content */}
      <form suppressHydrationWarning onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
        <p className="text-xs text-[#14213d]/75 font-medium leading-relaxed">
          {subtitle}
        </p>

        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-red-50 border-2 border-red-500 text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#14213d] flex items-center gap-1">
              <User className="w-3 h-3 text-[#fca311]" />
              <span>Full Name</span>
              <span className="text-[#fca311]">*</span>
            </label>
            <input
              suppressHydrationWarning
              type="text"
              required
              placeholder="e.g. Rahul Verma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs font-semibold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all"
            />
          </div>

          {/* WhatsApp / Phone */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#14213d] flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#fca311]" />
              <span>WhatsApp / Phone</span>
              <span className="text-[#fca311]">*</span>
            </label>
            <input
              suppressHydrationWarning
              type="tel"
              required
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs font-semibold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Target Course */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#14213d] flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-[#fca311]" />
              <span>Target Degree</span>
            </label>
            <select
              suppressHydrationWarning
              value={formData.targetCourse}
              onChange={(e) =>
                setFormData({ ...formData, targetCourse: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs font-semibold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all"
            >
              <option value="B.Tech">B.Tech / Engineering</option>
              <option value="BBA">BBA / IPM / Management</option>
              <option value="MBA">MBA / PGDM</option>
              <option value="BCA">BCA / Computer Applications</option>
              <option value="MBBS">MBBS / Medical / BDS</option>
              <option value="Law">LLB / Law (5-Year / 3-Year)</option>
              <option value="B.Com">B.Com / Accounting</option>
              <option value="Design">B.Des / Architecture</option>
              <option value="Other">Other / Exploring</option>
            </select>
          </div>

          {/* Preferred Location */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#14213d] flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#fca311]" />
              <span>Preferred Region</span>
            </label>
            <select
              suppressHydrationWarning
              value={formData.preferredLocation}
              onChange={(e) =>
                setFormData({ ...formData, preferredLocation: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs font-semibold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all"
            >
              <option value="Delhi NCR">Delhi NCR (Delhi, Noida, Gurgaon)</option>
              <option value="Mumbai">Mumbai / Maharashtra</option>
              <option value="Bangalore">Bangalore / Karnataka</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad / Telangana</option>
              <option value="Chennai">Chennai / Tamil Nadu</option>
              <option value="Anywhere in India">Pan-India / Any Top College</option>
            </select>
          </div>
        </div>

        {/* Budget & Optional Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#14213d] flex items-center gap-1">
              <IndianRupee className="w-3 h-3 text-[#fca311]" />
              <span>Annual Fee Budget</span>
            </label>
            <select
              suppressHydrationWarning
              value={formData.budgetRange}
              onChange={(e) =>
                setFormData({ ...formData, budgetRange: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs font-semibold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all"
            >
              <option value="Under ₹3 Lakhs">Under ₹3 Lakhs / Year</option>
              <option value="₹3L - ₹6L">₹3L - ₹6L / Year</option>
              <option value="₹6L - ₹10L">₹6L - ₹10L / Year</option>
              <option value="₹10L+ / Flexible">₹10L+ / Flexible</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#14213d] block">
              Email (Optional)
            </label>
            <input
              suppressHydrationWarning
              type="email"
              placeholder="For PDF Fee Guide"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs font-semibold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          suppressHydrationWarning
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl sm:rounded-2xl bg-[#fca311] text-[#000000] hover:bg-[#14213d] hover:text-white font-black text-xs uppercase tracking-wider border-2 border-[#000000] shadow-[4px_4px_0_0_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all disabled:opacity-50 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#000000] group-hover:text-[#fca311]" />
          <span>
            {isSubmitting ? 'Submitting Request...' : 'Get My Shortlist & Fee Audit'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-2 pt-1 text-[10px] font-bold text-[#14213d]/70 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Free • Direct Admissions Advisory • Zero Spam</span>
        </div>
      </form>
    </div>
  );
}
