import { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import {
  HiChevronRight,
  HiOutlineCreditCard,
  HiOutlinePlus,
  HiOutlineDotsVertical,
  HiOutlineShieldCheck,
  HiCheckCircle,
  HiOutlineMail,
  HiExclamationCircle,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlinePencil,
  HiOutlineTrash
} from 'react-icons/hi';
import { FaPaypal, FaBitcoin, FaCreditCard, FaStripe } from 'react-icons/fa';
import { clsx } from 'clsx';

import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';

interface SavedMethod {
  id: string;
  type: string;
  name: string;
  details: string;
  isDefault?: boolean;
  raw: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    email: string;
    walletAddress: string;
  };
}

interface FormErrors {
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  email?: string;
  walletAddress?: string;
}

const CARD_TYPES = [
  { id: 'credit', name: 'Credit/Debit', Icon: FaCreditCard, color: 'text-gray-700 bg-gray-100' },
  { id: 'stripe', name: 'Stripe', Icon: FaStripe, color: 'text-stripe bg-stripe/10' },
  { id: 'paypal', name: 'PayPal', Icon: FaPaypal, color: 'text-paypal bg-paypal/10' },
  { id: 'bitcoin', name: 'Bitcoin', Icon: FaBitcoin, color: 'text-bitcoin bg-bitcoin/10' }
];

const BillingPaymentPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initialFormState = {
    cardNumber: '',
    expiry: '',
    cvv: '',
    email: '',
    walletAddress: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const [savedMethods, setSavedMethods] = useState<SavedMethod[]>(() => {
    const saved = localStorage.getItem('saved_payment_methods');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((m: any) => ({
        ...m,
        raw: m.raw || { ...initialFormState, cardNumber: m.name.includes('****') ? m.name : '' }
      }));
    }
    return [
      {
        id: 'default-visa',
        type: 'credit',
        name: 'Visa **** 4242',
        details: 'Expiration: 12/24',
        isDefault: true,
        raw: {
          ...initialFormState,
          cardNumber: '4242 4242 4242 4242',
          expiry: '12/24',
          cvv: '123'
        }
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('saved_payment_methods', JSON.stringify(savedMethods));
  }, [savedMethods]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9*]/gi, '');
    const match = v.substring(0, 16);
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9*]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (selectedMethod === 'credit' || selectedMethod === 'stripe') {
      const cleanNum = formData.cardNumber.replace(/\s/g, '');
      if (cleanNum.length !== 16 && !cleanNum.includes('*')) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      if (!/^\d{2}\/\d{2}$/.test(formData.expiry) && !formData.expiry.includes('*')) {
        newErrors.expiry = 'Use MM/YY format';
      }
      if (formData.cvv.length < 3 && !formData.cvv.includes('*')) {
        newErrors.cvv = 'CVV must be 3-4 digits';
      }
    } else if (selectedMethod === 'paypal') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Enter a valid email address';
      }
    } else if (selectedMethod === 'bitcoin') {
      if (formData.walletAddress.length < 26) {
        newErrors.walletAddress = 'Invalid wallet address length';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setTimeout(() => {
      const displayData = { name: '', details: '' };

      if (selectedMethod === 'credit' || selectedMethod === 'stripe') {
        const cleanCard = formData.cardNumber.replace(/\s/g, '');
        const last4 = cleanCard.slice(-4);
        displayData.name = `${selectedMethod === 'stripe' ? 'Stripe' : 'Card'} **** ${last4}`;
        displayData.details = `Expiration: ${formData.expiry}`;
      } else if (selectedMethod === 'paypal') {
        displayData.name = 'PayPal Account';
        displayData.details = formData.email;
      } else if (selectedMethod === 'bitcoin') {
        displayData.name = 'Bitcoin Wallet';
        displayData.details = formData.walletAddress.substring(0, 8) + '...';
      }

      const rawSnapshot = { ...formData };

      if (editingId) {
        setSavedMethods(prev => prev.map(m =>
          m.id === editingId ? { ...m, ...displayData, type: selectedMethod, raw: rawSnapshot } : m
        ));
      } else {
        const newMethod: SavedMethod = {
          id: Math.random().toString(36).substr(2, 9),
          type: selectedMethod,
          ...displayData,
          isDefault: false,
          raw: rawSnapshot
        };
        setSavedMethods(prev => [...prev, newMethod]);
      }

      setIsSaving(false);
      setSaveSuccess(true);
      setEditingId(null);
      setFormData(initialFormState);

      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  const handleEdit = (method: SavedMethod) => {
    setEditingId(method.id);
    setSelectedMethod(method.type);
    setFormData({ ...method.raw });
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeMethod = (id: string) => {
    setSavedMethods(prev => prev.filter(m => m.id !== id));
    setActiveDropdown(null);
    if (editingId === id) cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setErrors({});
  };

  const clearAllForTesting = () => {
    setSavedMethods([]);
    localStorage.removeItem('saved_payment_methods');
    cancelEdit();
  };

  return (
    <div className="flex h-screen w-full bg-surface-alt font-dm overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 pb-24">
            <div className="flex items-center gap-2 mb-6 sm:mb-8 text-[10px] sm:text-xs md:text-sm font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link to="/settings" className="text-primary hover:underline flex items-center gap-1 shrink-0">
                Settings
              </Link>
              <HiChevronRight className="size-3 sm:size-4 text-gray-400 shrink-0" />
              <span className="text-gray-500 shrink-0">Billing & Payments</span>
            </div>

            <div className="mb-8 sm:mb-10 lg:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-playfair leading-tight">Billing & Payment</h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-500 font-medium font-dm leading-relaxed">
                  Manage your practice's subscription and payment methods with precision.
                </p>
              </div>
              <button
                onClick={clearAllForTesting}
                className="text-[10px] sm:text-xs font-bold text-red-400 hover:text-red-600 uppercase tracking-widest duration-300 self-start sm:self-end"
              >
                Clear All Data
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12">

              <div className="lg:col-span-5 space-y-6 md:space-y-8 order-2 lg:order-1">
                <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 sm:p-6 md:p-8 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 font-playfair">Saved Methods</h3>
                    <span className="text-[10px] sm:text-xs font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-full uppercase tracking-widest shrink-0">{savedMethods.length} Methods</span>
                  </div>

                  <div className="divide-y divide-gray-50">
                    {savedMethods.length === 0 ? (
                      <div className="p-10 md:p-14 text-center">
                        <p className="text-sm text-gray-400 font-medium font-dm italic">No methods saved yet.</p>
                      </div>
                    ) : savedMethods.map((method) => (
                      <div key={method.id} className="p-5 sm:p-6 md:p-8 flex items-center justify-between group hover:bg-gray-50/50 duration-300 relative">
                        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                          <div className="size-10 sm:size-12 shrink-0 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm">
                            {method.type === 'credit' || method.name.toLowerCase().includes('card') ? (
                              <HiOutlineCreditCard className="size-5 sm:size-6 text-gray-600" />
                            ) : method.type === 'stripe' ? (
                              <FaStripe className="size-5 sm:size-6 text-stripe" />
                            ) : method.type === 'paypal' ? (
                              <FaPaypal className="size-4 sm:size-5 text-paypal" />
                            ) : (
                              <FaBitcoin className="size-5 sm:size-6 text-bitcoin" />
                            )}
                          </div>
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm sm:text-base font-bold text-gray-900 font-dm truncate">{method.name}</h4>
                              {editingId === method.id && <span className="text-[7px] sm:text-[8px] font-bold text-primary uppercase bg-primary/5 px-1.5 py-0.5 rounded-full tracking-widest">Editing</span>}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-400 font-medium font-dm truncate">{method.details}</p>
                          </div>
                        </div>

                        <div className="relative shrink-0 ml-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(activeDropdown === method.id ? null : method.id);
                            }}
                            className={clsx(
                              "p-1.5 sm:p-2 rounded-lg duration-300 hover:bg-gray-100",
                              activeDropdown === method.id ? "bg-primary/5 text-primary" : "text-gray-400"
                            )}
                          >
                            <HiOutlineDotsVertical className="size-4 sm:size-5" />
                          </button>

                          {activeDropdown === method.id && (
                            <div
                              ref={dropdownRef}
                              className="absolute right-0 top-10 sm:top-12 w-28 sm:w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-200"
                            >
                              <button
                                onClick={() => handleEdit(method)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-primary duration-300"
                              >
                                <HiOutlinePencil className="size-3.5 sm:size-4" /> Edit
                              </button>
                              <button
                                onClick={() => removeMethod(method.id)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-bold text-red-500 hover:bg-red-50 duration-300"
                              >
                                <HiOutlineTrash className="size-3.5 sm:size-4" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    <div
                      onClick={() => {
                        if (editingId) cancelEdit();
                        setSelectedMethod('credit');
                      }}
                      className="p-5 sm:p-6 md:p-8 flex items-center gap-3 sm:gap-4 cursor-pointer group hover:bg-gray-50/50 duration-300"
                    >
                      <div className="size-10 sm:size-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center border border-dashed border-primary/20 group-hover:bg-primary group-hover:text-white group-hover:border-transparent duration-300 shrink-0">
                        <HiOutlinePlus className="size-5 sm:size-6" />
                      </div>
                      <span className="text-sm sm:text-base font-bold text-gray-900 font-dm group-hover:text-primary duration-300">Add New Method</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50/50 rounded-xl md:rounded-2xl p-5 sm:p-6 border border-emerald-100 flex items-start gap-3 sm:gap-4">
                  <div className="size-9 sm:size-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <HiOutlineShieldCheck className="size-5 sm:size-6" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-emerald-800 font-dm mb-1">Encrypted Protocol</h5>
                    <p className="text-[10px] sm:text-xs text-emerald-700/70 font-medium leading-relaxed">
                      Your financial data is processed via secure SSL & Stripe-grade encryption protocols.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <form onSubmit={handleSave} className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 md:p-10 lg:p-12 space-y-8 md:space-y-10">

                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 font-playfair">{editingId ? 'Update Payment Method' : 'Add New Method'}</h3>
                      {editingId && (
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="text-[10px] font-bold text-primary hover:underline font-dm uppercase tracking-widest self-start sm:self-auto"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      {CARD_TYPES.map((type) => {
                        const isSelected = selectedMethod === type.id;
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              setSelectedMethod(type.id);
                              setErrors({});
                            }}
                            className={clsx(
                              "flex flex-col items-center gap-2.5 p-3 sm:p-4 rounded-xl border-2 duration-300 text-center",
                              isSelected
                                ? "border-primary bg-primary/[0.03] ring-4 ring-primary/5"
                                : "border-gray-100 bg-white hover:border-gray-200"
                            )}
                          >
                            <div className={clsx("mb-1 size-9 sm:size-10 rounded-lg flex items-center justify-center shadow-sm", type.color)}>
                              <type.Icon className="size-4 sm:size-5" />
                            </div>
                            <span className={clsx(
                              "text-xs sm:text-sm font-bold font-dm uppercase tracking-wider",
                              isSelected ? "text-primary" : "text-gray-500"
                            )}>
                              {type.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-6 md:space-y-8">

                    {(selectedMethod === 'credit' || selectedMethod === 'stripe') && (
                      <div className="space-y-5 md:space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="space-y-2">
                          <label className="text-sm sm:text-base font-bold text-gray-400 uppercase tracking-widest ml-1">Card Number</label>
                          <div className="relative group">
                            <div className={clsx(
                              "absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 duration-300",
                              errors.cardNumber ? "text-red-500" : "text-gray-400 group-focus-within:text-primary"
                            )}>
                              <HiOutlineCreditCard className="size-5 sm:size-6" />
                            </div>
                            <input
                              type="text"
                              placeholder="0000 0000 0000 0000"
                              value={formData.cardNumber}
                              maxLength={19}
                              onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                              className={clsx(
                                "mt-1 w-full bg-gray-50 border rounded-xl py-3.5 sm:py-4 pl-12 sm:pl-14 pr-5 text-gray-900 font-bold focus:bg-white focus:outline-none focus:ring-4 duration-300 placeholder:text-gray-300 tracking-[0.15em] sm:tracking-widest text-xs sm:text-sm md:text-base",
                                errors.cardNumber ? "border-red-200 focus:ring-red-500/5 focus:border-red-500" : "border-gray-100 focus:ring-primary/5 focus:border-primary/20"
                              )}
                            />
                          </div>
                          {errors.cardNumber && <p className="text-[9px] sm:text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 flex items-center gap-1"><HiExclamationCircle className="size-3" /> {errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-2">
                            <label className="text-sm sm:text-base font-bold text-gray-400 uppercase tracking-widest ml-1">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              maxLength={5}
                              value={formData.expiry}
                              onChange={(e) => setFormData({ ...formData, expiry: formatExpiry(e.target.value) })}
                              className={clsx(
                                "mt-1 w-full bg-gray-50 border rounded-xl py-3.5 sm:py-4 px-4 sm:px-5 text-gray-900 font-bold focus:bg-white focus:outline-none focus:ring-4 duration-300 placeholder:text-gray-300 text-xs sm:text-sm md:text-base",
                                errors.expiry ? "border-red-200 focus:ring-red-500/5 focus:border-red-500" : "border-gray-100 focus:ring-primary/5 focus:border-primary/20"
                              )}
                            />
                            {errors.expiry && <p className="text-[9px] sm:text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 flex items-center gap-1"><HiExclamationCircle className="size-3" /> {errors.expiry}</p>}
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm sm:text-base font-bold text-gray-400 uppercase tracking-widest ml-1">CVV</label>
                            <div className="relative group">
                              <input
                                type={showCvv ? "text" : "password"}
                                placeholder="+++"
                                maxLength={4}
                                value={formData.cvv}
                                onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/[^0-9*]/g, '') })}
                                className={clsx(
                                  "mt-1 w-full bg-gray-50 border rounded-xl py-3.5 sm:py-4 pl-4 sm:pl-5 pr-10 sm:pr-12 text-gray-900 font-bold focus:bg-white focus:outline-none focus:ring-4 duration-300 placeholder:text-gray-300 text-xs sm:text-sm md:text-base",
                                  errors.cvv ? "border-red-200 focus:ring-red-500/5 focus:border-red-500" : "border-gray-100 focus:ring-primary/5 focus:border-primary/20"
                                )}
                              />
                              <button
                                type="button"
                                onClick={() => setShowCvv(!showCvv)}
                                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary duration-300"
                              >
                                {showCvv ? <HiOutlineEyeOff className="size-4 sm:size-5" /> : <HiOutlineEye className="size-4 sm:size-5" />}
                              </button>
                            </div>
                            {errors.cvv && <p className="text-[9px] sm:text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 flex items-center gap-1"><HiExclamationCircle className="size-3" /> {errors.cvv}</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedMethod === 'paypal' && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                        <label className="text-sm sm:text-base font-bold text-gray-400 uppercase tracking-widest ml-1">PayPal Email</label>
                        <div className="relative group">
                          <div className={clsx(
                            "absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 duration-300",
                            errors.email ? "text-red-500" : "text-gray-400 group-focus-within:text-primary"
                          )}>
                            <HiOutlineMail className="size-5 sm:size-6" />
                          </div>
                          <input
                            type="email"
                            placeholder="your-account@paypal.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={clsx(
                              "mt-1 w-full bg-gray-50 border rounded-xl py-3.5 sm:py-4 pl-12 sm:pl-14 pr-5 text-gray-900 font-bold focus:bg-white focus:outline-none focus:ring-4 duration-300 text-xs sm:text-sm md:text-base",
                              errors.email ? "border-red-200 focus:ring-red-500/5 focus:border-red-500" : "border-gray-100 focus:ring-primary/5 focus:border-primary/20"
                            )}
                          />
                        </div>
                        {errors.email && <p className="text-[9px] sm:text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 flex items-center gap-1"><HiExclamationCircle className="size-3" /> {errors.email}</p>}
                      </div>
                    )}

                    {selectedMethod === 'bitcoin' && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                        <label className="text-sm sm:text-base font-bold text-gray-400 uppercase tracking-widest ml-1">Wallet Address</label>
                        <div className="relative group">
                          <div className={clsx(
                            "absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 duration-300",
                            errors.walletAddress ? "text-red-500" : "text-gray-400 group-focus-within:text-primary"
                          )}>
                            <FaBitcoin className="size-5 sm:size-6" />
                          </div>
                          <input
                            type="text"
                            placeholder="bc1qxy2kgdy627..."
                            value={formData.walletAddress}
                            onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                            className={clsx(
                              "mt-1 w-full bg-gray-50 border rounded-xl py-3.5 sm:py-4 pl-12 sm:pl-14 pr-5 text-gray-900 font-bold focus:bg-white focus:outline-none focus:ring-4 duration-300 text-[10px] sm:text-sm md:text-base font-mono",
                              errors.walletAddress ? "border-red-200 focus:ring-red-500/5 focus:border-red-500" : "border-gray-100 focus:ring-primary/5 focus:border-primary/20"
                            )}
                          />
                        </div>
                        {errors.walletAddress && <p className="text-[9px] sm:text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 flex items-center gap-1"><HiExclamationCircle className="size-3" /> {errors.walletAddress}</p>}
                      </div>
                    )}

                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-50">
                      <button
                        type="button"
                        onClick={editingId ? cancelEdit : () => setFormData(initialFormState)}
                        className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-bold text-gray-500 hover:text-primary duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className={clsx(
                          "w-full sm:w-auto px-8 py-3.5 bg-gradient-primary text-white text-sm sm:text-base font-bold rounded-lg shadow-xl shadow-primary/10 hover:scale-[1.02] active:scale-[0.98] duration-300 flex items-center justify-center gap-2",
                          isSaving && "opacity-80 cursor-wait"
                        )}
                      >
                        {isSaving ? (
                          <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <HiCheckCircle className="size-5 sm:size-6" />
                        )}
                        {isSaving ? 'Processing...' : saveSuccess ? 'Success!' : (editingId ? 'Update Method' : 'Save Method')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default BillingPaymentPage;
