import React from "react"
import styled from "styled-components"
import { accessoriesText, armrestText, confortText, coversText, dimensionsText, downloadText, legsText, upholsterysText } from "../../texts"
import AddToFauvorite from "../atoms/add-to-favourite"
import { Category } from "../atoms/category"
import { Container } from "../atoms/container"
import { DownloadWithArrow } from "../atoms/download-with-arrow"
import { Tooltip } from "../atoms/inform-with-tooltip"
import { PopupButton } from "../organism/pop-up-other-collection-data"
import { TwoColumnImageGrid } from "../organism/two-column-image-grid"

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
    debugger
    return (
        <Wrapper>
            <Container>
                <Grid>
                    <TwoColumnImageGrid title={title} popupNames={popupNames} collectionPagePreviewImage={collectionPagePreviewImage} products={products} />
                    <div>
                        <Flex>
                            <h1 className="archive-title">{title}</h1>
                            <AddToFauvorite />
                        </Flex>
                        <Categories>
                            {itemCategories.map(el => (
                                <Category>{el.name}</Category>
                            ))}
                        </Categories>
                        <Description className="p" dangerouslySetInnerHTML={{ __html: collectionQuickDescription }} />
                        {collectionProductSheet
                            ? <DownloadWithArrow className='link' file={collectionProductSheet.localFile.publicURL}>
                                {downloadText['en']}
                            </DownloadWithArrow>
                            : null}
                        <Tooltip title={upholsterysText['en']} data={upholsterys} />
                        <Tooltip title={confortText['en']} data={comfort} />
                        <Tooltip title={coversText['en']} data={covers} />
                        <Popups>
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
                    </div>
                </Grid>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color: var(--light-background);
`

const Description = styled.div`
    margin-top: 40px;
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
const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Categories = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 20px;
`

const Popups = styled.div`
    margin-top: 60px;
    border-top: 1px solid var(--text-color);
`