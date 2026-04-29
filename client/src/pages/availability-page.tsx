import { useState, useEffect } from 'react';
import type { FC } from 'react';

import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  HiCheck,
  HiOutlineMinus,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlinePlus,
  HiOutlineChevronDown,
  HiOutlineX,
  HiChevronRight,
  HiCheckCircle
} from 'react-icons/hi';

import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';

const DaysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TimeBlocks = [
  { id: 'Morning', time: '6am–12pm' },
  { id: 'Afternoon', time: '12pm–6pm' },
  { id: 'Evening', time: '6pm–12am' }
];

const AvailabilityPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRecurring, setIsRecurring] = useState(true);
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [minNotice, setMinNotice] = useState('24 hours (Recommended)');

  const [availability, setAvailability] = useState<Record<string, Record<string, boolean>>>(() => {
    const saved = localStorage.getItem('providerAvailability');
    return saved ? JSON.parse(saved) : {
      Monday: { Morning: true, Afternoon: true, status: true },
      Tuesday: { Morning: true, Afternoon: true, status: true },
      Wednesday: { Morning: true, Afternoon: true, status: true },
      Thursday: { Morning: true, Afternoon: true, status: true },
      Friday: { Morning: true, status: true },
      Saturday: { status: false },
      Sunday: { status: false },
    };
  });

  useEffect(() => {
    localStorage.setItem('providerAvailability', JSON.stringify(availability));
  }, [availability]);

  const activeDays = DaysOfWeek.filter(day => {
    const dayData = availability[day];
    return dayData?.status && TimeBlocks.some(block => dayData[block.id]);
  });

  const getSlotDays = (slotId: string) => {
    return DaysOfWeek
      .filter(day => availability[day]?.status && availability[day]?.[slotId])
      .map(day => day.substring(0, 3))
      .join(', ');
  };

  const calculateHours = () => {
    let total = 0;
    DaysOfWeek.forEach(day => {
      if (availability[day]?.status) {
        if (availability[day]?.Morning) total += 6;
        if (availability[day]?.Afternoon) total += 6;
        if (availability[day]?.Evening) total += 6;
      }
    });
    return total;
  };

  const [isTimeOffModalOpen, setIsTimeOffModalOpen] = useState(false);
  const [newTimeOff, setNewTimeOff] = useState({ startDate: '', endDate: '', title: '' });
  const [timeOff, setTimeOff] = useState<Array<{ id: number; range?: string; date?: string; title: string; icon: FC<{ className?: string }> }>>([
    { id: 1, range: 'Mar 25 – Mar 26, 2026', title: 'Personal time', icon: HiOutlineCalendar },
    { id: 2, date: 'Apr 5, 2026', title: 'Medical appointment', icon: HiOutlineClock },
  ]);

  const toggleSlot = (day: string, slot: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: !prev[day]?.[slot]
      }
    }));
  };

  const toggleDayStatus = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        status: !prev[day]?.status
      }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 5000);
    }, 1500);
  };

  const handleAddTimeOff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTimeOff.startDate || !newTimeOff.title) return;

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const start = new Date(newTimeOff.startDate).toLocaleDateString('en-US', options);
    const end = newTimeOff.endDate ? new Date(newTimeOff.endDate).toLocaleDateString('en-US', options) : '';

    const range = end && end !== start ? `${start} – ${end}` : start;

    const record = {
      id: Date.now(),
      range: range,
      date: range,
      title: newTimeOff.title,
      icon: HiOutlineCalendar
    };

    setTimeOff(prev => [...prev, record]);
    setNewTimeOff({ startDate: '', endDate: '', title: '' });
    setIsTimeOffModalOpen(false);
  };

  const deleteTimeOff = (id: number) => {
    setTimeOff(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="flex h-screen w-full bg-surface-alt font-dm overflow-hidden">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 lg:ml-72 flex flex-col h-screen overflow-hidden">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 sm:p-8 lg:p-12 pb-24">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8 text-[10px] sm:text-xs md:text-sm font-medium overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link to="/settings" className="text-primary hover:underline shrink-0">Settings</Link>
              <HiChevronRight className="size-3 sm:size-4 text-gray-400 shrink-0" />
              <Link to="/settings/preferences" className="text-primary hover:underline shrink-0">Preferences</Link>
              <HiChevronRight className="size-3 sm:size-4 text-gray-400 shrink-0" />
              <span className="text-gray-500 shrink-0">Schedule & Availability</span>
            </div>

            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-10 lg:mb-12">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-playfair mb-2 sm:mb-3 leading-tight tracking-tight">Schedule & Availability</h1>
                  <p className="text-xs sm:text-sm md:text-base text-text-muted font-medium font-dm leading-relaxed">
                    Set your working hours and manage your personal time off.
                  </p>
                </div>
                <button
                  onClick={handleSave}
                  disabled={isSaving || saveSuccess}
                  className={clsx(
                    "px-8 sm:px-12 py-3.5 sm:py-4 bg-gradient-primary text-white rounded-xl font-bold font-dm shadow-xl shadow-primary/20 hover:shadow-xl hover:scale-[1.02] duration-300 active:scale-95 flex items-center justify-center gap-2",
                    (isSaving || saveSuccess) && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isSaving ? (
                    <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : saveSuccess ? (
                    <HiCheckCircle className="size-6" />
                  ) : (
                    <HiCheck className="size-6" />
                  )}
                  {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Schedule'}
                </button>
              </div>

              {saveSuccess && (
                <div className="mb-8 bg-emerald-50 border border-emerald-100 p-4 sm:p-6 rounded-xl sm:rounded-2xl flex items-center gap-4 animate-in zoom-in duration-300">
                  <HiCheckCircle className="size-6 sm:size-8 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="text-emerald-900 font-bold font-dm text-sm sm:text-base">Schedule Updated</h4>
                    <p className="text-emerald-700 text-xs sm:text-sm font-medium font-dm">Your availability preferences have been saved successfully.</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-10">
                <div className="xl:col-span-2 space-y-8">
                  {/* Weekly Schedule Card */}
                  <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-playfair">Weekly Schedule</h3>
                      <div className="flex items-center gap-3 bg-primary/5 px-4 py-2.5 rounded-full self-start sm:self-auto">
                        <span className="text-xs sm:text-sm text-gray-600 font-medium font-dm">Set recurring schedule</span>
                        <button
                          onClick={() => setIsRecurring(!isRecurring)}
                          className={clsx(
                            "w-10 h-5 sm:w-12 sm:h-6 rounded-full relative duration-300",
                            isRecurring ? "bg-primary" : "bg-gray-200"
                          )}
                        >
                          <div className={clsx(
                            "absolute top-0.5 sm:top-1 size-4 bg-white rounded-full duration-300 shadow-sm",
                            isRecurring ? "left-5 sm:left-7" : "left-1"
                          )} />
                        </button>
                      </div>
                    </div>

                    <div className="hidden lg:block p-8 overflow-x-auto custom-scrollbar">
                      <table className="w-full min-w-[700px] border-collapse">
                        <thead>
                          <tr className="bg-primary/5">
                            <th className="py-5 px-6 text-[13px] font-black text-gray-400 uppercase tracking-[0.2em] rounded-l-2xl text-left">Day</th>
                            {TimeBlocks.map(block => (
                              <th key={block.id} className="py-5 px-4 text-center">
                                <p className="text-[13px] font-black text-gray-400 uppercase tracking-[0.2em]">{block.id}</p>
                                <p className="text-[13px] text-primary/40 font-bold mt-1">{block.time}</p>
                              </th>
                            ))}
                            <th className="py-5 px-6 text-[13px] font-black text-gray-400 uppercase tracking-[0.2em] rounded-r-2xl text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {DaysOfWeek.map((day, idx) => {
                            const dayData = availability[day];
                            const isDayOff = !dayData?.status;

                            return (
                              <tr key={idx} className={clsx("duration-300 group", isDayOff ? "opacity-30" : "hover:bg-gray-50/50")}>
                                <td className="py-6 px-6 font-bold text-gray-900 font-dm border-b border-gray-100">{day}</td>
                                {TimeBlocks.map(block => {
                                  const isSelected = dayData?.[block.id];
                                  return (
                                    <td key={block.id} className="py-6 px-4 border-b border-gray-100">
                                      <div className="flex justify-center">
                                        <button
                                          disabled={isDayOff}
                                          onClick={() => toggleSlot(day, block.id)}
                                          className={clsx(
                                            "size-11 rounded-full flex items-center justify-center duration-300 shadow-sm",
                                            isSelected
                                              ? "bg-gradient-primary text-white scale-100"
                                              : "bg-gray-100 text-gray-300 hover:bg-gray-200 hover:scale-105 scale-95"
                                          )}
                                        >
                                          {isSelected ? <HiCheck className="size-6" /> : <HiOutlineMinus className="size-6" />}
                                        </button>
                                      </div>
                                    </td>
                                  );
                                })}
                                <td className="py-6 px-6 border-b border-gray-100">
                                  <div className="flex justify-center">
                                    <button
                                      onClick={() => toggleDayStatus(day)}
                                      className={clsx(
                                        "w-12 h-6 rounded-full relative duration-300 shadow-sm",
                                        dayData?.status ? "bg-primary" : "bg-gray-200"
                                      )}
                                    >
                                      <div className={clsx(
                                        "absolute top-1 size-4 bg-white rounded-full duration-300 shadow-sm",
                                        dayData?.status ? "left-7" : "left-1"
                                      )} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="lg:hidden p-4 sm:p-6 space-y-4">
                      {DaysOfWeek.map((day) => {
                        const dayData = availability[day];
                        const isDayOff = !dayData?.status;
                        return (
                          <div
                            key={day}
                            className={clsx(
                              "p-5 rounded-[24px] border border-gray-100 duration-300",
                              isDayOff ? "bg-gray-50/50 opacity-60" : "bg-white shadow-sm"
                            )}
                          >
                            <div className="flex items-center justify-between mb-5">
                              <h4 className="font-bold text-gray-900 font-dm">{day}</h4>
                              <button
                                onClick={() => toggleDayStatus(day)}
                                className={clsx(
                                  "w-10 h-5 rounded-full relative duration-300",
                                  dayData?.status ? "bg-primary" : "bg-gray-200"
                                )}
                              >
                                <div className={clsx(
                                  "absolute top-0.5 size-4 bg-white rounded-full duration-300 shadow-sm",
                                  dayData?.status ? "left-5" : "left-1"
                                )} />
                              </button>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              {TimeBlocks.map(block => {
                                const isSelected = dayData?.[block.id];
                                return (
                                  <button
                                    key={block.id}
                                    disabled={isDayOff}
                                    onClick={() => toggleSlot(day, block.id)}
                                    className={clsx(
                                      "flex flex-col items-center gap-2 p-3 rounded-2xl duration-300 border",
                                      isSelected
                                        ? "bg-primary/5 border-primary text-primary"
                                        : "bg-white border-gray-50 text-gray-300"
                                    )}
                                  >
                                    <span className="text-[10px] font-black uppercase tracking-widest">{block.id.substring(0, 3)}</span>
                                    <div className={clsx(
                                      "size-8 rounded-full flex items-center justify-center duration-300",
                                      isSelected ? "bg-primary text-white" : "bg-gray-50"
                                    )}>
                                      {isSelected ? <HiCheck className="size-4" /> : <HiOutlineMinus className="size-4" />}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Scheduled Time Off Card */}
                  <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-sm p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-playfair">Scheduled Time Off</h3>
                      <button
                        onClick={() => setIsTimeOffModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-xl font-bold font-dm hover:bg-primary/5 duration-300 w-full sm:w-auto"
                      >
                        <HiOutlinePlus className="size-4" />
                        <span>Add Time Off</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {timeOff.length > 0 ? (
                        timeOff.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 sm:p-6 bg-primary/5 rounded-2xl group border border-primary/5 hover:border-primary/10 duration-300">
                            <div className="flex items-center gap-4 sm:gap-5">
                              <div className="size-10 sm:size-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                                <item.icon className="size-5 sm:size-6 text-primary" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm sm:text-base font-bold text-gray-900 font-dm truncate">{item.range || item.date}</p>
                                <p className="text-xs sm:text-sm text-gray-400 font-medium font-dm mt-0.5 truncate">{item.title}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteTimeOff(item.id)}
                              className="text-gray-300 hover:text-red-500 duration-300 ml-4"
                            >
                              <HiOutlineX className="size-5 sm:size-6" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                          <div className="size-14 rounded-2xl bg-white flex items-center justify-center shadow-sm text-gray-300">
                            <HiOutlineCalendar className="size-7" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-base font-bold text-gray-900 font-dm">No time off scheduled</p>
                            <p className="text-sm text-gray-400 font-medium font-dm">You haven't scheduled any time off yet.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Summary Card */}
                  <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-sm p-8">
                    <h3 className="text-xl font-bold text-gray-900 font-playfair mb-8">Availability Summary</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Available Days</p>
                        <p className="text-sm font-bold text-gray-900 font-dm">{activeDays.length} days/week</p>
                      </div>
                      <div className="flex justify-between items-start">
                        <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Morning Slots</p>
                        <p className="text-sm font-bold text-gray-900 font-dm text-right">{getSlotDays('Morning') || 'None'}</p>
                      </div>
                      <div className="flex justify-between items-start">
                        <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Afternoon Slots</p>
                        <p className="text-sm font-bold text-gray-900 font-dm text-right">{getSlotDays('Afternoon') || 'None'}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Weekly Hours</p>
                        <p className="text-sm font-bold text-gray-900 font-dm">~{calculateHours()} hours</p>
                      </div>
                      <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                        <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Min. Notice</p>
                        <p className="text-sm font-bold text-primary font-dm">{minNotice.split(' ')[0]} {minNotice.split(' ')[1]}</p>
                      </div>
                    </div>
                  </div>

                  {/* Settings Card */}
                  <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-gray-100 shadow-sm p-8">
                    <h3 className="text-xl font-bold text-gray-900 font-playfair mb-8">Booking Settings</h3>
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Minimum Notice</label>
                        <div className="relative group">
                          <select
                            value={minNotice}
                            onChange={(e) => setMinNotice(e.target.value)}
                            className="w-full h-14 bg-primary/5 border border-transparent rounded-xl px-6 text-sm font-bold text-gray-900 appearance-none outline-none focus:border-primary/20 duration-300"
                          >
                            <option>24 hours (Recommended)</option>
                            <option>12 hours</option>
                            <option>48 hours</option>
                          </select>
                          <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 size-5 pointer-events-none group-hover:text-primary duration-300" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Max Booking Advance</label>
                        <div className="relative group">
                          <select className="w-full h-14 bg-primary/5 border border-transparent rounded-xl px-6 text-sm font-bold text-gray-900 appearance-none outline-none focus:border-primary/20 duration-300">
                            <option>30 days</option>
                            <option>60 days</option>
                            <option>90 days</option>
                          </select>
                          <HiOutlineChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 size-5 pointer-events-none group-hover:text-primary duration-300" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <p className="text-sm font-bold text-gray-900 font-dm">Auto-confirm</p>
                        <button
                          onClick={() => setAutoConfirm(!autoConfirm)}
                          className={clsx(
                            "w-12 h-6 rounded-full relative duration-300",
                            autoConfirm ? "bg-primary" : "bg-gray-200"
                          )}
                        >
                          <div className={clsx(
                            "absolute top-1 size-4 bg-white rounded-full duration-300",
                            autoConfirm ? "left-7" : "left-1"
                          )} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Time Off Modal */}
      {isTimeOffModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setIsTimeOffModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 font-playfair">Schedule Time Off</h3>
              <button
                onClick={() => setIsTimeOffModalOpen(false)}
                className="size-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 duration-300"
              >
                <HiOutlineX className="size-5" />
              </button>
            </div>
            <form onSubmit={handleAddTimeOff} className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-900 font-dm">Start Date</label>
                  <input
                    type="date"
                    value={newTimeOff.startDate}
                    onChange={(e) => setNewTimeOff({ ...newTimeOff, startDate: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-2xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary duration-300 text-gray-900 font-medium text-sm sm:text-base font-dm shadow-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-900 font-dm">End Date (Optional)</label>
                  <input
                    type="date"
                    value={newTimeOff.endDate}
                    onChange={(e) => setNewTimeOff({ ...newTimeOff, endDate: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-2xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary duration-300 text-gray-900 font-medium text-sm sm:text-base font-dm shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-900 font-dm">Reason / Label</label>
                <input
                  type="text"
                  placeholder="e.g. Vacation, Personal, Medical"
                  value={newTimeOff.title}
                  onChange={(e) => setNewTimeOff({ ...newTimeOff, title: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-2xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary duration-300 text-gray-900 font-medium placeholder:text-gray-400 text-sm sm:text-base font-dm shadow-sm"
                  required
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsTimeOffModalOpen(false)}
                  className="flex-1 h-14 bg-gray-50 text-gray-500 rounded-2xl font-bold font-dm hover:bg-gray-100 duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-2 h-14 bg-gradient-primary text-white rounded-2xl font-bold font-dm shadow-lg shadow-primary/20 hover:shadow-xl duration-300"
                >
                  Schedule Time Off
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityPage;
