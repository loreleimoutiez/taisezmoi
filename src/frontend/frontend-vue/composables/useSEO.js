import { useHead } from '@vueuse/head'

export function useSEO(options = {}) {
  const {
    title = 'taisezmoi',
    description = 'Développeuse web reconvertie, ce site a pour vocation de documenter mon exploration du métier.',
    image = 'https://www.taisezmoi.com/assets/dino-XqyuFW9r.webp',
    url = 'https://www.taisezmoi.com/',
    type = 'website',
    publishedTime = null,
    modifiedTime = null,
    author = 'taisezmoi',
    section = null,
    imageAlt = null
  } = options

  const metaTags = [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ]

  // Ajouter les métadonnées spécifiques aux articles
  if (type === 'article') {
    if (publishedTime) metaTags.push({ property: 'article:published_time', content: publishedTime })
    if (modifiedTime) metaTags.push({ property: 'article:modified_time', content: modifiedTime })
    if (author) metaTags.push({ property: 'article:author', content: author })
    if (section) metaTags.push({ property: 'article:section', content: section })
    if (imageAlt) metaTags.push({ name: 'twitter:image:alt', content: imageAlt })
  }

  return useHead({
    title,
    meta: metaTags,
  })
}
