import React from "react";
import styled from "styled-components";
import { Container } from "../atoms/container";
import { GatsbyImage } from "gatsby-plugin-image";
import { textTransition } from "../../helpers/animation-controller";
import { motion } from "framer-motion";
import { downloadFairFolder, eventsTitle } from "../../texts";
import InView from "./in-view-provider";

const animation = textTransition(5);
const animationGrid = textTransition(6);

export default function EventsGrid({ events, language }) {
  return (
    <InView>
      <Wrapper>
        <Container>
          <motion.h2 variants={animation}>{eventsTitle[language]}</motion.h2>
          <Grid variants={animationGrid}>
            {events.map((el) => (
              <div className="card">
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
          </Grid>
        </Container>
      </Wrapper>
    </InView>
  );
}

const Wrapper = styled.section`
  margin: clamp(60px, ${(90 / 1194) * 100}vw, 180px) 0;
  h2 {
    margin-bottom: 40px;
    font-family: "Ivy";
    font-size: clamp(23px, ${(36 / 1194) * 100}vw, 36px);
    font-weight: 300;
  }
`;

const Grid = styled(motion.div)`
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 64px 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 520px) {
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
      * {
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
      }
    }
  }
`;
