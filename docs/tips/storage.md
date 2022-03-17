# Storing Data

As your bot grows in features you'll probably want to store persistent data, and it's important to do this in the correct way, else you can make your life developing harder, and possibly compromise the functionality of your bot.

!!! warning
    If you have one takeaway from this, let it be that JSON is **not** a database, and does not work as one, nor does CSV, or plain text files. JSON works well as a data transfer format, or for config files, but is not made for storing changeable persistent data.

    In addition to this, spreadsheets are not databases either. Neither Excel nor Google Sheets are acceptable replacements for actual databases. If I hear that you, the reader, is using a spreadsheet as a database I will feel very bad please do not do this!

## Databases You Can Use

!!! warning
    Note that the following libraries are async libraries. discord.py is an async library too, so the libraries you use inside it should also be async to prevent blocking calls from stopping the event loop doing important things, such as heartbeating to the Discord gateway.

### PostgreSQL

Postgres is a popular SQL database due to its large feature set and efficiency, and is generally a good choice when storing data in a bot.

To use postgres in your bot you'll want to use a client library such as [asyncpg](https://pypi.org/project/asyncpg/) which provides an easy interface for interacting with Postgres.

### MySQL / MariaDB

MySQL or it's younger sibling MariaDB are also popular SQL databases which are also extremely commonly used. For most bots there will be no noticeable difference between MySQL-based and Postgres, so it's really up to personal preference

To use MySQL or MariaDB in your bot you'll want the [aiomysql](https://pypi.org/project/aiomysql/) client library, which also provides an easy interface for interacting with MySQL.

### aiosqlite

SQLite is a simple, fast, local database. It's a SQL database and can be easily used just about anywhere. It has similar use cases to the databases listed above. To use aiosqlite in your own bot you'll need the [aiosqlite](https://readthedocs.org/projects/aiosqlite/) package installed.

### MongoDB

MongoDB is a document store, not a relational database like MySQL or PostgreSQL, which means its use cases are slightly different. MongoDB is primarily for storing JSON-like objects but in a proper database so you don't need to handle file storage and other general shenanigans when storing data.

To use MongoDB in your bot you'll want to use the [motor](https://pypi.org/project/motor/) client library. Motor also provides an easy interface for interacting with MongoDB, but in a very different way to the previous SQL databases mentioned, since it's fundamentally a different kind of database.

## Connecting to Databases

To use a database most libraries will require you explicitly make a call to `connect()` to the database, but where you do this is important. It can't be done before the bot is started because it will rely on the event loop to connect since the library you use should be async. Your first reaction might be to think that it should go in a handler for the `READY` event, but that's not the case. The `READY` event can be delivered multiple times by the Discord API, but we only wish to connect to the database once - when it's not already connected.

Because of this it's preferable to subclass the Bot/Client class and override the `start()` method. The start method is an async function called right at the start of the bot's lifecycle, which makes it the ideal place to do initial async setup such as connecting to a database, retrieving data from an API, or starting background tasks.

Depending on your bot's setup your code will likely look different, but if we wanted to do this with asyncpg in Disnake it might look like this:

```py
from asyncpg import Pool, connect
from disnake import Bot

class MyBot(Bot):
    pool: Pool

    async def start(self, *args, **kwargs) -> None:
        self.pool = await connect("postgres://user:password@localhost/database")

        await super().start()
```

## Resources

| Resource                                                      | Description                                                          |
|---------------------------------------------------------------|----------------------------------------------------------------------|
| [asyncpg docs](https://magicstack.github.io/asyncpg/current/) | The official asyncpg documentation                                   |
| [aiomysql docs](https://aiomysql.readthedocs.io/)             | The official aiomysql documentation                                  |
| [aiosqlite docs](https://readthedocs.org/projects/aiosqlite/) | The official aiosqlite documentation.                                |
| [motor docs](https://motor.readthedocs.io/en/stable/)         | The official motor documentation                                     |
| [PostgreSQL tutorial](https://www.postgresqltutorial.com/)    | A tutorial to help you learn how to use Postgres                     |
| [MySQL tutorial](https://www.mysqltutorial.org/)              | A tutorial to help you learn how to use MySQL and MariaDB            |
| [Ormar Docs](https://collerek.github.io/ormar/)               | Ormar documentation - an async ORM for PostgreSQL, MySQL, and SQLite |
