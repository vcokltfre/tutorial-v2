# Allowed Mentions

Allowed mentions are a way of telling Discord that you don't want to ping for certain mentions in your message. The different types of ping a message can have are `@role` pings, `@everyone` or `@here` pings, `@user` pings, and reply pings, all of which we can turn on and off pings for when mentioning.

## How do I use them?

There're a couple of ways you can use allowed mentions in disnake and nextcord:

=== "disnake"

    The first way we can set allowed mentions in the bot's constructor, and these will apply on all messages sent by the bot. To do this we need to import `AllowedMentions` from disnake:

    ```py
    from disnake import AllowedMentions
    from disnake.ext.commands import Bot
    ```

    Next, we need to create the bot:

    ```py
    bot = Bot(
        command_prefix="!",
        allowed_mentions=AllowedMentions(
            users=False,         # Whether to ping individual user @mentions
            everyone=False,      # Whether to ping @everyone or @here mentions
            roles=False,         # Whether to ping role @mentions
            replied_user=False,  # Whether to ping on replies to messages
        ),
    )
    ```

    The example above will disable all pings in messages the bot sends, but you can toggle these as you like. Try making your bot send mentions with these settings to see allowed mentions in action!

    The next way of setting allowed mentions is when sending a message, or replying to one. Either way it uses the same keyword argument, so I'll just show sending a message normally, and you can adapt that to your own code. Again the first thing we need to do if we haven't already is import discord.py so we can access the `AllowedMentions` class:

    ```py
    from disnake import AllowedMentions
    from disnake.ext.commands import InteractionContext, slash_command
    ```

    Now, I'll assume that we're in a cog, so I can create a command like this:

    ```py
        @slash_command(name="dontpingme", description="A command that doesn't ping anyone.", guild_ids=[...])
        async def dont_ping_me(self, inter: InteractionContext) -> None:
            mentions = discord.AllowedMentions(
                users=False,
            )
            await inter.send(f"Hello, {ctx.author.mention}", allowed_mentions=mentions)
    ```

=== "nextcord"

    The first way we can set allowed mentions in the bot's constructor, and these will apply on all messages sent by the bot. To do this we need to import `AllowedMentions` from nextcord:

    ```py
    from nextcord import AllowedMentions
    from nextcord.ext.commands import Bot
    ```

    Next, we need to create the bot:

    ```py
    bot = Bot(
        command_prefix="!",
        allowed_mentions=AllowedMentions(
            users=False,         # Whether to ping individual user @mentions
            everyone=False,      # Whether to ping @everyone or @here mentions
            roles=False,         # Whether to ping role @mentions
            replied_user=False,  # Whether to ping on replies to messages
        ),
    )
    ```

    The example above will disable all pings in messages the bot sends, but you can toggle these as you like. Try making your bot send mentions with these settings to see allowed mentions in action!

    The next way of setting allowed mentions is when sending a message, or replying to one. Either way it uses the same keyword argument, so I'll just show sending a message normally, and you can adapt that to your own code. Again the first thing we need to do if we haven't already is import discord.py so we can access the `AllowedMentions` class:

    ```py
    from nextcord import AllowedMentions, Interaction, slash_command
    ```

    Now, I'll assume that we're in a cog, so I can create a command like this:

    ```py
        @slash_command(name="dontpingme", description="A command that doesn't ping anyone.", guild_ids=[...])
        async def dont_ping_me(self, inter: Interaction) -> None:
            mentions = discord.AllowedMentions(
                users=False,
            )
            await inter.send(f"Hello, {ctx.author.mention}", allowed_mentions=mentions)
    ```

This example only disabled the `users` mention, since it's the only one that will happen, which means now you can run that command and the bot will mention you, but won't ping you. Neat, huh?

!!! info
    Note that when using allowed mentions in a message specifically, any mentions you have set in the `AllowedMentions` object will override those mentions' settings that were set in the bot's constructor.
