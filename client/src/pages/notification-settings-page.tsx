import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiChevronRight,
  HiCheckCircle
} from 'react-icons/hi';
import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';
import { clsx } from 'clsx';

interface NotificationItemProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
  required?: boolean;
  showBorder?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  enabled,
  onToggle,
  disabled = false,
  required = false,
  showBorder = true
}) => {
  return (
    <div
      onClick={() => !disabled && onToggle()}
      className={clsx(
        "p-5 sm:p-8 flex items-center justify-between gap-4 sm:gap-6 group transition-all duration-300",
        showBorder && "border-b border-gray-50",
        !disabled ? "cursor-pointer hover:bg-gray-50/80" : "bg-white"
      )}
    >
      <div className="flex-1 min-w-0">
        <h4 className={clsx(
          "text-sm sm:text-lg lg:text-xl font-bold font-dm mb-1 sm:mb-1.5 duration-300 truncate sm:whitespace-normal",
          disabled ? "text-gray-400" : "text-gray-900 group-hover:text-primary"
        )}>
          {title}
        </h4>
        <div className="text-[11px] sm:text-base text-gray-400 font-medium font-dm leading-relaxed max-w-2xl">
          {required && (
            <span className="text-red-400 font-extrabold uppercase text-[9px] sm:text-[11px] block mb-1.5 sm:mb-2 tracking-wider">
              REQUIRED. CANNOT BE DISABLED.
            </span>
          )}
          <p className="line-clamp-2 sm:line-clamp-none">{description}</p>
        </div>
      </div>

      <div className="flex items-center shrink-0">
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={clsx(
            "relative inline-flex items-center h-6 w-11 sm:h-7 sm:w-14 cursor-pointer rounded-full transition-colors duration-300 focus:outline-none px-1",
            enabled ? "bg-primary shadow-lg shadow-primary/20" : "bg-gray-200",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span
            className={clsx(
              "pointer-events-none inline-block size-4 sm:size-5 transform rounded-full bg-white shadow-md transition duration-300",
              enabled ? "translate-x-5 sm:translate-x-7" : "translate-x-0"
            )}
          />
        </button>
      </div>
    </div>
  );
};

const NotificationSettingsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Notifications State with Persistence
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('notification_settings');
    return saved ? JSON.parse(saved) : {
      appointmentReminders: true,
      visitConfirmations: true,
      cancellationAlerts: true,
      newMessages: true,
      readReceipts: false,
      profileUpdates: true,
      paymentNotifications: true,
      securityAlerts: true, // Required
      tipsUpdates: false,
      specialOffers: false
    };
  });

  useEffect(() => {
    localStorage.setItem('notification_settings', JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate real save delay
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1200);
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
              <span className="text-gray-500">Notifications</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-playfair mb-8 sm:mb-10 lg:mb-16">Notification Settings</h1>

              <div className="space-y-10 sm:space-y-12 lg:space-y-16">

                {/* Appointments Section */}
                <section>
                  <h3 className="text-[11px] sm:text-[14px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4 sm:mb-6 ml-1">Appointments</h3>
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <NotificationItem
                      title="Appointment Reminders"
                      description="Get notified of upcoming shifts and care visits."
                      enabled={settings.appointmentReminders}
                      onToggle={() => toggleSetting('appointmentReminders')}
                    />
                    <NotificationItem
                      title="Visit Confirmations"
                      description="Receive alerts when a caregiver confirms a visit."
                      enabled={settings.visitConfirmations}
                      onToggle={() => toggleSetting('visitConfirmations')}
                    />
                    <NotificationItem
                      title="Cancellation Alerts"
                      description="Immediate notifications for schedule changes or cancellations."
                      enabled={settings.cancellationAlerts}
                      onToggle={() => toggleSetting('cancellationAlerts')}
                      showBorder={false}
                    />
                  </div>
                </section>

                {/* Messages Section */}
                <section>
                  <h3 className="text-[11px] sm:text-[14px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4 sm:mb-6 ml-1">Messages</h3>
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <NotificationItem
                      title="New Messages"
                      description="Get notified when you receive a message from a client or PSW."
                      enabled={settings.newMessages}
                      onToggle={() => toggleSetting('newMessages')}
                    />
                    <NotificationItem
                      title="Message Read Receipts"
                      description="Show others when you've read their messages."
                      enabled={settings.readReceipts}
                      onToggle={() => toggleSetting('readReceipts')}
                      showBorder={false}
                    />
                  </div>
                </section>

                {/* Account & Security Section */}
                <section>
                  <h3 className="text-[11px] sm:text-[14px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4 sm:mb-6 ml-1">Account & Security</h3>
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <NotificationItem
                      title="Profile Updates"
                      description="Confirmations when changes are made to your account details."
                      enabled={settings.profileUpdates}
                      onToggle={() => toggleSetting('profileUpdates')}
                    />
                    <NotificationItem
                      title="Payment Notifications"
                      description="Receipts and billing updates for completed care sessions."
                      enabled={settings.paymentNotifications}
                      onToggle={() => toggleSetting('paymentNotifications')}
                    />
                    <NotificationItem
                      title="Security Alerts"
                      description="Alerts for unrecognized logins or password changes."
                      enabled={settings.securityAlerts}
                      onToggle={() => { }}
                      disabled={true}
                      required={true}
                      showBorder={false}
                    />
                  </div>
                </section>

                {/* Marketing Section */}
                <section>
                  <h3 className="text-[11px] sm:text-[14px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-4 sm:mb-6 ml-1">Marketing</h3>
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <NotificationItem
                      title="Tips & Platform Updates"
                      description="Helpful advice on home care and news about the curator platform."
                      enabled={settings.tipsUpdates}
                      onToggle={() => toggleSetting('tipsUpdates')}
                    />
                    <NotificationItem
                      title="Special Offers"
                      description="Exclusive discounts and promotional events for our users."
                      enabled={settings.specialOffers}
                      onToggle={() => toggleSetting('specialOffers')}
                      showBorder={false}
                    />
                  </div>
                </section>

                {/* Action Button */}
                <div className="flex justify-end pt-4 sm:pt-6">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={clsx(
                      "w-full sm:w-auto px-10 sm:px-12 py-4 sm:py-5 bg-gradient-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] duration-300 flex items-center justify-center gap-2 text-sm sm:text-lg",
                      isSaving && "opacity-80 cursor-wait"
                    )}
                  >
                    {isSaving ? (
                      <div className="size-5 sm:size-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <HiCheckCircle className="size-5 sm:size-6" />
                    )}
                    {isSaving ? 'Saving...' : saveSuccess ? 'Preferences Saved!' : 'Save Preferences'}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationSettingsPage;
