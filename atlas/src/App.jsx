import React, { useState } from "react";
import {
  Menu,
  LayoutGrid,
  Database,
  Award,
  FileText,
  Send,
  Settings,
  HelpCircle,
  Bell,
  Search,
  ChevronRight,
  Home,
  Briefcase,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const App = () => {
  const [open, setOpen] = useState(true);

  const services = [
    {
      id: 1,
      title: "Module Submission",
      desc: "Submit weekly project modules.",
      icon: <FileText size={32} className="text-orange-500" />,
      bg: "from-orange-300 to-orange-100",
    },
    {
      id: 2,
      title: "Atlas Certificate",
      desc: "Generate verified certificates.",
      icon: <Award size={32} className="text-purple-600" />,
      bg: "from-purple-300 to-purple-100",
    },
    {
      id: 3,
      title: "Submission Response",
      desc: "View automated feedback.",
      icon: <Send size={32} className="text-blue-600" />,
      bg: "from-blue-300 to-blue-100",
    },
    {
      id: 4,
      title: "Atlas DB",
      desc: "Central student database.",
      icon: <Database size={32} className="text-emerald-600" />,
      bg: "from-emerald-300 to-emerald-100",
    },
    {
      id: 5,
      title: "Resource Library",
      desc: "Access documents & assets.",
      icon: <LayoutGrid size={32} className="text-pink-600" />,
      bg: "from-pink-300 to-pink-100",
    },
    {
      id: 6,
      title: "Analytics Dashboard",
      desc: "View performance metrics.",
      icon: <Briefcase size={32} className="text-indigo-600" />,
      bg: "from-indigo-300 to-indigo-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">
      {/* SIDEBAR */}
      <motion.aside
        animate={{ width: open ? 240 : 80 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="bg-indigo-950 text-white p-4 flex flex-col shadow-2xl"
      >
        {/* MENU */}
        <nav className="flex flex-col gap-2">
          <button onClick={() => setOpen(!open)} className="p-2  rounded-lg">
            <Menu size={22} />
          </button>
          <SidebarItem open={open} icon={<Home />} text="Home" active />
          <SidebarItem open={open} icon={<LayoutGrid />} text="All Apps" />
          <SidebarItem open={open} icon={<Briefcase />} text="Projects" />
          <SidebarItem open={open} icon={<Award />} text="Certificates" />

          <div className="border-b border-indigo-700 my-3" />

          <SidebarItem open={open} icon={<Settings />} text="Settings" />
          <SidebarItem open={open} icon={<HelpCircle />} text="Support" />
        </nav>
      </motion.aside>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="h-16 backdrop-blur-xl bg-white/40 border-b border-white/30 flex items-center justify-between px-6 shadow-sm">
        <div></div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white/60 backdrop-blur px-3 py-2 rounded-full">
              <Search size={16} className="text-indigo-700" />
              <input
                placeholder="Search..."
                className="bg-transparent ml-2 text-sm outline-none text-indigo-900 placeholder-indigo-700/50"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 rounded-full bg-white/60 backdrop-blur hover:bg-white"
            >
              <Bell size={20} className="text-indigo-900" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </motion.button>
          </div>
        </header>

        {/* MAIN SECTION */}
        <main className="p-8">
          {/* HERO BANNER */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-indigo-900 to-indigo-700 p-8 rounded-3xl text-white shadow-xl mb-10"
          >
            <h2 className="text-3xl font-bold">Welcome to Atlas Dashboard</h2>
            <p className="text-indigo-200 mt-2">
              Manage submissions, certificates, resources & analytics.
            </p>
          </motion.div>

          {/* CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

/* ─────────────────────────────── */
/* SIDEBAR ITEM */
/* ─────────────────────────────── */
const SidebarItem = ({ icon, text, open, active }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition 
    ${
      active
        ? "bg-orange-500 text-white shadow-md"
        : "text-indigo-200 hover:bg-indigo-900"
    }
  `}
  >
    {icon}
    {open && <span className="text-sm">{text}</span>}
  </motion.div>
);

/* ─────────────────────────────── */
/* SERVICE CARD */
/* ─────────────────────────────── */
const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, type: "spring", stiffness: 70 },
    }}
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-xl p-6 shadow hover:shadow-xl cursor-pointer transition border"
  >
    <div className={`p-3 rounded-xl bg-gradient-to-br ${service.bg} mb-4`}>
      {service.icon}
    </div>
    <h3 className="font-semibold text-gray-800">{service.title}</h3>
    <p className="text-sm text-gray-500 mt-1">{service.desc}</p>

    <motion.div
      whileHover={{ x: 4 }}
      className="text-orange-600 text-sm mt-3 flex items-center gap-1"
    >
      Open <ChevronRight size={16} />
    </motion.div>
  </motion.div>
);

export default App;
