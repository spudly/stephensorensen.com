const createManifest = buildId => ({
  background_color: '#ccc',
  description: "Stephen Sorensen's Personal Website",
  display: 'standalone',
  icons: [
    {
      sizes: '16x16 32x32 64x64 128x128 256x256 512x512',
      src: `/${buildId}/images/logo.svg`,
      type: 'image/svg+xml',
    },
    {
      sizes: '16x16',
      src: `/${buildId}/images/logo16.png`,
      type: 'image/png',
    },
    {
      sizes: '32x32',
      src: `/${buildId}/images/logo32.png`,
      type: 'image/png',
    },
    {
      sizes: '64x64',
      src: `/${buildId}/images/logo64.png`,
      type: 'image/png',
    },
    {
      sizes: '128x128',
      src: `/${buildId}/images/logo128.png`,
      type: 'image/png',
    },
    {
      sizes: '256x256',
      src: `/${buildId}/images/logo256.png`,
      type: 'image/png',
    },
    {
      sizes: '512x512',
      src: `/${buildId}/images/logo512.png`,
      type: 'image/png',
    },
  ],
  lang: 'en-US',
  name: 'Stephen John Sorensen',
  orientation: 'any',
  scope: '/',
  short_name: 'Stephen',
  start_url: '/',
  theme_color: '#ccc',
});

const serveManifest = buildId => (req, resp) => {
  const manifest = createManifest(buildId);
  resp.type('application/manifest+json').json(manifest);
};

module.exports = serveManifest;
