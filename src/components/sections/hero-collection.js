import { motion } from "framer-motion"
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { imageTransition, linkTransition, textTransition } from "../../helpers/animation-controller"
import { accessoriesText, armrestText, confortText, coversText, dimensionsText, downloadText, legsText, upholsterysText } from "../../texts"
import AddToFauvorite from "../atoms/add-to-favourite"
import { Category } from "../atoms/category"
import { Container } from "../atoms/container"
import { DownloadWithArrow } from "../atoms/download-with-arrow"
import { TooltipPopup } from "../moleculas/inform-with-tolltip-popup"
import { Tooltip } from "../moleculas/inform-with-tooltip"
import { PopupButton } from "../organism/pop-up-other-collection-data"
import { TwoColumnImageGrid } from "../organism/two-column-image-grid"
import InView from "./in-view-provider"

const sliderAnimation = imageTransition(1)
const titleAnimation = textTransition(3)
const categoriesGridAnimation = textTransition(4)
const textAnimation = textTransition(5)
const linkAnimation = linkTransition(6)

const upholsterysAnimation = textTransition(7)
const comfortAnimation = textTransition(8)
const coversAnimation = textTransition(9)

const dimensionsAnimation = (i) => textTransition(7 + i)
const legsAnimation = (i) => textTransition(7 + i)
const armrestsAnimation = (i) => textTransition(7 + i)
const accessoriesAnimation = (i) => textTransition(7 + i)

const buttonAnimation = (i) => textTransition(7 + i)

export default function Hero({
    itemCategories,
    products,
    data: {
        title,
        comfort,
        covers,
        upholsterys,
        collections: {
            generalCollectionInformation: {
                collectionGallery,
                collectionProductSheet,
                collectionPagePreviewImage,
                popupNames,
                collectionQuickDescription
            },
            sidebarCollectionInformation: {
                dimensions,
                armrest,
                accessories,
                legs
            }
        }
    } }) {
    return (
        <InView>
            <Wrapper>
                <Container>
                    <Grid>
                        <TwoColumnImageGrid sliderAnimation={sliderAnimation} gallery={collectionGallery} title={title} popupNames={popupNames} collectionPagePreviewImage={collectionPagePreviewImage} products={products} />
                        <div className="content">
                            <Flex variants={titleAnimation}>
                                <h1 >{title}</h1>
                                <AddToFauvorite type='collections' title={title} />
                            </Flex>
                            <Categories variants={categoriesGridAnimation}>
                                {itemCategories.map(el => (
                                    <React.Fragment key={el.name}>
                                        <Category to={el.collectionTypes.typeArchive.url}>{el.name}</Category>
                                    </React.Fragment>
                                ))}
                            </Categories>
                            <Description variants={textAnimation} dangerouslySetInnerHTML={{ __html: collectionQuickDescription }} />
                            {collectionProductSheet
                                ? <DownloadWithArrow linkAnimation={linkAnimation} className='link' file={collectionProductSheet.localFile.publicURL}>
                                    {downloadText['en']}
                                </DownloadWithArrow>
                                : null}
                            {upholsterys.nodes.length
                                ? <Tooltip animation={upholsterysAnimation} title={upholsterysText['en']} data={upholsterys} />
                                : null}
                            {comfort.nodes.length
                                ? <TooltipPopup animation={comfortAnimation} title={confortText['en']} data={comfort} />
                                : null}
                            {covers.nodes.length
                                ? <Tooltip animation={coversAnimation} title={coversText['en']} data={covers} />
                                : null}
                            {dimensions.dimensions || legs.dimensions || armrest.dimensions || accessories.dimensions
                                ? <Popups>
                                    {dimensions.dimensions
                                        ? <PopupButton animation={dimensionsAnimation(0)} data={dimensions} title={dimensionsText['en']} />
                                        : null}
                                    {legs.dimensions
                                        ? <PopupButton animation={legsAnimation(dimensions.dimensions ? 1 : 0)} data={legs} title={legsText['en']} />
                                        : null}
                                    {armrest.dimensions
                                        ? <PopupButton animation={dimensionsAnimation((dimensions.dimensions ? 1 : 0) + (legs.dimensions ? 1 : 0))} data={armrest} title={armrestText['en']} />
                                        : null}
                                    {accessories.dimensions
                                        ? <PopupButton animation={accessoriesAnimation((armrest.dimensions ? 1 : 0) + (dimensions.dimensions ? 1 : 0) + (legs.dimensions ? 1 : 0))} data={accessories} title={accessoriesText['en']} />
                                        : null}
                                </Popups>
                                : null}
                            <motion.div animation={buttonAnimation((armrest.dimensions ? 1 : 0) + (dimensions.dimensions ? 1 : 0) + (legs.dimensions ? 1 : 0) + (accessories.dimensions ? 1 : 0))}>
                                <Link className="yellow-button" to='/where-to-buy/' target='_blank'>Find retailers</Link>
                            </motion.div>
                        </div>
                    </Grid>
                </Container>
            </Wrapper>
        </InView>
    )
}

const Wrapper = styled.div`
    background-color: var(--light-background);
    overflow: hidden;
`

const Description = styled(motion.div)`
    margin-top: clamp(16px,${24 / 1194 * 100}vw,40px);
    p{
        font-size: clamp(16px,${20 / 1194 * 100}vw,20px);
        line-height: 1.6;
    }
    max-width: 640px;
`

const Grid = styled.div`
    padding: 45px 0 60px 0;
    display: grid;
    grid-template-columns: 1220fr 560fr;
    grid-gap: clamp(16px, ${50 / 1920 * 100}vw, 50px);

    @media(max-width: 1024px){
        display: block;
        padding: 0 0 60px 0;
    }

    .link{
        margin-top: clamp(40px, ${60 / 1920 * 100}vw, 60px);
        margin-left: auto;
    }

    .content{
        min-width: clamp(340px, ${350 / 1194 * 100}vw, 390px);

        @media (max-width: 768px){
            min-width: unset;
        }
    }
`
const Flex = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1{
        font-family: 'Ivy';
        font-size: clamp(34px, ${36 / 1194 * 100}vw, 36px);
        font-style: italic;
        font-weight: 300;
        position: relative;
        width: fit-content;
    }
`

const Categories = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: clamp(10px, ${20 / 1194 * 100}vw, 20px);
`

const Popups = styled.div`
    margin-top: 60px;
    border-top: 1px solid var(--text-color);
`