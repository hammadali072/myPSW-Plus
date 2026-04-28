import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineCamera,
  HiChevronRight,
  HiCheckCircle,
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineExclamationCircle
} from 'react-icons/hi';
import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';

const ProfileSettingsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150');

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Jack Hudson',
    phoneNumber: '(123) 456-7890',
    certId: 'PSW-109283-ON',
    experience: '8+ Years'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    document.getElementById('profile-upload-input')?.click();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid format: (123) 456-7890";
    }

    if (!formData.certId.trim()) {
      newErrors.certId = "Certification ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-[#fcfafc] font-dm overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 sm:p-8 lg:p-12 pb-24">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8 lg:mb-10 text-[10px] sm:text-sm font-medium">
              <Link to="/settings" className="text-primary hover:underline flex items-center gap-1">
                Settings
              </Link>
              <HiChevronRight className="size-3 sm:size-4 text-gray-400" />
              <span className="text-gray-500">Profile Settings</span>
            </div>

            {/* Page Header */}
            <div className="mb-8 lg:mb-14">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-playfair mb-3">Provider Profile</h1>
              <p className="text-sm sm:text-lg text-gray-500 font-medium font-dm max-w-3xl leading-relaxed">
                Manage your clinical identity and personal information to maintain your PSW provider status.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

              {/* Left Column - Professional Snapshot */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-green-50 text-green-600 px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <HiOutlineShieldCheck className="size-3" />
                      Verified PSW
                    </div>
                  </div>

                  <div className="relative inline-block mb-4 sm:mb-6">
                    <div className="size-28 sm:size-40 rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-primary/5 shadow-inner">
                      <img src={profileImage} alt="Profile" className="size-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={triggerImageUpload}
                      className="absolute -bottom-2 -right-2 size-8 sm:size-10 bg-gradient-primary text-white rounded-lg shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 duration-300"
                    >
                      <HiOutlineCamera className="size-4 sm:size-5" />
                    </button>
                    <input
                      id="profile-upload-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-dm mb-1 truncate">{formData.fullName}</h2>
                  <p className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-6 sm:mb-8">Personal Support Worker</p>

                  <div className="space-y-4 sm:space-y-5 text-left pt-5 sm:pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-3 sm:gap-4 text-gray-600 min-w-0">
                      <HiOutlineMail className="size-5 sm:size-6 text-primary shrink-0" />
                      <span className="text-sm sm:text-base font-medium truncate">jackhudson@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 text-gray-600 min-w-0">
                      <HiOutlinePhone className="size-5 sm:size-6 text-primary shrink-0" />
                      <span className="text-sm sm:text-base font-medium truncate">{formData.phoneNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
                  <h4 className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest px-2">Clinical Highlights</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <HiOutlineAcademicCap className="size-5 sm:size-6 text-primary shrink-0" />
                      <span className="text-sm sm:text-base font-bold text-gray-700 truncate">{formData.certId}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <HiOutlineBriefcase className="size-5 sm:size-6 text-primary shrink-0" />
                      <span className="text-sm sm:text-base font-bold text-gray-700 truncate">{formData.experience} Exp.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Editor */}
              <div className="lg:col-span-8 space-y-6 sm:space-y-8">

                {/* Basic Details Section */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 lg:p-12">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-playfair mb-6 sm:mb-8 border-b border-gray-50 pb-4">Basic Information</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full bg-gray-50 border rounded-xl py-3 sm:py-4 px-4 sm:px-5 text-gray-700 font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 duration-300 ${errors.fullName ? 'border-red-500' : 'border-gray-100'}`}
                      />
                      {errors.fullName && <p className="text-red-500 text-[10px] sm:text-xs font-bold mt-1 ml-1 flex items-center gap-1"><HiOutlineExclamationCircle className="size-4" /> {errors.fullName}</p>}
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 lg:p-12">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-playfair mb-6 sm:mb-8 border-b border-gray-50 pb-4">Contact Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Phone Number</label>
                      <input
                        type="text"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="(123) 456-7890"
                        className={`w-full bg-gray-50 border rounded-xl py-3 sm:py-4 px-4 sm:px-5 text-gray-700 font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary/20 duration-300 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-100'}`}
                      />
                      {errors.phoneNumber && <p className="text-red-500 text-[10px] sm:text-xs font-bold mt-1 ml-1 flex items-center gap-1"><HiOutlineExclamationCircle className="size-4" /> {errors.phoneNumber}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          defaultValue="jackhudson@gmail.com"
                          readOnly
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 sm:py-4 px-4 sm:px-5 text-gray-400 font-bold cursor-not-allowed"
                        />
                        <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] font-bold text-gray-400 bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg border border-gray-100">READ ONLY</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clinical Credentials Section */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 lg:p-12">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-playfair mb-6 sm:mb-8 border-b border-gray-50 pb-4">Clinical Credentials</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Certification ID</label>
                      <input
                        type="text"
                        value={formData.certId}
                        onChange={(e) => setFormData({ ...formData, certId: e.target.value })}
                        className={`w-full bg-gray-50 border rounded-xl py-3 sm:py-4 px-4 sm:px-5 text-gray-700 font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 duration-300 ${errors.certId ? 'border-red-500' : 'border-gray-100'}`}
                      />
                      {errors.certId && <p className="text-red-500 text-[10px] sm:text-xs font-bold mt-1 ml-1 flex items-center gap-1"><HiOutlineExclamationCircle className="size-4" /> {errors.certId}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Years of Experience</label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 sm:py-4 px-4 sm:px-5 text-gray-700 font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary/20 duration-300 appearance-none cursor-pointer"
                      >
                        <option>8+ Years</option>
                        <option>10+ Years</option>
                        <option>5-8 Years</option>
                        <option>2-5 Years</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Sticky Action Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 p-5 sm:p-10 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-xl shadow-black/[0.02]">
                  <button type="button" className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 text-gray-500 font-bold hover:text-primary duration-300 text-sm sm:text-base">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className={`w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-gradient-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${isSaving ? 'opacity-80 cursor-wait' : ''}`}
                  >
                    {isSaving ? (
                      <div className="size-4 sm:size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <HiCheckCircle className="size-4 sm:size-5" />
                    )}
                    {isSaving ? 'Saving...' : saveSuccess ? 'Changes Saved!' : 'Save Changes'}
                  </button>
                </div>

              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettingsPage;
