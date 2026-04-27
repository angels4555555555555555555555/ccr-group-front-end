import Footer from "@/features/home/footer";
import Header from "@/features/home/header";
import HeroSection from "@/features/home/herosection";

const Impressum = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <div className="max-w-5xl mx-auto px-4 text-3xl font-light text-center mt-24">
        <div className="text-2xl md:text-4xl">CCR Group GmbH</div>
        <p className="text-xl md:text-3xl">Adresse:</p>
        <p className="text-xl md:text-3xl">Unterföhring, Landkreis München</p>
        <p className="text-xl md:text-3xl">Geschäftsanschrift:</p>
        <p className="text-xl md:text-3xl">Feringastraße 4, 85774 Unterföhring</p>
        <br />
        <p className="text-xl md:text-3xl">Zweigniederlassung</p>
        <br />

        <p className="text-xl md:text-3xl">Innovationspark / Büro & Campus</p>
        <p className="text-xl md:text-3xl">Rheinstraße 194 b, </p>
        <p className="text-xl md:text-3xl">55218, </p>
        <p className="text-xl md:text-3xl">Ingelheim am Rhein</p>

        <p className="mt-10 text-2xl md:text-3xl">Telefon:</p>
        <p className="text-xl md:text-3xl">061329999153</p>
        <p className="mt-10 text-2xl md:text-3xl">E-Mail:</p>
        <p className="text-xl md:text-3xl">info@ccrgroupgmbh.com</p>
        <p className="mt-10 text-2xl md:text-3xl">Registergericht:</p>
        <p className="text-xl md:text-3xl">Amtsgericht Führt HRB 20838</p>
        <p className="mt-10 text-2xl md:text-3xl">Vertreten durch den Geschäftsführer:</p>
        <p className="text-xl md:text-3xl">Alexander Rizzeli</p>
        <p className="my-24 text-xl md:text-3xl">
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen.
          <br />
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: Knut Ropte
          (Anschrift wie oben) Streitschlichtung: Die Europäische Kommission
          stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a
            className="text-[#5538A4]"
            href="https://consumer-redress.ec.europa.eu/index_de"
          >
            https://consumer-redress.ec.europa.eu/index_de
          </a>{" "}
          Wir sind nicht verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
        <p className="mb-24 text-xl md:text-3xl">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind
          als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung,
          Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
          Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
          Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für
          den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Impressum;
