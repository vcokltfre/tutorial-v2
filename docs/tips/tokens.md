# Storing Tokens and Secrets

In this tip article I'll explain the 3 most common methods of storing tokens and application secrets. While this is focused on use in Nextcord and Disnake projects, the concepts and tools are applicable to any project, should you wish to use this as a general reference. Note that for these examples you should assume that there is a bot defined somewhere else in the code, and the line bot.run(token) is at the bottom. I won't show the bot code in each example to show just the necessary information, and make this applicable outside of Discord bots too.

!!! Warning

    You should put all files storing credentials in your `.gitignore` file if you're using Git, so that they are not accidentally uploaded to Github (or your preferred git hosting provider).

## .env files

The most common method of storing tokens and secrets is to store them in a `.env` file. This is a file which is used by the `python-dotenv` package to load environment variables from. This is the most common way of storing tokens and secrets in almost all programming projects.

!!! Note

    You will need to install the `python-dotenv` package to use this method.

    === "Linux and Mac"

        ```sh
        python3 -m pip install python-dotenv
        ```

    === "Windows"

        ```bat
        py -3 -m pip install python-dotenv
        ```

---

=== ".env"

    ```txt
    TOKEN=your_token
    ```

=== "main.py"

    ```py
    from os import environ

    from dotenv import load_dotenv

    load_dotenv()

    token = environ["TOKEN"]
    ```

Now that you've loaded the token into the `token` variable, you can use it to run the bot in the `bot.run()` method:

```py
bot.run(token)
```

## Importing from Python files

Another technique you can use is to import the token from a Python file. This is far simpler than loading from a `.env` file as it requires no external modules and is just a regular Python import.

Assuming you have a folder named `private` and in it a file called `config.py`, you can simply use the following code to import the token from it:

=== "private/config.py"

    ```py
    token = "your_token"
    ```

=== "main.py"

    ```py
    from private.config import token
    ```

Now that you've loaded the token into the `token` variable, you can use it to run the bot in the `bot.run()` method:

```py
bot.run(token)
```

## YAML and JSON

The last common technique is using YAML and JSON files to store your token. First, I'll assume you have either a `config.yml` or `config.json` file. You're free to use whichever of these two you like, just look at the correct section for your type.

### YAML

!!! Note

    You will need to install the `pyyaml` package to use this method.

    === "Linux and Mac"

        ```sh
        python3 -m pip install pyyaml
        ```

    === "Windows"

        ```bat
        py -3 -m pip install pyyaml
        ```

=== "config.yml"

    ```yml
    token: "your_token"
    ```

=== "main.py"

    ```py
    from yaml import safe_load
    from pathlib import Path

    config = safe_load(Path("config.yml").read_text())

    token = config["token"]
    ```

### JSON

For JSON it's more simple than YAML since no non-standard modules are needed, simply create a file (`config.json`) and load it as follows:

=== "config.json"

    ```json
    {
        "token": "your_token"
    }
    ```


=== "main.py"

    ```py
    from json import loads
    from pathlib import Path

    config = loads(Path("config.json").read_text())

    token = config["token"]
    ```
