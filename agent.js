import { localAnswer } from './assets/portfolio-knowledge.mjs?v=20261019-8';

const panel = document.querySelector('#agent-dialog');
const form = document.querySelector('#agent-form');
const input = document.querySelector('#agent-question');
const transcript = document.querySelector('#agent-messages');
const status = document.querySelector('#agent-status');
const send = form.querySelector('button');
const live = document.body.dataset.agentMode === 'gemini';
const history = [];
let controller;
let opener;
let busy = false;
document.querySelector('.agent-feature-note').textContent = live ? 'AI portfolio guide powered by Gemini.' : 'Portfolio guide with prepared answers.';
const notice = live
  ? 'AI guide, not Amal personally. Powered by Gemini. Messages are sent to Google. Avoid confidential information; answers may be inaccurate. This chat does not contact Amal.'
  : 'AI guide demo · prepared portfolio answers. Nothing is sent to an AI service or to Amal.';
document.querySelector('#agent-privacy').textContent = notice;
status.textContent = live ? 'Gemini enabled' : 'Prepared-answer demo';

function addMessage(role, text, source) {
  const item = document.createElement('div');
  item.className = `agent-message ${role === 'user' ? 'from-visitor' : 'from-guide'}`;
  const label = document.createElement('strong');
  label.textContent = role === 'user' ? 'You' : live ? 'Amal’s AI guide' : 'Portfolio guide · demo';
  const body = document.createElement('p');
  body.textContent = text;
  item.append(label, body);
  if (source) {
    const link = document.createElement('a');
    link.href = source.link;
    link.textContent = `${source.label} ↗`;
    link.addEventListener('click', () => {
      opener = null;
      panel.close();
      const target = document.querySelector(source.link);
      target?.setAttribute('tabindex', '-1');
      target?.focus({ preventScroll: true });
      target?.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    });
    item.append(link);
  }
  transcript.append(item);
  // Bound the in-memory transcript during unusually long visits.
  while (transcript.children.length > 30) transcript.firstElementChild.remove();
  transcript.scrollTop = transcript.scrollHeight;
}

function openAgent(event) {
  opener = event.currentTarget;
  if (!panel.open) panel.showModal();
  if (opener.dataset.ask) input.value = opener.dataset.ask;
  input.focus();
}
if (typeof panel.showModal === 'function') {
  document.querySelectorAll('[data-agent-open]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', openAgent);
  });
}
document.querySelector('#agent-close').addEventListener('click', () => panel.close());
panel.addEventListener('close', () => opener?.focus({ preventScroll: true }));
document.querySelectorAll('[data-agent-prompt]').forEach(button => button.addEventListener('click', () => {
  input.value = button.dataset.agentPrompt;
  input.focus();
}));
document.querySelector('#agent-reset').addEventListener('click', () => {
  controller?.abort();
  history.length = 0;
  transcript.replaceChildren();
  input.value = '';
  addMessage('model', 'I’m Amal’s AI portfolio guide. Ask about the work, experience, or working together.');
  input.focus();
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question || busy) return;
  busy = true;
  send.disabled = true;
  input.value = '';
  addMessage('user', question);
  const source = localAnswer(question);
  if (!live) {
    addMessage('model', source.answer, source);
    busy = false;
    send.disabled = false;
    input.focus();
    return;
  }
  status.textContent = 'Thinking…';
  controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch('/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question, history: history.slice(-8) }), signal: controller.signal
    });
    if (!response.ok) throw new Error(response.status === 429 ? 'busy' : 'unavailable');
    const data = await response.json();
    if (typeof data.answer !== 'string' || !data.answer.trim()) throw new Error('unavailable');
    addMessage('model', data.answer, source);
    history.push({ role: 'user', text: question }, { role: 'model', text: data.answer.slice(0, 1500) });
    if (history.length > 8) history.splice(0, history.length - 8);
    status.textContent = 'Gemini connected';
  } catch (error) {
    if (error.name === 'AbortError') {
      status.textContent = 'Request stopped. You can try again.';
    } else {
      status.textContent = 'AI unavailable. Try again shortly.';
      addMessage('model', 'The live AI could not answer. Here is a prepared portfolio answer instead:\n\n' + source.answer, source);
    }
  } finally {
    clearTimeout(timeout);
    busy = false;
    send.disabled = false;
    controller = null;
    if (panel.open) input.focus();
  }
});
