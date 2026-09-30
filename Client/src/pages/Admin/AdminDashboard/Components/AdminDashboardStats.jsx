const AdminDashboardStats = ({ statCards }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-5 mt-6 lg:mt-8">
      {statCards.map((stat, i) => (
        <div
          className="rounded-[18px] sm:rounded-3xl border border-gray-100 bg-white p-4 sm:p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.04)] flex flex-col gap-3"
          key={i}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.c}`}
          >
            <stat.icon className="w-5 h-5" />
          </div>

          <div>
            <p className="text-[12px] font-bold text-gray-500 mb-1">
              {stat.label}
            </p>

            <h2 className="text-[22px] font-extrabold text-gray-900 tracking-tight">
              {stat.value}
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AdminDashboardStats;
