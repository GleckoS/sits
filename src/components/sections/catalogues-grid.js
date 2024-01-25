import { motion } from "framer-motion";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import styled from "styled-components";
import { Container } from "../atoms/container";
import { Title } from "../moleculas/title-sub";
import InView from "./in-view-provider";
import { download, view } from "../../texts";

const gridAnimation = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const imageAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
};

const linkAnimation = {
  initial: { opacity: 0, backgroundSize: "0% 1px" },
  animate: {
    opacity: 1,
    transition: { duration: 0.6 },
    transitionEnd: {
      backgroundSize: "80% 1px",
      transition: { duration: 0.6 },
    },
  },
};

export default function CataloguesGrid({
  data: {
    title,
    catalogues: { catalogues },
  },
  language,
}) {
  return (
    <InView>
      <Wrapper>
        <Title small={true} title={title} />
        <Content>
          <Container>
            <Grid variants={gridAnimation}>
              {catalogues.map((el, index) => (
                <Item key={index}>
                  <motion.div variants={imageAnimation}>
                    <GatsbyImage
                      className="image"
                      image={
                        el.cataloguePreviewImage.localFile.childImageSharp
                          .gatsbyImageData
                      }
                      alt={el.cataloguePreviewImage.altText}
                    />
                  </motion.div>
                  <h3>{el.catalogueTitle}</h3>
                  <div className="link-wrap">
                    <motion.a
                      href={
                        el.catalogueFile?.localFile?.publicURL
                          ? el.catalogueFile?.localFile?.publicURL
                          : el.catalogueFile?.mediaItemUrl
                      }
                      target="_blank"
                      rel="noreferrer noopener"
                      download
                      variants={linkAnimation}
                      className="underline"
                    >
                      {download[language]}{" "}
                      <span>({el.catalogueFile?.localFile?.prettySize})</span>
                    </motion.a>
                  </div>
                  {linkToFileView && (
                    <div className="link-wrap">
                      <motion.a
                        href={linkToFileView}
                        target="_blank"
                        rel="noreferrer noopener"
                        variants={linkAnimation}
                        className="underline"
                      >
                        {view[language]}{" "}
                      </motion.a>
                    </div>
                  )}
                </Item>
              ))}
            </Grid>
          </Container>
        </Content>
      </Wrapper>
    </InView>
  );
}

const Wrapper = styled.section``;

const Content = styled.div`
  background-color: #f9f5f0;
  padding: clamp(75px, ${(80 / 1194) * 100}vw, 110px) 0
    clamp(110px, ${(160 / 1194) * 100}vw, 220px);
  margin-bottom: calc(-1 * clamp(45px, 10.050251256281408vw, 160px));
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px clamp(32px, ${(40 / 1194) * 100}vw, 92px);
  max-width: 1530px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled.div`
  h3 {
    margin-top: 24px;
    font-size: clamp(26px, ${(40 / 1194) * 100}vw, 40px);
    font-family: "Ivy";
    font-weight: 300;
    text-transform: unset;
    padding-bottom: 0;
  }

  .link-wrap{
    margin-top: 20px;
  }

  span {
    font-family: "Gothic";
    font-size: 18px;
    white-space: nowrap;
  }

  .image {
    width: 100%;
    img {
      transition: transform 0.4s ease-in-out;
    }
  }

  a:hover {
    .image {
      img {
        transform: scale(1.04);
      }
    }
    .underline {
      background-size: 100% 1px !important;
    }
  }
`;
