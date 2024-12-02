import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: 'BoxSlider',
  tagline: 'A super small carousel for the modern web',
  favicon: 'img/icon.png',
  url: 'https://philparsons.co.uk',
  baseUrl: '/slider/',
  organizationName: 'p-m-p',
  projectName: 'slider',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    () => ({
      name: 'postcss-plugins',
      configurePostCss: (options) => {
        options.plugins.push('postcss-import')
        options.plugins.push('postcss-nesting')

        return options
      },
    }),
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    image: 'img/social-card.jpg',
    navbar: {
      logo: {
        alt: 'BoxSlider',
        src: 'img/logo-medium.webp',
        srcDark: 'img/logo-medium-dark.webp',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'right',
          label: 'Docs',
        },
        {
          href: 'https://github.com/p-m-p/slider',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'BoxSlider',
        src: 'img/logo-medium-dark.webp',
        height: 60,
      },
      links: [
        {
          title: 'Quick links',
          items: [
            {
              label: 'Installation',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'Configuration',
              to: '/docs/getting-started/configuration',
            },
            {
              label: 'API Reference',
              to: '/docs/getting-started/api',
            },
          ],
        },
        {
          title: 'Guides',
          items: [
            {
              label: 'React components',
              to: '/docs/guides/react',
            },
            {
              label: 'Web components',
              to: '/docs/guides/web-components',
            },
            {
              label: 'Accessibility',
              to: '/docs/guides/accessibility',
            },
          ],
        },
        {
          title: 'Slide effects',
          items: [
            {
              label: 'Carousel',
              to: '/docs/effects/carousel',
            },
            {
              label: 'Fade',
              to: '/docs/effects/fade',
            },
            {
              label: 'Cube',
              to: '/docs/effects/cube',
            },
            {
              label: 'Tile',
              to: '/docs/effects/tile',
            },
          ],
        },
        {
          title: 'Examples',
          items: [
            {
              html: '<span>Coming soon...</span>',
            },
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
