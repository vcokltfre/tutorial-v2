# A Ping Command

So far our bot is pretty simple - you type `/hello` and the bot responds with "Hello!" as a static response, which isn't particularly interesting. In this tutorial part we'll use useful information from our bot - its gateway latency - to respond with a more interesting response about the bot's performance.

Here's the code from the previous part:

=== "Nextcord"

    ```py
    import nextcord

    client = nextcord.Client()

    @client.slash_command(
        name="hello",
        description="A simple hello command.",
        guild_ids=[...],
    )
    async def hello(inter: nextcord.Interaction) -> None:
        await inter.response.send_message("Hello!")

    bot.run("YOUR_BOT_TOKEN")
    ```

=== "Disnake"

    ```py
    from disnake import ApplicationCommandInteraction
    from disnake.ext.commands import Bot

    bot = Bot()

    @bot.slash_command(
        name="hello",
        description="A simple hello command.",
        guild_ids=[...],
    )
    async def hello(inter: ApplicationCommandInteraction) -> None:
        await inter.response.send_message("Hello!")

    bot.run("YOUR_BOT_TOKEN")
    ```

The code we will be writing in a second will go just above the `bot.run()` call. Firstly we'll start out by defining the command again:

=== "Nextcord"

    ```py
    @client.slash_command(
        name="ping",
        description="A simple ping command.",
        guild_ids=[...],
    )
    async def ping(inter: nextcord.Interaction) -> None:
    ```

    And next we'll add in the magical line which shows us the bot's latency:

    ```py
        await inter.response.send_message(f"Pong! {client.latency * 1000:.2f}ms")
    ```

=== "Disnake"

    ```py
    @bot.slash_command(
        name="ping",
        description="A simple ping command.",
        guild_ids=[...],
    )
    async def ping(inter: ApplicationCommandInteraction) -> None:
    ```

    And next we'll add in the magical line which shows us the bot's latency:

    ```py
        await inter.send(f"Pong! {bot.latency * 1000:.2f}ms")
    ```

!!! Note

    The final line here is indented by one indent. Make sure to reflect this in your own code.

Most of this you have seen before in the previous part, but the important bit is the line which says either:

- `await inter.response.send_message(f"Pong! {client.latency * 1000:.2f}ms")` (Nextcord)
- `await inter.send(f"Pong! {bot.latency * 1000:.2f}ms")` (Disnake)

The `latency` property of the bot or client tells us in seconds how long it took for the Discord gateway to respond to us last time we sent it a heartbeat payload (which keeps the connection alive). We multiply this by 1000 to get the latency in milliseconds, which is better for being interpreted, and is more standard, and then we round it to 2 decimal places using the `:.2f` format specifier.

Now you can once again run your bot - having changed the `guild_ids=[...]` to contain your own guild IDs - and you'll be able to use the command like this:

![Slash Command](/assets/img/slash_2.png){ .d-img }

That's it for this part! Now you're ready to move on to the next part: listening for events!
