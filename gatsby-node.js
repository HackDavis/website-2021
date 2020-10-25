/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({
    actions,
  }) => {
    const { setWebpackConfig } = actions;
    setWebpackConfig({
      externals: {
        jQuery: 'jquery', // important: 'Q' capitalized
      }
    })
  }

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"

    // Update the page.
    createPage(page)
  }
}
// Implement Gatsby Open Graph Images
exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const openGraphImage = createOpenGraphImage(createPage, {
    path: "/src/images/hd_logo.png",
    component: path.resolve(`src/components/seo.js`),
    size: {
      width: 400,
      height: 50,
    },
    context: {
      description: "a image created with gatsby-plugin-open-graph-images",
    },
  });
};