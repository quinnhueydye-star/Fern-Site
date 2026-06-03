/* Fern · main.js — shared interactions */

/* ============================================================
   Icon system
   Replaces <span data-icon="name"></span> with inline SVGs.
   ============================================================ */
const ICONS = {
  'arrow-right':     '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'arrow-left':      '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  'arrow-down':      '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  'check':           '<path d="M20 6 9 17l-5-5"/>',
  'check-circle':    '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  'x-circle':        '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  'star':            '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  'briefcase':       '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  'users':           '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'users-round':     '<path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>',
  'plus':            '<path d="M12 5v14"/><path d="M5 12h14"/>',
  'bookmark':        '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
  'chevron-right':   '<path d="m9 18 6-6-6-6"/>',
  'chevron-left':    '<path d="m15 18-6-6 6-6"/>',
  'chevron-down':    '<path d="m6 9 6 6 6-6"/>',
  'chevron-up':      '<path d="m18 15-6-6-6 6"/>',
  'more-vertical':   '<circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/>',
  'layout-dashboard':'<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  'bar-chart-3':     '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  'settings':        '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  'download':        '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  'search':          '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  'calendar':        '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  'calendar-check':  '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
  'clipboard-list':  '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  'pie-chart':       '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  'leaf':            '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  'coffee':          '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" x2="6" y1="1" y2="4"/><line x1="10" x2="10" y1="1" y2="4"/><line x1="14" x2="14" y1="1" y2="4"/>',
  'utensils':        '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  'chef-hat':        '<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/>',
  'baby':            '<path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/>',
  'phone':           '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.49 12 19.79 19.79 0 0 1 1.43 3.44 2 2 0 0 1 3.38 1h3.14a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.67 8.8a16 16 0 0 0 6.29 6.29l1.16-1.1a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'heart-handshake': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/>',
  'shopping-bag':    '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  'hammer':          '<path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/><path d="m18 15 4-4"/><path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>',
  'shield-check':    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  'heart-pulse':     '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l1.5-3 2 4.5 1.5-3h5.27"/>',
  'map-pin':         '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  'mail':            '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'paintbrush':      '<path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 2.5-1.5 6.5 1.5 10L10 19a2 2 0 1 1-3-2l1.5.5"/>',
  'clock':           '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'sparkles':        '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  'eye':             '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  'eye-off':         '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
};

function makeIcon(name, extra) {
  const path = ICONS[name];
  if (!path) return null;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.75');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('icon');
  if (extra) extra.split(' ').forEach(c => c && svg.classList.add(c));
  svg.innerHTML = path;
  return svg;
}

function renderIcons() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const svg = makeIcon(el.dataset.icon, el.dataset.iconClass);
    if (svg) el.replaceWith(svg);
  });
}

/* ============================================================
   Nav scroll
   ============================================================ */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   FAQ accordion
   ============================================================ */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ============================================================
   Auth tabs (Sign in / Create account)
   ============================================================ */
const AUTH_COPY = {
  in: {
    h1:     'Welcome <em>back.</em>',
    sub:    'Sign in to your Fern account to manage roles and review shortlists.',
    rule:   'or sign in with email',
    submit: 'Sign in',
    fine:   'New to Fern? <a href="#" class="auth-switch" data-mode="up">Create an account</a>',
  },
  up: {
    h1:     'Start hiring <em>smarter.</em>',
    sub:    'Create your free business account. No subscription — pay only when you post a role.',
    rule:   'or sign up with email',
    submit: 'Create account',
    fine:   'Already have one? <a href="#" class="auth-switch" data-mode="in">Sign in</a>',
  },
};

function applyAuthMode(mode) {
  const copy = AUTH_COPY[mode];
  if (!copy) return;

  const h1 = document.getElementById('auth-heading');
  const sub = document.getElementById('auth-sub');
  const rule = document.getElementById('auth-rule-text');
  const submitBtn = document.getElementById('auth-submit-btn');
  const fine = document.getElementById('auth-fineprint');

  if (h1) h1.innerHTML = copy.h1;
  if (sub) sub.textContent = copy.sub;
  if (rule) rule.textContent = copy.rule;
  if (submitBtn) { submitBtn.innerHTML = copy.submit + ' <span data-icon="arrow-right"></span>'; renderIcons(); }
  if (fine) fine.innerHTML = copy.fine;

  // Show/hide signup-only fields
  document.querySelectorAll('.signup-only').forEach(el => {
    el.hidden = (mode !== 'up');
  });

  // Swap autocomplete on password field
  const pw = document.getElementById('login-password');
  if (pw) pw.autocomplete = mode === 'in' ? 'current-password' : 'new-password';

  // Re-bind switch links
  document.querySelectorAll('.auth-switch').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = a.dataset.mode;
      if (target) {
        document.querySelectorAll('.auth-tab').forEach(t => {
          t.classList.toggle('active', t.dataset.mode === target);
          t.setAttribute('aria-selected', t.dataset.mode === target);
        });
        applyAuthMode(target);
      }
    });
  });
}

function initAuthTabs() {
  const tabs = document.querySelectorAll('.auth-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      applyAuthMode(tab.dataset.mode);
    });
  });

  // Apply initial state
  const active = document.querySelector('.auth-tab.active');
  if (active) applyAuthMode(active.dataset.mode);
}

/* ============================================================
   Password show / hide
   ============================================================ */
function initPasswordToggles() {
  document.querySelectorAll('.pw-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.pw-wrap').querySelector('input');
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      const icon = btn.querySelector('.icon');
      if (icon) {
        const newIcon = makeIcon(isText ? 'eye' : 'eye-off');
        if (newIcon) icon.replaceWith(newIcon);
      }
    });
  });
}

/* ============================================================
   Auth form submit → redirect to dashboard
   ============================================================ */
function initAuthForms() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.auth-submit');
    if (btn) { btn.textContent = 'Signing in…'; btn.disabled = true; }
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 700);
  });
}

/* ============================================================
   Wizard (Post a role)
   Multi-step form with validation, chip selection, plan selection
   ============================================================ */
const WIZARD_STEPS = ['role', 'details', 'certs', 'review', 'pay', 'done'];
const COMMON_CERTS = {
  barista:   ['Food Safety Certificate', 'Barista training', 'First Aid'],
  foh:       ['Food Safety Certificate', 'LCQ (alcohol)', 'First Aid'],
  chef:      ['Food Safety Certificate', 'Chef qualification (NZ Cert IV)', 'First Aid'],
  childcare: ['WWCC', 'First Aid', 'NZ Cert III Early Childhood Education', 'CPR current'],
  reception: ['Customer service experience', 'Clinic software (Gentu / Cliniko)', 'First Aid'],
  support:   ['Healthcare admin experience', 'First Aid', 'WWCC'],
  retail:    ['Customer service experience', 'Cash handling', 'First Aid'],
  trades:    ['Trade licence (current)', 'Site Safe', 'First Aid'],
  custom:    ['First Aid', 'Right to work in NZ'],
};

const PLAN_PRICES = { single: 49, '5pack': 195, '20pack': 580 };

function initWizard() {
  const form = document.getElementById('post-role-form');
  if (!form) return;

  let currentStep = 0;
  let selectedTemplate = null;
  let selectedPlan = '5pack';
  let selectedCerts = [];
  let selectedExperience = '2';
  let selectedWeekend = true;

  const steps = WIZARD_STEPS.map(id => document.getElementById('wizard-step-' + id));
  const pips  = document.querySelectorAll('.wizard-track .pip');

  function showStep(idx) {
    currentStep = idx;
    steps.forEach((s, i) => {
      if (!s) return;
      s.classList.toggle('active', i === idx);
    });
    pips.forEach((p, i) => {
      p.classList.toggle('done',   i < idx);
      p.classList.toggle('active', i === idx);
    });
    // Update review step display
    if (WIZARD_STEPS[idx] === 'review') updateReviewDisplay();
    if (WIZARD_STEPS[idx] === 'pay') updatePayDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateReviewDisplay() {
    const el = id => document.getElementById(id);
    const v = (elId, val) => { const e = el(elId); if (e) e.textContent = val; };
    const titleEl = el('review-role');
    const locEl   = el('review-location');
    const expEl   = el('review-exp');
    const wkEl    = el('review-weekend');
    const certsEl = el('review-certs');
    const notesEl = el('review-notes');
    if (titleEl) titleEl.textContent = document.getElementById('field-title')?.value || 'Untitled role';
    if (locEl)   locEl.textContent   = (document.getElementById('field-location')?.value || 'Auckland') + ' · ' + (document.getElementById('field-worktype')?.value || 'Part-time');
    if (expEl)   expEl.textContent   = selectedExperience === '0' ? 'No minimum' : selectedExperience + ' years minimum';
    if (wkEl)    wkEl.textContent    = selectedWeekend ? 'Required' : 'Optional';
    if (certsEl) certsEl.textContent = selectedCerts.length ? selectedCerts.join(' · ') : 'None set';
    if (notesEl) notesEl.textContent = document.getElementById('field-description')?.value || 'No extra notes';
  }

  function updatePayDisplay() {
    const price = PLAN_PRICES[selectedPlan] || 49;
    const el = document.getElementById('pay-total-price');
    if (el) el.textContent = '$' + price;
    const payBtn = document.getElementById('pay-submit-btn');
    if (payBtn) payBtn.textContent = 'Pay $' + price + ' & post the role';
  }

  // Template selection
  document.querySelectorAll('.role-template-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-template-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTemplate = btn.dataset.template;
      // Pre-fill certs from template
      selectedCerts = [...(COMMON_CERTS[selectedTemplate] || COMMON_CERTS.custom)];
      // Pre-fill title if not custom
      const titleField = document.getElementById('field-title');
      if (titleField && btn.dataset.label !== 'Something else') {
        titleField.value = btn.dataset.label;
      }
      // Enable continue button
      const cont = document.getElementById('step1-continue');
      if (cont) cont.disabled = false;
    });
  });

  // Experience chips
  document.querySelectorAll('.exp-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.exp-chip').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedExperience = btn.dataset.value;
    });
  });

  // Weekend chips
  document.querySelectorAll('.weekend-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.weekend-chip').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedWeekend = btn.dataset.value === 'required';
    });
  });

  // Plan selection
  document.querySelectorAll('.plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.plan-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedPlan = btn.dataset.plan;
      updatePayDisplay();
    });
  });

  // Step 1 continue
  const s1Continue = document.getElementById('step1-continue');
  if (s1Continue) {
    s1Continue.addEventListener('click', () => {
      if (!selectedTemplate) return;
      showStep(1);
    });
  }

  // Step 2 validation + continue
  const s2Continue = document.getElementById('step2-continue');
  if (s2Continue) {
    s2Continue.addEventListener('click', () => {
      const title = document.getElementById('field-title');
      const location = document.getElementById('field-location');
      let ok = true;
      [title, location].forEach(f => {
        if (!f) return;
        const group = f.closest('.field');
        const errEl = f.parentElement.querySelector('.field-error');
        if (!f.value.trim()) {
          group?.classList.add('has-error');
          if (errEl) errEl.style.display = 'flex';
          ok = false;
        } else {
          group?.classList.remove('has-error');
          if (errEl) errEl.style.display = 'none';
        }
      });
      if (ok) showStep(2);
    });
  }
  // Clear errors on input
  ['field-title', 'field-location'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => el.closest('.field')?.classList.remove('has-error'));
  });

  // Step 3 (certs) continue
  const s3Continue = document.getElementById('step3-continue');
  if (s3Continue) s3Continue.addEventListener('click', () => showStep(3));

  // Step 4 (review) continue
  const s4Continue = document.getElementById('step4-continue');
  if (s4Continue) s4Continue.addEventListener('click', () => showStep(4));

  // Review edit links
  document.querySelectorAll('[data-goto-step]').forEach(btn => {
    btn.addEventListener('click', () => showStep(parseInt(btn.dataset.gotoStep)));
  });

  // Step 5 (pay) submit
  const s5Submit = document.getElementById('pay-submit-btn');
  if (s5Submit) {
    s5Submit.addEventListener('click', () => {
      const name  = document.getElementById('pay-name')?.value.trim();
      const email = document.getElementById('pay-email')?.value.trim();
      if (!name || !email || !email.includes('@')) return;
      // Update done screen with email
      const doneEmail = document.getElementById('done-email');
      if (doneEmail) doneEmail.textContent = email;
      const doneRole = document.getElementById('done-role');
      if (doneRole) doneRole.textContent = document.getElementById('field-title')?.value || 'Your role';
      const doneRef = document.getElementById('done-ref');
      if (doneRef) doneRef.textContent = '#FRN-' + Math.floor(Math.random() * 90000 + 10000);
      showStep(5);
    });
  }

  // Back buttons
  document.querySelectorAll('[data-wizard-back]').forEach(btn => {
    btn.addEventListener('click', () => showStep(currentStep - 1));
  });

  showStep(0);
}

/* ============================================================
   Certs chip toggle (wizard step 3)
   Uses .cert-chip-cell pattern: click chip to select it and
   reveal a .cert-weight panel with 5 .cert-weight-dot buttons.
   ============================================================ */
const WEIGHT_LABELS = ['', 'Nice to have', 'Helpful', 'Important', 'Very important', 'Essential'];

function wireWeightPanel(cell) {
  const toggle  = cell.querySelector('.cert-chip-toggle');
  const panel   = cell.querySelector('.cert-weight');
  const dots    = cell.querySelectorAll('.cert-weight-dot');
  const caption = cell.querySelector('.cert-weight-caption');
  if (!toggle || !panel) return;

  // Default weight = 3
  let currentWeight = 3;
  const dot3 = cell.querySelector('.cert-weight-dot[data-weight="3"]');
  if (dot3) dot3.classList.add('on');

  toggle.addEventListener('click', () => {
    const selected = toggle.classList.toggle('selected');
    panel.hidden = !selected;
    if (!selected) currentWeight = 3;
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentWeight = parseInt(dot.dataset.weight, 10);
      dots.forEach(d => d.classList.toggle('on', d === dot));
      if (caption) caption.textContent = WEIGHT_LABELS[currentWeight] || '';
    });
  });
}

function makeCertChipCell(label, defaultSelected = true) {
  const cell = document.createElement('div');
  cell.className = 'cert-chip-cell';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'chip cert-chip-toggle' + (defaultSelected ? ' selected' : '');
  toggle.textContent = label;

  const panel = document.createElement('div');
  panel.className = 'cert-weight';
  panel.setAttribute('role', 'group');
  panel.hidden = !defaultSelected;

  const wLabel = document.createElement('div');
  wLabel.className = 'cert-weight-label';
  wLabel.textContent = 'How important?';

  const row = document.createElement('div');
  row.className = 'cert-weight-row';

  const titles = ['', 'Nice to have', 'Somewhat important', 'Important', 'Very important', 'Essential — must have'];
  for (let i = 1; i <= 5; i++) {
    const d = document.createElement('button');
    d.type = 'button';
    d.className = 'cert-weight-dot' + (i === 3 ? ' on' : '');
    d.dataset.weight = i;
    d.title = titles[i];
    d.textContent = i;
    row.appendChild(d);
  }

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'cert-chip-remove';
  removeBtn.setAttribute('aria-label', 'Remove ' + label);
  removeBtn.innerHTML = '&times;';
  removeBtn.addEventListener('click', () => cell.remove());

  const caption = document.createElement('div');
  caption.className = 'cert-weight-caption';
  caption.textContent = WEIGHT_LABELS[3];

  panel.appendChild(wLabel);
  panel.appendChild(row);
  panel.appendChild(caption);

  cell.appendChild(toggle);
  cell.appendChild(removeBtn);
  cell.appendChild(panel);
  return cell;
}

function initCertChips() {
  // Wire all preset cert-chip-cells in the HTML
  document.querySelectorAll('.cert-chip-cell').forEach(cell => wireWeightPanel(cell));

  const addBtn   = document.getElementById('add-cert-btn');
  const addInput = document.getElementById('custom-cert-input');
  const chipList = document.getElementById('custom-cert-chips');

  if (!addBtn || !addInput || !chipList) return;

  const addCert = () => {
    const val = addInput.value.trim();
    if (!val) return;
    const cell = makeCertChipCell(val, true);
    wireWeightPanel(cell);
    chipList.appendChild(cell);
    addInput.value = '';
    addInput.focus();
  };

  addBtn.addEventListener('click', addCert);
  addInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addCert(); } });
}

/* ============================================================
   Boot
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderIcons();
  initNav();
  initFAQ();
  initAuthTabs();
  initPasswordToggles();
  initAuthForms();
  initWizard();
  initCertChips();
});
