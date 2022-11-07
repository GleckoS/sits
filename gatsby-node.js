const fs = require('fs')
const { resolve } = require('path')

const urlSystem = {
}

exports.createPages = async ({
    graphql,
    actions: { createPage, createRedirect },
}) => {

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

}