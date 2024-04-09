import { Link, graphql, useStaticQuery } from "gatsby";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CloseButton } from "../../components/atoms/close-button";
import { Container } from "../../components/atoms/container";
import { Search } from "../../components/moleculas/search";
import { LangChanger } from "./lang-changer";
import { Item } from "./menu-item";
import scrollLock from "./../../helpers/scroll-lock";
import { AnimatePresence, motion } from "framer-motion";
import {
  linksLeft,
  linksRight,
  furnitureTitle,
  companyTitle,
} from "../../texts";
import { homepageUrl } from "../../texts/urls";

export default function Header({ data, language }) {
  const [isLeftMenuOpened, setLeftMenuOpened] = useState(false);
  const [isRightMenuOpened, setRightMenuOpened] = useState(false);
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdditionalInformOpened, setAdditionalInformOpened] = useState(true);

  const { allWpPage } = useStaticQuery(graphql`
    query Header($language: WpLanguageCodeEnum) {
      allWpPage(
        filter: {
          template: { templateName: { eq: "Global Config" } }
          language: { code: { eq: $language } }
        }
      ) {
        nodes {
          language {
            code
          }
          headerAdditionalInform {
            additionalInformText
            additionalInformTitle
          }
        }
      }
    }
  `);

  const {
    headerAdditionalInform: { additionalInformText, additionalInformTitle },
  } = allWpPage.nodes.filter((el) => el.language.code === language)[0];

  useEffect(() => {
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      var isEscape = false;
      if ("key" in evt) {
        isEscape = evt.key === "Escape" || evt.key === "Esc";
      } else {
        isEscape = evt.keyCode === 27;
      }
      if (isEscape) {
        setLeftMenuOpened(false);
        setRightMenuOpened(false);
      }
    };
  }, []);

  useEffect(() => {
    if (isLeftMenuOpened || isRightMenuOpened || isMobileMenuOpened) {
      scrollLock.enable("menu");
    } else {
      scrollLock.disable("menu");
    }

    return () => {
      scrollLock.disable("menu");
    };
  }, [isLeftMenuOpened, isRightMenuOpened, isMobileMenuOpened]);

  const closeAll = () => {
    setLeftMenuOpened(false);
    setRightMenuOpened(false);
    setMobileMenuOpened(false);
    setSearchQuery("");
  };

  return (
    <>
      {additionalInformTitle && isAdditionalInformOpened && (
        <Additional
          className={`additional ${isAdditionalInformOpened ? "" : "closed"}`}
        >
          <Container className="container">
            <details>
              <summary className="row">
                <span />
                <div className="text">
                  <div
                    className="text-title"
                    dangerouslySetInnerHTML={{ __html: additionalInformTitle }}
                  />
                  {additionalInformText && (
                    <svg
                      className="arrow"
                      xmlns="http://www.w3.org/2000/svg"
                      width="17.719"
                      height="10.043"
                      viewBox="0 0 17.719 10.043"
                    >
                      <path
                        id="Path_80"
                        data-name="Path 80"
                        d="M10052.275,8682.179l7.924,8.347-7.924,7.979"
                        transform="translate(8699.209 -10051.55) rotate(90)"
                        fill="none"
                        stroke="#31231e"
                        stroke-width="2"
                      ></path>
                    </svg>
                  )}
                </div>
                <CloseButton
                  as="button"
                  func={() => {
                    setAdditionalInformOpened(false);
                  }}
                />
              </summary>
              {additionalInformText && (
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: additionalInformText }}
                />
              )}
            </details>
          </Container>
        </Additional>
      )}
      <Wrapper>
        <a
          className="no-focus"
          href="#main"
          aria-label="skip link to main content"
        />
        <Container className="container">
          <Button
            className="control-desctop underline"
            onClick={() => {
              setLeftMenuOpened(true);
              setRightMenuOpened(false);
            }}
          >
            {furnitureTitle[language]}
          </Button>
          <LeftMenu
            initial={{ x: -500 }}
            animate={
              isLeftMenuOpened
                ? { x: 0, transition: { duration: 0.5 } }
                : { x: -500, transition: { duration: 0.3 } }
            }
          >
            <Flex
              initial={{ opacity: 0 }}
              animate={
                isLeftMenuOpened
                  ? { opacity: 1, transition: { duration: 0.5, delay: 0.3 } }
                  : { opacity: 0 }
              }
            >
              <b>{furnitureTitle[language]}</b>
              <CloseButton
                tabIndex={isLeftMenuOpened ? "0" : "-1"}
                as="button"
                func={() => {
                  setLeftMenuOpened(false);
                  setSearchQuery("");
                }}
                val={false}
              />
            </Flex>
            <MenuContent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={
                  isLeftMenuOpened
                    ? { opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
                    : { opacity: 0 }
                }
              >
                <Search
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  func={closeAll}
                  tabIndex={isLeftMenuOpened ? "0" : "-1"}
                  language={language}
                />
              </motion.div>
              {linksLeft[language].map((el, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isLeftMenuOpened
                      ? {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.35,
                            delay: 0.7 + index * 0.075,
                          },
                        }
                      : { opacity: 0, x: -6 }
                  }
                  key={el.name}
                >
                  <Item
                    onBlur={() =>
                      index === linksLeft[language].length - 1
                        ? setLeftMenuOpened()
                        : null
                    }
                    tabIndex={isLeftMenuOpened ? "0" : "-1"}
                    el={el}
                    func={(v) => {
                      setLeftMenuOpened(v);
                    }}
                  />
                </motion.div>
              ))}
            </MenuContent>
          </LeftMenu>
          <motion.div>
            <Link
              className="logo"
              onClick={() => {
                closeAll();
              }}
              aria-label="homepage link"
              to={homepageUrl[language]}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="133.17"
                height="41.5"
                viewBox="0 0 133.17 41.5"
              >
                <path
                  id="SITS_Logo_black"
                  d="M119.219,41.456c4.665,0,13.951-.748,13.951-10.474,0-8.89-3.829-15.4-14.479-15.4H104.52c-2.685,0-3.477-.66-3.477-1.848,0-1.76,1.188-3.389,4.049-3.389h12.234a1.616,1.616,0,0,0,1.628-1.584V1.584A1.629,1.629,0,0,0,117.415,0H105.092C94.97,0,90.613,5.9,90.613,15.4c0,2.112,0,10.518,13.951,10.518h14.171c3.257,0,4.049,1.848,4.049,3.345,0,1.144-.792,1.848-3.125,1.848H93.782A1.578,1.578,0,0,0,92.2,32.7v7.217A1.578,1.578,0,0,0,93.782,41.5h25.437Zm-44.052,0c-8.23,0-12.41-4.665-12.41-14.215V1.276A1.594,1.594,0,0,1,64.34,0h7.173a1.588,1.588,0,0,1,1.628,1.584v9.242H81.68a1.578,1.578,0,0,1,1.584,1.584v7.217a1.578,1.578,0,0,1-1.584,1.584H73.142v6.381c0,2.9,1.056,3.521,2.024,3.521H86.389A1.588,1.588,0,0,1,88.017,32.7v7.217A1.588,1.588,0,0,1,86.389,41.5H75.166Zm-28.429-1.54A1.578,1.578,0,0,0,48.321,41.5h7.217a1.578,1.578,0,0,0,1.584-1.584V1.584A1.578,1.578,0,0,0,55.539,0H48.321a1.578,1.578,0,0,0-1.584,1.584ZM28.65,41.456c4.665,0,13.951-.748,13.951-10.474,0-8.89-3.829-15.4-14.479-15.4H13.951c-2.685,0-3.477-.66-3.477-1.848,0-1.76,1.188-3.389,4.049-3.389H26.757a1.616,1.616,0,0,0,1.628-1.584V1.584A1.629,1.629,0,0,0,26.845,0H14.523C4.357,0,0,5.9,0,15.4c0,2.112,0,10.518,13.951,10.518H28.121c3.257,0,4.049,1.848,4.049,3.345,0,1.144-.792,1.848-3.125,1.848H3.125A1.578,1.578,0,0,0,1.54,32.7v7.217A1.578,1.578,0,0,0,3.125,41.5H28.65Z"
                  fill="#bababa"
                />
              </svg>
            </Link>
          </motion.div>
          <div className="right">
            <LangChanger
              closeAll={closeAll}
              setSearchQuery={setSearchQuery}
              setMobileMenuOpened={setMobileMenuOpened}
              data={data}
              language={language}
            />
            <Button
              className="control-desctop underline"
              onClick={() => {
                setRightMenuOpened(true);
                setLeftMenuOpened(false);
              }}
            >
              {companyTitle[language]}
            </Button>
          </div>
          <RightMenu
            initial={{ x: 500 }}
            animate={
              isRightMenuOpened
                ? { x: 0, transition: { duration: 0.5 } }
                : { x: 500, transition: { duration: 0.3 } }
            }
          >
            <Flex
              initial={{ opacity: 0 }}
              animate={
                isRightMenuOpened
                  ? { opacity: 1, transition: { duration: 0.5, delay: 0.3 } }
                  : { opacity: 0 }
              }
            >
              <CloseButton
                tabIndex={isRightMenuOpened ? "0" : "-1"}
                as="button"
                func={() => {
                  setRightMenuOpened(false);
                  setSearchQuery("");
                }}
                val={false}
              />
              <b>{companyTitle[language]}</b>
            </Flex>
            <MenuContent className="reverse">
              {linksRight[language].map((el, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 6 }}
                  animate={
                    isRightMenuOpened
                      ? {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.35,
                            delay: 0.7 + index * 0.075,
                          },
                        }
                      : { opacity: 0, x: 6 }
                  }
                  key={el.name}
                >
                  <Item
                    onBlur={() =>
                      index === linksRight[language].length - 1
                        ? setRightMenuOpened()
                        : null
                    }
                    tabIndex={isRightMenuOpened ? "0" : "-1"}
                    el={el}
                    func={(v) => {
                      setRightMenuOpened(v);
                    }}
                  />
                </motion.div>
              ))}
            </MenuContent>
          </RightMenu>
          <Burger
            aria-label="burger button"
            className={
              isMobileMenuOpened ? "open control-mobile" : "control-mobile"
            }
            onClick={() => {
              setSearchQuery("");
              setMobileMenuOpened(!isMobileMenuOpened);
            }}
          >
            <span />
          </Burger>
          <AnimatePresence mode="wait">
            {isMobileMenuOpened && (
              <MobileMenu
                initial={{ opacity: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                className={
                  (isMobileMenuOpened ? "active " : "") +
                  (isAdditionalInformOpened ? "additional" : "")
                }
              >
                <Container className="content">
                  <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    func={closeAll}
                    tabIndex={isMobileMenuOpened ? "0" : "-1"}
                    language={language}
                  />
                  <div className="wrap">
                    {linksLeft[language].map((el) => (
                      <React.Fragment key={el.name}>
                        <Item
                          tabIndex={isMobileMenuOpened ? "0" : "-1"}
                          el={el}
                          func={(v) => {
                            setSearchQuery("");
                            setMobileMenuOpened(v);
                          }}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="wrap">
                    {linksRight[language].map((el) => (
                      <React.Fragment key={el.name}>
                        <Item
                          tabIndex={isMobileMenuOpened ? "0" : "-1"}
                          el={el}
                          func={(v) => {
                            setSearchQuery("");
                            setMobileMenuOpened(v);
                          }}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </Container>
              </MobileMenu>
            )}
          </AnimatePresence>
          <Overlay
            onClick={closeAll}
            className={isLeftMenuOpened || isRightMenuOpened ? "visible" : ""}
          />
        </Container>
      </Wrapper>
    </>
  );
}

const Additional = styled.div`
  background: #f9f5f0;
  padding: 9px 0;
  transition: all 0.5s cubic-bezier(0.42, 0, 0.58, 1);

  a {
    width: fit-content;
    position: relative;
    padding-bottom: 3px;
    text-decoration: unset !important;

    transition: background-size 0.5s cubic-bezier(0.76, 0, 0.24, 1);

    background-image: linear-gradient(#222b40, #222b40);
    background-size: 80% 1px;
    background-position: left bottom;
    background-repeat: no-repeat;

    @media (pointer: coarse) {
      background-size: 80% 1px !important;
    }

    &:hover {
      background-size: 100% 1px !important;
    }
  }

  .content {
    text-align: center;
    margin-top: 10px;
    font-size: clamp(13px, calc(14vw / 7.68), 16px);

    @media (max-width: 420px) {
      text-align: left;
    }
  }

  .arrow {
    transition: all 0.3s cubic-bezier(0.42, 0, 0.58, 1);
  }

  details {
    &[open] {
      .arrow {
        transform: rotate(180deg);
      }
    }
  }

  .row::-webkit-details-marker {
    display: none;
  }

  .row {
    display: grid;
    grid-template-columns: 20px auto 20px;
    gap: 12px;
    align-items: center;
    min-height: 26px;

    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      p {
        display: flex;
        gap: 12px;
      }

      @media (max-width: 420px) {
        justify-content: flex-start;
      }
    }

    @media (max-width: 420px) {
      grid-template-columns: auto 20px;

      > span {
        display: none;
      }
    }

    > * {
      display: block;
    }

    p {
      text-align: center;
      line-height: 120%;
      font-size: clamp(14px, calc(14vw / 7.68), 18px);

      @media (max-width: 420px) {
        text-align: left;
      }
    }
  }
`;

const Overlay = styled.div`
  background-color: rgba(49, 35, 30, 0.35);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 110;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s cubic-bezier(0.42, 0, 0.58, 1);

  &.visible {
    opacity: 1;
    pointer-events: all;
  }
`;

const Wrapper = styled.header`
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  position: sticky;
  z-index: 108;
  top: 0;
  padding: 0;
  left: 0;
  right: 0;
  height: 95px;
  background-color: #fff;
  border-bottom: 1px solid transparent;
  transition: border 0.5s cubic-bezier(0.42, 0, 0.58, 1);
  border-bottom: 1px solid #ddd;

  .logo {
    /* svg path{
            transition: fill .4s cubic-bezier(0.42, 0, 0.58, 1);
        }
        &:hover{
            svg path{
                fill: #EDC53D;
            }
        } */
  }

  .right {
    width: fit-content;
    margin-left: auto;
  }

  .item {
    display: flex;
    gap: 10px;
    align-items: center;
    width: fit-content;

    svg {
      path {
        fill: transparent;
        transition: all 0.5s cubic-bezier(0.42, 0, 0.58, 1);
      }
    }

    &:hover {
      .styled-link {
        background-size: 100% 1px;
      }
      svg {
        path {
          stroke: #edc53d;
        }
      }
    }

    &.active {
      font-weight: 600;
      svg {
        path {
          fill: #edc53d;
          stroke: #edc53d;
        }
      }
    }
  }

  .control-mobile {
    display: none;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  @media (max-width: 840px) {
    height: 76px;

    /* .right {
      display: none;
    } */

    .container {
      display: flex;
      justify-content: space-between;
    }

    .control-desctop {
      display: none;
    }
    .control-mobile {
      display: block;
    }
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  @media (max-width: 840px) {
    display: block;
  }
  position: fixed;
  z-index: 111;
  left: 0;
  right: 0;
  top: 75px;
  bottom: 0;
  background-color: #fff;

  pointer-events: none;

  &.additional {
    top: unset;
  }

  &.active {
    pointer-events: all;
  }

  .wrap {
    margin-top: 40px;

    &:last-child {
      @supports (-webkit-touch-callout: none) {
        padding-bottom: 100px;
      }
    }
  }

  .content {
    margin-top: 20px;
    max-height: calc(100vh - 96px);
    overflow: auto;

    a {
      display: flex;
      gap: 10px;
      align-items: center;
      width: fit-content;
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 300;
    }
  }
`;

const LeftMenu = styled(motion.div)`
  overflow: auto;
  position: fixed;
  z-index: 111;
  width: 400px;
  padding: 42px;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
  transform: translateX(-500px);
  transition: transform var(--menu-animation);

  .item {
    display: flex;
    gap: 10px;
    align-items: center;
    width: fit-content;
    font-size: 16px;
    font-weight: 300;

    &:nth-child(2) {
      margin-top: 16px;
    }
  }

  &.active {
    transform: translateX(0);
  }

  @media (max-width: 840px) {
    display: none;
  }
`;

const MenuContent = styled(motion.div)`
  margin-top: 60px;
  display: grid;
  grid-gap: 16px;

  &.reverse {
    text-align: right;
  }
`;

const RightMenu = styled(motion.div)`
  overflow: auto;
  position: fixed;
  z-index: 111;
  width: 400px;
  padding: 42px;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
  transform: translateX(500px);
  transition: transform var(--menu-animation);

  .item {
    display: flex;
    gap: 10px;
    align-items: center;
    width: fit-content;
    margin-left: auto;
    font-size: 16px;
    font-weight: 300;
  }

  &.active {
    transform: translateX(0);
  }

  @media (max-width: 840px) {
    display: none;
  }
`;

const Flex = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  b {
    font-size: 16px;
    letter-spacing: 1px;
  }
`;

const Button = styled(motion.button)`
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: fit-content;

  display: inline-flex;
  align-items: center;
  gap: 8px;

  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 300;
`;

const Burger = styled(motion.button)`
  border: none;
  background-color: transparent;
  cursor: pointer;

  width: 25px;
  height: 20px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    background-color: #000;
    transition: all 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);
  }

  span {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 2px;
      background-color: #000;
      transition: all 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);
    }

    &::before {
      content: "";
      position: absolute;
      left: 7px;
      right: 0;
      bottom: 0;
      height: 2px;
      background-color: #000;
      transition: all 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);
    }
  }

  &.open {
    &::after {
      right: unset;
      width: 100%;
      left: 0;
      top: 50%;
      transform-origin: 50% 50%;
      transform: rotateZ(45deg);
    }
    span {
      &::after {
        right: unset;
        width: 100%;
        left: 0;
        transform-origin: 50% 50%;
        transform: rotateZ(-45deg);
      }

      &::before {
        transform: translateX(-100%);
        opacity: 0;
      }
    }
  }
`;
