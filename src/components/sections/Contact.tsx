'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, Loader2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  hasError
}: {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  hasError?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={selectRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-black/5 border ${hasError ? 'border-red-400 focus:ring-red-400' : 'border-black/10 focus:ring-theme-gold'} rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 transition-all cursor-pointer flex justify-between items-center`}
      >
        <span className={selectedOption ? 'text-zinc-900' : 'text-zinc-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={20}
          className={`text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto" data-lenis-prevent>
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 cursor-pointer hover:bg-zinc-50 transition-colors ${
                    value === option.value ? 'bg-zinc-50 font-medium text-theme-gold' : 'text-zinc-700'
                  }`}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SERVICE_OPTIONS = [
  { value: "website development", label: "Website Development" },
  { value: "software", label: "Software Development" },
  { value: "ai", label: "AI Automation" },
  { value: "crm", label: "CRM / ERP Solutions" },
  { value: "mobile", label: "Mobile App Development" },
  { value: "marketing", label: "Digital Marketing" },
  { value: "other", label: "Other" },
];

const BUDGET_OPTIONS = [
  { value: "10k-25k", label: "₹10k - ₹25k" },
  { value: "25k-50k", label: "₹25k - ₹50k" },
  { value: "50k-100k", label: "₹50k - ₹100k" },
  { value: "100k+", label: "₹100k+" },
];

const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3", label: "1-3 months" },
  { value: "3-6", label: "3-6 months" },
  { value: "flexible", label: "Flexible" },
];

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  companyName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Content */}
          <div>
            <h4 className="text-theme-gold font-semibold tracking-wider uppercase text-sm mb-4">Get In Touch</h4>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-zinc-900 mb-6">
              Let's Build Something <span className="text-transparent bg-clip-text bg-primary-gradient">Amazing</span>
            </h2>
            <p className="text-zinc-600 text-lg mb-10 leading-relaxed">
              Whether you need a custom enterprise platform, an AI integration, or a dedicated development team, we're ready to execute. Fill out the form below to start the conversation.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-theme-gold">
                  📍
                </div>
                <div>
                  <h4 className="text-zinc-900 font-semibold">Headquarters</h4>
                  <p className="text-zinc-600">SF 02, INDIA BULLS MEGA MALL, Dinesh Mill Rd, Akota, Vadodara, Gujarat 390022</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-theme-gold">
                  📧
                </div>
                <div>
                  <h4 className="text-zinc-900 font-semibold">Email Us</h4>
                  <p className="text-zinc-600">info.blueboxx@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-theme-gold">
                  📞
                </div>
                <div>
                  <h4 className="text-zinc-900 font-semibold">Call Us</h4>
                  <p className="text-zinc-600">+91 90235 12853</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-black/[0.02] border border-black/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {isSuccess ? (
              <div className="absolute inset-0 bg-white flex flex-col items-center justify-center text-center p-8 z-20">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Message Sent!</h3>
                <p className="text-zinc-600">We've received your request and will get back to you within 24 hours.</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Full Name *</label>
                  <input
                    {...register('fullName')}
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-zinc-900 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-theme-gold transition-all"
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Company Name</label>
                  <input
                    {...register('companyName')}
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-zinc-900 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-theme-gold transition-all"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Email Address *</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-zinc-900 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-theme-gold transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Phone Number *</label>
                  <input
                    {...register('phone')}
                    className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-zinc-900 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-theme-gold transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Service Required *</label>
                  <Controller
                    control={control}
                    name="service"
                    render={({ field: { onChange, value } }) => (
                      <CustomSelect
                        value={value}
                        onChange={onChange}
                        options={SERVICE_OPTIONS}
                        placeholder="Select a service..."
                        hasError={!!errors.service}
                      />
                    )}
                  />
                  {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Project Budget *</label>
                  <Controller
                    control={control}
                    name="budget"
                    render={({ field: { onChange, value } }) => (
                      <CustomSelect
                        value={value}
                        onChange={onChange}
                        options={BUDGET_OPTIONS}
                        placeholder="Select budget range..."
                        hasError={!!errors.budget}
                      />
                    )}
                  />
                  {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Timeline *</label>
                <Controller
                  control={control}
                  name="timeline"
                  render={({ field: { onChange, value } }) => (
                    <CustomSelect
                      value={value}
                      onChange={onChange}
                      options={TIMELINE_OPTIONS}
                      placeholder="Select timeline..."
                      hasError={!!errors.timeline}
                    />
                  )}
                />
                {errors.timeline && <p className="text-red-400 text-xs mt-1">{errors.timeline.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Project Details *</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 text-zinc-900 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-theme-gold transition-all resize-none"
                  placeholder="Tell us about your project goals and requirements..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-theme-blue to-theme-gold text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
