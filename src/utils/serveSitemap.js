const serveSitemap = pages => (req, resp) => {
  const sitemap = pages
    .filter(page => page.showInSiteMap)
    .map(page => `https://www.stephensorensen.com${page.pathname}`)
    .join('\n');
  resp.type('text').send(sitemap);
};

export default serveSitemap;
