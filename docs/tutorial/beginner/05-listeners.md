# Event Listeners

While a lot of bot functionality can be implemented with slash commands, there are features that cannot be implemented like this. For example if you want to delete messages containing a certain keyword, you cannot do that with slash commands, but you can do it with listeners for other events, such as messages.

Just like previous parts we'll want a basic bot to be set up. In this example we will be automatically deleting any message that contains the word "badword" in it. For simplicity I have removed the ping command from the basic bots below.

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

    client.run("YOUR_BOT_TOKEN")
    ```

=== "Disnake"

    ```py
    from disnake import CommandInteraction, Message
    from disnake.ext.commands import Bot

    bot = Bot()

    @bot.slash_command(
        name="hello",
        description="A simple hello command.",
        guild_ids=[...],
    )
    async def hello(inter: CommandInteraction) -> None:
        await inter.response.send_message("Hello!")

    bot.run("YOUR_BOT_TOKEN")
    ```

    !!! Note

        We are importing `Message` here so that we can type hint the `message` parameter of the `on_message` listener later on.

Next we'll create a listener that will delete any message that contains the word "badword" in it, again this is inserted just above the `bot.run()` call:

=== "Nextcord"

    ```py
    @client.event
    async def on_message(message: nextcord.Message) -> None:
        if "badword" in message.content:
            await message.delete()
    ```

    Here's a breakdown of what we're doing here:

    - `@client.event` is a decorator which tells Nextcord that this is an event listener.
    - `async def on_message(message: nextcord.Message) -> None` is the function which will be called when the event is triggered.
    - `message` is the message that triggered the event.
    - `if "badword" in message.content` is a check to see if the message contains the word "badword" in it.
    - `await message.delete()` deletes the message the user sent.

=== "Disnake"

    ```py
    @bot.listener()
    async def on_message(message: Message) -> None:
        if "badword" in message.content:
            await message.delete()
    ```

    Here's a breakdown of what we're doing here:

    - `@bot.listener()` is a decorator which tells Disnake that this is an event listener.
    - `async def on_message(message: Message) -> None` is the function which will be called when the event is triggered.
    - `message` is the message that triggered the event.
    - `if "badword" in message.content` is a check to see if the message contains the word "badword" in it.
    - `await message.delete()` deletes the message the user sent.

!!! Note

    This is a very simple example of using a listener for events. Much more complex tasks can be achieved using listeners, but they are out of scope for this beginner part. More complex examples will be given in later intermediate parts.
