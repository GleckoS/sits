import { motion } from "framer-motion"
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { imageTransition } from "../../helpers/animation-controller"
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
                        <motion.div variants={addInformAnimation} className="content">
                            <Flex variants={itemAnimation}>
                                <h1 >{title}</h1>
                                <AddToFauvorite type='collections' title={title} />
                            </Flex>
                            <Categories variants={itemAnimation}>
                                {itemCategories.map(el => (
                                    <React.Fragment key={el.name}>
                                        <Category to={el.collectionTypes.typeArchive.url}>{el.name}</Category>
                                    </React.Fragment>
                                ))}
                            </Categories>
                            <Description variants={itemAnimation} dangerouslySetInnerHTML={{ __html: collectionQuickDescription }} />
                            {collectionProductSheet
                                ? <DownloadWithArrow linkAnimation={linkAnimation} className='link' file={collectionProductSheet.localFile.publicURL}>
                                    {downloadText['en']}
                                </DownloadWithArrow>
                                : null}
                            {upholsterys.nodes.length
                                ? <Tooltip animation={itemAnimation} title={upholsterysText['en']} data={upholsterys} />
                                : null}
                            {comfort.nodes.length
                                ? <TooltipPopup animation={itemAnimation} title={confortText['en']} data={comfort} />
                                : null}
                            {covers.nodes.length
                                ? <Tooltip animation={itemAnimation} title={coversText['en']} data={covers} />
                                : null}
                            {dimensions.dimensions || legs.dimensions || armrest.dimensions || accessories.dimensions
                                ? <Popups variants={itemAnimation}>
                                    {dimensions.dimensions
                                        ? <PopupButton data={dimensions} title={dimensionsText['en']} />
                                        : null}
                                    {legs.dimensions
                                        ? <PopupButton data={legs} title={legsText['en']} />
                                        : null}
                                    {armrest.dimensions
                                        ? <PopupButton data={armrest} title={armrestText['en']} />
                                        : null}
                                    {accessories.dimensions
                                        ? <PopupButton data={accessories} title={accessoriesText['en']} />
                                        : null}
                                </Popups>
                                : null}
                            <motion.div variants={itemAnimation}>
                                <Link className="yellow-button" to='/where-to-buy/' target='_blank'>Find retailers</Link>
                            </motion.div>
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

const Popups = styled(motion.div)`
    margin-top: 60px;
    border-top: 1px solid var(--text-color);
`