const ArbitrageHeroSection = () => {
  return (
    <div
      className={`flex flex-col gap-8 md:gap-12 justify-center items-center min-h-[96vh] text-white hero-image px-8`}
    >
      <h1 className="text-3xl md:text-6xl text-center font-light text-[#2E3192] ">Fest-und Tagesgeld</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="#footer">
          <button className="bg-[#2E3192] w-full text-white rounded-lg p-[5px_20px] h-[42px]">
            Rufen sie uns an
          </button>
        </a>
        <button className="bg-white rounded-lg p-[5px_20px] text-black h-[42px]">
          Vereinbaren sie einen Termin
        </button>
      </div>
    </div>
  );
};

export default ArbitrageHeroSection;
