import { P3 } from "../../../assets/assets";

const PaymentHeader = () => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2DD4BF]">
          Payments
        </p>

        <h1 className="mt-2 text-[28px] md:text-[36px] font-extrabold leading-[1.1] tracking-tight text-[#164E63]">
          Track{" "}
          <span className="bg-linear-to-b from-[#BBF7D0] via-[#4ADE80] to-[#16A34A] bg-clip-text text-transparent custom-brand-font text-[32px] md:text-[42px] relative top-0 md:top-1 pr-1">
            earnings
          </span>
          <br />
          and request withdrawals.
        </h1>

        <p className="mt-2 max-w-md text-sm text-gray-500">
          Customer payments land with the platform first. A 10% platform fee is
          deducted, then the remaining balance becomes available here.
        </p>
      </div>

      <div className="hidden lg:block h-48 w-48 shrink-0">
        <img
          src={P3}
          alt="Illustration"
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>
    </div>
  );
};

export default PaymentHeader;
