// Progressive enhancement: navigation remains visible if JavaScript is unavailable.
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const mobile = window.matchMedia('(max-width: 760px)');

if (header && toggle && navigation) {
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.lastElementChild.textContent = open ? '−' : '+';
    navigation.classList.toggle('is-open', open);
  };

  const syncMenu = () => {
    const focusWillBeHidden = mobile.matches && navigation.contains(document.activeElement);
    toggle.hidden = !mobile.matches;
    header.classList.toggle('has-menu', mobile.matches);
    if (!mobile.matches && document.activeElement === toggle) navigation.querySelector('a').focus();
    setMenu(false);
    if (focusWillBeHidden) toggle.focus();
  };

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !mobile.matches) return;
    setMenu(false);
    // Move keyboard focus out of the now-hidden navigation to the destination.
    const destination = document.querySelector(link.getAttribute('href'));
    if (destination) {
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
      destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), { once: true });
    }
  });
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  mobile.addEventListener('change', syncMenu);
  syncMenu();
}

// Project interests are a view over the real inventory, never a fake AI demo.
const toolbar = document.querySelector('.work-toolbar');
const filters = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('.project-row[data-category]')];
const filterStatus = document.querySelector('.filter-status');
if (toolbar && filters.length && projects.length && filterStatus) {
  toolbar.hidden = false;
  const showProjects = (category) => {
    let count = 0;
    projects.forEach((project) => {
      const matches = category === 'all' || project.dataset.category === category;
      project.hidden = !matches;
      if (matches) count++;
    });
    filters.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    filterStatus.textContent = category === 'all' ? `Showing all ${count} projects` : `Showing ${count} ${count === 1 ? 'project' : 'projects'}`;
  };
  filters.forEach((button) => button.addEventListener('click', () => showProjects(button.dataset.filter)));
  // Direct project links remain usable even when an earlier filter hid the target.
  const revealHashTarget = () => {
    const target = projects.find((project) => `#${project.id}` === location.hash);
    if (target?.hidden) {
      showProjects('all');
      target.scrollIntoView();
    }
  };
  window.addEventListener('hashchange', revealHashTarget);
  revealHashTarget();
}

// Content is fully visible without scripts. Motion is a one-time enhancement.
if ('IntersectionObserver' in window) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reducedMotion.matches) {
    const entranceObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.section-heading, .project-title, .project-copy, .capabilities article, .timeline li, .engagements li, .answer-row, .contact-path').forEach((item) => entranceObserver.observe(item));
  }
  const links = [...document.querySelectorAll('#site-nav a')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
}

// A second demo stops the first; audio only starts after a visitor presses play.
document.querySelectorAll('audio').forEach(player => {
  player.addEventListener('play', () => {
    document.querySelectorAll('audio').forEach(other => { if (other !== player) other.pause(); });
  });
});
