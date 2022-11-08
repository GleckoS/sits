const fs = require('fs')
const { resolve } = require('path')

const urlSystem = {
}

exports.createPages = async ({
    graphql,
    actions: { createPage, createRedirect },
}) => {

    // COLLECTION

    const { data: { allWpCollection: { collections } } } = await graphql(`
    query {
        allWpCollection {
            collections : nodes {
                id
                slug
            }
        }
    }
  `);

    collections.forEach(({ id, slug }) => {
        createPage({
            path: '/' + slug + '/',
            component: resolve('src/templates/collection.jsx'),
            context: {
                id,
                slug,
            },
        });
    });

    // MATERIAL

    const { data: { allWpMaterials: { materials } } } = await graphql(`
    query {
        allWpMaterials {
            materials : nodes {
                id
                slug
            }
        }
    }
  `);

    materials.forEach(({ id, slug }) => {
        createPage({
            path: '/' + slug + '/',
            component: resolve('src/templates/material.jsx'),
            context: {
                id,
                slug,
            },
        });
    });

    // PRODUCTS

    const { data: { allWpPage: { nodes: productsArchives } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Products" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    productsArchives.forEach(({ id, slug }) => {
        createPage({
            path: '/' + slug + '/',
            component: resolve('src/templates/products.jsx'),
            context: {
                id,
                slug,
            },
        });
    })



}