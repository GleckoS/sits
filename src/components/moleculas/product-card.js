import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Category } from './../atoms/category'

export const ProductCard = ({ data, types, image }) => (
    <Wrapper>
        <Link to={'/collection/' + data.slug + '/'}>
            <GatsbyImage image={image.localFile.childImageSharp.gatsbyImageData} alt={image.altText} />
            <Flex>
                <span className="archive-title">{data.title}</span>
                <Categories>
                    {types.map(el => (
                        <Category>
                            {el.name}
                        </Category>
                    ))}
                </Categories>
            </Flex>
        </Link>
    </Wrapper>
)

const Wrapper = styled.div`
    .archive-title{
        margin-top: 10px;
        font-size: clamp(23px, ${40 / 1194 * 100}vw, 40px);
        line-height: 110%;
        font-family: 'Ivy';

        @media (max-width: 768px) {
            text-decoration: none;
        }
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    flex-wrap: wrap;
    padding: 0 20px 0 20px;

    @media (max-width: 1194px) {
        padding: 0;
    }
    @media (max-width: 768px) {
        gap: 0;
        flex-direction: column;
        align-items: flex-start;
    }
`

const Categories = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;

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
                background-color: #CEAD89;
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