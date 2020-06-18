const fetch = require('node-fetch')

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

  console.log(`
[REQUEST: ${req.headers['x-now-id']}]

processing: ${url}
headers: ${JSON.stringify(req.headers)}
`)

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: req.headers.accept,
      'user-agent': req.headers['user-agent']
    }
  })

console.log(`
[RESPONSE: ${req.headers['x-now-id']}]

headers: ${JSON.stringify(response.headers)}
`)

  res.setHeader('Accept-Ranges', 'bytes')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/octect-stream')

  response.body.pipe(res)
}
