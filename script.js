/**
 * Roshini Kasireddi Portfolio - Interactive JavaScript Engine
 */

const initializePortfolio = () => {
  
  // 1. TYPING TEXT ANIMATION
  const typingElement = document.getElementById('typing-text');
  const roles = [
    "Full Stack Software Developer",
    "B.Tech Data Science Specialist",
    "React.js & Node.js Architect",
    "Machine Learning & Data Analyst",
    "Database & REST API Engineer"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(typeEffect, typingSpeed);
  }
  typeEffect();


  // 2. INTERACTIVE PARTICLES CANVAS
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 45);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        color: ['rgba(79, 117, 247, 0.4)', 'rgba(139, 92, 246, 0.3)', 'rgba(6, 182, 212, 0.3)'][Math.floor(Math.random() * 3)]
      });
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connective lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 116, 139, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }


  // 3. SKILL FILTERING SYSTEM
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => {
        b.classList.remove('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/30', 'active');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });

      btn.classList.add('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/30', 'active');
      btn.classList.remove('bg-slate-800', 'text-slate-300');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // 4. PROJECT FILTERING SYSTEM
  const projectFilterBtns = document.querySelectorAll('.proj-filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => {
        b.classList.remove('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/30', 'active');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });

      btn.classList.add('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/30', 'active');
      btn.classList.remove('bg-slate-800', 'text-slate-300');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // 6. PROJECT DETAILS MODAL & DATA
  const projectDetails = {
    hospital: {
      title: "Integrated Government Hospital Operations Monitoring System",
      badge: "Full Stack Healthcare Architecture",
      tech: "React.js · Node.js · Express.js · MySQL · JWT Authentication · REST APIs",
      description: `
        <div class="space-y-4">
          <p class="text-slate-200">
            A comprehensive, modular healthcare operations system designed to modernize and streamline workflows across public health facilities.
          </p>
          <div class="space-y-2">
            <h4 class="font-bold text-white text-sm">Key Architectural Modules:</h4>
            <ul class="list-disc list-inside space-y-1.5 text-xs text-slate-300">
              <li><strong>Patient Registration &amp; EMR:</strong> Centralized digital medical history with quick lookup and biometric/ID linkage.</li>
              <li><strong>Dynamic Queue Management:</strong> Real-time token dispatching system minimizing outpatient department (OPD) congestion.</li>
              <li><strong>Bed &amp; Ward Allocation:</strong> Visual dashboard showing ICU, general ward, and emergency occupancy in real-time.</li>
              <li><strong>Pharmacy &amp; Stock Tracking:</strong> Automated alerts on low inventory thresholds and prescription fulfillment.</li>
              <li><strong>Secure Access:</strong> Role-based access control (RBAC) protecting sensitive patient data via JWT and encrypted MySQL transactions.</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-mono text-brand-300">
            Tech Stack: React, React Router, Express, Node.js, MySQL, Postman, JWT, CSS Modules
          </div>
        </div>
      `
    },
    skincare: {
      title: "Skin Care Recommendation System",
      badge: "AI & Ingredient Analytics",
      tech: "React.js · Python (Flask) · JavaScript Fetch API · Recommendation Engine",
      description: `
        <div class="space-y-4">
          <p class="text-slate-200">
            An intelligent recommendation web platform that bridges dermatological logic with modern web interfaces to deliver personalized skincare solutions.
          </p>
          <div class="space-y-2">
            <h4 class="font-bold text-white text-sm">System Workflow:</h4>
            <ul class="list-disc list-inside space-y-1.5 text-xs text-slate-300">
              <li><strong>Diagnostic Intake:</strong> Interactive questionnaire capturing skin classification (oily, dry, sensitive, combination) and active issues (acne, hyperpigmentation, barrier repair).</li>
              <li><strong>Algorithmic Engine:</strong> Flask backend analyzes active ingredient compatibilities (e.g. Niacinamide, Hyaluronic Acid, Salicylic Acid) while filtering out contraindications.</li>
              <li><strong>Dynamic Presentation:</strong> React.js delivers instant personalized routine recommendations with step-by-step application guidelines (AM/PM).</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-mono text-purple-300">
            Tech Stack: React, Python, Flask, REST API, JSON Datasets, Fetch API
          </div>
        </div>
      `
    },
    attendance: {
      title: "Student Attendance & Academic Performance Dataset Analysis",
      badge: "Data Science & Predictive EDA",
      tech: "Python · Pandas · NumPy · Kaggle Datasets · Statistical Correlation",
      description: `
        <div class="space-y-4">
          <p class="text-slate-200">
            An exploratory data analysis and statistical investigation into the direct relationship between student attendance consistency and exam performance metrics.
          </p>
          <div class="space-y-2">
            <h4 class="font-bold text-white text-sm">Key Insights &amp; Findings:</h4>
            <ul class="list-disc list-inside space-y-1.5 text-xs text-slate-300">
              <li><strong>Data Wrangling:</strong> Cleaned, normalized, and processed thousands of historical academic records using Pandas.</li>
              <li><strong>Correlation Matrices:</strong> Identified non-linear thresholds where attendance drops below 75% precipitated a 35% decline in test score trajectories.</li>
              <li><strong>Predictive Signals:</strong> Built feature indicators allowing academic mentors to trigger early interventions before final examination cycles.</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-mono text-cyan-300">
            Tech Stack: Python, Pandas, NumPy, Jupyter Notebooks, Kaggle Datasets
          </div>
        </div>
      `
    },
    coursereg: {
      title: "Student Course Registration System",
      badge: "Database Systems & JDBC Architecture",
      tech: "Java · JDBC · MySQL · Relational Modeling & ER Diagrams",
      description: `
        <div class="space-y-4">
          <p class="text-slate-200">
            A high-integrity course enrollment backend built to handle student registration, prerequisites, and seat allocation without concurrency conflicts.
          </p>
          <div class="space-y-2">
            <h4 class="font-bold text-white text-sm">Database &amp; Application Highlights:</h4>
            <ul class="list-disc list-inside space-y-1.5 text-xs text-slate-300">
              <li><strong>Relational Integrity:</strong> Designed 3NF normalized ER schemas separating students, faculty, course catalogs, and registration transactions.</li>
              <li><strong>Duplicate Prevention:</strong> Robust SQL constraints and application-level JDBC validations ensuring no duplicate course entries or conflicting time slots.</li>
              <li><strong>ACID Transactions:</strong> Implemented commit/rollback mechanisms in JDBC to preserve data consistency during peak enrollment periods.</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-mono text-amber-300">
            Tech Stack: Java, JDBC, MySQL, PreparedStatements, Relational ER Modeling
          </div>
        </div>
      `
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalBody = document.getElementById('modal-project-body');
  const closeProjBtn = document.getElementById('close-project-modal-btn');
  const closeProjFooterBtn = document.getElementById('close-project-modal-footer-btn');

  document.querySelectorAll('.project-detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projKey = btn.getAttribute('data-project');
      const details = projectDetails[projKey];
      if (details) {
        modalTitle.textContent = details.title;
        modalBody.innerHTML = details.description;
        projectModal.classList.remove('hidden');
        projectModal.classList.add('flex');
        if (window.lucide) lucide.createIcons();
      }
    });
  });

  const closeProjectModal = () => {
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
  };

  if (closeProjBtn) closeProjBtn.addEventListener('click', closeProjectModal);
  if (closeProjFooterBtn) closeProjFooterBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }


  // 7. PRIORITY-SORTED CERTIFICATE GALLERY & SOFT COPY VIEWER
  const certificateRecords = window.portfolioCertificates;
  const certGrid = document.getElementById('certs-grid');
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certModal = document.getElementById('cert-modal');
  const modalCertTitle = document.getElementById('modal-cert-title');
  const modalCertIssuer = document.getElementById('modal-cert-issuer');
  const modalCertBody = document.getElementById('modal-cert-body');
  const closeCertBtn = document.getElementById('close-cert-modal-btn');
  const closeCertFooterBtn = document.getElementById('close-cert-modal-footer-btn');
  const certCount = document.getElementById('cert-count');

  if (!Array.isArray(certificateRecords) || !certGrid || !certModal || !modalCertBody) {
    throw new Error('Certificate data or required certificate gallery elements are missing.');
  }

  const certificates = [...certificateRecords].sort((a, b) => a.priority - b.priority);
  if (certCount) certCount.textContent = String(certificates.length);

  const createCertElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const createCertificateCard = (cert) => {
    const article = createCertElement('article', 'cert-card group overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700/70 hover:border-brand-500/60 shadow-lg transition-all duration-300');
    article.dataset.category = cert.category;

    const button = createCertElement('button', 'w-full h-full p-4 text-left flex flex-col gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-2xl');
    button.type = 'button';
    button.setAttribute('aria-label', `View certificate: ${cert.title}`);

    const image = createCertElement('img', 'w-full h-48 object-contain rounded-xl bg-slate-950/70');
    image.src = cert.previewImg;
    image.alt = `${cert.title} certificate preview`;
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      image.replaceWith(createCertElement('div', 'w-full h-48 rounded-xl bg-slate-900 flex items-center justify-center text-sm text-rose-300', 'Certificate preview could not be loaded.'));
    }, { once: true });

    const details = createCertElement('div', 'flex flex-col gap-2 flex-1');
    const badges = createCertElement('div', 'flex items-center justify-between gap-2');
    badges.append(
      createCertElement('span', 'text-[11px] font-mono uppercase tracking-wider text-brand-300 font-semibold px-2 py-1 rounded bg-brand-950/60 border border-brand-800/50', `Priority ${String(cert.priority).padStart(2, '0')}`),
      createCertElement('span', `text-[11px] font-mono font-semibold px-2 py-1 rounded border ${cert.badgeColor}`, cert.issuerBadge)
    );

    details.append(
      badges,
      createCertElement('h3', 'font-bold text-white text-base leading-snug group-hover:text-brand-300 transition-colors', cert.title),
      createCertElement('p', 'text-xs text-slate-400 leading-relaxed', cert.subtitle),
      createCertElement('p', 'text-xs text-slate-300 leading-relaxed', cert.description)
    );

    const footer = createCertElement('div', 'pt-3 border-t border-slate-700/70 flex items-center justify-between gap-2 text-xs text-slate-400');
    footer.append(
      createCertElement('span', 'truncate', cert.categoryLabel),
      createCertElement('span', 'shrink-0 text-brand-300 font-semibold flex items-center gap-1', 'View soft copy →')
    );

    button.append(image, details, footer);
    button.addEventListener('click', () => openCertificate(cert, button));
    article.append(button);
    return article;
  };

  certGrid.replaceChildren(...certificates.map(createCertificateCard));

  const filterCertificates = (filter) => {
    const selectedCategories = filter.split(/\s+/).filter(Boolean);
    certGrid.querySelectorAll('.cert-card').forEach((card) => {
      const categories = (card.dataset.category || '').split(/\s+/);
      card.hidden = filter !== 'all' && !selectedCategories.some((category) => categories.includes(category));
    });
  };

  certFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/30', 'active');
        filterBtn.classList.add('bg-slate-800', 'text-slate-300');
        filterBtn.setAttribute('aria-pressed', 'false');
      });

      btn.classList.add('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/30', 'active');
      btn.classList.remove('bg-slate-800', 'text-slate-300');
      btn.setAttribute('aria-pressed', 'true');
      filterCertificates(btn.dataset.filter || 'all');
    });
  });

  let lastCertificateTrigger = null;

  function openCertificate(cert, trigger) {
    lastCertificateTrigger = trigger;
    modalCertTitle.textContent = cert.title;
    modalCertIssuer.textContent = `${cert.issuer} · ${cert.date}`;
    modalCertBody.replaceChildren();

    const preview = createCertElement('img', 'w-full max-h-[60vh] object-contain rounded-xl bg-slate-950/70');
    preview.src = cert.previewImg;
    preview.alt = `${cert.title} certificate`;
    preview.addEventListener('error', () => {
      preview.replaceWith(createCertElement('p', 'text-sm text-rose-300', 'Certificate image preview could not be loaded. Use the soft-copy link below.'));
    }, { once: true });

    const previewPanel = createCertElement('div', 'rounded-2xl border border-slate-700 bg-slate-950/40 p-3');
    previewPanel.append(createCertElement('h4', 'text-sm font-semibold text-white mb-3', 'Certificate image'), preview);

    const softCopyPanel = createCertElement('div', 'rounded-2xl border border-slate-700 bg-slate-950/40 p-3');
    softCopyPanel.append(createCertElement('h4', 'text-sm font-semibold text-white mb-3', 'Original soft copy'));
    if (/\.pdf$/i.test(cert.softCopy)) {
      const documentFrame = createCertElement('iframe', 'w-full h-[65vh] min-h-[420px] rounded-lg bg-white');
      documentFrame.src = cert.softCopy;
      documentFrame.title = `${cert.title} soft copy`;
      softCopyPanel.append(documentFrame);
    } else {
      const softCopyImage = createCertElement('img', 'w-full max-h-[65vh] object-contain rounded-lg bg-slate-950/70');
      softCopyImage.src = cert.softCopy;
      softCopyImage.alt = `${cert.title} soft copy`;
      softCopyPanel.append(softCopyImage);
    }

    const documentLink = createCertElement('a', 'inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition');
    documentLink.href = cert.softCopy;
    documentLink.target = '_blank';
    documentLink.rel = 'noopener noreferrer';
    documentLink.textContent = 'Open soft copy in a new tab';
    softCopyPanel.append(documentLink);

    const information = createCertElement('div', 'rounded-2xl border border-slate-700 bg-slate-800/70 p-5 space-y-3');
    information.append(createCertElement('p', 'text-sm text-slate-300 leading-relaxed', cert.description));
    if (cert.skills.length) {
      const skills = createCertElement('div', 'flex flex-wrap gap-2');
      cert.skills.forEach((skill) => skills.append(createCertElement('span', 'px-2.5 py-1 rounded-lg bg-slate-900 text-xs text-brand-300 border border-slate-700', skill)));
      information.append(skills);
    }
    if (cert.credentialId) {
      information.append(createCertElement('p', 'text-xs font-mono text-slate-400', `Credential ID: ${cert.credentialId}`));
    }
    if (cert.verifyUrl) {
      const verifyLink = createCertElement('a', 'text-sm font-semibold text-brand-300 hover:text-brand-200 underline underline-offset-4', 'Verify this certificate');
      verifyLink.href = cert.verifyUrl;
      verifyLink.target = '_blank';
      verifyLink.rel = 'noopener noreferrer';
      information.append(verifyLink);
    }

    modalCertBody.append(previewPanel, softCopyPanel, information);
    certModal.classList.remove('hidden');
    certModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    closeCertBtn.focus();
    if (window.lucide) lucide.createIcons();
  }

  const closeCertModal = () => {
    certModal.classList.add('hidden');
    certModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    if (lastCertificateTrigger) lastCertificateTrigger.focus();
  };

  if (closeCertBtn) closeCertBtn.addEventListener('click', closeCertModal);
  if (closeCertFooterBtn) closeCertFooterBtn.addEventListener('click', closeCertModal);
  certModal.addEventListener('click', (event) => {
    if (event.target === certModal) closeCertModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !certModal.classList.contains('hidden')) closeCertModal();
  });

  if (window.lucide) lucide.createIcons();
  // 8. RESUME MODAL & PRINT HANDLER
  const resumeModal = document.getElementById('resume-modal');
  const resumeBtns = [
    document.getElementById('resume-modal-btn'),
    document.getElementById('hero-resume-btn'),
    document.getElementById('mobile-resume-btn')
  ].filter(Boolean);

  const closeResumeBtn = document.getElementById('close-modal-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');

  resumeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      resumeModal.classList.remove('hidden');
      resumeModal.classList.add('flex');
    });
  });

  const closeResume = () => {
    resumeModal.classList.add('hidden');
    resumeModal.classList.remove('flex');
  };

  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }


  // 9. MOBILE NAVIGATION MENU
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }


  // 10. CONTACT FORM SUBMISSION
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value || 'Portfolio Inquiry';
      const message = document.getElementById('message').value;

      // Construct mailto URL to launch default mail client
      const mailtoUrl = `mailto:kroshini106@gmail.com?subject=${encodeURIComponent(subject + " - from " + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\n" + message)}`;
      
      window.open(mailtoUrl, '_blank');

      if (formStatus) {
        formStatus.textContent = '✓ Opening your email client to send message to kroshini106@gmail.com...';
        formStatus.classList.remove('hidden');
        setTimeout(() => {
          contactForm.reset();
        }, 1500);
      }
    });
  }


  // 11. SCROLL SPY ACTIVE LINK HIGHLIGHTER
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-white', 'bg-slate-700/60');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-white', 'bg-slate-700/60');
          }
        });
      }
    });
  });

};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolio, { once: true });
} else {
  initializePortfolio();
}
