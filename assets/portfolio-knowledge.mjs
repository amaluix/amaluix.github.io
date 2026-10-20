// Public, owner-approved facts only. Shared by the local guide and server-side agent.
export const topics = [
  { id: 'contact', question: 'How can I contact you?', match: /\b(contact|reach|phone|number)\b|^(?:your )?whatsapp[? .]*$/i,
    answer: 'You can reach me on WhatsApp at +91 70122 87768: https://wa.me/917012287768 . For project enquiries, tell me what you want to improve, the tools and people involved, and your timeline. You can also connect on LinkedIn at https://in.linkedin.com/in/amal-chandran-designer . This guide cannot send messages or book meetings for you.', link: '#consulting', label: 'Contact me on WhatsApp' },
  { id: 'connect', question: 'What is Progbiz Connect?', match: /\b(connect)\b/i, answer: 'I led Progbiz Connect for Progbiz. It is a product focused on AI agents across WhatsApp, voice, and web conversations. The public product is at https://connect.progbiz.io/. Product leadership is owner-confirmed; detailed delivery responsibilities and results are not yet published.', link: '#progbiz-connect', label: 'Explore Progbiz Connect' },
  { id: 'about', question: 'What do you do?', match: /\b(amal|generalist|about|focus|who)\b/i,
    answer: 'I’m an AI Generalist based in Kerala, India. I work across AI products, voice AI, intelligent automation, and AI-driven business workflows. My focus is turning AI capabilities into practical solutions for businesses.', link: '#expertise', label: 'Explore expertise' },
  { id: 'experience', question: 'Tell me about your experience', match: /\b(experience|career|hire|hiring|role|cto|talks|job|team)\b/i,
    answer: 'I started at Progbiz in UI/UX and digital product development, then worked at Talks & Talks, a UK AI startup. I returned to Progbiz, where I’m currently CTO and AI specialist. I’m interested in applied AI, AI solutions, implementation, and automation roles. Employment dates are still to be confirmed. My LinkedIn profile is linked in the career section.', link: '#experience', label: 'Read my experience' },
  { id: 'ecom', question: 'What is Ecom Model Studio?', match: /\b(ecom|ecommodel|photography|built)\b/i,
    answer: 'I built Ecom Model Studio, a product focused on product photography for e-commerce. The public product is at https://ecommodel.studio/. Technical architecture and detailed contributions are awaiting repository review.', link: '#ecom-studio', label: 'View Ecom Model Studio' },
  { id: 'myg', question: 'Tell me about the MyG work', match: /\b(myg|voice|calling|calls|recruitment|malayalam|manglish)\b/i,
    answer: 'The MyG project scope brings together post-purchase feedback calls, incoming recruitment calls, HR automation, and interview-related workflows. Feedback-agent requirements included Malayalam/Manglish conversations, structured feedback, complaint detection, escalation, and call-record review. These are requirements; deployed features, architecture, and individual contributions still need verification. The playable Malayalam call opening, voiced with Gemini Aoede, on the portfolio is a synthetic illustrative demo, not a real customer recording.', link: '#myg', label: 'View the MyG scope' },
  { id: 'progbiz', question: 'What is your role at Progbiz?', match: /\b(progbiz|adoption|organisation|organization|transformation)\b/i,
    answer: 'Progbiz is my current employer. As CTO and AI specialist, I lead AI-related work and technology initiatives. The organisational transformation covers marketing, content, video, 2D/3D production, QA, development, products, and voice agents. Individual contributions, rollout details, and outcomes are still being documented.', link: '#progbiz', label: 'View Progbiz work' },
  { id: 'shifa', question: 'Tell me about the hospital project', match: /\b(shifa|hospital|healthcare|appointment|whatsapp|lab)\b/i,
    answer: 'My Shifa work covers a WhatsApp hospital assistant. Repository review found appointment-booking flows, lab-report delivery, AI voice-note replies, and reception handoffs, using WhatsApp, Nuacare, and Chatwoot. Source implementation is not proof of production rollout or outcomes. Individual delivery responsibilities still need confirmation. The portfolio WhatsApp preview and welcome audio are illustrative synthetic demos, not real patient interactions. I do not share patient information.', link: '#shifa', label: 'View the hospital scope' },
  { id: 'consulting', question: 'How could we work together?', match: /\b(consult|business|contact|email|price|cost|budget|together|help|project|work)\b/i,
    answer: 'For a business enquiry, start with the workflow or problem: customer enquiries, voice interactions, repetitive operations, or disconnected systems. My consultation focuses on assessing fit and defining next steps; implementation is scoped separately. You can contact me on WhatsApp at +91 70122 87768 (https://wa.me/917012287768) or through my LinkedIn profile. Pricing and availability are confirmed after discussing your needs. This guide cannot send enquiries or book meetings.', link: '#consulting', label: 'See consulting options' },
  { id: 'speaking', question: 'Do you offer training?', match: /\b(train|speak|workshop|college|education|samagra)\b/i,
    answer: 'My engagements include speaking on Automation Use Cases & AI Assistants at SPACE 7.0, Samagra Learning, on 7 October 2026; alumni AI training at Don Bosco College and Farook College; and AI consultation and online workshops for Kirali TMT. No attendance numbers or outcomes are claimed.', link: '#speaking', label: 'View speaking and training' }
];
export function localAnswer(question) {
  // Prefer specific entities over broad words such as "Amal" or "work".
  const ordered = ['contact', 'connect', 'ecom', 'myg', 'progbiz', 'shifa', 'speaking', 'experience', 'consulting', 'about'];
  const topic = ordered.map(id => topics.find(item => item.id === id)).find(item => item.match.test(question));
  return topic || { answer: 'I’m the local demo of Amal’s AI portfolio guide. I have prepared answers about the projects, experience, and consulting on this site, but no verified answer to that question yet.', link: '#questions', label: 'Read common questions' };
}
export const profile = {
  name: 'Amal Chandran',
  identity: 'AI Generalist',
  location: 'Kerala, India',
  headline: 'Building practical AI solutions for real business problems.',
  background: 'Product development, UI/UX, AI systems, workflow automation, organisational AI adoption, technology leadership, consulting, and AI education.',
  positioning: 'A broad applied-AI practitioner who connects business problems, product thinking and implementation. Do not present Amal as an entry-level professional, ML researcher, ML engineer, or conventional Python engineer. CTO is his actual Progbiz role, not his primary personal-brand headline.',
  capabilities: [
    'AI product discovery, shaping product ideas, prototyping and testing assumptions',
    'AI agents and voice conversations with business context and human handoffs',
    'Intelligent automation for repetitive operational and communication workflows',
    'AI-assisted development with implementation review and practical constraints',
    'Business workflow mapping, APIs, webhooks, integrations and system handoffs',
    'Organisational AI adoption, consultation, training and implementation planning'
  ],
  approach: 'Start with the business problem and current workflow. Assess where AI fits, understand the existing tools, people and constraints, then agree on a useful next step. Implementation, scope, availability, timelines and fees are agreed after discussion.',
  tools: 'Amal confirmed that Codex, Claude and Antigravity were incorporated into development workflows at Progbiz. This does not establish proficiency levels or imply that every project uses all three. The reviewed Shifa implementation uses WhatsApp, Nuacare, Chatwoot and AI voice-note replies. The portfolio itself uses semantic HTML, CSS, lightweight JavaScript, Cloudflare Workers and Gemini; its MyG audio demo uses Gemini Aoede in Malayalam.',
  opportunities: 'Applied AI, AI solutions, implementation and automation roles, alongside business consultation and implementation enquiries. Exact employment dates, salary expectations, availability, educational qualifications and certifications have not been supplied.',
  contact: 'Owner-approved public WhatsApp: +91 70122 87768, https://wa.me/917012287768 . Public LinkedIn: https://in.linkedin.com/in/amal-chandran-designer . Business enquiries should describe the problem, current tools and people, timeline and desired outcome. Hiring enquiries should include the role and context. The guide cannot send enquiries or book meetings.',
  personal: 'The About image is an AI-edited portrait approved by Amal, showing him at a laptop with a black dachshund and brown-apricot poodle. Pet names and other private biographical details are not supplied.',
  evidence: 'Use owner-confirmed facts confidently. Distinguish project scope from proven deployment and measured results. No verified performance metrics, testimonials, patient data, customer call records, private contact details or credentials are available for disclosure.'
};
export const publicFacts = JSON.stringify(profile, null, 2) + '\n\n' + topics.map(({ question, answer }) => `${question}\n${answer}`).join('\n\n');
