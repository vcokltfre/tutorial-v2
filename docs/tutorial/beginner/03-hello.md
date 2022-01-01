# Hello, world

In this part we'll create a basic slash command which just responds with "Hello, world!" to a `/hello` command. From this point onwards it is expected that you have either Nextcord or Disnake installed, as well as Python 3.8 or above.

=== "Nextcord"

    To start off with slash commands in Nextcord, we'll need to import the `nextcord.Client` class, and create an instance of it which we can create commands on:

    ```py
    import nextcord

    client = nextcord.Client()
    ```

    Awesome! Now that we have an instance of the client, we can create a command which responds to the `/hello` command:

    ```py
    @client.slash_command(
        name="hello",
        description="A simple hello command.",
        guild_ids=[...],
    )
    async def hello(inter: nextcord.Interaction) -> None:
        await inter.response.send_message("Hello!")
    ```

    There's quite a lot going on in that snippet, so allow me to explain what it all does:

    - `@client.slash_command(...)` is a decorator which tells Nextcord that this is a slash command.
    - `name="hello"` is the name of the command.
    - `description="A simple hello command."` is the description of the command.
    - `guild_ids=[...]` is a list of guild IDs which the command is registered in, these should be int IDs of the guilds you want to register the command in. If this is empty it will be registered in all guilds, taking up to an hour to globally register.
    - `async def hello(inter: nextcord.Interaction) -> None` is the function which will be called when the command is triggered.
    - `await inter.response.send_message("Hello!")` is the response which will be sent to the user.

    Finally, we can connect our bot to Discord by using `Client.run()`:

    ```py
    client.run("YOUR_BOT_TOKEN")
    ```

=== "Disnake"

    To start off with slash commands in Disnake we'll need to import the `commands.Bot` class, and also the `ApplicationCommandInteraction` class for later use when defining the command:

    ```py
    from disnake import ApplicationCommandInteraction
    from disnake.ext.commands import Bot

    bot = Bot()
    ```

    !!! Warning

        Remember, how you name your variables is important! This variable should be named `bot`, as it is an instance of the `Bot` class, and not something like `client`, which is a different class entirely.

    Awesome! Now that we have an instance of the bot, we can create a command which responds to the `/hello` command:

    ```py
    @bot.slash_command(
        name="hello",
        description="A simple hello command.",
        guild_ids=[...],
    )
    async def hello(inter: ApplicationCommandInteraction) -> None:
        await inter.send("Hello!")
    ```

    There's quite a lot going on in that snippet, so allow me to explain what it all does:

    - `@bot.slash_command(...)` is a decorator which tells Disnake that this is a slash command.
    - `name="hello"` is the name of the command.
    - `description="A simple hello command."` is the description of the command.
    - `guild_ids=[...]` is a list of guild IDs which the command is registered in, these should be int IDs of the guilds you want to register the command in. If this is empty it will be registered in all guilds, taking up to an hour to globally register.
    - `async def hello(inter: ApplicationCommandInteraction) -> None` is the function which will be called when the command is triggered.
    - `await inter.send("Hello!")` is the response which will be sent to the user.

    Finally, we can connect our bot to Discord by using `Bot.run()`:

    ```py
    bot.run("YOUR_BOT_TOKEN")
    ```

!!! Warning

    Storing tokens in your code like this is dangerous, if you upload a sample of your code to somewhere like Pastebin people could get your token and use it maliciously. It is recommended that you always store tokens in an environment variable or file, which is ignored by your version control system like Git. See [Storing Tokens and Secrets](/tips/tokens) for more information about how to correctly store application credentials.

In the end you should have a command that looks like this:

![Slash Command](/assets/img/slash_1.png){ .d-img }

That's it for this part! You're now ready to move on to ever more green and complex pastures!
