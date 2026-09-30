import { BadgeCheck } from "lucide-react";

const BookingVerificationHeader = () => {
  return (
    <>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <BadgeCheck className="h-8 w-8 text-green-600" />
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-green-600">
        Payment verification
      </p>

      <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
        Payment verification
      </h1>
    </>
  );
};

export default BookingVerificationHeader;
