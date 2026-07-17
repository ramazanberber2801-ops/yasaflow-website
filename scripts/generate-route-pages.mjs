import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', distDir), 'utf8');

const routes = {
  about: { title: 'About Yasaflow — Digital tools for communities', description: 'Learn how Yasaflow helps organizations, associations and communities simplify communication, activities, members and administration.' },
  contact: { title: 'Contact Yasaflow — Book a demo', description: 'Contact Yasaflow to discuss your organization, explore the platform or book a product demonstration.' },
  modules: { title: 'Yasaflow Module Library — Features for organizations', description: 'Explore Yasaflow modules for news, activities, members, administration, notifications, donations and payments.' },
  resources: { title: 'Yasaflow Resources — Guides for organizations', description: 'Explore practical Yasaflow resources, guides and information for organizations and community administrators.' },
  faq: { title: 'Yasaflow FAQ — Frequently asked questions', description: 'Find answers about Yasaflow onboarding, modules, security, organizations, access and daily use.' },
  security: { title: 'Yasaflow Security — Trust, privacy and access', description: 'Learn how Yasaflow approaches security, privacy, access control and responsible platform operations.' },
  roadmap: { title: 'Yasaflow Roadmap — Product direction', description: 'See the product direction and planned development areas for the Yasaflow platform.' },
  integrations: { title: 'Yasaflow Integrations — Payments, email and services', description: 'Explore current and planned Yasaflow integrations for payments, communication and organization workflows.' },
  pricing: { title: 'Yasaflow Pricing — 7-day free trial', description: 'Start with a 7-day free trial. The Yasaflow core platform starts from NOK 349 per month, with optional paid add-on modules.' },
  privacy: { title: 'Privacy Policy — Yasaflow', description: 'Read how Yasaflow processes personal data when you visit the website, create an account or use the platform.' },
  terms: { title: 'Terms and Conditions — Yasaflow', description: 'Read the terms for Yasaflow’s 7-day free trial, subscription pricing, automatic renewal, cancellation and platform use.' },
  refund: { title: 'Refund and Cancellation Policy — Yasaflow', description: 'Read Yasaflow’s refund and cancellation policy for the 7-day free trial, subscription renewals and optional add-on modules.' },
  cookies: { title: 'Cookie Information — Yasaflow', description: 'Learn how Yasaflow uses necessary cookies and local storage for security, language, authentication and functionality.' },
  'get-started': { title: 'Create your Yasaflow organization', description: 'Start setting up your organization in Yasaflow.', robots: 'noindex, nofollow' },
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
