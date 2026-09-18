// Client / src / pages / AuthPage / Components / FeatureCards.jsx
import { CalendarDays, Shield, Zap } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  iconBackground,
  iconColor,
}) => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBackground}`}
      >
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>

        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      icon: CalendarDays,
      title: "Easy Setup",
      description: "Get started in minutes",
      iconBackground: "bg-[#EBE4FF]",
      iconColor: "text-[#7D57F5]",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Stripe-powered payments",
      iconBackground: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      icon: Zap,
      title: "Fast",
      description: "Instant booking links",
      iconBackground: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
};

export default FeatureCards;
