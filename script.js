// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Navbar shadow on scroll
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(el => {
    observer.observe(el);
});

// Observe experience cards
document.querySelectorAll('.experience-card').forEach(el => {
    observer.observe(el);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(el => {
    observer.observe(el);
});

// Observe contact items
document.querySelectorAll('.contact-item, .contact-form').forEach(el => {
    observer.observe(el);
});

// ===================================
// PROJECT FILTERING
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('visible');
                }, 10);
            } else {
                card.classList.remove('visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===================================
// PROJECT MODALS
// ===================================
// ===================================
// EXPERIENCE DATA
// ===================================
const experienceData = {
    'kinetic': {
        title: 'Product Design Intern',
        company: 'Kinetic Engineering Limited',
        location: 'Pune, India',
        date: 'May 2024 - Jul 2024',
        project: 'Retractable Cable Reel — Reverse Engineering & Mechanism Optimization',
        images: [
            { src: 'assets/kinetic-final-design.png', caption: 'Final Optimized Design (Iteration 6)' },
            { src: 'assets/kinetic-reverse-engineering.png', caption: 'Reverse Engineered Existing Cable Reel' }
        ],
        details: [
            'Reverse engineered an existing retractable reel through teardown to understand spring tension, cam–follower locking, and cable routing architecture',
            'Reconstructed the complete assembly in PTC Creo Parametric, modelling spring geometry, cam profile, and missing internal components',
            'Iteratively developed Model 1 → Iteration 6, improving internal packaging and mechanism compactness while maintaining cable length and plug interface constraints',
            'Performed feasibility analysis evaluating tolerance interaction, locking stability, and cable retraction reliability',
            'Assessed PVC housing for insulation safety, impact resistance, weight, and manufacturability',
            'Achieved ~24% volume reduction, enabling improved packaging efficiency and faster prototyping through simulation-backed validation'
        ],
        technologies: ['PTC Creo Parametric', 'CAD Modeling', 'Reverse Engineering', 'Feasibility Analysis', 'Design Optimization']
    },
    'klassic': {
        title: 'Manufacturing & Quality Exposure Intern',
        company: 'Klassic Wheels',
        location: 'Ahmednagar, India',
        date: 'Jun 2023 - Jul 2023',
        project: null,
        images: [],
        details: [
            'Visited multiple manufacturing facilities including chemical processing (soap), food processing (baked goods), and wheel rim manufacturing to understand process workflows, plant operations, and production management practices',
            'Studied end-to-end shop floor integration at Klassic Wheels, observing paint shop operations, manufacturing and assembly lines, quality control testing, and logistics flow',
            'Analyzed how different production stages interact to maintain throughput, traceability, and manufacturing efficiency',
            'Gained exposure to quality control methodologies including material composition verification, dimensional inspection, and tensile/compression testing for structural validation',
            'Developed practical understanding of process standardization, inspection checkpoints, and manufacturing quality assurance in automotive components'
        ],
        technologies: ['Quality Control', 'Manufacturing Processes', 'Process Optimization', 'Production Management', 'Automotive Components']
    },
    'unbox': {
        title: 'Mechanical Design Intern',
        company: 'Unbox Robotics',
        location: 'Pune, India',
        date: 'Jun 2022 - Jul 2022',
        project: 'Robot Mobility Validation — Wheel–Floor Friction & Stability Testing',
        images: [
            { src: 'assets/unbox-friction-rig.png', caption: 'Simplified Friction Testing Rig (NDA-compliant version)' }
        ],
        details: [
            'Partnered with robotics and mechanical teams to investigate wheel slip failure modes impacting robot navigation, load handling, and motion control stability',
            'Applied tribology principles to study wheel–floor interaction across varying warehouse tile materials and robot loading conditions',
            'Designed and CAD-modelled a controlled friction testing rig incorporating adjustable load distribution and incline fixtures to replicate real robot acceleration, braking, and turning scenarios',
            'Executed validation testing and DOE-style experiments to measure coefficient of friction while ensuring repeatability, parameter consistency, and realistic operating conditions',
            'Analyzed results to define minimum friction thresholds supporting reliable robot traction, path-following accuracy, and package stability during autonomous movement',
            'Communicated findings through structured engineering reports and cross-functional reviews, influencing wheel selection and floor compatibility decisions',
            'Delivered a functional prototype test setup that strengthened robot mobility robustness, slip prevention, and system-level reliability in warehouse deployments'
        ],
        technologies: ['Tribology', 'CAD Modeling', 'Test Fixture Design', 'DOE Experiments', 'Friction Analysis', 'Engineering Reports']
    }
};

// ===================================
// PROJECT DATA
// ===================================
const projectData = {
    'trash-compactor': {
        title: 'Mini Trash Compactor',
        category: 'Design Process & Product Development',
        date: '2025',
        overview: 'The Mini Trash Compactor project involved designing a compact mechanical compression system capable of withstanding multi-directional loads while maintaining structural reliability and operational efficiency. Working in a team, we used advanced 3D modeling software and Finite Element Analysis (FEA) to evaluate the mechanism\'s performance under realistic load conditions. The goal was to simulate stress distributions, predict component failures, estimate fatigue cycles, and determine the torque and power required for effective compaction. The project concluded with a comprehensive engineering report that included performance predictions, cost estimations, and profitability analysis of the proposed product.',
        technologies: ['SolidWorks', 'FEA Analysis', 'CAD Modeling', 'Mechanical Calculations', 'Engineering Economics'],
        images: [
            { src: 'assets/trash-compactor-cad.png', caption: 'Full CAD Assembly Model' },
            { src: 'assets/trash-compactor-sketch.png', caption: 'Initial Design Sketch' },
            { src: 'assets/trash-compactor-fea1.png', caption: 'FEA Stress Analysis - Beam Component' },
            { src: 'assets/trash-compactor-fea2.png', caption: 'FEA Von Mises Stress Analysis - Plate' },
            { src: 'assets/trash-compactor-calculations.png', caption: 'Hand Calculations - Screw Analysis' }
        ],
        downloadableFiles: [
            { name: 'Component Design Report', file: 'assets/Component_Design_Report.pdf', description: 'Detailed analysis of static failure, buckling, and fatigue for frame, lead screws, and ram components' },
            { name: 'Connections Design Report', file: 'assets/Connections_Design_Report.pdf', description: 'Analysis of flange screws, end slot connections, T-slot fasteners, and corner brackets including preload, safety factors, and fatigue' },
            { name: 'Power Transmission Design Report', file: 'assets/Power_Transmission_Design_Report.pdf', description: 'Power screw torque calculations, thread efficiency, motor specifications, and chain drive system analysis' }
        ],
        designSteps: [
            'Concept Research & Mechanism Selection: Studied different real-world compaction principles to identify a mechanism suitable for small-scale use',
            '3D CAD Modelling: Modeled the compactor in SolidWorks, including linkages, load paths, and motion study simulations',
            'FEA Testing: Performed stress, displacement, and fatigue analyses to determine high-risk failure regions across multiple loading conditions',
            'Mechanical Calculations: Computed torque and power requirements for a motorized or manual-powered mechanism',
            'Failure Mode Analysis: Evaluated bending failure, fatigue failure, and buckling for individual components',
            'Create Evaluation Reports: Component analysis, connection analysis, power transmission analysis',
            'Economic Evaluation: Estimated manufacturing costs, operation expenses, and projected revenue to determine profitability',
            'Final Report: Documented all engineering findings, calculations, test results, and conclusions'
        ],
        challenges: [
            'Ensuring accurate FEA simulations under changing load directions',
            'Balancing material selection with manufacturability and durability',
            'Predicting fatigue cycles for complex load-bearing components',
            'Integrating motor torque constraints with compaction force requirements',
            'Communicating complex mechanical calculations in a clear, structured engineering report'
        ],
        results: [
            'Developed a structurally validated mechanism capable of withstanding multi-load scenarios',
            'Identified design weaknesses early and redesigned parts to improve durability',
            'Produced accurate torque and power consumption models to size the mechanism actuator',
            'Created a comprehensive cost–benefit analysis showing theoretical profit margins and operational feasibility',
            'Delivered a complete engineering report detailing the entire development cycle'
        ],
        skills: ['Advanced SolidWorks Modelling', 'Finite Element Analysis (Stress, Fatigue, Deformation)', 'Mechanical Power/Torque Calculations', 'Failure Mode Prediction', 'Engineering Economics', 'Technical Reporting and Documentation']
    },
    'sustainability-cities': {
        title: 'Sustainability in Cities',
        category: 'SDG & Interactive Design',
        date: '2024',
        overview: 'This multidisciplinary project required designing an educational game for middle-school students centered around one of the UN Sustainable Development Goals (SDGs). The goal was to encourage sustainability awareness through interactive STEM-based learning. The project spanned the entire semester and incorporated multiple engineering disciplines, including software programming, CAD design, digital fabrication, hardware development, and design communication. The final outcome was a fully functioning interactive game showcased at an exhibition, accompanied by a detailed technical report documenting the design process, user testing, constraints, and final implementation.',
        technologies: ['SolidWorks', 'AutoCAD', 'MATLAB', 'Arduino IDE', 'C++', 'Laser Cutting', '3D Printing', 'Electronics Integration'],
        images: [
            { src: 'assets/sustainability-exhibition.png', caption: 'Final Exhibition Display' },
            { src: 'assets/sustainability-build1.png', caption: 'Assembly and Construction Phase' },
            { src: 'assets/sustainability-build2.png', caption: 'Testing Interactive Components' },
            { src: 'assets/sustainability-build3.png', caption: 'Electronics and Wiring Integration' }
        ],
        designSteps: [
            'SDG Selection & Research: Chose a relevant SDG and researched its real-world implications for children ages 10–14',
            'Gameplay Development: Created educational yet entertaining game mechanics aligned with learning objectives',
            'CAD & Mechanical Design: Designed game structures, casings, and interactive components using AutoCAD and SolidWorks',
            'Electronics & Programming: Programmed interactions using MATLAB, C++, and Arduino IDE; Integrated sensors, LEDs, and microcontrollers for user feedback',
            'Fabrication: Laser cut plywood/acrylic components; 3D printed custom parts; Assembled and wired the full system',
            'Testing & Iteration: Conducted gameplay testing with sample users, documented issues, and iterated for improvements',
            'Final Exhibition: Demonstrated the working game publicly while presenting the engineering design journey',
            'Technical Report: Produced a full design portfolio documenting problem framing, concept exploration, experiments, and final results'
        ],
        challenges: [
            'Integrating hardware and software into one unified system',
            'Designing age-appropriate interactions while maintaining the educational goals of the SDG',
            'Maintaining consistent performance across multiple prototypes with different fabrication methods',
            'Adapting designs quickly based on user feedback while keeping full documentation up to date',
            'Synchronizing software logic with physical components and sensors'
        ],
        results: [
            'Created a fully functioning, interactive educational game that successfully communicated sustainability concepts',
            'Received positive feedback during the exhibition for creativity, technical execution, and educational value',
            'Produced a multi-technology prototype demonstrating engineering integration across software, electronics, and fabrication',
            'Completed a comprehensive technical report covering design rationale, iterations, system architecture, and learning outcomes'
        ],
        skills: ['MATLAB, C++, and Arduino IDE Programming', '3D CAD Modelling (AutoCAD, SolidWorks)', 'Laser Cutting & 3D Printing', 'Interactive Hardware Prototyping', 'User-Centered Design', 'Technical Writing and Design Documentation']
    },
    'nightlight-powerbank': {
        title: 'Nightlight Power Bank',
        category: 'Product Design & Development',
        date: '2023',
        overview: 'This client‑based project involved designing a durable power bank with an integrated night light for trekking use. The device needed to be frost‑resistant, compact, weather‑proof, and capable of providing gentle illumination inside a tent without consuming excessive power.',
        technologies: ['3D Modeling', 'CNC Machining', 'Laser Cutting', 'Product Design', 'CAD'],
        images: [
            { src: 'assets/powerbank-final.png', caption: 'Final Product Design' },
            { src: 'assets/powerbank-justification.png', caption: 'Design Justification Analysis' }
        ],
        designSteps: [
            'Conducted a client interview to understand usage patterns and environmental constraints',
            'Identified key design objectives: durability, frost resistance, light diffusion, portability',
            'Explored multiple design directions including form factor, battery size, and outer shell geometry',
            'Designed internal component layout to maximize efficiency and compactness',
            'Tested prototypes for weather resistance, light output, and usability'
        ],
        challenges: [
            'Ensuring frost‑resistant housing without increasing weight',
            'Choosing lighting components that produce soft illumination in enclosed spaces',
            'Balancing power capacity with portability for trekking conditions',
            'Designing for impact resistance and environmental wear'
        ],
        results: [
            'Successfully created a prototype optimized for camping use that is capable of withstanding cold and outdoor exposure',
            'Integrated high‑efficiency LEDs for gentle night illumination in tents',
            'Delivered a compact and lightweight product tailored to client needs'
        ],
        skills: ['Client-driven Product Development', 'Environmental and Durability-focused Engineering', 'Prototype Testing and Refinement', 'Systems Integration and Mechanical Design']
    }
};

function openProjectModal(projectId) {
    console.log('Opening modal for project:', projectId);
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectData[projectId];
    
    console.log('Project data:', project);
    console.log('Modal element:', modal);
    
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }
    
    // Build images section HTML if images exist
    let imagesHTML = '';
    if (project.images && project.images.length > 0) {
        imagesHTML = `
            <div class="modal-section">
                <h3>Project Images</h3>
                <div class="modal-images">
                    ${project.images.map(img => `
                        <div class="modal-image-item">
                            <img src="${img.src}" alt="${img.caption}">
                            <p class="image-caption">${img.caption}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Build downloadable files section if files exist
    let filesHTML = '';
    if (project.downloadableFiles && project.downloadableFiles.length > 0) {
        filesHTML = `
            <div class="modal-section">
                <h3>Downloadable Reports</h3>
                <div class="downloadable-files">
                    ${project.downloadableFiles.map(file => `
                        <div class="file-item">
                            <div class="file-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </div>
                            <div class="file-details">
                                <h4>${file.name}</h4>
                                <p>${file.description}</p>
                            </div>
                            <a href="${file.file}" class="file-download-btn" download>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                Download
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <span class="modal-category">${project.category}</span>
            <h2 class="modal-title">${project.title}</h2>
            <span class="modal-date">${project.date}</span>
        </div>
        
        <div class="modal-section">
            <h3>Project Summary</h3>
            <p>${project.overview}</p>
        </div>
        
        ${imagesHTML}
        
        ${filesHTML}
        
        <div class="modal-section">
            <h3>Technologies Used</h3>
            <div class="modal-tags">
                ${project.technologies.map(tech => `<span class="badge">${tech}</span>`).join('')}
            </div>
        </div>
        
        ${project.designSteps ? `
        <div class="modal-section">
            <h3>Design Steps</h3>
            <ul class="modal-list">
                ${project.designSteps.map(step => `<li>${step}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
        
        <div class="modal-section">
            <h3>Challenges Faced</h3>
            <ul class="modal-list">
                ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
            </ul>
        </div>
        
        ${project.process ? `
        <div class="modal-section">
            <h3>Process & Methodology</h3>
            <ul class="modal-list">
                ${project.process.map(step => `<li>${step}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
        
        <div class="modal-section">
            <h3>Results</h3>
            <ul class="modal-list">
                ${project.results.map(result => `<li>${result}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>Skills Developed</h3>
            <div class="modal-tags">
                ${project.skills.map(skill => `<span class="badge">${skill}</span>`).join('')}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// ===================================
// CONTACT FORM
// ===================================
const contactForm = document.querySelector('.contact-form');
/*
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset form
    contactForm.reset();
});
*/
// ===================================
// SMOOTH REVEAL ANIMATIONS
// ===================================
window.addEventListener('load', () => {
    // Trigger animations for elements in viewport on load
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to section (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Log page load for analytics (optional)
console.log('Portfolio loaded successfully! 🚀');
console.log('Built with ❤️ by Alvin Reji');

// ===================================
// EXPERIENCE MODAL
// ===================================
function openExperienceModal(experienceId) {
    console.log('Opening experience modal for:', experienceId);
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const experience = experienceData[experienceId];
    
    console.log('Experience data:', experience);
    
    if (!experience) {
        console.error('Experience not found:', experienceId);
        return;
    }
    
    // Build images section HTML if images exist
    let imagesHTML = '';
    if (experience.images && experience.images.length > 0) {
        imagesHTML = `
            <div class="modal-section">
                <h3>Project Images</h3>
                <div class="modal-images">
                    ${experience.images.map(img => `
                        <div class="modal-image-item">
                            <img src="${img.src}" alt="${img.caption}">
                            <p class="image-caption">${img.caption}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <span class="modal-category">${experience.company}</span>
            <h2 class="modal-title">${experience.title}</h2>
            <span class="modal-date">${experience.date} • ${experience.location}</span>
        </div>
        
        ${experience.project ? `
        <div class="modal-section">
            <h3>Project Focus</h3>
            <p><strong>${experience.project}</strong></p>
        </div>
        ` : ''}
        
        ${imagesHTML}
        
        <div class="modal-section">
            <h3>Key Responsibilities & Achievements</h3>
            <ul class="modal-list">
                ${experience.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        </div>
        
        ${experience.technologies ? `
        <div class="modal-section">
            <h3>Technologies & Skills</h3>
            <div class="modal-tags">
                ${experience.technologies.map(tech => `<span class="badge">${tech}</span>`).join('')}
            </div>
        </div>
        ` : ''}
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
