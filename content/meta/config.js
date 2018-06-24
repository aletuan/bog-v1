const colors = require("../../src/styles/colors");

module.exports = {
  siteTitle: "Programmer Blog", // <title>
  shortSiteTitle: "PersonalBlog GatsbyJS Starter", // <title> ending for posts and pages
  siteDescription: "Programmer Blog.",
  siteUrl: "https://gatsby-starter-personal-blog.greglobinski.com",
  pathPrefix: "",
  siteImage: "preview.jpg",
  siteLanguage: "en",
  // author
  authorName: "Andy Le",
  authorTwitterAccount: "greglobinski",
  // info
  infoTitle: "Andy Le",
  infoTitleNote: "blog",
  // manifest.json
  manifestName: "PersonalBlog - a blog starter for GatsbyJS",
  manifestShortName: "PersonalBlog", // max 12 characters
  manifestStartUrl: "/",
  manifestBackgroundColor: colors.background,
  manifestThemeColor: colors.background,
  manifestDisplay: "standalone",
  // contact
  contactEmail: "anhlt1983@gmail.com",
  // social
  authorSocialLinks: [
    {
      name: "github",
      url: "https://github.com/aletuan"
    },
    {
      name: "twitter",
      url: "https://twitter.com/tuananhle83"
    },
    {
      name: "facebook",
      url: "https://www.facebook.com/tuananh.le"
    }
  ]
};
