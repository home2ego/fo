const dummy = (_array) => 1

const totalLikes = (array) => {
  return array.reduce((acc, item) => acc + item.likes, 0)
}

const favoriteBlog = (array) => {
  if (array.length === 0) return {}

  return array.reduce((acc, current) => (current.likes > acc.likes ? current : acc))
}

const mostBlogs = (array) => {
  const authorBlogsSum = array.reduce((acc, current) => {
    acc[current.author] = (acc[current.author] || 0) + 1

    return acc
  }, {})

  let topAuthor = ''
  let topCount = 0

  for (const name in authorBlogsSum) {
    if (authorBlogsSum[name] > topCount) {
      topAuthor = name
      topCount = authorBlogsSum[name]
    }
  }

  return topAuthor ? { author: topAuthor, blogs: topCount } : {}
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
