from dataclasses import dataclass
from pathlib import Path
from textwrap import dedent
from sys import argv

from yaml import safe_load


@dataclass
class Author:
    name: str
    avatar: str = ""
    bot: bool = False


class Slash:
    def __init__(self, author: Author, name: str) -> None:
        self.author = author
        self.name = name

    def render(self) -> str:
        return dedent(f"""
                <div class="d-msg-slash">
                    <div class="d-msg-slash-arr"></div>
                    <div class="d-msg-slash-author">
                        <img src="{self.author.avatar}">
                        {self.author.name}
                        <span class="d-msg-slash-used">used</span>
                        <span class="d-msg-slash-command">/{self.name}</span>
                    </div>
                </div>
                """)


class MessageContent:
    def __init__(self, content: str) -> None:
        self.content = content

    def render(self) -> str:
        return self.content


class Message:
    def __init__(self, author: Author, content: MessageContent, slash: Slash = None) -> None:
        self.author = author
        self.content = content
        self.slash = slash

    def render(self) -> str:
        slash = self.slash.render() if self.slash else ""

        return dedent(f"""
        <!-- This was auto-generated by tools/messages.py! Do not touch by hand! -->
        <div class="d-msg">
        {{slash}}
        <div class="d-msg-body">
            <div class="d-msg-author-pfp">
                <img src="{self.author.avatar}">
            </div>
            <div class="d-msg-main">
                <div class="d-msg-author-name">
                    {self.author.name}{'<span class="d-msg-author-bot">BOT</span>' if self.author.bot else ''}
                </div>
                <div class="d-msg-content">
                    {self.content.render()}
                </div>
            </div>
        </div>
        </div>
        """).replace("{slash}", slash)


if __name__ == "__main__":
    if len(argv) != 2:
        print("Usage: python3 messages.py <path/to/message.yml>")
        exit(1)

    data = safe_load(Path(argv[1]).read_text())

    author = Author(**data["author"])

    if (slash := data.get("slash")) is not None:
        slash_author = Author(**slash.pop("author"))
        slash = Slash(slash_author, slash["name"])
    else:
        slash = None

    content = MessageContent(**data["content"])

    Path("./message.html").write_text(Message(author, content, slash).render())