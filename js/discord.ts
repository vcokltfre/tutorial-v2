type Author = {
  name: string;
  avatar: string;
  bot?: boolean;
  colour?: string;
};

type Slash = {
  name: string;
  author: Author;
};

type Message = {
  author: Author;
  slash?: Slash;
  content: string;
};

/*
<div class="d-msg">

<div class="d-msg-slash">
    <div class="d-msg-slash-arr"></div>
    <div class="d-msg-slash-author">
        <img src="https://cdn.discordapp.com/avatars/297045071457681409/838a52d60f325b796a7b3a4927bac943.png?size=1024">
        vcokltfre
        <span class="d-msg-slash-used">used</span>
        <span class="d-msg-slash-command">/hello</span>
    </div>
</div>

<div class="d-msg-body">
    <div class="d-msg-author-pfp">
        <img src="https://cdn.discordapp.com/avatars/689160870143590621/74ddebbc9161ddcee9f4f4f3e25e22fa.png">
    </div>
    <div class="d-msg-main">
        <div class="d-msg-author-name">
            WumpusBot<span class="d-msg-author-bot">BOT</span>
        </div>
        <div class="d-msg-content">
            Hello!
        </div>
    </div>
</div>
</div>
*/

function renderSlash(message: Message): string {
  if (!message.slash) {
    return "";
  }

  return `<div class="d-msg-slash">
    <div class="d-msg-slash-arr"></div>
    <div class="d-msg-slash-author">
        <img src="${message.slash.author.avatar}">
        <span style="color: #${message.slash.author.colour || "fff"}">${
    message.slash.author.name
  }</span>
        <span class="d-msg-slash-used">used</span>
        <span class="d-msg-slash-command">${message.slash.name}</span>
    </div>
  </div>`;
}

function renderBody(message: Message): string {
  const bot = message.author.bot
    ? '<span class="d-msg-author-bot">BOT</span>'
    : "";

  return `<div class="d-msg-body">
    <div class="d-msg-author-pfp">
      <img src="${message.author.avatar}">
    </div>
    <div class="d-msg-main">
      <div class="d-msg-author-name" style="color: #${
        message.author.colour || "fff"
      }">
        ${message.author.name}${bot}
      </div>
      <div class="d-msg-content">
        ${message.content}
      </div>
    </div>
  </div>`;
}

function renderMessage(message: Message): string {
  const slash = renderSlash(message);
  const body = renderBody(message);

  return `<div class="d-msg">
    ${slash}
    ${body}
  </div>`;
}

async function getJson(ref: string): Promise<any> {
  const response = await fetch(`/messages/${ref}`);
  return await response.json();
}

async function loadMessages(): Promise<void> {
  const messages = document.querySelectorAll("code");

  for (const message of messages) {
    const inner = message.innerText;

    if (inner.startsWith("message:")) {
      const parent = message.parentElement.parentElement;

      parent.innerHTML = "";

      const ref = inner.substring(8);
      const json = await getJson(ref);

      parent.innerHTML = renderMessage(json);
    }
  }
}

loadMessages().then(() => {});
