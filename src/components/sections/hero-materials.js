import React from "react"
import styled from "styled-components"
import { careInstructionsText, downloadFabricText, featuresText, textureText } from "../../texts"
import AddToFauvorite from "../atoms/add-to-favourite"
import { Container } from "../atoms/container"
import { DownloadWithArrow } from "../atoms/download-with-arrow"
import { Tooltip } from "../atoms/inform-with-tooltip"
import { MaterialsSlider } from "../organism/materials-slider"

export default function Hero({
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
        <Wrapper>
            <Container>
                <Grid>
                    <MaterialsSlider variants={materialColorVariants} />
                    <div>
                        <Flex>
                            <h1 className="archive-title">{title}</h1>
                            <AddToFauvorite />
                        </Flex>
                        <Description className="p" dangerouslySetInnerHTML={{ __html: materialQuickDescription }} />
                        {materialProductSheet
                            ? <DownloadWithArrow className='link' file={materialProductSheet.localFile.publicURL}>
                                {downloadFabricText['en']}
                            </DownloadWithArrow>
                            : null}
                        <Tooltip title={featuresText['en']} data={features} />
                        <Tooltip title={textureText['en']} data={textures} />
                        <Tooltip onlyImage={true} title={careInstructionsText['en']} data={careInstructions} />
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

    .anotation{
        margin-top: 20px;
        display: block;
    }
`

const Grid = styled.div`
    padding: 60px 0;
    display: grid;
    grid-template-columns: 1220fr 560fr;
    grid-gap: 50px;

    .link{
        margin-top: 60px;
        margin-left: auto;
    }
`
const Description = styled.div`
    margin-top: 40px;
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`