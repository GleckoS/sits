import React from "react";
import Map from "../../components/sections/map";
import { Title } from "../../components/moleculas/title-sub";
import Seo from "../../layout/seo";
import Wrapper from "../../components/sections/page-wrapper";
import { Helmet } from "react-helmet";

export function Head() {
  const seo = {
    title: "Informacja o przetwarzaniu danych osobowych | SITS",
    metaDesc:
      "30 years of experience, where quality comes from the human touch. At SITS, the human touch is a tradition in every piece of furniture we make.",
    opengraphSiteName: "SITS",
  };
  const pageContext = {
    uri: "/pl/informacja-o-przetwarzaniu-danych-osobowych/",
  };
  return (
    <>
      <Helmet htmlAttributes={{ lang: "pl" }} />
      <Seo seo={seo} pageContext={pageContext} />
    </>
  );
}

export default function WhereToBuyPage() {
  return (
    <Wrapper>
      <Title
        title={"Informacja o przetwarzaniu danych osobowych"}
        text={`
        <ol>
          <li>
            <strong>Administrator danych osobowych</strong>
            <p>
              Administratorem Pani/Pana danych osobowych jest Actona Poland sp. z o.o. (dalej: „Actona Poland”) z siedzibą w Brodnicy, ul. Gen. Sikorskiego 60, 87-300 Brodnica; tel. +48 564 930 700 mail: sits@sits.pl.
            </p>
          </li>
          <li>
            <strong>Koordynator Ochrony Danych Osobowych</strong>
            <p>
              W SITS został wyznaczony Koordynator Ochrony Danych, z którym można skontaktować się wysyłając wiadomość mailową na adres: maciej.zoltowski@sits.pl. 
            </p>
          </li>
          <li>
            <strong>Cele przetwarzania</strong>
            <p>
              Dane osobowe są przetwarzane w celu :
            </p>
            <ul>
              <li>zawierania, wykonania oraz rozliczenia umów lub podjęcia na żądanie osoby trzeciej czynności przed zawarciem umowy,</li>
              <li>w celu przekazywania informacji handlowych oraz marketingowych,</li>
              <li>w celu prowadzenia bieżącej korespondencji związanej z prowadzeniem działalności gospodarczej przez Actona Poland,</li>
              <li>prowadzenia procesów rekrutacyjnych,</li>
              <li>podejmowania innych działań na żądanie osoby której dane dotyczą.</li>
            </ul>
          </li>
          <li>
            <strong>Podstawa przetwarzania</strong>
            <p>
              Dane osobowe są przetwarzane na podstawie: zawartych z Actona Poland umów lub żądania osoby trzeciej podjęcia czynności przed zawarciem umowy, a także na podstawie prawnie uzasadnionego interesu Administratora (w zakresie danych osób fizycznych reprezentujących w przypadku umów z osobami prawnymi) lub zgody w takim zakresie, w jakim została ona wyrażona. 
            </p>
          </li>
          <li>
            <strong>Odbiorcy danych</strong>
            <p>
              Odbiorcami danych osobowych mogą być: pracownicy Actona Poland; podmioty przetwarzające dane osobowe na zlecenie Actona Poland, m. in. przedsiębiorcy logistyczni, agenci handlowi, dostawcy usług IT; podmioty wchodzące w skład grupy kapitałowej; podmioty zajmujące się masową wysyłką wiadomości e-mail (dla odbiorców newslettera) – przy czym wskazane osoby/podmioty przetwarzać będą dane wyłącznie na podstawie umowy lub wydanego przez Actona Poland upoważnienia.
            </p>
          </li>
          <li>
            <strong>Okres przechowywania danych osobowych</strong>
            <p>
              Dane osobowe przechowywane są przez okres trwania umowy lub po jej zakończeniu przez 10 lat od momentu rozwiązania umowy. W zakresie danych osobowych przetwarzanych na innej podstawie dane będą przetwarzane przez okres dozwolony przepisami prawa, a w zakresie w jakim okres ten nie jest uregulowany – przez okres nie dłuższy niż 10 lat.
            </p>
            <p>
              W przypadku zgłoszenia roszczeń wobec Actona Poland lub roszczeń, jakie Actona Poland przysługują dane przechowywane są do czasu odzyskania roszczeń lub wyjaśnienia sprawy lub do czasu przedawnienia roszczeń.
            </p>
          </li>
          <li>
            <strong>Przekazywanie danych do państw trzecich</strong>
            <p>
              Pani/Pana dane osobowe mogą być przekazywane do odbiorców z krajów spoza Unii Europejskiej („państwa trzecie”). W przypadku przekazywania danych do państw trzecich Actona Poland zapewnia odpowiednie zabezpieczenia, o których mowa w art. 46 ust. 2 lit. c Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych) z dnia 27 kwietnia 2016 r. Przysługuje Pani/Panu uzyskanie kopii informacji przekazywanych do państwa trzeciego.
            </p>
          </li>
          <li>
            <strong>Prawa związane z przetwarzaniem danych osobowych</strong>
            <p>
              W związku z przetwarzaniem Pana/Pani danych osobowych jako Pracownika, przysługują Pani/Panu następujące prawa:
            </p>
            <ul>
              <li>Prawo wycofania zgody na przetwarzanie danych,</li>
              <li>Prawo dostępu do danych osobowych,</li>
              <li>Prawo żądania sprostowania danych osobowych,</li>
              <li>Prawo żądania usunięcia danych osobowych,</li>
              <li>Prawo żądania ograniczenia przetwarzania danych osobowych,</li>
              <li>Prawo wyrażenia sprzeciwu wobec przetwarzania danych – w przypadkach, kiedy przetwarzamy Pani/Pana dane na podstawie naszego prawnie uzasadnionego interesu,</li>
              <li>Prawo do przenoszenia danych osobowych, tj. prawo otrzymania od nas Pana/Pani danych osobowych, w ustrukturyzowanym, powszechnie używanym formacie informatycznym nadającym się do odczytu maszynowego oraz prawo żądania, abyśmy przesłali te dane do innego administratora.</li>
              <li>Prawo wycofania zgody na przetwarzanie danych – w zakresie, w jakim Pana/Pani dane są przetwarzane na podstawie zgody; ma Pani/Pan prawo wycofania zgody na przetwarzanie danych w dowolnym momencie. Wycofanie zgody nie ma wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej wycofaniem. Wycofanie zgody na przetwarzanie danych lub żądanie usunięcia danych oznacza rezygnację z dalszego udziału w procesach rekrutacji w Actona Poland sp. z o.o. i spowoduje niezwłoczne usunięcie Pani/Pana danych.</li>
              <li>Prawo wniesienia skargi do organu nadzorczego zajmującego się ochroną danych osobowych w Polsce, tj. Prezesa Urzędu Ochrony Danych Osobowych.</li>
            </ul>
            <p>
              W celu realizacji powyższych uprawnień prosimy kontaktować się z Actona Poland sp. z o.o., korzystając ze wskazanych w pkt 2 danych kontaktowych. 
            </p>
          </li>
        </ol>
        `}
      />
      <Map language={"EN"} />
    </Wrapper>
  );
}
