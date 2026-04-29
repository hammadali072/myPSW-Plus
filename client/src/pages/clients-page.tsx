import React, { useState } from 'react';

import { clsx } from 'clsx';
import {
  HiOutlineSearch,
  HiOutlineCalendar,
  HiOutlineArrowRight,
  HiOutlineStar,
  HiOutlineXCircle
} from 'react-icons/hi';

import DashboardSidebar from '../components/dashboard/dashboardSidebar/dashboardSidebar';
import DashboardHeader from '../components/dashboard/dashboardHeader/dashboardHeader';

interface ClientStats {
  totalVisits: number;
  hrsThisMonth: string;
  rating: number;
  since: string;
}

interface Client {
  id: number;
  name: string;
  image: string;
  type: string;
  location: string;
  status: 'ACTIVE' | 'NEW' | 'INACTIVE';
  stats: ClientStats;
  nextAppointment: {
    date: string;
    time: string;
  };
  details: {
    fullName: string;
    age: number;
    gender: string;
    languages: string[];
    phone: string;
    email: string;
    address: string;
    physicalStats: {
      height: string;
      weight: string;
    };
    emergencyContact: {
      name: string;
      relation: string;
      phone: string;
    };
    careConditions: string[];
    careServices: string[];
  };
}

const ClientProfileModal: React.FC<{ client: Client; onClose: () => void }> = ({ client, onClose }) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Care Needs'>('Overview');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] animate-in fade-in duration-300" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-xl overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-500">
        <div className="px-8 pt-8 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="size-20 rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm">
              <img src={client.image} alt={client.name} className="size-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-playfair">{client.name}</h2>
              <p className="text-sm text-gray-400 font-medium font-dm mt-1">
                {client.type} • {client.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 duration-300"
          >
            <HiOutlineXCircle className="size-6" />
          </button>
        </div>

        <div className="px-8 pb-8">
          <div className="flex items-center gap-8 border-b border-gray-50 mb-8 mt-4">
            {['Overview', 'Care Needs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={clsx(
                  "pb-4 text-sm font-bold font-dm relative duration-300",
                  activeTab === tab ? "text-primary" : "text-gray-400 hover:text-gray-600"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-in slide-in-from-left duration-300" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[350px]">
            {activeTab === 'Overview' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-50 space-y-6">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Legal Name</p>
                      <p className="text-sm font-bold text-gray-900 font-dm">{client.details.fullName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Age</p>
                        <p className="text-sm font-bold text-gray-900 font-dm">{client.details.age} years</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Gender</p>
                        <p className="text-sm font-bold text-gray-900 font-dm">{client.details.gender}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Languages</p>
                      <div className="flex flex-wrap gap-1.5">
                        {client.details.languages.map(lang => (
                          <span key={lang} className="px-2.5 py-1 bg-white text-gray-600 text-[10px] font-bold rounded-lg border border-gray-100 font-dm">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-50 space-y-6">
                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-1">Contact Details</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter font-bold mb-0.5">Phone</p>
                        <p className="text-sm font-bold text-gray-900 font-dm">{client.details.phone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter font-bold mb-0.5">Email</p>
                        <p className="text-sm font-bold text-gray-900 font-dm truncate">{client.details.email}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter font-bold mb-0.5">Address</p>
                        <p className="text-sm font-bold text-gray-900 font-dm leading-tight">{client.details.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Emergency Contact</p>
                    <p className="text-sm font-bold text-gray-900 font-dm">{client.details.emergencyContact.name}</p>
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-tight">{client.details.emergencyContact.relation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold mb-1">Direct Line</p>
                    <p className="text-base font-bold text-primary font-dm tracking-tight">{client.details.emergencyContact.phone}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Care Needs' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-50">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Patient Height</p>
                    <p className="text-xl font-bold text-gray-900 font-dm">{client.details.physicalStats.height}</p>
                  </div>
                  <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-50">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Patient Weight</p>
                    <p className="text-xl font-bold text-gray-900 font-dm">{client.details.physicalStats.weight}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Care Conditions</p>
                    <div className="flex flex-wrap gap-2">
                      {client.details.careConditions.map(cond => (
                        <span key={cond} className="px-4 py-2 bg-gray-50 text-gray-700 text-xs font-bold rounded-2xl border border-gray-100">
                          {cond}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Services Needed</p>
                    <div className="flex flex-wrap gap-2">
                      {client.details.careServices.map(service => (
                        <span key={service} className="px-4 py-2 bg-primary/5 text-primary text-xs font-bold rounded-2xl border border-primary/10">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientCard: React.FC<{ client: Client; onViewProfile: (client: Client) => void }> = ({ client, onViewProfile }) => {

  return (
    <div className={clsx(
      "bg-white rounded-[32px] p-5 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 duration-500 group",
      client.status === 'INACTIVE' && "opacity-80"
    )}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 sm:mb-8">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="size-14 sm:size-20 rounded-full overflow-hidden border-2 border-primary/10 shadow-sm shrink-0">
            <img src={client.image} alt={client.name} className="size-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-lg sm:text-2xl font-bold text-gray-900 font-playfair truncate">{client.name}</h4>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-400 font-medium font-dm mt-0.5 sm:mt-1">
              <span>{client.type}</span>
              <span className="size-1 rounded-full bg-gray-300 hidden sm:block" />
              <span>{client.location}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 border-t border-gray-50 pt-4 md:border-t-0 md:pt-0">
          <span className={clsx(
            "px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-xl",
            client.status === 'ACTIVE' ? "bg-primary/5 text-primary" :
              client.status === 'NEW' ? "bg-green-50 text-green-600" :
                "bg-gray-50 text-gray-400"
          )}>
            {client.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 sm:gap-6 py-6 sm:py-8 border-y border-gray-50">
        <div>
          <p className="text-[10px] sm:text-[12px] text-[#94a3b8] font-medium uppercase tracking-widest mb-1 sm:mb-2">Total Visits</p>
          <p className="text-xl sm:text-2xl font-bold text-primary font-dm">{client.stats.totalVisits}</p>
        </div>
        <div>
          <p className="text-[10px] sm:text-[12px] text-[#94a3b8] font-medium uppercase tracking-widest mb-1 sm:mb-2">Hrs This Month</p>
          <p className="text-xl sm:text-2xl font-bold text-primary font-dm">{client.stats.hrsThisMonth}</p>
        </div>
        <div>
          <p className="text-[10px] sm:text-[12px] text-[#94a3b8] font-medium uppercase tracking-widest mb-1 sm:mb-2">Rating</p>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <p className="text-xl sm:text-2xl font-bold text-primary font-dm">{client.stats.rating}</p>
            <HiOutlineStar className="size-4 sm:size-5 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
        <div>
          <p className="text-[10px] sm:text-[11px] text-[#94a3b8] font-medium uppercase tracking-widest mb-1 sm:mb-2">Since</p>
          <p className="text-xl sm:text-2xl font-bold text-primary font-dm">{client.stats.since}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-6 sm:mt-8 pt-6 border-t border-gray-50">
        <div className="flex items-center gap-4">
          <div className={clsx(
            "size-10 sm:size-12 rounded-xl sm:rounded-2xl flex items-center justify-center",
            client.status === 'INACTIVE' ? "bg-gray-50 text-gray-300" : "bg-primary/5 text-primary"
          )}>
            <HiOutlineCalendar className="size-5 sm:size-6" />
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Appointment</p>
            <p className={clsx(
              "text-xs sm:text-sm font-bold font-dm mt-0.5",
              client.status === 'INACTIVE' ? "text-gray-300" : "text-gray-900"
            )}>
              {client.nextAppointment.date}, {client.nextAppointment.time}
            </p>
          </div>
        </div>

        <button
          onClick={() => onViewProfile(client)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-purple text-white rounded-xl text-sm font-bold font-dm hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] duration-300"
        >
          View Profile <HiOutlineArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

const ClientsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All Clients');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const tabs = ['All Clients', 'Active', 'New', 'Inactive'];

  const clients: Client[] = [
    {
      id: 1,
      name: "Jane Smith",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200",
      type: "Alzheimer's Care",
      location: "Toronto",
      status: 'ACTIVE',
      stats: {
        totalVisits: 24,
        hrsThisMonth: "8.5 hrs",
        rating: 4.5,
        since: "Jan 2024"
      },
      nextAppointment: {
        date: "Today",
        time: "11:00 am – 12:00 pm"
      },
      details: {
        fullName: "Jane Margaret Smith",
        age: 72,
        gender: "Female",
        languages: ["English", "French"],
        phone: "+1 (416) 555-0123",
        email: "jane.smith@email.com",
        address: "123 Maple Avenue, Toronto, ON M5V 2L7",
        physicalStats: {
          height: "5'4\"",
          weight: "145 lbs"
        },
        emergencyContact: {
          name: "Sarah Smith",
          relation: "Daughter",
          phone: "+1 (416) 555-0124"
        },
        careConditions: ["Alzheimer's Care", "Senior Care"],
        careServices: ["Bathing & Toileting", "Companionship", "Meal Preparation"]
      }
    },
    {
      id: 2,
      name: "Robert Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200",
      type: "Post-Surgery Care",
      location: "Toronto",
      status: 'ACTIVE',
      stats: {
        totalVisits: 12,
        hrsThisMonth: "5 hrs",
        rating: 4.2,
        since: "Feb 2024"
      },
      nextAppointment: {
        date: "Wed",
        time: "9:00 am – 11:30 am"
      },
      details: {
        fullName: "Robert Wei Chen",
        age: 45,
        gender: "Male",
        languages: ["Mandarin", "English"],
        phone: "+1 (416) 555-0456",
        email: "r.chen@email.com",
        address: "456 Spadina Ave, Toronto, ON M5T 2G8",
        physicalStats: {
          height: "5'11\"",
          weight: "185 lbs"
        },
        emergencyContact: {
          name: "Lisa Chen",
          relation: "Wife",
          phone: "+1 (416) 555-0457"
        },
        careConditions: ["Post-Surgery Care"],
        careServices: ["Exercise & Mobility", "General Care", "Transportation"]
      }
    },
    {
      id: 3,
      name: "Mary Wilson",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=200",
      type: "Elder Care",
      location: "Mississauga",
      status: 'ACTIVE',
      stats: {
        totalVisits: 18,
        hrsThisMonth: "7 hrs",
        rating: 4.8,
        since: "Dec 2023"
      },
      nextAppointment: {
        date: "Tomorrow",
        time: "2:00 pm – 4:30 pm"
      },
      details: {
        fullName: "Mary Elizabeth Wilson",
        age: 85,
        gender: "Female",
        languages: ["English"],
        phone: "+1 (905) 555-0789",
        email: "m.wilson@email.com",
        address: "789 Lakeshore Rd, Mississauga, ON L5H 1B3",
        physicalStats: {
          height: "5'2\"",
          weight: "130 lbs"
        },
        emergencyContact: {
          name: "James Wilson",
          relation: "Son",
          phone: "+1 (905) 555-0790"
        },
        careConditions: ["Elder Care", "Senior Care"],
        careServices: ["Companionship", "Housekeeping", "Hygiene & Grooming"]
      }
    },
    {
      id: 4,
      name: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200",
      type: "Dementia Care",
      location: "Brampton",
      status: 'NEW',
      stats: {
        totalVisits: 2,
        hrsThisMonth: "3 hrs",
        rating: 5.0,
        since: "Apr 2024"
      },
      nextAppointment: {
        date: "Fri, Apr 25",
        time: "10:00 am – 12:00 pm"
      },
      details: {
        fullName: "Sarah Louise Johnson",
        age: 68,
        gender: "Female",
        languages: ["English", "Spanish"],
        phone: "+1 (289) 555-0999",
        email: "s.johnson@email.com",
        address: "321 Main St N, Brampton, ON L6V 1P5",
        physicalStats: {
          height: "5'6\"",
          weight: "160 lbs"
        },
        emergencyContact: {
          name: "Michael Johnson",
          relation: "Husband",
          phone: "+1 (289) 555-1000"
        },
        careConditions: ["Dementia Care"],
        careServices: ["Companionship", "Meal Preparation", "Dressing"]
      }
    },
    {
      id: 5,
      name: "David Miller",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200",
      type: "Physical Therapy",
      location: "Oakville",
      status: 'INACTIVE',
      stats: {
        totalVisits: 45,
        hrsThisMonth: "0 hrs",
        rating: 4.6,
        since: "Aug 2023"
      },
      nextAppointment: {
        date: "N/A",
        time: "No upcoming visits"
      },
      details: {
        fullName: "David Arthur Miller",
        age: 55,
        gender: "Male",
        languages: ["English"],
        phone: "+1 (365) 555-0222",
        email: "d.miller@email.com",
        address: "555 Trafalgar Rd, Oakville, ON L6H 2L1",
        physicalStats: {
          height: "6'0\"",
          weight: "195 lbs"
        },
        emergencyContact: {
          name: "Linda Miller",
          relation: "Sister",
          phone: "+1 (365) 555-0223"
        },
        careConditions: ["Stroke Care", "Senior Care"],
        careServices: ["Exercise & Mobility", "Transportation", "Bathing & Toileting"]
      }
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesTab = activeTab === 'All Clients' || client.status.toUpperCase() === activeTab.toUpperCase();
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-[#fcfafc]">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col min-w-0 lg:ml-72">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 space-y-8 custom-scrollbar">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-playfair mb-2">My Clients</h1>
              <p className="text-sm lg:text-base text-gray-400 font-medium font-dm">
                3 active clients · 2 new this month
              </p>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap items-center gap-2 sm:gap-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-bold font-dm duration-300 whitespace-nowrap shrink-0",
                  activeTab === tab
                    ? 'bg-gradient-purple text-white shadow-lg shadow-primary/20'
                    : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative group">
            <HiOutlineSearch className="absolute left-6 top-1/2 -translate-y-1/2 size-6 text-gray-400 group-focus-within:text-primary duration-300" />
            <input
              type="text"
              placeholder="Search by name or condition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-16 pr-8 bg-white rounded-xl border border-gray-100 shadow-sm focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none font-dm font-medium text-gray-900 placeholder:text-gray-400 duration-300"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredClients.length > 0 ? (
              filteredClients.map(client => (
                <ClientCard
                  key={client.id}
                  client={client}
                  onViewProfile={(c) => setSelectedClient(c)}
                />
              ))
            ) : (
              <div className="col-span-full bg-white rounded-[40px] border border-dashed border-gray-200 p-20 text-center">
                <p className="text-gray-400 font-medium font-dm text-lg">No clients found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedClient && (
        <ClientProfileModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
};

export default ClientsPage;
