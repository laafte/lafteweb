# laafteweb
New website for Studentersamfundets Orkester

## Utvikling
Det er opprettet en staging-mappe i webmappa på serveren som man kan git pulle inn i
Gitt at config.js er riktig satt opp, vil det være mulig å teste det man gjør i produksjon der,
på laafte.samfundet.no/staging

### Branching og git
For tia er hovedbranchen låst, og krever minst 1 review for å pushe til. Flyten når det er sånn
vil vel bli å lage enten feature- eller release-branch som kan testes i staging, og så merges inn
i master etter pr når man tror den er god nok. Vurdere å gå for trunk-basert utvikling i stedet?

## Deploy
   1. Git pull inn i staging-mappa
   2. Kopier over til rot-webmappa
   3. Oppdater stiene i js/config.js slik at de peker på api-endepunktene
