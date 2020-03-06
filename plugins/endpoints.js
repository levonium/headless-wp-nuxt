// WP site base URL
const siteUrl = 'https://avetyan.net/headless-wp-nuxt'
const apiUrl = `${siteUrl}/wp-json/wp/v2`

// endpoints
const postsEndpoint = page => `${apiUrl}/posts?page=${page}&per_page=20`
const tagsEndpoint = includes => `${apiUrl}/tags?per_page=40&include=${includes}`

export { siteUrl, postsEndpoint, tagsEndpoint }
