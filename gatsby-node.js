const fs = require('fs')
const { resolve } = require('path')

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
                uri
            }
        }
    }
  `);

    collections.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/collection-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    materials.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/material-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    materialArchives.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/materials-archive.jsx'),
            context: {
                id,
                slug,
                uri
            },
        });
    })

    // PRODUCTS

    const { data: { allWpPage: { nodes: productsArchives } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Products" } } }) {
            nodes {
                slug
                id
                uri
            }
        }
    }
  `);


    productsArchives.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/all-products-page.jsx'),
            context: {
                id,
                slug,
                uri
            },
        });
    })

    // SOFAS

    const { data: { allWpPage: { nodes: sofasArchives } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Sofas" } } }) {
            nodes {
                slug
                id
                uri
                title
            }
        }
    }
  `);

    sofasArchives.forEach(({ id, slug, uri, title }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                title,
                type: 'sofas'
            },
        });
    })

    // ARMCHAIRS

    const { data: { allWpPage: { nodes: armchairsArchives } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Armchairs" } } }) {
            nodes {
                slug
                id
                uri
                title
            }
        }
    }
  `);

    armchairsArchives.forEach(({ id, slug, uri, title }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                title,
                type: 'armchairs'
            },
        });
    })

    // COFFEE TABLES

    const { data: { allWpPage: { nodes: tablesArchives } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Coffee Tables" } } }) {
            nodes {
                slug
                id
                uri
                title
            }
        }
    }
  `);

    tablesArchives.forEach(({ id, slug, uri, title }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                title,
                type: 'coffee tables'
            },
        });
    })

    // Dining chairs

    const { data: { allWpPage: { nodes: chairsArchives } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Dining Chairs" } } }) {
            nodes {
                slug
                id
                uri
                title
            }
        }
    }
  `);

    chairsArchives.forEach(({ id, slug, uri, title }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                title,
                type: 'dining chairs'
            },
        });
    })

    // Outdoor furnitures

    const { data: { allWpPage: { nodes: outdoorArchives } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Outdoor furnitures" } } }) {
            nodes {
                slug
                id
                uri
                title
            }
        }
    }
  `);

    outdoorArchives.forEach(({ id, slug, uri, title }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                title,
                type: 'outdoor furniture'
            },
        });
    })

    // Homepage

    const { data: { allWpPage: { nodes: Homepage } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Homepage" } } }) {
            nodes {
                slug
                id
                uri
            }
        }
    }
  `);

    Homepage.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/homepage.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    Bestsellers.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/best-sellers.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    Search.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/search-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    Favourites.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/favourites-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    Where.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/where-to-buy-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    Furniture.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/furniture-care-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    Catalogue.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/catalogues-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    Contact.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/сontact-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    Legal.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/legal-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    Sales.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/sales-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    About.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/about-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    Conscious.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/conscious-page.jsx'),
            context: {
                id,
                slug,
                uri
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
                uri
            }
        }
    }
  `);

    Arrivals.forEach(({ id, slug, uri }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/new-arrivals-page.jsx'),
            context: {
                id,
                slug,
                uri
            },
        });
    })

}