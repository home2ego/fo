const dummy = (_array) => 1

const totalLikes = (array) => {
  return array.reduce((acc, item) => acc + item.likes, 0)
}

const favoriteBlog = (array) => {
  if (array.length === 0) return {}

  return array.reduce((acc, current) => (current.likes > acc.likes ? current : acc))
}

module.exports = { dummy, totalLikes, favoriteBlog }
