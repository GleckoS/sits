import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import styled from "styled-components"
import { Category } from './../atoms/category'

export const ProductCard = ({ data, types, image }) => (
    <Wrapper>
        <Link to={'/' + data.slug + '/'}>
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
        font-size: 40px;
        line-height: 110%;
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    flex-wrap: wrap;
`

const Categories = styled.div`
    display: flex;
    gap: 6px;
`