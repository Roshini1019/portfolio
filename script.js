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


  // 5. CERTIFICATE FILTERING SYSTEM
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => {
        b.classList.remove('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/30', 'active');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });

      btn.classList.add('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-600/30', 'active');
      btn.classList.remove('bg-slate-800', 'text-slate-300');

      const filter = btn.getAttribute('data-filter');

      certCards.forEach(card => {
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


  // 7. CERTIFICATE SOFT COPY PREVIEW MODAL & DATA
  const certificateData = {
    'google-da': {
      title: "Google Data Analytics Professional Certificate",
      issuer: "Google Career Certificates",
      badgeColor: "border-blue-500 bg-blue-950/40 text-blue-400",
      skills: ["Data Cleaning", "SQL Queries", "R Programming", "Data Visualizations", "Tableau", "Decision Dashboards"],
      overview: "Comprehensive 8-course professional credential validated by Google covering data ecosystems, data wrangling, spreadsheet analysis, SQL transformations, R programming, and data presentation.",
      fileSlot: "assets/certificates/google_data_analytics.pdf"
    },
    'msft-aiml': {
      title: "Microsoft AI & ML Engineering Professional Certificate",
      issuer: "Microsoft",
      badgeColor: "border-cyan-500 bg-cyan-950/40 text-cyan-400",
      skills: ["Machine Learning Pipelines", "AI Workloads", "Model Evaluation", "Cognitive Services", "Azure AI Solutions"],
      overview: "Professional specialization validating mastery in implementing machine learning models, computer vision, natural language processing, and scalable cognitive AI pipelines.",
      fileSlot: "assets/certificates/microsoft_ai_ml.pdf"
    },
    'infosys-dbms': {
      title: "Database Management Systems (DBMS) Certification",
      issuer: "Infosys Springboard",
      badgeColor: "border-purple-500 bg-purple-950/40 text-purple-400",
      skills: ["Relational Algebra", "SQL Queries", "Normalization (1NF-3NF)", "ER Modeling", "Transaction ACID"],
      overview: "Industry-aligned DBMS certification from Infosys demonstrating excellence in database architecture, normalized schema design, complex multi-table joins, and query optimization.",
      fileSlot: "assets/certificates/infosys_dbms.pdf"
    },
    'infosys-python': {
      title: "Programming Fundamentals with Python & OOP",
      issuer: "Infosys Springboard",
      badgeColor: "border-amber-500 bg-amber-950/40 text-amber-400",
      skills: ["Python 3", "Object-Oriented Programming", "Data Structures", "Algorithms", "Modular Code Design"],
      overview: "Rigorous certification covering core programming fundamentals, object-oriented concepts, algorithms, exception handling, and real-world Python problem solving.",
      fileSlot: "assets/certificates/infosys_python.pdf"
    },
    'coursera-quantum': {
      title: "Mathematical Foundations and Quantum Mechanics Essentials",
      issuer: "Coursera",
      badgeColor: "border-indigo-500 bg-indigo-950/40 text-indigo-400",
      skills: ["Linear Algebra", "Vector Spaces", "Probability Matrices", "Complex Numbers", "Quantum Operators"],
      overview: "Rigorous mathematical curriculum establishing algebraic, statistical, and quantum physical principles underlying high-level computation.",
      fileSlot: "assets/certificates/coursera_quantum_math.pdf"
    },
    'coursera-excel-basics': {
      title: "Excel Basics for Data Analysis",
      issuer: "Coursera",
      badgeColor: "border-emerald-500 bg-emerald-950/40 text-emerald-400",
      skills: ["Spreadsheet Navigation", "Data Cleaning", "Sorting & Filtering", "Basic Aggregations", "Table Formatting"],
      overview: "Foundational training in data preparation, spreadsheet manipulation, formula calculation, and statistical table preparation for business analytics.",
      fileSlot: "assets/certificates/coursera_excel_basics.pdf"
    },
    'coursera-excel-essentials': {
      title: "Excel Essentials for Data Analysis",
      issuer: "Coursera",
      badgeColor: "border-teal-500 bg-teal-950/40 text-teal-400",
      skills: ["Pivot Tables", "VLOOKUP & XLOOKUP", "Logical Formulas", "Data Validation", "Statistical Charts"],
      overview: "Advanced spreadsheet modeling covering nested functions, dynamic lookups, automated reporting dashboards, and visual metric representation.",
      fileSlot: "assets/certificates/coursera_excel_essentials.pdf"
    },
    'coursera-agile': {
      title: "Agile Software Engineering",
      issuer: "Coursera",
      badgeColor: "border-amber-500 bg-amber-950/40 text-amber-400",
      skills: ["Scrum Methodology", "Sprint Ceremonies", "User Stories", "CI/CD Foundations", "Test-Driven Dev"],
      overview: "Modern software development lifecycles, agile team practices, sprint backlog management, and continuous integration paradigms.",
      fileSlot: "assets/certificates/coursera_agile.pdf"
    },
    'coursera-dbms': {
      title: "Database Management Systems (DBMS)",
      issuer: "Coursera",
      badgeColor: "border-blue-500 bg-blue-950/40 text-blue-400",
      skills: ["DDL & DML SQL", "Relational Constraints", "Database Indexing", "Concurrency Control", "Schema Security"],
      overview: "Comprehensive study in enterprise database system design, transactional integrity, relational schemas, and constraint management.",
      fileSlot: "assets/certificates/coursera_dbms.pdf"
    },
    'coursera-ds-fundamentals': {
      title: "Fundamentals of Data Science",
      issuer: "Coursera",
      badgeColor: "border-purple-500 bg-purple-950/40 text-purple-400",
      skills: ["Exploratory Data Analysis", "Statistical Inference", "Predictive Modeling", "Feature Selection", "Model Metrics"],
      overview: "Core principles of the data science workflow from problem formulation and feature engineering to statistical hypothesis testing and performance evaluation.",
      fileSlot: "assets/certificates/coursera_data_science_fundamentals.pdf"
    }
  };

  const certModal = document.getElementById('cert-modal');
  const modalCertTitle = document.getElementById('modal-cert-title');
  const modalCertIssuer = document.getElementById('modal-cert-issuer');
  const modalCertBody = document.getElementById('modal-cert-body');
  const closeCertBtn = document.getElementById('close-cert-modal-btn');
  const closeCertFooterBtn = document.getElementById('close-cert-modal-footer-btn');

  document.querySelectorAll('.cert-preview-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const certKey = btn.getAttribute('data-cert');
      const cert = certificateData[certKey];
      if (cert) {
        modalCertTitle.textContent = cert.title;
        modalCertIssuer.textContent = `Issuer: ${cert.issuer} · Verified Credential`;

        const skillsPills = cert.skills.map(s => 
          `<span class="px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-brand-300 border border-slate-700 font-mono">${s}</span>`
        ).join('');

        modalCertBody.innerHTML = `
          <!-- Digital Verified Certificate Card -->
          <div class="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-6 sm:p-8 border-2 border-slate-700 shadow-2xl text-center space-y-6">
            
            <!-- Watermark / Background Badge -->
            <div class="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <i data-lucide="award" class="w-64 h-64"></i>
            </div>

            <div class="flex items-center justify-between border-b border-slate-800 pb-4">
              <span class="text-xs font-mono px-3 py-1 rounded-full ${cert.badgeColor} border font-semibold">
                ${cert.issuer}
              </span>
              <span class="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <i data-lucide="shield-check" class="w-4 h-4"></i> ID: RK-${certKey.toUpperCase()}-VERIFIED
              </span>
            </div>

            <div class="space-y-2">
              <p class="text-xs font-mono uppercase tracking-widest text-slate-400">This certifies that</p>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">ROSHINI KASIREDDI</h2>
              <p class="text-xs text-slate-300">has successfully demonstrated proficiency and completed all curriculum criteria for</p>
              <h3 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-brand-300 via-brand-accent to-brand-cyan bg-clip-text text-transparent mt-2">
                ${cert.title}
              </h3>
            </div>

            <div class="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-left space-y-2">
              <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider">Curriculum &amp; Competencies Validated:</h4>
              <p class="text-xs text-slate-300 leading-relaxed">${cert.overview}</p>
              <div class="flex flex-wrap gap-1.5 pt-2">
                ${skillsPills}
              </div>
            </div>

            <!-- Soft Copy File Link / Instruction Notice -->
            <div class="p-4 rounded-xl bg-brand-950/40 border border-brand-800/40 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span class="text-xs font-bold text-white block">Official Soft Copy File Path:</span>
                <span class="text-xs font-mono text-brand-300">${cert.fileSlot}</span>
              </div>
              <a href="${cert.fileSlot}" target="_blank" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shrink-0 flex items-center gap-1.5 transition">
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i> Open Full Document
              </a>
            </div>

          </div>
        `;

        certModal.classList.remove('hidden');
        certModal.classList.add('flex');
        if (window.lucide) lucide.createIcons();
      }
    });
  });

  const closeCertModal = () => {
    certModal.classList.add('hidden');
    certModal.classList.remove('flex');
  };

  if (closeCertBtn) closeCertBtn.addEventListener('click', closeCertModal);
  if (closeCertFooterBtn) closeCertFooterBtn.addEventListener('click', closeCertModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }


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

});
