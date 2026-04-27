import { useState } from 'react';
import { clsx } from 'clsx';
import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';
import RequestCard from '../components/dashboard/requestCard/requestCard';
import { HiOutlineLightningBolt, HiOutlineCalendar } from 'react-icons/hi';

const CareRequestsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All Requests');

  const tabs = ['All Requests', 'Today', 'Upcoming', 'History'];

  const allRequests: Array<{
    id: number;
    initials: string;
    color: string;
    name: string;
    type: string;
    date: string;
    time: string;
    status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";
    category: string;
  }> = [
    {
      id: 1,
      initials: "JS",
      color: "bg-purple-100 text-purple-600",
      name: "Jane Smith",
      type: "Alzheimer's Care",
      date: "Today",
      time: "11:00–12:00pm",
      status: "PENDING",
      category: "Today"
    },
    {
      id: 2,
      initials: "RC",
      color: "bg-pink-100 text-pink-600",
      name: "Robert Chen",
      type: "Post-Surgery Care",
      date: "Today",
      time: "3:00–4:30pm",
      status: "PENDING",
      category: "Today"
    },
    {
      id: 3,
      initials: "MW",
      color: "bg-green-100 text-green-600",
      name: "Mary Wilson",
      type: "Elder Care",
      date: "Mon, Mar 17",
      time: "10:00–11:30am",
      status: "PENDING",
      category: "Upcoming"
    },
    {
      id: 4,
      initials: "PK",
      color: "bg-blue-100 text-blue-600",
      name: "Peter Kim",
      type: "Dementia Care",
      date: "Wed, Mar 19",
      time: "2:00–3:00pm",
      status: "PENDING",
      category: "Upcoming"
    },
    {
      id: 5,
      initials: "AL",
      color: "bg-orange-100 text-orange-600",
      name: "Alice Low",
      type: "Personal Care",
      date: "Feb 28, 2026",
      time: "9:00–10:30am",
      status: "PENDING",
      category: "History"
    }
  ];

  const filteredRequests = allRequests.filter(req =>
    activeTab === 'All Requests' || req.category === activeTab
  );

  const [availability] = useState(() => {
    const saved = localStorage.getItem('providerAvailability');
    const rawData = saved ? JSON.parse(saved) : {
      Monday: { Morning: true, Afternoon: true, status: true },
      Tuesday: { Morning: true, Afternoon: true, status: true },
      Wednesday: { Morning: true, Afternoon: true, status: true },
      Thursday: { Morning: true, Afternoon: true, status: true },
      Friday: { Morning: true, status: true },
      Saturday: { status: false },
      Sunday: { status: false },
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.map(day => {
      const data = rawData[day];
      if (!data?.status) return { day: day.substring(0, 3).toUpperCase(), time: 'Off Duty' };

      const activeSlots = [];
      if (data.Morning) activeSlots.push({ start: '6am', end: '12pm', order: 1 });
      if (data.Afternoon) activeSlots.push({ start: '12pm', end: '6pm', order: 2 });
      if (data.Evening) activeSlots.push({ start: '6pm', end: '12am', order: 3 });

      if (activeSlots.length === 0) return { day: day.substring(0, 3).toUpperCase(), time: 'Off Duty' };

      // Calculate range based on active slots
      const startTime = activeSlots[0].start;
      const endTime = activeSlots[activeSlots.length - 1].end;
      const timeRange = `${startTime} – ${endTime}`;

      const shortDay = day.substring(0, 3).toUpperCase();

      return {
        day: shortDay,
        time: timeRange
      };
    });
  });

  return (
    <div className="flex min-h-screen bg-[#fcfafc]">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col min-w-0 lg:ml-72">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 custom-scrollbar">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-playfair mb-1 sm:mb-2">Care Requests</h1>
              <p className="text-xs sm:text-sm lg:text-base text-gray-400 font-medium font-dm">Manage your history and scheduled appointments</p>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap items-center gap-2 sm:gap-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-5 sm:px-8 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-sm font-bold font-dm duration-300 whitespace-nowrap shrink-0",
                  activeTab === tab
                    ? 'bg-gradient-purple text-white shadow-lg shadow-primary/20'
                    : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <div className="xl:col-span-2 space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 font-playfair">{activeTab}</h3>
                <span className="px-2.5 py-1 bg-primary/5 text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {filteredRequests.length} {filteredRequests.length === 1 ? 'APPOINTMENT' : 'APPOINTMENTS'}
                </span>
              </div>

              <div className="space-y-4">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map(req => (
                    <RequestCard
                      key={req.id}
                      initials={req.initials}
                      color={req.color}
                      name={req.name}
                      type={req.type}
                      date={req.date}
                      time={req.time}
                      status={req.status}
                    />
                  ))
                ) : (
                  <div className="bg-white rounded-[32px] border border-dashed border-gray-200 p-12 text-center">
                    <p className="text-gray-400 font-medium font-dm">No {activeTab.toLowerCase()} requests found.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 font-playfair mb-6 flex items-center gap-3">
                  <HiOutlineLightningBolt className="size-6 text-primary" />
                  Today's Summary
                </h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-gray-50 pb-4">
                    <p className="text-sm text-gray-400 font-medium font-dm">Appointments today</p>
                    <p className="text-2xl font-bold text-gray-900 font-dm leading-none">2</p>
                  </div>
                  <div className="flex justify-between items-end border-b border-gray-50 pb-4">
                    <p className="text-sm text-gray-400 font-medium font-dm">Hours today</p>
                    <p className="text-2xl font-bold text-gray-900 font-dm leading-none">2.5 hrs</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-sm text-gray-400 font-medium font-dm">Earnings today</p>
                    <p className="text-2xl font-bold text-primary font-dm leading-none">$150</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions - Commented out as requested
              <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-bold text-gray-900 font-playfair mb-6 flex items-center gap-3">
                  <HiOutlineLightningBolt className="size-6 text-primary" />
                  Quick Actions
                </h4>
                <div className="space-y-3">
                  <button className="w-full py-4 bg-gradient-purple text-white rounded-2xl font-bold font-dm hover:shadow-lg hover:shadow-primary/30 duration-300">
                    Schedule Time Off
                  </button>
                  <button className="w-full py-4 bg-white border border-gray-100 text-gray-900 rounded-2xl font-bold font-dm hover:bg-gray-50 duration-300">
                    View Full Calendar
                  </button>
                </div>
              </div>
              */}

              <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-logs">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-xl font-bold text-gray-900 font-playfair flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/5 flex items-center justify-center">
                      <HiOutlineCalendar className="size-5 text-primary" />
                    </div>
                    Availability This Week
                  </h4>
                </div>

                <div className="space-y-3">
                  {availability.map((item) => {
                    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                    const isToday = item.day === today;
                    const isOff = item.time === 'Off Duty';

                    return (
                      <div
                        key={item.day}
                        className={clsx(
                          "flex items-center justify-between p-4 rounded-2xl duration-300",
                          isToday ? "bg-primary/5 border border-primary/10" : "bg-gray-50/50 border border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className={clsx(
                            "w-12 h-8 rounded-lg flex items-center justify-center text-[10px] font-black tracking-widest",
                            isToday ? "bg-primary text-white" : "bg-white text-gray-400 border border-gray-100 shadow-sm"
                          )}>
                            {item.day}
                          </div>
                          <p className={clsx(
                            "text-[13px] font-bold font-dm",
                            isToday ? "text-primary" : "text-gray-900",
                            isOff && "text-gray-300"
                          )}>
                            {item.time}
                          </p>
                        </div>

                        {!isOff && (
                          <div className="size-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => window.location.href = '/availability'}
                  className="w-full mt-6 py-4 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-primary/5 hover:text-primary duration-300 border border-transparent hover:border-primary/10"
                >
                  Edit Schedule
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default CareRequestsPage;
