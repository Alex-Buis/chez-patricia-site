// ---------- Menu mobile ----------
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Horaires : ouvert / fermé + jour en cours ----------
const horaires = {
  0: { open: 11 * 60, close: 18 * 60 },       // dimanche
  1: { open: 10 * 60, close: 18 * 60 + 30 },  // lundi
  2: { open: 10 * 60, close: 18 * 60 + 30 },
  3: { open: 10 * 60, close: 18 * 60 + 30 },
  4: { open: 10 * 60, close: 18 * 60 + 30 },
  5: { open: 10 * 60, close: 18 * 60 + 30 },
  6: { open: 10 * 60, close: 18 * 60 + 30 },  // samedi
};

function updateStatus() {
  const now = new Date();
  const day = now.getDay();
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const today = horaires[day];

  const statusEl = document.getElementById('hero-status');
  const isOpen = today && minutesNow >= today.open && minutesNow < today.close;

  if (statusEl) {
    statusEl.textContent = isOpen ? 'Ouvert en ce moment' : 'Fermé en ce moment';
    statusEl.classList.toggle('closed', !isOpen);
  }

  const row = document.querySelector(`#horaires tr[data-day="${day}"]`);
  if (row) row.classList.add('today');
}

updateStatus();

// ---------- Année dans le footer ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Formulaire de contact (ouvre le client mail) ----------
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const nom = data.get('nom');
    const email = data.get('email');
    const sujet = data.get('sujet');
    const message = data.get('message');

    const body = `Nom : ${nom}\nE-mail : ${email}\n\n${message}`;
    const mailtoUrl =
      `mailto:contact.chezpatricia@gmail.com` +
      `?subject=${encodeURIComponent('[Site] ' + sujet)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    formNote.textContent = 'Votre client mail va s\'ouvrir pour envoyer le message.';
  });
}