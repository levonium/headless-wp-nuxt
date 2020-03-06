import axios from "axios"
import { postsEndpoint } from "./endpoints"

// routes
const dynamicRoutes = async () => {
  let page = 1
  let allRoutes = []

  const totalPages = await axios.get(postsEndpoint(page))
    .then(res => res.headers['x-wp-totalpages'])

  while(page <= totalPages) {
    const routes = await axios.get(postsEndpoint(page))
      .then(res => res.data.map(post => `/blog/${post.slug}`))

    allRoutes = [...allRoutes, ...routes]
    page++
  }

  return allRoutes
}

export { dynamicRoutes }
