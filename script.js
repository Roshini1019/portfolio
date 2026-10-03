/**
 * Roshini Kasireddi Portfolio - Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  
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


  // 5. PROJECT DETAILS MODAL & DATA
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


  // 6. RESUME MODAL & PRINT HANDLER
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


  // 7. MOBILE NAVIGATION MENU
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


  // 8. CONTACT FORM SUBMISSION
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


  // 9. SCROLL SPY ACTIVE LINK HIGHLIGHTER
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

});
