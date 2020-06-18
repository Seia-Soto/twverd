# twverd

The simple serverless proxy for Twitch video edge streaming.

## Usage

If your client gets invalid video edge for the broadcast, you may get buffering while you watching it.
To prevent these unwanted side-effects of Twitch video-edge decision, we can use Vercel as reverse proxy to the Twitch video edge and stream to you again.

- You can install [Seia-Soto/twverd-browserExtension](https://github.com/Seia-Soto/twverd-browserExtension) to test this project.

## Known problems

- When you watch streaming in higher quality than 720p60, you may get a network error \#2000 because Vercel doesn't allow streaming more than 6MB at once.
- When you don't use `.pipe` method and send `Buffer` from `node-fetch` manually, you may get lags while switching the video source in Twitch app because each part of the stream should be merged without any delay.
