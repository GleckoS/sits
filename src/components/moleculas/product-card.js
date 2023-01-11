import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import AddToFauvorite from "../atoms/add-to-favourite"
import { Category } from './../atoms/category'

export const ProductCard = ({setRerender, threeColumn, rerender = false, model, data, types, image }) => (
    <Wrapper className="product-card">
        <AddToFauvorite setRerender={setRerender} rerender={rerender} type={'products'} title={model} />
        <Link className="link" to={'/collection/' + data.slug + '/'}>
            <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
            <Flex className={threeColumn ? 'three-column' : ''}>
                <span className="archive-title">{data.title}</span>
                <Categories>
                    {types?.map(el => (
                        <Category key={el.name}>
                            {el.name}
                        </Category>
                    ))}
                </Categories>
            </Flex>
        </Link>
    </Wrapper>
)

const Wrapper = styled.div`
    position: relative;

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

        @media (max-width: 768px) {
            text-decoration: none;
        }
    }

    .link{
        img{
            transition: transform .4s cubic-bezier(0.39, 0.575, 0.565, 1);
        }
        &:hover{
            img{
                transform: scale(1.1);
            }
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
        padding: 0;
    }
    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
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
        
        gap: 0;
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