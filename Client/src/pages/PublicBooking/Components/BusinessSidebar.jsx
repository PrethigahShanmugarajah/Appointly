import ServiceCard from "./ServiceCard";

const BusinessSidebar = ({
  business,
  services,
  form,
  setForm,
  accent,
  bannerImage,
}) => {
  return (
    <section className="relative flex flex-col bg-(--brand-panel) rounded-3xl overflow-hidden shadow-xl p-6 md:p-8 lg:p-10 text-white min-h-125 transition-colors">
      <div className="absolute top-0 right-0 w-[80%] h-70 pointer-events-none z-0">
        <img
          src={bannerImage}
          alt="3D Visual"
          className="w-full h-full object-cover object-right opacity-[0.45] mix-blend-screen mask-image-gradient"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom right, transparent, black 60%)",
            maskImage:
              "linear-gradient(to bottom right, transparent, black 60%)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-(--brand-panel) via-transparent to-transparent"></div>
      </div>

      <div className="absolute top-50 left-0 w-full h-37.5 bg-linear-to-b from-transparent to-(--brand-panel) pointer-events-none z-0"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-(--brand-accent) ring-1 ring-white/15 text-[20px] custom-brand-font shadow-sm backdrop-blur-sm transition-colors">
            {(business?.businessName || business?.name || "M")
              .slice(0, 1)
              .toUpperCase()}
          </div>

          <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/70">
            Book online
          </p>
        </div>

        <h1 className="mt-1 text-[32px] md:text-[44px] custom-brand-font tracking-tight leading-none">
          {business?.businessName || business?.name || "Mental Clinic"}
        </h1>

        {business?.businessDescription && (
          <p className="mt-3 text-[14px] leading-relaxed text-white/75 max-w-70 font-medium">
            {business.businessDescription}
          </p>
        )}
      </div>

      <div className="mt-10 space-y-4 relative z-10">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            isActive={form.serviceId === service._id}
            setForm={setForm}
            accent={accent}
          />
        ))}
      </div>
    </section>
  );
};

export default BusinessSidebar;
