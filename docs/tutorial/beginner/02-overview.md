# An Overview of Discord

If you already have a decent understanding of WebSockets, the Discord API, and general Discord terminology, you can likely skip ahead to the next part in the tutorial.

## 1: The Gateway

The gateway is just the Discord name for a WebSocket connection to Discord, following a specific protocol of packets that we need to send and receive. This is our bot's primary connection to Discord and means that instead of asking Discord repeatedly for events that have happened (known as polling), we just tell Discord which events we want to receive via gateway intents, and Discord will send us those events over the persistent socket we have connected with.

When using client libraries like Nextcord and Disnake we don't need to worry too much about how this happens at such a low level, but it can help you to understand how each of the cogs in the machine works. Often it's helpful to understand the low-level architecture of a service like Discord, as it gives you a better understanding of how the service works at a higher level.

Upon receiving an event from the gateway, the library will check the OP code of the packet, and then call the appropriate function in the library. Many of these OP codes are internal, such as resuming a session, identifying the client, and sending heartbeats, but some, like OP 10 (READY), are also dispatched as user facing events (specifically on_ready in this instance). Events with OP 0 - dispatch events, are the ones we will primarily use, as they contain events like MESSAGE_CREATE, MEMBER_UPDATE, and all the other useful events for building a functional bot.

That's pretty much it for the gateway at this level. There is a lot more detail that can be talked about with the gateway, but that's out of the scope of this tutorial, and if you're interested in further reading the official Discord documentation for the gateway can be found [here](https://discord.com/developers/docs/topics/gateway).

## 2: The API

The API is how out bots talk back to Discord. We're receiving events from the gateway which deliver information to our bot, but when we want to respond to one of these events, for example automatically deleting a message with banned words in it, we need to make a request to Discord's REST API telling it to delete that message. If you've ever sent a message on Discord, added a reaction, renamed a channel, or done just about any other action in the client, you've interacted with the API before, you just haven't seen it.

Bots have most of the same endpoints available as regular users, bar a few like adding friends, blocking people, and joining guilds. They do, however, have certain features exclusive to bots, like the ability to lock emojis to members with a certain role.

As with the gateway, API calls are done behind the scenes and you don't need to manually interact with the API. This is useful as it abstracts away the difficult points of passing headers and handling rate limits.

## 3: Terminology

In Discord there are a few special words for things which we need to understand and be able to differentiate between. The following table shows what a word means in the context of this tutorial.

| Term   | Description                                                                                                                                                                                                                                      |
|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| guild  | The internal word that Discord has for what you know as a server.                                                                                                                                                                                |
| user   | A Discord user, not containing information relating to a guild.                                                                                                                                                                                  |
| member | A Discord user, with guild context. You'll only receive members if you have the server members gateway intent enabled, which will be explained later, or sometimes in other events like voice state updates and as the author in message events. |

And that's pretty much it for this part of the tutorial. I hope this has given you at least some useful knowledge about roughly how Discord works, and now you can move on to the next part!
