# Cogs

Cogs are an important part of Disnake which allow you to organise your events and commands into different files. They represent a fairly drastic change in how you write your events, commands, and bots, so it's useful to do them early on before you have too much logic in your main file.

!!! Note

    Cogs require a basic understanding of OOP/classes in Python. If you're not familiar with this, check out the first video in [Corey Schafer's OOP Tutorial](https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc).

Now that we're using cogs we're going to abandon most of the code we have from previous parts, since it needs to change significantly to be used with cogs, and some of the functionality we've implemented so far isn't very useful anyway.

!!! Note

    In this part I'll refer to cogs and extensions, and the difference between both is important. A cog is a single class that inherits from `Cog`, which encapsulates commands and events. An extension is a collection of cogs which has a setup function and can be loaded via the bot's `load_extension` method, although you will often find extensions with just one cog.

As with the previous parts we need to create a bot object, we'll do this in a file named `main.py`:

=== "main.py"

    ```py
    from disnake.ext.commands import Bot

    bot = Bot()

    bot.run("YOUR_BOT_TOKEN")
    ```

Now, we need to create a file that we'll put our cog in, let's call it `ping.py` as we'll be putting a basic ping command in here:

=== "ping.py"

    ```py
    from disnake.ext.commands import Bot, Cog, CommandInteraction, slash_command


    class Ping(Cog):
        def __init__(self, bot: Bot) -> None:
            self.bot = bot

        @slash_command(name="ping", description="A simple ping command.", guild_ids=[...])
        async def ping(self, inter: CommandInteraction) -> None:
            await inter.send(f"Pong! {self.bot.latency * 1000:.2f}ms")
    ```

As you can probably see, a lot of this is similar to the ping command we made in part 4 of the beginner section. There are a couple of important parts to explain which are different:

- We're now using the `slash_command` decorator from `disnake.ext.commands`. We can no longer use the `bot` object to make decorators since we don't have the bot object as it's in another file.
- Everything is now in a class. This is a fundamental part of cogs, all of their functionality is encapsulated within a class.

In this section of code:

```py
class Ping(Cog):
    def __init__(self, bot: Bot) -> None:
        self.bot = bot
```

What we're doing is defining a new cog, and letting it take a bot object in its constructor. We're doing this so that we can then access that bot object for the ping command so we can retrieve the bot's websocket latency.

We still have a final piece of code we need to add to the cog's file in order for the cog to be registered, a `setup` function:

=== "ping.py"

    ```py
    # This goes at the bottom of the file.

    def setup(bot: Bot) -> None:
        bot.add_cog(Ping(bot))
    ```

This function is what disnake looks for when loading an extension, and the function signature will always be `setup(self, bot: Bot) -> None`.

Finally, we need to load the cog in our main file:

=== "main.py"

    ```py
    from disnake.ext.commands import Bot

    bot = Bot()

    bot.load_extension("ping")

    bot.run("YOUR_BOT_TOKEN")
    ```

Note that when loading an extension we omit the `.py` extension. Extensions are loaded via Python imports behind the scenes, so we reference them in the same way we would write an import. If you have an extension in `./cogs/ping.py` you would load it with `bot.load_extension("cogs.ping")`.
