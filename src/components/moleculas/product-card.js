import { Link, navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import AddToFauvorite from "../atoms/add-to-favourite"
import { Category } from './../atoms/category'

export const ProductCard = ({
    onMouseUp = (e, url) => {
        if (e.button === 0) {
            e.preventDefault()
            navigate(url)
        }
    },
    setRerender,
    threeColumn,
    rerender = false,
    model,
    data,
    types,
    image,
    categoryClick = () => { }
}) => (
    <Wrapper className="product-card">
        <AddToFauvorite setRerender={setRerender} rerender={rerender} type={'products'} title={model} />
        <Link onDragStart={event => event.preventDefault()} aria-label={data.title} onClick={(e) => { e.preventDefault() }} onMouseUp={(e) => { onMouseUp(e, '/collection/' + data.slug + '/') }} className="link product-card" to={'/collection/' + data.slug + '/'} />
        <GatsbyImage className="image" image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
        <Flex className={threeColumn ? 'three-column' : ''}>
            <span className="archive-title">{data.title}</span>
            <Categories>
                {types?.map(el => (
                    <React.Fragment key={el.name}>
                        <Category onClick={(e) => { categoryClick(e, el.collectionTypes.typeArchive.url) }} to={el.collectionTypes.typeArchive.url}>
                            {el.name}
                        </Category>
                    </React.Fragment>
                ))}
            </Categories>
        </Flex>
    </Wrapper>
)

const Wrapper = styled.div`
    position: relative;

    .underline{
        text-transform: none;
    }

    .link{
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        user-select: none;
        -webkit-user-drag: none;
    }

    button{
        position: absolute;
        right: 15px;
        top: 15px;
        z-index: 2;
    }

    .archive-title{
        font-size: clamp(23px, ${36 / 1194 * 100}vw, 36px);
        line-height: 110%;
        font-family: 'Ivy';
    }

    .image{
        img{
            transition: transform var(--animation);
        }
    }
    &:hover{
        img{
            transform: scale(1.07);
        }

        .underline{
            background-size: 100% 1px;
        }
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    flex-wrap: wrap;
    padding: 20px 20px 0 20px;

    &.three-column{
        flex-direction: column;
        align-items: flex-start;
    }

    @media (max-width: 1194px) {
        padding: 20px 0 0 0;
    }
    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
    @media (max-width: 768px) {
        gap: 0;
    }
`

const Categories = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 6px;

    @media (max-width: 768px) {
        margin-top: 10px;
        gap: 4px 12px;
        div{
            padding-right: 8px;
            position: relative;

            &::after{
                content: "";
                position: absolute;
                right: 3px;
                top: 4px;
                bottom: 2px;
                width: 1px;
                background-color: var(--color-brown);
            }

            &:last-child{
                padding-right: 0;
                &::after{
                    display: none;
                }
            }
        }
    }

`