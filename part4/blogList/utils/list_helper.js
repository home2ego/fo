const dummy = (_blogs) => 1

const totalLikes = (blogs) => {
  switch (blogs.length) {
    case 0:
      return 0
    case 1:
      return blogs[0].likes
    default:
      return blogs.reduce((acc, item) => acc + item.likes, 0)
  }
}

module.exports = { dummy, totalLikes }
