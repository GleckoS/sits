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
            path: '/collection/' + slug + '/',
            component: resolve('src/templates/collection-page.jsx'),
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
            path: '/material/' + slug + '/',
            component: resolve('src/templates/material-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    });

    // MATERIALS

    const { data: { allWpPage: { nodes: materialArchives } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Materials" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    materialArchives.forEach(({ id, slug }) => {
        createPage({
            path: '/' + slug + '/',
            component: resolve('src/templates/materials-archive.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // PRODUCTS

    const { data: { allWpType: { nodes: productArchiveTypeNodes }, allWpPage: { nodes: productsArchives } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Products" } } }) {
            nodes {
                slug
                id
            }
        }
        allWpType(filter: {parentId: {eq: null}}) {
            nodes {
              name
              slug
            }
          }
    }
  `);


    productsArchives.forEach(({ id, slug }) => {
        createPage({
            path: '/' + slug + '/',
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
            },
        });

        productArchiveTypeNodes.forEach(({ name, slug: typeSlug }) => {
            createPage({
                path: '/' + slug + '/' + typeSlug + '/',
                component: resolve('src/templates/products-archive.jsx'),
                context: {
                    id,
                    slug,
                    typeSlug,
                    name
                },
            });
        })
    })

    // Homepage

    const { data: { allWpPage: { nodes: Homepage } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Homepage" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    Homepage.forEach(({ id, slug }) => {
        createPage({
            path: '/',
            component: resolve('src/templates/homepage.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // Best Sellers

    const { data: { allWpPage: { nodes: Bestsellers } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Bestsellers" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    Bestsellers.forEach(({ id, slug }) => {
        createPage({
            path: '/best-sellers/',
            component: resolve('src/templates/best-sellers.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

}