var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
function renderSlash(message) {
    if (!message.slash) {
        return "";
    }
    return `<div class="d-msg-slash">
    <div class="d-msg-slash-arr"></div>
    <div class="d-msg-slash-author">
        <img src="${message.slash.author.avatar}">
        <span style="color: #${message.slash.author.colour || "fff"}">${message.slash.author.name}</span>
        <span class="d-msg-slash-used">used</span>
        <span class="d-msg-slash-command">${message.slash.name}</span>
    </div>
  </div>`;
}
function renderBody(message) {
    const bot = message.author.bot
        ? '<span class="d-msg-author-bot">BOT</span>'
        : "";
    return `<div class="d-msg-body">
    <div class="d-msg-author-pfp">
      <img src="${message.author.avatar}">
    </div>
    <div class="d-msg-main">
      <div class="d-msg-author-name" style="color: #${message.author.colour || "fff"}">
        ${message.author.name}${bot}
      </div>
      <div class="d-msg-content">
        ${message.content}
      </div>
    </div>
  </div>`;
}
function renderMessage(message) {
    const slash = renderSlash(message);
    const body = renderBody(message);
    return `<div class="d-msg">
    ${slash}
    ${body}
  </div>`;
}
function getJson(ref) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/messages/${ref}`);
        return yield response.json();
    });
}
function loadMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        const messages = document.querySelectorAll("code");
        for (const message of messages) {
            const inner = message.innerText;
            if (inner.startsWith("message:")) {
                const parent = message.parentElement.parentElement;
                parent.innerHTML = "";
                const ref = inner.substring(8);
                const json = yield getJson(ref);
                parent.innerHTML = renderMessage(json);
            }
        }
    });
}
loadMessages().then(() => { });
