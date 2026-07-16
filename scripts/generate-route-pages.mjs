import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', distDir), 'utf8');

const routes = {
  about: {
    title: 'About Yasaflow — Digital tools for communities',
    description: 'Learn how Yasaflow helps organizations, associations and communities simplify communication, activities, members and administration.',
  },
  contact: {
    title: 'Contact Yasaflow — Book a demo',
    description: 'Contact Yasaflow to discuss your organization, explore the platform or book a product demonstration.',
  },
  modules: {
    title: 'Yasaflow Module Library — Features for organizations',
    description: 'Explore Yasaflow modules for news, activities, members, administration, notifications, donations and payments.',
  },
  resources: {
    title: 'Yasaflow Resources — Guides for organizations',
    description: 'Explore practical Yasaflow resources, guides and information for organizations and community administrators.',
  },
  faq: {
    title: 'Yasaflow FAQ — Frequently asked questions',
    description: 'Find answers about Yasaflow onboarding, modules, security, organizations, access and daily use.',
  },
  security: {
    title: 'Yasaflow Security — Trust, privacy and access',
    description: 'Learn how Yasaflow approaches security, privacy, access control and responsible platform operations.',
  },
  roadmap: {
    title: 'Yasaflow Roadmap — Product direction',
    description: 'See the product direction and planned development areas for the Yasaflow platform.',
  },
  integrations: {
    title: 'Yasaflow Integrations — Payments, email and services',
    description: 'Explore current and planned Yasaflow integrations for payments, communication and organization workflows.',
  },
  privacy: {
    title: 'Privacy Notice — Yasaflow',
    description: 'Read how Yasaflow processes personal data when you visit the website, create an account or use the platform.',
  },
  terms: {
    title: 'Terms of Use — Yasaflow',
    description: 'Read the terms that apply to the Yasaflow website, trial access and platform services.',
  },
  cookies: {
    title: 'Cookie Information — Yasaflow',
    description: 'Learn how Yasaflow uses necessary cookies and local storage for security, language, authentication and functionality.',
  },
  'get-started': {
    title: 'Create your Yasaflow organization',
    description: 'Start setting up your organization in Yasaflow.',
    robots: 'noindex, nofollow',
  },
};

function replaceMeta(html, route, data) {
  const canonical = `https://yasaflow.com/${route}`;
  return html
    .replace(/<title>.*?<\/title>/, `<title>${data.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${data.description}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${data.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${data.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace('</head>', `    <meta property="og:url" content="${canonical}" />\n    <meta name="twitter:title" content="${data.title}" />\n    <meta name="twitter:description" content="${data.description}" />\n    <meta name="robots" content="${data.robots ?? 'index, follow'}" />\n  </head>`);
}

for (const [route, data] of Object.entries(routes)) {
  const directory = join(distDir.pathname, route);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), replaceMeta(template, route, data), 'utf8');
}

console.log(`Generated ${Object.keys(routes).length} route-specific SEO pages.`);
