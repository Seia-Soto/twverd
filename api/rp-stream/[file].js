const fetch = require('node-fetch')

const allowedIngests = [
  'sel01', 'sel03'
]

module.exports = async (req, res) => {
  const { file } = req.query
  const patterns = {
    videoEdge: /video-edge-[\w]+\.([\w]+)\.abs\.hls\.ttvnw\.net/i
  }

  let url

  try {
    url = new URL(file)
  } catch (e) {
    return res.json({
      error: 'Failed to parse URL object.'
    })
  }

  if (!patterns.videoEdge.test(url.hostname)) {
    return res.json({
      error: 'The given URL is not related to Twitch video edge.'
    })
  }

  // NOTE: Server locale verification.
  if (allowedIngests.includes(patterns.videoEdge.exec(url.hostname)[1])) {
    res.writeHead(
      301,
      {
        Location: file
      }
    )
    res.end()
  }

  const response = await fetch(url)

  response.body.pipe(res)
}
