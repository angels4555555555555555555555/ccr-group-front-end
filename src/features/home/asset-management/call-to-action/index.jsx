import Link from "next/link";
import "./styles.css";

const CallToActionSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 md:gap-12 px-8 min-h-[721px] bg-image">
      <h1 className="text-3xl md:text-6xl text-center text-white max-w-[500px] font-light">
        Haben wir ihr Interesse geweckt?
      </h1>
      <Link href="/#Karriere">
        <button className="bg-[#2E3192] rounded-lg p-[5px_20px] text-white font-semibold w-[220px] h-[42px]">
          Kontaktieren Sie uns
        </button>
      </Link>
    </div>
  );
};

export default CallToActionSection;
