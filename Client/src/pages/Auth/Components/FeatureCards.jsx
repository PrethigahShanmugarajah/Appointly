import { CalendarDays, Shield, Zap } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  iconBackground,
  iconColor,
}) => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBackground}`}
      >
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>

        <p className="mt-0.5 text-xs text-gray-500">{description}</p>
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
      iconBackground: "bg-[#CCFBF1]",
      iconColor: "text-[#2DD4BF]",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Stripe-powered payments",
      iconBackground: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Zap,
      title: "Fast",
      description: "Instant booking links",
      iconBackground: "bg-orange-100",
      iconColor: "text-orange-600",
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
