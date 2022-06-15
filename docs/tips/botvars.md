# Bot Variables

Often when creating bots you'll want to have state stored on the bot so it can be accessed in commands, cogs, etc. Many tutorials will show doing this using global variables or just setting new attributes on the bot object, but neither of these are good practices.

The correct way to add attributes to a bot to store state is by subclassing the bot class. For example, here is a bot with a `version` attribute added so all commands can access it:

```py
class MyBot(commands.Bot):
    version: str = "1.0.0"


bot = MyBot(...)
```

This is a very simple example, but immediately we have made the code far easier to reason about. Now, linters can understand what's going on, and language servers like Pylance can give intelligent code suggestions and tell us if we're using the wrong type for something.

Here's a more complex example which stores the last message the bot has received and compares the content of it when new messages arrive:

```py
class MyBot(commands.Bot):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

        self.last_message: Optional[Message] = None


bot = MyBot(...)

@bot.listen()
async def on_message(message: Message) -> None:
    if bot.last_message and message.content == bot.last_message.content:
        print("They have the same content!")

    bot.last_message = message
```

!!! Warning

    Be sure not to overwrite existing attributes used by the bot, such as `users`, `guilds`, or `cogs`.
