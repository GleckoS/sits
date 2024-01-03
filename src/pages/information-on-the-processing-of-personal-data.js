import React from "react";
import Map from "../components/sections/map";
import { Title } from "../components/moleculas/title-sub";
import Seo from "../layout/seo";
import Wrapper from "../components/sections/page-wrapper";
import { Helmet } from "react-helmet";

export function Head() {
  const seo = {
    title: "Information on the processing of personal data | SITS",
    metaDesc:
      "30 years of experience, where quality comes from the human touch. At SITS, the human touch is a tradition in every piece of furniture we make.",
    opengraphSiteName: "SITS",
  };
  const pageContext = {
    uri: "/information-on-the-processing-of-personal-data/",
  };
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }} />
      <Seo seo={seo} pageContext={pageContext} />
    </>
  );
}

export default function WhereToBuyPage() {
  return (
    <Wrapper>
      <Title
        title={"Information on the processing of personal data"}
        text={`
        <ol>
          <li>
            <strong>Personal Data Controller</strong>
            <p>
              The controller of your personal data is Actona Poland sp. z o.o. (hereinafter: "Actona Poland") with its registered office in Brodnica, 60 Gen. Sikorskiego Street, 87-300 Brodnica; tel. +48 564 930 700 e-mail: sits@sits.pl.
            </p>
          </li>
          <li>
            <strong>Personal Data Protection Coordinator</strong>
            <p>
              SITS has appointed a Data Protection Coordinator who can be contacted by sending an e-mail to the following address: maciej.zoltowski@sits.pl. 
            </p>
          </li>
          <li>
            <strong>Purposes of processing </strong>
            <p>
              Personal data is processed for the following purposes:
            </p>
            <ul>
              <li>concluding, performing and settling contracts or taking steps at the request of a third party prior to concluding a contract,</li>
              <li>in order to provide commercial and marketing information,</li>
              <li>in order to conduct current correspondence related to the conduct of business activity by Actona Poland,</li>
              <li>conducting recruitment processes,</li>
              <li>take other actions at the request of the data subject.</li>
            </ul>
          </li>
          <li>
            <strong>Basis for processing</strong>
            <p>
              Personal data is processed on the basis of: contracts concluded with Actona Poland or a request of a third party to take action before entering into a contract, as well as on the basis of the legitimate interest of the Controller (in the scope of data of natural persons representing in the case of contracts with legal persons) or consent to the extent to which it has been expressed.
            </p>
          </li>
          <li>
            <strong>Recipients of the data</strong>
            <p>
              The recipients of personal data may be: employees of Actona Poland; entities processing personal data on behalf of Actona Poland, including logistics entrepreneurs, sales agents, IT service providers; entities of the capital group; entities involved in mass sending of e-mails (for newsletter recipients) – the indicated persons/entities will process data only on the basis of a contract or authorization issued by Actona Poland.
            </p>
          </li>
          <li>
            <strong>Period of storage of personal data</strong>
            <p>
              Personal data is stored for the duration of the contract or after its termination for 10 years from the date of termination of the contract. With respect to personal data processed on a different basis, the data will be processed for the period permitted by law, and to the extent that this period is not regulated – for a period not longer than 10 years.
            </p>
            <p>
              In the case of claims against Actona Poland or claims to which Actona Poland is entitled, the data is stored until the claims are recovered or the matter is clarified or until the claims are time-barred. 
            </p>
          </li>
          <li>
            <strong>Transfer of data to third countries</strong>
            <p>
              Your personal data may be transferred to recipients from countries outside the European Union ("third countries"). In the case of data transfers to third countries, Actona Poland provides appropriate safeguards referred to in Article 46(2)(c) of Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation) of 27 April 2016. You have the right to obtain a copy of information transferred to a third country.
            </p>
          </li>
          <li>
            <strong>Rights related to the processing of personal data</strong>
            <p>
              In connection with the processing of your personal data as an Employee, you have the following rights:
            </p>
            <ul>
              <li>The right to withdraw consent to the processing of data,</li>
              <li>The right to access your personal data,</li>
              <li>The right to request rectification of personal data,</li>
              <li>The right to request the deletion of your personal data,</li>
              <li>The right to request the restriction of the processing of your personal data,</li>
              <li>The right to object to the processing of data – in cases where we process your data on the basis of our legitimate interest, </li>
              <li>The right to transfer your personal data, i.e. the right to receive your personal data from us in a structured, commonly used and machine-readable format and the right to request that we send this data to another controller.</li>
              <li>The right to withdraw consent to the processing of data – to the extent that your data is processed on the basis of consent; you have the right to withdraw your consent to the processing of your data at any time. The withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal. Withdrawal of consent to data processing or request deletion of data means resignation from further participation in recruitment processes at Actona Poland sp. z o.o. and will result in immediate deletion of your data.</li>
              <li>The right to lodge a complaint with the supervisory authority dealing with the protection of personal data in Poland, i.e. the President of the Office for Personal Data Protection.</li>
            </ul>
            <p>
              In order to exercise the above rights, please contact Actona Poland sp. z o.o., using the contact details indicated in point 2. 
            </p>
          </li>
        </ol>
        `}
      />
      <Map language={"EN"} />
    </Wrapper>
  );
}
