import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineUserAdd,
  HiOutlineUsers,
  HiCheck,
  HiChevronRight,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineEye,
  HiOutlineEyeOff
} from 'react-icons/hi';
import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';
import { clsx } from 'clsx';

const initialCurrentAccount = {
  id: '1',
  name: 'Jack Hudson',
  email: 'jackhudson@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150',
};

const initialOtherAccounts = [
  {
    id: '2',
    name: 'Sarah Johson',
    email: 'sarahjohnson@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150',
  }
];

const SwitchAccountsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(initialCurrentAccount);
  const [otherAccounts, setOtherAccounts] = useState(initialOtherAccounts);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isManageMode, setIsManageMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New account form state
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSwitchAccount = (targetAccount: typeof initialCurrentAccount) => {
    if (isManageMode) return;
    setIsSwitching(true);

    setTimeout(() => {
      setOtherAccounts(prev => [
        ...prev.filter(a => a.id !== targetAccount.id),
        currentAccount
      ]);
      setCurrentAccount(targetAccount);
      setIsSwitching(false);
    }, 800);
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newPassword) return;

    const extractedName = newEmail.split('@')[0].replace('.', ' ');
    const capitalizedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);

    const newAccount = {
      id: Date.now().toString(),
      name: capitalizedName,
      email: newEmail,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(capitalizedName)}&background=random`,
    };

    setOtherAccounts(prev => [...prev, newAccount]);
    setNewEmail('');
    setNewPassword('');
    setIsAddModalOpen(false);
  };

  const handleRemoveAccount = (id: string) => {
    setOtherAccounts(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="flex h-screen w-full bg-[#fcfafc] font-dm overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          {/* Switching Overlay */}
          {isSwitching && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-center p-6">
                <div className="size-10 sm:size-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-gray-900 font-bold font-dm text-sm sm:text-base">Switching account...</p>
              </div>
            </div>
          )}

          {/* Add Account Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-dm">Add Account</h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-gray-400 hover:text-primary duration-300">
                    <HiOutlineX className="size-5 sm:size-6" />
                  </button>
                </div>
                <form onSubmit={handleAddAccount} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full bg-gray-50 border border-gray-100 rounded-lg sm:rounded-xl py-2.5 sm:py-3.5 px-3 sm:px-4 text-sm font-dm focus:ring-2 focus:ring-primary/20 focus:bg-white duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 ml-1">Password</label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full bg-gray-50 border border-gray-100 rounded-lg sm:rounded-xl py-2.5 sm:py-3.5 px-3 sm:px-4 text-sm font-dm focus:ring-2 focus:ring-primary/20 focus:bg-white duration-300 pr-10 sm:pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-primary duration-300"
                      >
                        {showPassword ? <HiOutlineEyeOff className="size-4 sm:size-5" /> : <HiOutlineEye className="size-4 sm:size-5" />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-primary text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] duration-300 mt-2 text-sm sm:text-base"
                  >
                    Add Account
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="p-4 sm:p-8 lg:p-12 pb-24">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8 lg:mb-10 text-[10px] sm:text-sm font-medium">
              <Link to="/settings" className="text-primary hover:underline flex items-center gap-1">
                Settings
              </Link>
              <HiChevronRight className="size-3 sm:size-4 text-gray-400" />
              <span className="text-gray-500">Switch Accounts</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-playfair mb-6 sm:mb-8 lg:mb-12">Switch Accounts</h1>

              {/* Your Account Section */}
              <div className="mb-8 sm:mb-10">
                <h4 className="text-[10px] sm:text-[11px] lg:text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3 sm:mb-4 ml-1">
                  Active Account
                </h4>
                <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-primary/20 shadow-lg shadow-primary/5 p-4 sm:p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="size-12 sm:size-14 lg:size-16 rounded-full overflow-hidden border-2 border-primary/10 shrink-0">
                      <img src={currentAccount.avatar} alt={currentAccount.name} className="size-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 font-dm truncate">{currentAccount.name}</h3>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-400 font-medium font-dm truncate">{currentAccount.email}</p>
                    </div>
                  </div>
                  <div className="size-7 sm:size-8 lg:size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 ml-2">
                    <HiCheck className="size-4 sm:size-5 lg:size-6" />
                  </div>
                </div>
              </div>

              {/* Other Accounts Section */}
              <div className="mb-8 sm:mb-10">
                <h4 className="text-[10px] sm:text-[11px] lg:text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3 sm:mb-4 ml-1">
                  Other Accounts
                </h4>
                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Other Account Items */}
                  {otherAccounts.length > 0 ? (
                    otherAccounts.map((account) => (
                      <div
                        key={account.id}
                        onClick={() => handleSwitchAccount(account)}
                        className={clsx(
                          "p-4 sm:p-6 flex items-center justify-between duration-300 border-b border-gray-50 group",
                          isManageMode ? "cursor-default" : "cursor-pointer hover:bg-primary/[0.02]"
                        )}
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          <div className={clsx(
                            "size-10 sm:size-12 lg:size-14 rounded-full overflow-hidden border-2 border-gray-100 duration-300 shrink-0",
                            !isManageMode && "grayscale-[0.5] group-hover:grayscale-0"
                          )}>
                            <img src={account.avatar} alt={account.name} className="size-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h3 className={clsx(
                              "text-base sm:text-lg font-bold text-gray-900 font-dm duration-300 truncate",
                              !isManageMode && "group-hover:text-primary"
                            )}>
                              {account.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-400 font-medium font-dm truncate">{account.email}</p>
                          </div>
                        </div>

                        {isManageMode ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveAccount(account.id);
                            }}
                            className="p-2 sm:p-3 bg-red-50 text-red-500 rounded-lg sm:rounded-xl hover:bg-red-500 hover:text-white duration-300 shrink-0 ml-2"
                          >
                            <HiOutlineTrash className="size-4 sm:size-5" />
                          </button>
                        ) : (
                          <div className="text-primary opacity-0 group-hover:opacity-100 duration-300 font-bold text-[10px] sm:text-sm shrink-0 ml-2">
                            Switch
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-8 sm:p-10 text-center text-gray-400 font-medium text-sm sm:text-base">
                      No other accounts added
                    </div>
                  )}

                  {/* Add Account */}
                  <div
                    onClick={() => setIsAddModalOpen(true)}
                    className="p-4 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 duration-300 border-b border-gray-50 group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="size-10 sm:size-12 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white duration-300 shrink-0">
                        <HiOutlineUserAdd className="size-5 sm:size-6" />
                      </div>
                      <span className="text-sm sm:text-[16px] font-bold text-gray-700 font-dm group-hover:text-primary duration-300">
                        Add Account
                      </span>
                    </div>
                    <HiChevronRight className="size-4 sm:size-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 duration-300" />
                  </div>

                  {/* Manage Accounts */}
                  <div
                    onClick={() => setIsManageMode(!isManageMode)}
                    className={clsx(
                      "p-4 sm:p-6 flex items-center justify-between cursor-pointer duration-300 group",
                      isManageMode ? "bg-primary/5" : "hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={clsx(
                        "size-10 sm:size-12 rounded-lg flex items-center justify-center duration-300 shrink-0",
                        isManageMode ? "bg-primary text-white" : "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white"
                      )}>
                        <HiOutlineUsers className="size-5 sm:size-6" />
                      </div>
                      <span className={clsx(
                        "text-sm sm:text-[16px] font-bold font-dm duration-300",
                        isManageMode ? "text-primary" : "text-gray-700 group-hover:text-primary"
                      )}>
                        {isManageMode ? "Done Managing" : "Manage Accounts"}
                      </span>
                    </div>
                    {!isManageMode && <HiChevronRight className="size-4 sm:size-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 duration-300" />}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default SwitchAccountsPage;
