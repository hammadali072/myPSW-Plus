import { useState } from 'react';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatCard from '../components/dashboard/StatCard';
import AppointmentItem from '../components/dashboard/AppointmentItem';
import ClientItem from '../components/dashboard/ClientItem';
import { HiOutlineClock, HiOutlineCurrencyDollar, HiOutlineUsers, HiChevronRight } from 'react-icons/hi';
import { FaStar } from "react-icons/fa";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fcfafc]">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col min-w-0 lg:ml-72">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 space-y-6 lg:space-y-10 custom-scrollbar">
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            <StatCard
              title="Hours this month"
              value="47"
              subtitle="12% from last month"
              trend="12% from last month"
              icon={HiOutlineClock}
              color="purple"
            />
            <StatCard
              title="Earning this month"
              value="$3,280"
              subtitle="Net after platform fee"
              icon={HiOutlineCurrencyDollar}
              color="pink"
            />
            <div className="sm:col-span-2 lg:col-span-1">
              <StatCard
                title="Active Patients"
                value="8"
                subtitle="2 new this week"
                icon={HiOutlineUsers}
                color="green"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-10">
            {/* Left Column: Upcoming Appointments & Earnings Overview */}
            <div className="xl:col-span-2 space-y-6 lg:space-y-10">
              {/* Upcoming Appointments */}
              <div className="bg-white rounded-[24px] p-6 lg:p-10 border border-gray-100 shadow-logs hover:shadow-xl hover:shadow-black/5 duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 font-playfair">Upcoming Appointments</h3>
                  <button className="flex items-center gap-2 text-primary font-bold font-dm text-md hover:underline underline-offset-4 self-start sm:self-auto">
                    <span>See all</span>
                    <HiChevronRight className="size-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <AppointmentItem
                    name="Jane Smith"
                    location="Toronto, ON"
                    image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150"
                    time="11:00 am - 12:00 pm"
                    status="Confirmed"
                    isToday
                  />
                  <AppointmentItem
                    name="Robert Chen"
                    location="Toronto, ON"
                    image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150"
                    time="3:00 pm - 4:30 pm"
                    status="Confirmed"
                    isToday
                  />
                </div>
              </div>

              {/* Earnings Overview */}
              <div className="bg-white rounded-[24px] p-6 lg:p-10 border border-gray-100 shadow-logs hover:shadow-xl hover:shadow-black/5 duration-500">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 font-playfair mb-6">Earnings Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                  {[
                    { label: 'Today', value: '$150' },
                    { label: 'This Week', value: '$920' },
                    { label: 'This Month', value: '$3,840' }
                  ].map((item) => (
                    <div key={item.label} className="p-6 lg:p-8 rounded-2xl bg-[#f4efff] border border-primary/10 text-center group duration-500 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-primary/10">
                      <p className="text-[#7366a0] text-sm lg:text-md font-black uppercase tracking-[0.2em] opacity-60 mb-2 lg:mb-3 font-dm">{item.label}</p>
                      <h4 className="text-3xl lg:text-4xl font-bold text-primary font-playfair tracking-tight">{item.value}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: My Clients & Profile Stats */}
            <div className="space-y-6 lg:space-y-10">
              {/* My Clients */}
              <div className="bg-white rounded-[24px] p-6 lg:p-10 border border-gray-100 shadow-logs hover:shadow-xl hover:shadow-black/5 duration-500">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 font-playfair mb-6 lg:mb-4">My Clients</h3>
                <div className="space-y-2 lg:space-y-6">
                  <ClientItem
                    name="Jane Smith"
                    type="Alzheimer's Care"
                    image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150"
                    visits={24}
                  />
                  <ClientItem
                    name="Robert Chen"
                    type="Post-Surgery Care"
                    image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150"
                    visits={12}
                  />
                  <ClientItem
                    name="Mary Wilson"
                    type="Elder Care"
                    image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150"
                    visits={18}
                  />
                </div>
              </div>

              {/* Profile Stats */}
              <div className="bg-white rounded-[24px] p-6 lg:p-10 border border-gray-100 shadow-logs hover:shadow-xl hover:shadow-black/5 duration-500">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 font-playfair mb-6 lg:mb-8">Profile Stats</h3>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm lg:text-[15px] font-bold text-gray-700 font-dm">Overall Rating</span>
                    <div className="flex gap-1 items-center justify-center">
                      <FaStar className="text-yellow-400 size-4 fill-yellow-400" />
                      <span className="text-sm lg:text-[15px] font-bold text-gray-900 font-dm">4.3</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full w-[86%]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 lg:p-6 rounded-2xl bg-[#f4efff] border border-primary/10 text-center shadow-sm hover:shadow-md duration-300">
                    <h4 className="text-3xl lg:text-4xl font-bold text-primary font-playfair tracking-tight">127</h4>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mt-1 font-dm">Reviews</p>
                  </div>
                  <div className="p-4 lg:p-6 rounded-2xl bg-[#f4efff] border border-primary/10 text-center shadow-sm hover:shadow-md duration-300">
                    <h4 className="text-3xl lg:text-4xl font-bold text-primary font-playfair tracking-tight">78%</h4>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mt-1 font-dm">Repeat clients</p>
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

export default DashboardPage;
