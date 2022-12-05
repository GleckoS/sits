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

    // Search

    const { data: { allWpPage: { nodes: Search } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Search" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    Search.forEach(({ id, slug }) => {
        createPage({
            path: '/search/',
            component: resolve('src/templates/search-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // Favourites

    const { data: { allWpPage: { nodes: Favourites } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Favourites" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    Favourites.forEach(({ id, slug }) => {
        createPage({
            path: '/favourite/',
            component: resolve('src/templates/favourites-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // Where to buy

    const { data: { allWpPage: { nodes: Where } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Where To Buy" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    Where.forEach(({ id, slug }) => {
        createPage({
            path: '/where-to-buy/',
            component: resolve('src/templates/where-to-buy-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // Furniture Care

    const { data: { allWpPage: { nodes: Furniture } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Furniture Care" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    Furniture.forEach(({ id, slug }) => {
        createPage({
            path: '/furniture-care/',
            component: resolve('src/templates/furniture-care-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // Catalogue

    const { data: { allWpPage: { nodes: Catalogue } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Catalogue" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    Catalogue.forEach(({ id, slug }) => {
        createPage({
            path: '/catalogues/',
            component: resolve('src/templates/catalogues-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // Contact

    const { data: { allWpPage: { nodes: Contact } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Contact" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    Contact.forEach(({ id, slug }) => {
        createPage({
            path: '/contact/',
            component: resolve('src/templates/сontact-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // Legal

    const { data: { allWpPage: { nodes: Legal } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Legal" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    Legal.forEach(({ id, slug }) => {
        createPage({
            path: '/legal/',
            component: resolve('src/templates/legal-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // Sales representative

    const { data: { allWpPage: { nodes: Sales } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Sales Representative" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

    Sales.forEach(({ id, slug }) => {
        createPage({
            path: '/sales-representative/',
            component: resolve('src/templates/sales-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // About

    const { data: { allWpPage: { nodes: About } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "About" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

  About.forEach(({ id, slug }) => {
        createPage({
            path: '/about-sits/',
            component: resolve('src/templates/about-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // Conscious

    const { data: { allWpPage: { nodes: Conscious } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Conscious" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

  Conscious.forEach(({ id, slug }) => {
        createPage({
            path: '/conscious/',
            component: resolve('src/templates/conscious-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

    // New Arrivals

    const { data: { allWpPage: { nodes: Arrivals } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "New Arrivals" } } }) {
            nodes {
                slug
                id
            }
        }
    }
  `);

  Arrivals.forEach(({ id, slug }) => {
        createPage({
            path: '/new-arrivals/',
            component: resolve('src/templates/new-arrivals-page.jsx'),
            context: {
                id,
                slug,
            },
        });
    })

}