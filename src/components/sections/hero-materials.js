import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"
import { imageTransition } from "../../helpers/animation-controller"
import { careInstructionsText, downloadFabricText, featuresText, textureText } from "../../texts"
import AddToFauvorite from "../atoms/add-to-favourite"
import { Container } from "../atoms/container"
import { DownloadWithArrow } from "../atoms/download-with-arrow"
import { Tooltip } from "../moleculas/inform-with-tooltip"
import { TooltipOnlyImage } from "../moleculas/inform-with-tooltip-only-image"
import { MaterialsSlider } from "../organism/materials-slider"
import InView from "./in-view-provider"

const sliderAnimation = imageTransition(1)

const addInformAnimation = {
    animate: { transition: { staggerChildren: .2, delayChildren: .5 } }
}

const itemAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: .4 } }
}

const linkAnimation = {
    initial: { opacity: 0, backgroundSize: '0 1px' },
    animate: {
        opacity: 1,
        transition: { duration: .4 },
        transitionEnd: {
            backgroundSize: '80% 1px',
            transition: { duration: .6 }
        }
    }
}

export default function Hero({
    isLast,
    variant,
    data: {
        title,
        features,
        textures,
        careInstructions,
        materials: {
            generalMaterialInformation: {
                materialQuickDescription,
                textUnderCareInstructionIcons,
                materialProductSheet
            },
            materialColorVariants
        }
    }
}) {
    return (
        <InView>
            <Wrapper isLast={isLast}>
                <Container>
                    <Grid>
                        <MaterialsSlider animation={sliderAnimation} variant={variant} variants={materialColorVariants} />
                        <motion.div variants={addInformAnimation} className="content">
                            <Flex variants={itemAnimation}>
                                <h1 className="archive-title">{title}</h1>
                                <AddToFauvorite type='materials' title={title} />
                            </Flex>
                            <Description variants={itemAnimation} className="p" dangerouslySetInnerHTML={{ __html: materialQuickDescription }} />
                            {materialProductSheet
                                ? <DownloadWithArrow linkAnimation={linkAnimation} className='link' file={materialProductSheet.localFile.publicURL}>
                                    {downloadFabricText['en']}
                                </DownloadWithArrow>
                                : null}
                            {!!features.nodes.length && <Tooltip animation={itemAnimation} title={featuresText['en']} data={features} />}
                            {!!textures.nodes.length && <Tooltip animation={itemAnimation} title={textureText['en']} data={textures} />}
                            {!!careInstructions.nodes.length && <TooltipOnlyImage animation={itemAnimation} title={careInstructionsText['en']} data={careInstructions} />}
                            {textUnderCareInstructionIcons
                                ? <motion.span variants={itemAnimation} className="anotation" dangerouslySetInnerHTML={{ __html: textUnderCareInstructionIcons }} />
                                : null}
                        </motion.div>
                    </Grid>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.div`
    background-color: var(--light-background);
    overflow: hidden;
    position: relative;
    margin-bottom: ${props => props.isLast ? 'calc(-1 * clamp(45px,10.050251256281408vw,160px))' : '0'};

    h1{
        font-size: clamp(34px,${36 / 1194 * 100}vw, 36px);
        font-family: 'Ivy';
        line-height: normal;
        letter-spacing: 0.2px;
    }

    .anotation{
        font-size: clamp(16px, ${20 / 1194 * 100}vw, 20px);
        font-weight: 300;
        margin-top: 20px;
        max-width: 640px;
        display: block;
    }
    .slider{
        grid-area: slider;
    }
    .relative{
        position: relative;
        grid-area: gallery;

        @media (max-width: 1024px) {
            padding-top: 60px;
        }
    }
`

const Grid = styled.div`
    padding: 60px 0 45px 0;
    display: grid;
    grid-template-columns: 1220fr 560fr;
    grid-template-rows: auto 1fr;
        grid-template-areas: 
        'slider content'
        'gallery content';
    grid-gap: 0 50px;

    .content{
        min-width: 390px;
        grid-area: content;
        height: fit-content;
        margin-bottom: 45px;
    }

    .link{
        margin-top: 60px;
        margin-left: auto;
    }

    @media(max-width: 1024px){
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas: 
        'slider'
        'content'
        'gallery';
        padding: 45px 0 45px 0;

        .link{
            margin-top: 24px;
            margin-left: unset;
        }
    }

    @media (max-width: 768px) {
        padding: 24px 0 45px 0;
    }

    @media (max-width: 640px) {
        padding: 0 0 45px 0;
        .content{
            min-width: unset;
        }
    }
`
const Description = styled(motion.div)`
    margin-top: clamp(16px,${24 / 1194 * 100}vw,40px);

    p{
        font-size: clamp(16px,${20 / 1194 * 100}vw,20px);
        line-height: 1.6;
    }
    max-width: 640px;
`

const Flex = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`