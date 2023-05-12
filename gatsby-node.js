const fs = require('fs')
const { resolve } = require('path')
const fetch = (...args) =>
    import(`node-fetch`).then(({ default: fetch }) => fetch(...args))

const csvParser = (data) => {
    let lines = data.split("\r\n");

    let result = [];

    let headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj)

    }

    return result; //JSON
};

exports.createPages = async ({
    graphql,
    actions: { createPage, createRedirect },
}) => {

    // Create redirects

    const { data: { wpPage: { redirects: { csvRedirectsFile } } } } = await graphql(`
    query{
      wpPage(id: {eq: "cG9zdDozMDkxNA=="}) {
        redirects {
          csvRedirectsFile {
            localFile {
                publicURL
            }
          }
        }
      }
    }
    `)

    if (csvRedirectsFile?.localFile?.publicURL) {
        const result = await fetch(`https://sits.eu${csvRedirectsFile.localFile.publicURL}`)
        const resultData = await result.text()

        csvParser(resultData)?.forEach(el => {
            if (el.From && el.To) {
                createRedirect({
                    fromPath: el.From,
                    toPath: el.To,
                    isPermanent: el.Status === '301',
                });
            }
        })
    }

    // COLLECTION

    const { data: { allWpCollection: { collections } } } = await graphql(`
    query {
        allWpCollection {
            collections : nodes {
                id
                slug
                uri
                language {
                  code
                }
            }
        }
    } 
  `);

    collections.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/collection-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    materials.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/material-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    materialArchives.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/materials-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);


    productsArchives.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/all-products-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
            },
        });
    })

    // FOOTSTOOLS

    const { data: { allWpPage: { nodes: footstoolsArchives } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Footstools" } } }) {
            nodes {
                slug
                id
                uri
                title
                types {
                  nodes {
                    name
                  }
                }
                language {
                  code
                }
            }
        }
    }
  `);

    footstoolsArchives.forEach(({ id, slug, uri, title, types, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                title,
                type: 'footstools',
                productType: types.nodes[0].name,
                language: language?.code ? language.code : 'EN'
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
                types {
                  nodes {
                    name
                  }
                }
                language {
                  code
                }
            }
        }
    }
  `);

    sofasArchives.forEach(({ id, slug, uri, title, types, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                title,
                type: 'sofas',
                productType: types.nodes[0].name,
                language: language?.code ? language.code : 'EN'
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
                types {
                  nodes {
                    name
                  }
                }
                language {
                  code
                }
            }
        }
    }
  `);

    armchairsArchives.forEach(({ id, slug, uri, title, types, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                title,
                type: 'armchairs',
                productType: types.nodes[0].name,
                language: language?.code ? language.code : 'EN'
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
                types {
                  nodes {
                    name
                  }
                }
                language {
                  code
                }
            }
        }
    }
  `);

    tablesArchives.forEach(({ id, slug, uri, title, types, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                title,
                type: 'coffee tables',
                productType: types.nodes[0].name,
                language: language?.code ? language.code : 'EN'
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
                types {
                  nodes {
                    name
                  }
                }
                language {
                  code
                }
            }
        }
    }
  `);

    chairsArchives.forEach(({ id, slug, uri, title, types, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                title,
                type: 'dining chairs',
                productType: types.nodes[0].name,
                language: language?.code ? language.code : 'EN'
            },
        });
    })

    // Outdoor furnitures

    const { data: { allWpPage: { nodes: outdoorArchives } } } = await graphql(`
    query {
        allWpPage(filter: { template: { templateName: { eq: "Outdoor Furniture" } } }) {
            nodes {
                slug
                id
                uri
                title
                types {
                  nodes {
                    name
                  }
                }
                language {
                  code
                }
            }
        }
    }
  `);

    outdoorArchives.forEach(({ id, slug, uri, title, types, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/products-archive.jsx'),
            context: {
                id,
                slug,
                uri,
                title,
                type: 'outdoor furniture',
                productType: types.nodes[0].name,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Homepage.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/homepage.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Bestsellers.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/best-sellers.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Search.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/search-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Favourites.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/favourites-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Where.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/where-to-buy-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Furniture.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/furniture-care-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Catalogue.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/catalogues-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Contact.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/сontact-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Legal.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/legal-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Sales.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/sales-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    About.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/about-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Conscious.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/conscious-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
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
                language {
                  code
                }
            }
        }
    }
  `);

    Arrivals.forEach(({ id, slug, uri, language }) => {
        createPage({
            path: uri,
            component: resolve('src/templates/new-arrivals-page.jsx'),
            context: {
                id,
                slug,
                uri,
                language: language?.code ? language.code : 'EN'
            },
        });
    })

}