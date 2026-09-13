JavaScript Advanced oppgave 2

Jeg skal lage en boklesnings applikasjon, hvor en kan holde oversikt over titler, forfatter, sjangre, antall sider og gi en vurdering av boken i en skala fra 1-5.

Disse bøkene skal så lagres i localStorage og vises frem i card-form på brukerens side

Jeg skal også lage en funksjon hvor en kan søke og sortere bøker basert på de samme kriteriene over, f.eks - Alle bøker med en score på 4 og mer, eller alle bøker skrevet av Agatha Christie. Jeg skal også se om jeg kan klare å kombinere kriterier, som vil si f.eks alle Sci/Fi bøker skrevet av Knut Hamsun(som ville blitt en veldig kort liste...)

Til slutt vil det også være to funksjoner(knapper), en som sletter en bok, og en som sletter alle bøkene på listen.

Steg 1: HTML

Første steg vil være Html elementene. Jeg ser for meg et h1 element med overskrift, seksjon med en form og forskjellige labels basert på kriteriene over. Alle med hver sine for, name og id identifiers-tag slik at de snakker sammen.

Jeg skal også(etterhvert) lage to knapper, en som heter delete this book, og en som heter delete all books. Jeg har en viss ide om hvordan delete all knappen skal fungere, men må google litt for å finne ut hvordan jeg skal løse delete this book knappen skal fungere.

Det vil også være en "tom" div her som heter booksContainer, hvor disse bok-kortene skal dukke opp i etterhvert som de blir laget.

Alt dette i tillegg til de vanlige HTML-elementene Body, main osv, som jeg ikke skal gå inn i her.

Jeg skal også lage Javascript og Css fil og koble alle disse til HTML-en. Det vil kanskje også dukke opp en Font-link i <head> også etterhvert.

Steg 2: Koble Html elementer i Javascript

Lage variabler og koble de til HTML elementer ved hjelp av queryselector.

Vanligvis er det greit å ha alle disse øverst i Javascript filen for ordens skyld, men noen ganger kan det dukke opp nye variabler etterhvert.

Steg 3: Lage en submit funksjon for formen som lagrer infoen i en Array(objekt)

Ved hjelp av form-id; queryselector og eventListner. Skal jeg nå lage en funksjon som putter infoen jeg skriver og gjør det om til et objekt.

Jeg vil bruke JSON.stringify for å lagre objektet i localstorage som ren tekst og deretter JSON.parse for å gjøre infoen som ligger der tilbake til en objekt som kan brukes senere når jeg lager kortene.

Steg 3: Hente info og Lage cards

For å hente infoen vi har lagret i localstorage må vi bruke getItem + nøkkelnavnet vi har laget ("bookinfo"), lage en variabel som heter getBooks som går inn i JSON og parser "bookinfo" om til et objekt igjen, slik at vi kan bruke det i Javascript

Steg 4: Lage sletteknapper.

Jeg laget en enkel sletteknapp i HTML, som bare removet alt i "bookinfo" Ganske enkelt å greit.

For å lage en sletteknapp som slettet en og en bok, måtte jeg først gi elementet som ble laget(bok-kortet) en id slik at den og dataen kunne bli targetet.
Deretter legge til en deletebutton på hvert kort og tagge den med den id-en. og til slutt en delete funksjon.

Steg 5: sorteringsfunksjonen

Jeg har lagt inn en sorteringsfunksjon ved å først lage et select element og dermed forskjellige options i HTML. Deretter hentet elementet og laget en variabel + en eventListener og deretter puttet inn en sjekk på verdiene inne i createBookCards funksjonen ved hjelp av en ternary-operator, som jeg bytter litt på hvis de er desc eller asc.
Til slutt måtte jeg oppdatere alle createCards-funksjonene til å inkludere sortSelecter verdien.

Destructuring:

Destructuring er bare en annen måte å hente verdier fra objekter eller Arrays og lagre de direkte i variabler uten å skrive objekt og egenskap hver gang.

Så når jeg skal f.eks i createBookCards funksjonen bruker objekt-parameteret bookI, kan jeg lage nye variabler ved å skrive const {og alle nøklene jeg vil bruke} istedet for å bruke property access (bookI.bookName, bookI.author) osv hver gang jeg skal finne nøkkelen og hente verdien.

Å bruke denne metoden gjør det til en litt kortere og mer lesbar kode og med mindre repetisjon. Men personlig vil jeg si at det til syvende og sist er en preferanse.

Ekstra ting:
