import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight01Icon,
  ArrowLeft01Icon,
  SolarPanel02Icon,
  CheckmarkCircle01Icon,
} from 'hugeicons-react';
import { Upload, MapPin, User, Home, Camera, FileCheck } from 'lucide-react';
import { ease } from '../utils/animations';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface FormData {
  // Step 1 – Personal
  fullName: string;
  phone: string;
  email: string;
  ghanaCardId: string;
  // Step 2 – Location
  houseAddress: string;
  city: string;
  gpsLat: string;
  gpsLng: string;
  // Step 3 – Property
  propertyType: string;
  roofType: string;
  roofAccessibility: string;
  structuralCondition: string;
  // Step 4 – Media
  buildingPhotos: File[];
  surroundingPhotos: File[];
  // Step 5 – Legal
  ownershipStatus: string;
  hasPermission: string;
  consentAgreed: boolean;
}

const initialData: FormData = {
  fullName: '',
  phone: '',
  email: '',
  ghanaCardId: '',
  houseAddress: '',
  city: '',
  gpsLat: '',
  gpsLng: '',
  propertyType: '',
  roofType: '',
  roofAccessibility: '',
  structuralCondition: '',
  buildingPhotos: [],
  surroundingPhotos: [],
  ownershipStatus: '',
  hasPermission: '',
  consentAgreed: false,
};

const steps = [
  { num: '01', title: 'Personal Information', desc: 'Tell us about yourself', icon: <User className="w-5 h-5" /> },
  { num: '02', title: 'Property Location', desc: 'Where is the property?', icon: <MapPin className="w-5 h-5" /> },
  { num: '03', title: 'Property Details', desc: 'About your roof & building', icon: <Home className="w-5 h-5" /> },
  { num: '04', title: 'Media Uploads', desc: 'Photos of the property', icon: <Camera className="w-5 h-5" /> },
  { num: '05', title: 'Legal & Permissions', desc: 'Ownership & consent', icon: <FileCheck className="w-5 h-5" /> },
];

/* ------------------------------------------------------------------ */
/*  Shared UI                                                          */
/* ------------------------------------------------------------------ */
const inputBase =
  'w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 placeholder:text-slate-300 focus:outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 transition-all text-sm';

const selectBase =
  'w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-950 focus:outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 transition-all text-sm appearance-none';

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{children}</label>;
}

/* ------------------------------------------------------------------ */
/*  Step Components                                                    */
/* ------------------------------------------------------------------ */

function StepPersonal({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label>Full Name</Label>
          <input type="text" className={inputBase} placeholder="Kwame Mensah" value={data.fullName} onChange={(e) => onChange({ fullName: e.target.value })} required />
        </div>
        <div>
          <Label>Phone Number</Label>
          <input type="tel" className={inputBase} placeholder="+233 24 000 0000" value={data.phone} onChange={(e) => onChange({ phone: e.target.value })} required />
        </div>
      </div>
      <div>
        <Label>Email Address</Label>
        <input type="email" className={inputBase} placeholder="kwame@example.com" value={data.email} onChange={(e) => onChange({ email: e.target.value })} required />
      </div>
      <div>
        <Label>Ghana Card ID</Label>
        <input type="text" className={inputBase} placeholder="GHA-XXXXXXXXX-X" value={data.ghanaCardId} onChange={(e) => onChange({ ghanaCardId: e.target.value })} required />
      </div>
    </div>
  );
}

function StepLocation({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  const [locating, setLocating] = useState(false);

  const captureGPS = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({ gpsLat: pos.coords.latitude.toFixed(6), gpsLng: pos.coords.longitude.toFixed(6) });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true }
    );
  }, [onChange]);

  return (
    <div className="space-y-5">
      <div>
        <Label>House Address</Label>
        <input type="text" className={inputBase} placeholder="123 Independence Ave, East Legon" value={data.houseAddress} onChange={(e) => onChange({ houseAddress: e.target.value })} required />
      </div>
      <div>
        <Label>City / Town</Label>
        <input type="text" className={inputBase} placeholder="Accra" value={data.city} onChange={(e) => onChange({ city: e.target.value })} required />
      </div>
      <div>
        <Label>GPS Coordinates</Label>
        <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
          <input type="text" className={inputBase} placeholder="Latitude" value={data.gpsLat} onChange={(e) => onChange({ gpsLat: e.target.value })} readOnly />
          <input type="text" className={inputBase} placeholder="Longitude" value={data.gpsLng} onChange={(e) => onChange({ gpsLng: e.target.value })} readOnly />
          <button
            type="button"
            onClick={captureGPS}
            disabled={locating}
            className="px-4 py-3.5 rounded-xl bg-slate-950 text-white text-xs font-semibold hover:bg-slate-900 transition-colors flex items-center gap-2 disabled:opacity-50 whitespace-nowrap"
          >
            <MapPin className="w-3.5 h-3.5" />
            {locating ? 'Locating...' : 'Auto-detect'}
          </button>
        </div>
        <p className="text-[11px] text-slate-300 mt-2">Click auto-detect to capture your current location</p>
      </div>
    </div>
  );
}

function StepProperty({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label>Property Type</Label>
          <select className={selectBase} value={data.propertyType} onChange={(e) => onChange({ propertyType: e.target.value })} required>
            <option value="">Select type</option>
            <option value="residential-detached">Residential — Detached</option>
            <option value="residential-semi">Residential — Semi-detached</option>
            <option value="residential-apartment">Residential — Apartment Block</option>
            <option value="commercial">Commercial Building</option>
            <option value="industrial">Industrial / Warehouse</option>
            <option value="institutional">Institutional (School, Church, etc.)</option>
          </select>
        </div>
        <div>
          <Label>Roof Type</Label>
          <select className={selectBase} value={data.roofType} onChange={(e) => onChange({ roofType: e.target.value })} required>
            <option value="">Select roof type</option>
            <option value="concrete">Concrete / Flat Slab</option>
            <option value="zinc">Zinc / Metal Sheets</option>
            <option value="tile">Roofing Tiles</option>
            <option value="shingle">Shingles</option>
            <option value="thatch">Thatch / Traditional</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <Label>Roof Accessibility</Label>
        <select className={selectBase} value={data.roofAccessibility} onChange={(e) => onChange({ roofAccessibility: e.target.value })} required>
          <option value="">How easy is the roof to access?</option>
          <option value="easy">Easy — Direct staircase / ladder access</option>
          <option value="moderate">Moderate — Requires some effort</option>
          <option value="difficult">Difficult — Requires scaffolding or special equipment</option>
        </select>
      </div>
      <div>
        <Label>Structural Condition</Label>
        <select className={selectBase} value={data.structuralCondition} onChange={(e) => onChange({ structuralCondition: e.target.value })} required>
          <option value="">Current condition of the roof</option>
          <option value="excellent">Excellent — New or recently renovated</option>
          <option value="good">Good — Minor wear, structurally sound</option>
          <option value="fair">Fair — Some repairs needed</option>
          <option value="poor">Poor — Significant repairs required</option>
        </select>
      </div>
    </div>
  );
}

function StepMedia({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  const buildingRef = useRef<HTMLInputElement>(null);
  const surroundingRef = useRef<HTMLInputElement>(null);

  const handleFiles = (key: 'buildingPhotos' | 'surroundingPhotos', files: FileList | null) => {
    if (!files) return;
    onChange({ [key]: [...data[key], ...Array.from(files)] });
  };

  const removeFile = (key: 'buildingPhotos' | 'surroundingPhotos', idx: number) => {
    onChange({ [key]: data[key].filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      {/* Building Photos */}
      <div>
        <Label>Building & Roof Photos</Label>
        <p className="text-[11px] text-slate-300 mb-3">Upload clear photos of the building exterior and roof from different angles</p>
        <input ref={buildingRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles('buildingPhotos', e.target.files)} />
        <button
          type="button"
          onClick={() => buildingRef.current?.click()}
          className="w-full py-8 border-2 border-dashed border-slate-200 rounded-2xl hover:border-slate-400 hover:bg-slate-50/50 transition-all flex flex-col items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
            <Upload className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-sm text-slate-400 font-medium">Click to upload building photos</span>
          <span className="text-[11px] text-slate-300">JPG, PNG up to 10MB each</span>
        </button>
        {data.buildingPhotos.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.buildingPhotos.map((f, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-500">
                <Camera className="w-3 h-3" />
                <span className="max-w-[120px] truncate">{f.name}</span>
                <button type="button" onClick={() => removeFile('buildingPhotos', i)} className="text-slate-300 hover:text-red-400 transition-colors ml-1">&times;</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Surrounding Photos */}
      <div>
        <Label>Surrounding Area Photos</Label>
        <p className="text-[11px] text-slate-300 mb-3">Photos of the surrounding environment — trees, neighbouring structures, shade patterns</p>
        <input ref={surroundingRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles('surroundingPhotos', e.target.files)} />
        <button
          type="button"
          onClick={() => surroundingRef.current?.click()}
          className="w-full py-8 border-2 border-dashed border-slate-200 rounded-2xl hover:border-slate-400 hover:bg-slate-50/50 transition-all flex flex-col items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
            <Upload className="w-4 h-4 text-slate-400" />
          </div>
          <span className="text-sm text-slate-400 font-medium">Click to upload surrounding photos</span>
          <span className="text-[11px] text-slate-300">JPG, PNG up to 10MB each</span>
        </button>
        {data.surroundingPhotos.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.surroundingPhotos.map((f, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-500">
                <Camera className="w-3 h-3" />
                <span className="max-w-[120px] truncate">{f.name}</span>
                <button type="button" onClick={() => removeFile('surroundingPhotos', i)} className="text-slate-300 hover:text-red-400 transition-colors ml-1">&times;</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StepLegal({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Ownership Status</Label>
        <select className={selectBase} value={data.ownershipStatus} onChange={(e) => onChange({ ownershipStatus: e.target.value })} required>
          <option value="">Select ownership status</option>
          <option value="owner">I own this property</option>
          <option value="co-owner">I co-own this property</option>
          <option value="tenant">I am renting / leasing</option>
          <option value="family">Family-owned property</option>
        </select>
      </div>

      {(data.ownershipStatus === 'tenant' || data.ownershipStatus === 'co-owner' || data.ownershipStatus === 'family') && (
        <div>
          <Label>Permission to Install</Label>
          <select className={selectBase} value={data.hasPermission} onChange={(e) => onChange({ hasPermission: e.target.value })} required>
            <option value="">Do you have permission for roof installations?</option>
            <option value="yes-written">Yes — I have written permission from the owner</option>
            <option value="yes-verbal">Yes — I have verbal permission</option>
            <option value="pending">Pending — I will obtain permission</option>
            <option value="no">No — I need guidance</option>
          </select>
        </div>
      )}

      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
        <h4 className="font-semibold text-sm text-slate-950 mb-2">Consent & Agreement</h4>
        <p className="text-[12px] text-slate-400 leading-relaxed mb-4">
          By submitting this form, you confirm that all information provided is accurate and that you have the
          authority or permission to register this property for solar panel installation. You agree to allow
          rentaroof to conduct a physical assessment of the property.
        </p>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={data.consentAgreed}
            onChange={(e) => onChange({ consentAgreed: e.target.checked })}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950/20"
          />
          <span className="text-sm text-slate-600 group-hover:text-slate-950 transition-colors">
            I agree to the Terms of Service, Privacy Policy, and consent to a property assessment.
          </span>
        </label>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Register Component                                            */
/* ------------------------------------------------------------------ */
export default function Register() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback((partial: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend integration will go here
    setSubmitted(true);
  };

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const stepContent = [
    <StepPersonal key={0} data={data} onChange={update} />,
    <StepLocation key={1} data={data} onChange={update} />,
    <StepProperty key={2} data={data} onChange={update} />,
    <StepMedia key={3} data={data} onChange={update} />,
    <StepLegal key={4} data={data} onChange={update} />,
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 mx-auto flex items-center justify-center mb-6">
            <CheckmarkCircle01Icon className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-display font-bold text-3xl text-white mb-3">Registration Complete</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
            We've received your application. Our team will review your submission and contact you within 24 hours to schedule a free property assessment.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 font-semibold text-sm rounded-xl hover:bg-slate-100 transition-colors"
          >
            Back to Home
            <ArrowRight01Icon className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-800/30 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-800/20 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Top Nav */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-6 pb-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:bg-white/15 transition-colors">
            <SolarPanel02Icon className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">
            rent<span className="text-white/40">a</span>roof
          </span>
        </Link>
        <Link
          to="/"
          className="text-white/40 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft01Icon className="w-4 h-4" />
          Back
        </Link>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        {/* Header */}
        <div className="pt-8 pb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3"
          >
            Register Your Property
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="text-white/35 text-sm max-w-lg"
          >
            Complete the form below to register your roof for solar panel installation.
            All information is securely stored.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar – Step Indicators */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-2"
          >
            {steps.map((s, i) => {
              const isActive = i === step;
              const isDone = i < step;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => i <= step && setStep(i)}
                  className={`relative text-left p-4 rounded-2xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-white/[0.08] border border-white/[0.1]'
                      : isDone
                        ? 'bg-white/[0.03] border border-transparent hover:bg-white/[0.05] cursor-pointer'
                        : 'border border-transparent opacity-40'
                  }`}
                >
                  {/* Big step number background */}
                  <span className={`absolute top-3 right-4 font-display font-extrabold text-[40px] leading-none transition-colors duration-300 ${
                    isActive ? 'text-white/[0.07]' : isDone ? 'text-white/[0.04]' : 'text-white/[0.02]'
                  }`}>
                    {s.num}
                  </span>

                  <div className="relative z-10 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-slate-950'
                        : isDone
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/[0.06] text-white/30'
                    }`}>
                      {isDone ? <CheckmarkCircle01Icon className="w-4 h-4" /> : s.icon}
                    </div>
                    <div>
                      <div className={`text-sm font-semibold transition-colors ${isActive ? 'text-white' : isDone ? 'text-white/60' : 'text-white/30'}`}>
                        {s.title}
                      </div>
                      <div className="text-[11px] text-white/20">{s.desc}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>

          {/* Mobile Step Indicator */}
          <div className="lg:hidden flex items-center gap-2 mb-2">
            {steps.map((s, i) => (
              <div key={s.num} className="flex-1 flex flex-col items-center gap-1.5">
                <div className={`w-full h-1 rounded-full transition-colors duration-300 ${
                  i <= step ? 'bg-white' : 'bg-white/10'
                }`} />
                <span className={`text-[10px] font-semibold transition-colors ${
                  i === step ? 'text-white' : i < step ? 'text-white/40' : 'text-white/15'
                }`}>
                  {s.num}
                </span>
              </div>
            ))}
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                {/* Step number watermark */}
                <span className="absolute top-4 right-6 font-display font-extrabold text-[100px] sm:text-[140px] leading-none text-slate-950/[0.03] pointer-events-none select-none">
                  {steps[step].num}
                </span>

                {/* Step Header */}
                <div className="relative z-10 mb-8">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center">
                      {steps[step].icon}
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-xl text-slate-950">{steps[step].title}</h2>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mt-1 ml-11">{steps[step].desc}</p>
                </div>

                {/* Animated Step Content */}
                <div className="relative z-10 min-h-[320px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      {stepContent[step]}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="relative z-10 flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={prev}
                      className="flex items-center gap-2 text-slate-400 hover:text-slate-950 font-medium text-sm transition-colors"
                    >
                      <ArrowLeft01Icon className="w-4 h-4" />
                      Previous
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-950 text-white font-semibold text-sm rounded-xl hover:bg-slate-900 transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-slate-900/20"
                    >
                      Continue
                      <ArrowRight01Icon className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!data.consentAgreed}
                      className="flex items-center gap-2 px-8 py-3 bg-slate-950 text-white font-semibold text-sm rounded-xl hover:bg-slate-900 transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-slate-900/20 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      Submit Registration
                      <ArrowRight01Icon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Step counter below card */}
              <div className="text-center mt-5">
                <span className="text-white/20 text-xs font-medium">
                  Step {step + 1} of {steps.length}
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
