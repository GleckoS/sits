import React from "react"
import styled from "styled-components"
import { careInstructionsText, downloadFabricText, featuresText, textureText } from "../../texts"
import AddToFauvorite from "../atoms/add-to-favourite"
import { Container } from "../atoms/container"
import { DownloadWithArrow } from "../atoms/download-with-arrow"
import { Tooltip } from "../moleculas/inform-with-tooltip"
import { MaterialsSlider } from "../organism/materials-slider"

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
        <Wrapper isLast={isLast}>
            <Container>
                <Grid>
                    <MaterialsSlider variant={variant} variants={materialColorVariants} />
                    <div className="content">
                        <Flex>
                            <h1 className="archive-title">{title}</h1>
                            <AddToFauvorite type='materials' title={title} />
                        </Flex>
                        <Description className="p" dangerouslySetInnerHTML={{ __html: materialQuickDescription }} />
                        {materialProductSheet
                            ? <DownloadWithArrow className='link' file={materialProductSheet.localFile.publicURL}>
                                {downloadFabricText['en']}
                            </DownloadWithArrow>
                            : null}
                        {!!features.nodes.length && <Tooltip title={featuresText['en']} data={features} />}
                        {!!textures.nodes.length && <Tooltip title={textureText['en']} data={textures} />}
                        {!!careInstructions.nodes.length && <Tooltip onlyImage={true} title={careInstructionsText['en']} data={careInstructions} />}
                        {textUnderCareInstructionIcons
                            ? <span className="anotation" dangerouslySetInnerHTML={{ __html: textUnderCareInstructionIcons }} />
                            : null}
                    </div>
                </Grid>
            </Container>
        </Wrapper>
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
const Description = styled.div`
    margin-top: clamp(16px,${24 / 1194 * 100}vw,40px);

    p{
        font-size: clamp(16px,${20 / 1194 * 100}vw,20px);
        line-height: 1.6;
    }
    max-width: 640px;
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`