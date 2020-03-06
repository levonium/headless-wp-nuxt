import { postsEndpoint, tagsEndpoint } from "../plugins/endpoints"

export const state = () => ({
  posts: [],
  tags: []
})

export const mutations = {
  updatePosts: (state, posts) => {
    state.posts = posts
  },
  updateTags: (state, tags) => {
    state.tags = tags
  }
}

export const actions = {
  async getPosts({ state, commit, dispatch }) {
    if (state.posts.length) return

    try {
      let posts = []
      let page = 1

      const totalPages = await fetch(postsEndpoint(page))
        .then(res => res.headers.get('x-wp-totalpages'))

      while(page <= totalPages) {
        const response = await fetch(postsEndpoint(page)).then(res => res.json())

        const published = response
          .filter(el => el.status === "publish")
          .map(({ id, slug, title, excerpt, date, tags, content }) => ({
            id, slug, title, excerpt, date, tags, content
          }))

        posts = [...posts, ...published]
        page++
      }

      commit("updatePosts", posts)
    } catch (err) {
      console.log(err)
    }
  },
  async getTags({ state, commit }) {
    if (state.tags.length) return

    const allTags = state.posts.reduce((acc, item) => {
      return acc.concat(item.tags)
    }, [])
    const uniqueTags = Array.from(new Set(allTags)).join()

    try {
      let tags = await fetch(tagsEndpoint(uniqueTags))
        .then(res => res.json())

      tags = tags.map(({ id, name }) => ({ id, name }))

      commit("updateTags", tags)
    } catch (err) {
      console.log(err)
    }
  }
}
