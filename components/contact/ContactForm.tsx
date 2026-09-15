'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Student Admissions Guidance',
    targetCourse: 'BBA',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          inquiryType: formData.inquiryType,
          targetCourse: formData.targetCourse,
          message: formData.message.trim(),
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const resJson = await res.json();

      if (res.ok && resJson.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(resJson.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-10 rounded-2xl border-2 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] text-center space-y-4 animate-in fade-in zoom-in duration-300">
        <div className="w-14 h-14 rounded-full bg-[#fca311] border-2 border-[#14213d] flex items-center justify-center mx-auto text-[#14213d] shadow-[2px_2px_0_0_#14213d]">
          <CheckCircle className="w-8 h-8 text-[#14213d]" />
        </div>
        <h3 className="font-serif text-2xl font-black text-[#14213d]">
          Message Received &amp; Saved!
        </h3>
        <p className="text-xs sm:text-sm text-[#14213d]/80 max-w-sm mx-auto font-medium leading-relaxed">
          Thank you for reaching out to <strong>Kampus Filter</strong>. Your inquiry has been logged in our system and our admissions advisory team will respond within 24 hours.
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5e5e5]/50 border border-[#14213d]/20 text-[11px] font-bold text-[#14213d]/80">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified &amp; Secure Submission</span>
        </div>
        <div>
          <button
            suppressHydrationWarning
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                inquiryType: 'Student Admissions Guidance',
                targetCourse: 'BBA',
                message: '',
              });
            }}
            type="button"
            className="mt-3 px-6 py-2.5 rounded-full bg-[#14213d] text-white hover:bg-[#000000] font-black text-xs uppercase tracking-wider border-2 border-[#000000] shadow-[2px_2px_0_0_#fca311] transition-all cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      suppressHydrationWarning
      onSubmit={handleSubmit}
      className="p-6 sm:p-10 rounded-2xl border-2 sm:border-3 border-[#14213d] bg-white shadow-[6px_6px_0_0_#14213d] space-y-5"
    >
      <div className="flex items-center justify-between pb-4 border-b-2 border-[#14213d]/15">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-black text-[#14213d]">
            Send a Direct Message
          </h3>
          <p className="text-xs text-[#14213d]/70 font-medium">
            Leads are synced directly to our advisory desk.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fca311] border-2 border-[#14213d] text-[10px] font-black uppercase tracking-wider text-[#14213d] shadow-[2px_2px_0_0_#14213d]">
          <Sparkles className="w-3 h-3" />
          <span>Priority Advisory</span>
        </span>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border-2 border-red-500 text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-xs font-black uppercase tracking-wider text-[#14213d]"
          >
            Full Name <span className="text-[#fca311]">*</span>
          </label>
          <input
            suppressHydrationWarning
            id="name"
            required
            type="text"
            placeholder="e.g. Aryan Sharma"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-black uppercase tracking-wider text-[#14213d]"
          >
            Email Address <span className="text-[#fca311]">*</span>
          </label>
          <input
            suppressHydrationWarning
            id="email"
            required
            type="email"
            placeholder="e.g. aryan@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="space-y-1.5">
          <label
            htmlFor="phone"
            className="block text-xs font-black uppercase tracking-wider text-[#14213d]"
          >
            Phone / WhatsApp <span className="text-[#fca311]">*</span>
          </label>
          <input
            suppressHydrationWarning
            id="phone"
            required
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all"
          />
        </div>

        {/* Inquiry Type */}
        <div className="space-y-1.5">
          <label
            htmlFor="inquiryType"
            className="block text-xs font-black uppercase tracking-wider text-[#14213d]"
          >
            Inquiry Category
          </label>
          <select
            suppressHydrationWarning
            id="inquiryType"
            value={formData.inquiryType}
            onChange={(e) =>
              setFormData({ ...formData, inquiryType: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all"
          >
            <option value="Student Admissions Guidance">
              Student Admissions Guidance
            </option>
            <option value="Fee Breakdown & Cutoff Inquiry">
              Fee Breakdown &amp; Cutoff Inquiry
            </option>
            <option value="University Collaboration">
              University Collaboration &amp; Listing
            </option>
            <option value="Editorial Correction / Feedback">
              Editorial Correction / Fee Update
            </option>
            <option value="Corporate / Partnership">
              Corporate / Partnership Inquiry
            </option>
          </select>
        </div>
      </div>

      {/* Target Degree */}
      <div className="space-y-1.5">
        <label
          htmlFor="targetCourse"
          className="block text-xs font-black uppercase tracking-wider text-[#14213d]"
        >
          Target Degree / Field of Interest
        </label>
        <select
          suppressHydrationWarning
          id="targetCourse"
          value={formData.targetCourse}
          onChange={(e) =>
            setFormData({ ...formData, targetCourse: e.target.value })
          }
          className="w-full px-4 py-2.5 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all"
        >
          <option value="BBA">BBA / IPM / Management (Undergrad)</option>
          <option value="MBA">MBA / PGDM (Postgrad)</option>
          <option value="B.Tech">B.Tech / Engineering</option>
          <option value="BCA">BCA / Computer Applications</option>
          <option value="MBBS/Medical">MBBS / BDS / Medical</option>
          <option value="Law">LLB / BA LLB (Law)</option>
          <option value="Commerce">B.Com / M.Com (Commerce)</option>
          <option value="General">Other Courses / General Discovery</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="block text-xs font-black uppercase tracking-wider text-[#14213d]"
        >
          Your Message / Questions <span className="text-[#fca311]">*</span>
        </label>
        <textarea
          suppressHydrationWarning
          id="message"
          required
          rows={4}
          placeholder="Tell us which university cutoffs, fee structures, or colleges you want comparative clarity on..."
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-2.5 rounded-xl border-2 border-[#14213d] bg-[#e5e5e5]/30 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:shadow-[2px_2px_0_0_#14213d] focus:border-[#000000] transition-all resize-y"
        />
      </div>

      {/* Submit Button */}
      <button
        suppressHydrationWarning
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#fca311] text-[#000000] hover:bg-[#14213d] hover:text-white font-black text-xs uppercase tracking-wider border-2 border-[#000000] shadow-[4px_4px_0_0_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all disabled:opacity-50 cursor-pointer"
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
      </button>
    </form>
  );
}
