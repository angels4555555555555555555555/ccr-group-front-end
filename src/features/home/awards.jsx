function Award({ date, title, children }) {
  return (
    <div className="p-6 pb-8 bg-card h-88 bg-white flex flex-col justify-between">
      <div className=" flex items-center mb-4 gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
        >
          <path
            d="M24.2727 31.9876L21.8555 35.2812L17.7354 18.9923L23.9905 17.2167L28.1096 33.5015L24.5947 31.9035L24.3995 31.8147L24.2727 31.9876Z"
            fill="rgba(255,255,255,1)"
            stroke="#2E3192"
            stroke-width="0.527778"
            stroke-miterlimit="1.5"
            stroke-linecap="square"
          />
          <path
            d="M13.7291 31.9877L13.6023 31.8147L13.4071 31.9034L9.89045 33.5016L14.0111 17.2167L20.2646 18.9923L16.143 35.2808L13.7291 31.9877Z"
            fill="rgba(255,255,255,1)"
            stroke="#2E3192"
            stroke-width="0.527778"
            stroke-miterlimit="1.5"
            stroke-linecap="square"
          />
          <path
            d="M16.7321 3.01926C17.9475 1.80868 19.8765 1.80868 21.0919 3.01926C21.787 3.71152 22.7534 4.03482 23.7109 3.89538C25.3854 3.65154 26.9459 4.81886 27.2381 6.53378C27.4052 7.51445 28.0025 8.36085 28.8567 8.8275C30.3506 9.64353 30.9467 11.5323 30.204 13.0965C29.7793 13.991 29.7793 15.0372 30.204 15.9317C30.9467 17.4959 30.3506 19.3847 28.8567 20.2007C28.0025 20.6674 27.4052 21.5138 27.2381 22.4944C26.9459 24.2093 25.3854 25.3767 23.7109 25.1328C22.7534 24.9934 21.787 25.3167 21.0919 26.009C19.8765 27.2195 17.9475 27.2195 16.7321 26.009C16.037 25.3167 15.0706 24.9934 14.1131 25.1328C12.4386 25.3767 10.8781 24.2093 10.5859 22.4944C10.4188 21.5138 9.82153 20.6674 8.96727 20.2007C7.47341 19.3847 6.87733 17.4959 7.62001 15.9317C8.04471 15.0372 8.04471 13.991 7.62001 13.0965C6.87733 11.5323 7.47341 9.64353 8.96727 8.8275C9.82153 8.36085 10.4188 7.51445 10.5859 6.53378C10.8781 4.81886 12.4386 3.65154 14.1131 3.89538C15.0706 4.03482 16.037 3.71152 16.7321 3.01926Z"
            fill="#2E3192"
          />
          <path
            d="M18.9972 8.97217C18.9972 10.3722 19.5389 11.7151 20.5028 12.7045C21.4667 13.6939 22.9139 14.2499 24.2778 14.2499H24.1389C22.775 14.2499 21.4667 14.806 20.5028 15.7954C19.5389 16.7848 18.9972 18.1277 18.9972 19.5277C18.9972 18.1277 18.4556 16.7848 17.4917 15.7954C16.5278 14.806 15.0861 14.2499 13.7222 14.2499H13.8556C15.2194 14.2499 16.5278 13.6939 17.4917 12.7045C18.4556 11.7151 18.9972 10.3722 18.9972 8.97217Z"
            fill="rgba(255,255,255,1)"
          />
        </svg>
        <h4 className="font-light text-2xl">{title}</h4>
      </div>
      <h4 className="font-semibold mb-6">{date}</h4>
      <p className="text-muted-foreground text-lg font-light">{children}</p>
    </div>
  );
}

export default function Awards() {
  return (
    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
      <Award date="Februar 2023" title="Top Finanzberater 2024">
        Als zertifizierte Finanzberater stehen wir Investoren mit geprüfter Fachkompetenz, klaren Standards und einer professionellen Beratung als verlässlicher Partner zur Seite.
      </Award>
      <Award date="September 2022" title="Zertifizierte Unabhängigkeit">
       Als zertifizierte Finanzberater stehen wir Investoren mit geprüfter Fachkompetenz, klaren Standards und einer professionellen Beratung als verlässlicher Partner zur Seite.
      </Award>
      <Award date="November 2021" title="Zertifizierte Unabhängigkeit">
        Diese Auszeichnung bestätigt unseren hohen Anspruch an Servicequalität und Mandantenorientierung und reflektiert unser langfristiges Engagement für vertrauensvolle Kundenbeziehungen.
      </Award>
    </div>
  );
}
