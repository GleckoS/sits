import React from "react";
import styled from "styled-components";
import { Title } from "../moleculas/title-sub";
import { GatsbyImage } from "gatsby-plugin-image";
import {
  discoverUpcominEvents,
  downloadFairFolder,
  seeFull,
  upcommingEvents,
} from "../../texts";
import { Container } from "../atoms/container";
import { Link } from "gatsby";
import { exhibitionsUrl } from "../../texts/urls";
import InView from "./in-view-provider";
import { motion } from "framer-motion";
import { imageTransition, textTransition } from "../../helpers/animation-controller";

const titleAnimation = textTransition(1);
const imageAnimation = imageTransition(2);

export default function UpcomingEvents({ data, language }) {
  return (
    <Wrapper>
      <Container>
        <InView>
          <motion.h2 variants={titleAnimation}>{upcommingEvents[language]}</motion.h2>
          <motion.div variants={imageAnimation} className="grid">
            {data.map((el, index) => (
              <div key={index} className="card">
                <GatsbyImage
                  className="image"
                  image={
                    el.event.previewImage.localFile.childImageSharp
                      .gatsbyImageData
                  }
                  alt={el.event.previewImage.altText}
                />
                <h3>{el.title}</h3>
                <p className="date">{el.event.dates}</p>
                <div
                  className="place"
                  dangerouslySetInnerHTML={{ __html: el.event.place }}
                />
                {el.event.fairFolder && (
                  <a
                    href={
                      el.event.fairFolder?.localFile?.publicURL
                        ? el.event.fairFolder?.localFile?.publicURL
                        : el.event.fairFolder?.mediaItemUrl
                    }
                    target="_blank"
                    rel="noreferrer noopener"
                    download
                    className="underline"
                  >
                    {downloadFairFolder[language]}{" "}
                    <span>({el.event.fairFolder?.localFile?.prettySize})</span>
                  </a>
                )}
              </div>
            ))}
            <Placeholder>
              <p>{discoverUpcominEvents[language]}</p>
              <Link to={exhibitionsUrl[language]} className="underline">
                {seeFull[language]}
              </Link>
            </Placeholder>
          </motion.div>
        </InView>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: clamp(45px, 10vw, 120px);
  h2 {
    font-size: clamp(26px, ${(40 / 1194) * 100}vw, 40px);
    font-family: "Ivy";
    font-weight: 300;
    margin-bottom: 32px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: clamp(48px, calc(64vw / 7.68), 64px) 32px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }

    .image {
      width: 100%;
      aspect-ratio: 407/272;
      /* height: 100%; */
    }

    .card {
      h3 {
        margin-top: clamp(24px, calc(24vw / 7.68), 32px);
        color: #31231e;
        font-size: clamp(20px, calc(24vw / 7.68), 26px);
        font-style: normal;
        font-weight: 400;
        line-height: 146%;
        margin-bottom: 16px;
      }

      .date {
        color: #31231e;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
      }

      .place {
        margin-top: 12px;
        margin-bottom: 24px;
        * {
          color: #000;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%;
        }
      }
    }
  }
`;

const Placeholder = styled.div`
  width: 100%;
  aspect-ratio: 407/272;
  background: #fbfaf6;
  padding: 12px clamp(32px, calc(48vw / 7.68), 48px);

  @media (max-width: 1024px) {
    grid-column: span 2;
    aspect-ratio: unset;
    padding: clamp(32px, calc(48vw / 7.68), 48px);
  }

  @media (max-width: 640px) {
    grid-column: unset;
  }

  display: flex;
  flex-direction: column;
  gap: 28px;
  justify-content: center;

  p {
    color: #31231e;
    font-size: clamp(20px, calc(26vw / 7.68), 26px);
    font-weight: 400;
    line-height: 146%;
  }
`;
