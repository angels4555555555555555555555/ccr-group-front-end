export default function Contact() {
  return (
    <div className="grid gap-8 lg:grid-cols-3 px-4">
      <div className="p-6 bg-card h-[90%] self-center flex flex-col justify-between md:col-span-1 col-span-2 text-center lg:text-left">
        <h4 className="font-light text-2xl mb-2">Informationen zum Büro</h4>
        <p className="text-muted-foreground text-lg font-light">
          Unterföhring, Landkreis München
          <br />
          Geschäftsanschrift:
          <br />
          Feringastraße 4, 85774 Unterföhring
          <br />
          <br />
          Zweigniederlassung
          <br />
          <br />

          <p>Innovationspark / Büro & Campus </p>
          <p>Rheinstraße 194 b, </p>
          <p>55218,</p>
          <p>Ingelheim am Rhein</p>

          <br />
          CCR Group GmbH
        </p>
        <div className="mt-4 space-y-8 text-muted-foreground text-lg font-light">
          <p>061329999153</p>
          <p>info@ccrgroupgmbh.com</p>
        </div>
      </div>

      <form className="bg-white p-10 bg-card col-span-2">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2 md:col-span-2">
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="border border-input border-gray-500 px-3 h-8 bg-background"
            />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label htmlFor="email" className="text-sm">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              className="border border-input border-gray-500 px-3 h-8 bg-background"
            />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label htmlFor="name" className="text-sm">
              Betreff
            </label>
            <input
              id="name"
              type="text"
              className="border border-input border-gray-500 px-3 h-8 bg-background"
            />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label htmlFor="msg" className="text-sm">
              Nachricht
            </label>
            <textarea
              id="msg"
              rows={5}
              className="border border-input border-gray-500 px-3 py-2 bg-background"
              placeholder="Wie können wir helfen?"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              className="size-4 border border-input border-gray-500 cursor-pointer"
            />
            Ich stimme der Verarbeitung zu.
          </label>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="px-5 py-3 rounded-md bg-primary text-primary-foreground hover:opacity-90 cursor-pointer transition bg-[#2E3192] w-full text-white"
          >
            Absenden
          </button>
        </div>
      </form>
    </div>
  );
}
