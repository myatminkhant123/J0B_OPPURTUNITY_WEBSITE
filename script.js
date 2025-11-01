// Sample job data
const jobsData = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'full-time',
        experience: 'senior',
        salary: '$120,000 - $160,000',
        remote: 'hybrid',
        description: 'We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building responsive web applications using modern JavaScript frameworks.',
        tags: ['React', 'TypeScript', 'CSS', 'JavaScript'],
        featured: true,
        postedDate: '2 days ago'
    },
    {
        id: 2,
        title: 'Product Manager',
        company: 'StartupXYZ',
        location: 'New York, NY',
        type: 'full-time',
        experience: 'mid',
        salary: '$100,000 - $130,000',
        remote: 'remote',
        description: 'Join our growing startup as a Product Manager. You will drive product strategy, work with cross-functional teams, and help shape the future of our platform.',
        tags: ['Product Strategy', 'Agile', 'Analytics', 'Leadership'],
        featured: false,
        postedDate: '1 day ago'
    },
    {
        id: 3,
        title: 'UX/UI Designer',
        company: 'Design Studio',
        location: 'Los Angeles, CA',
        type: 'contract',
        experience: 'mid',
        salary: '$70 - $90 per hour',
        remote: 'remote',
        description: 'We need a talented UX/UI Designer to create beautiful and intuitive user experiences. Experience with design systems and user research is preferred.',
        tags: ['Figma', 'Sketch', 'User Research', 'Prototyping'],
        featured: false,
        postedDate: '3 days ago'
    },
    {
        id: 4,
        title: 'Data Scientist',
        company: 'AI Solutions Ltd.',
        location: 'Boston, MA',
        type: 'full-time',
        experience: 'senior',
        salary: '$130,000 - $170,000',
        remote: 'hybrid',
        description: 'Looking for a Data Scientist to work on cutting-edge AI projects. You will analyze large datasets, build predictive models, and drive data-driven decisions.',
        tags: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
        featured: true,
        postedDate: '1 day ago'
    },
    {
        id: 5,
        title: 'Marketing Coordinator',
        company: 'Global Marketing Co.',
        location: 'Chicago, IL',
        type: 'full-time',
        experience: 'entry',
        salary: '$45,000 - $55,000',
        remote: 'onsite',
        description: 'Entry-level position for a Marketing Coordinator. You will support marketing campaigns, manage social media, and help with content creation.',
        tags: ['Social Media', 'Content Marketing', 'Analytics', 'Adobe Creative'],
        featured: false,
        postedDate: '4 days ago'
    },
    {
        id: 6,
        title: 'DevOps Engineer',
        company: 'CloudTech Systems',
        location: 'Seattle, WA',
        type: 'full-time',
        experience: 'senior',
        salary: '$140,000 - $180,000',
        remote: 'remote',
        description: 'Senior DevOps Engineer needed to manage cloud infrastructure and CI/CD pipelines. Experience with AWS, Docker, and Kubernetes required.',
        tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
        featured: false,
        postedDate: '2 days ago'
    },
    {
        id: 7,
        title: 'Junior Software Developer',
        company: 'CodeCraft LLC',
        location: 'Austin, TX',
        type: 'full-time',
        experience: 'entry',
        salary: '$60,000 - $75,000',
        remote: 'hybrid',
        description: 'Great opportunity for a Junior Software Developer to join our team. You will work on various projects using modern web technologies.',
        tags: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
        featured: false,
        postedDate: '5 days ago'
    },
    {
        id: 8,
        title: 'Sales Manager',
        company: 'SalesForce Pro',
        location: 'Miami, FL',
        type: 'full-time',
        experience: 'mid',
        salary: '$80,000 - $120,000 + Commission',
        remote: 'onsite',
        description: 'Experienced Sales Manager wanted to lead our sales team. You will develop sales strategies, manage client relationships, and drive revenue growth.',
        tags: ['Sales Strategy', 'CRM', 'Team Leadership', 'B2B Sales'],
        featured: true,
        postedDate: '1 day ago'
    }
];

let filteredJobs = [...jobsData];

// DOM elements
const searchForm = document.getElementById('searchForm');
const jobsList = document.getElementById('jobsList');
const allJobsList = document.getElementById('allJobsList');
const resultsCount = document.getElementById('resultsCount');
const jobsResultsCount = document.getElementById('jobsResultsCount');
const loading = document.getElementById('loading');
const jobsLoading = document.getElementById('jobsLoading');
const noResults = document.getElementById('noResults');
const jobsNoResults = document.getElementById('jobsNoResults');
const navLinks = document.querySelectorAll('.nav-link');
const sectionContents = document.querySelectorAll('.section-content');

// Filter elements
const jobTypeFilter = document.getElementById('jobType');
const experienceFilter = document.getElementById('experience');
const salaryFilter = document.getElementById('salary');
const remoteFilter = document.getElementById('remote');
const jobsJobTypeFilter = document.getElementById('jobs-jobType');
const jobsExperienceFilter = document.getElementById('jobs-experience');
const jobsSalaryFilter = document.getElementById('jobs-salary');
const jobsRemoteFilter = document.getElementById('jobs-remote');

// Initialize the page
function init() {
    renderJobs(filteredJobs, jobsList, resultsCount);
    renderJobs(jobsData, allJobsList, jobsResultsCount);
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    searchForm.addEventListener('submit', handleSearch);
    
    // Filter change listeners for home page
    jobTypeFilter.addEventListener('change', () => applyFilters(jobsList, resultsCount));
    experienceFilter.addEventListener('change', () => applyFilters(jobsList, resultsCount));
    salaryFilter.addEventListener('change', () => applyFilters(jobsList, resultsCount));
    remoteFilter.addEventListener('change', () => applyFilters(jobsList, resultsCount));
    
    // Filter change listeners for jobs page
    jobsJobTypeFilter.addEventListener('change', () => applyFilters(allJobsList, jobsResultsCount, true));
    jobsExperienceFilter.addEventListener('change', () => applyFilters(allJobsList, jobsResultsCount, true));
    jobsSalaryFilter.addEventListener('change', () => applyFilters(allJobsList, jobsResultsCount, true));
    jobsRemoteFilter.addEventListener('change', () => applyFilters(allJobsList, jobsResultsCount, true));
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // View jobs buttons
    const viewJobsButtons = document.querySelectorAll('.view-jobs-btn');
    viewJobsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('jobs');
        });
    });
}

// Show specific section
function showSection(section) {
    // Hide all sections
    sectionContents.forEach(content => {
        content.classList.add('section-hidden');
    });
    
    // Show selected section
    document.getElementById(section).classList.remove('section-hidden');
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Handle search form submission
function handleSearch(e) {
    e.preventDefault();
    showLoading(loading, jobsList, noResults);
    
    setTimeout(() => {
        const jobTitle = document.getElementById('jobTitle').value.toLowerCase();
        const location = document.getElementById('location').value.toLowerCase();
        const company = document.getElementById('company').value.toLowerCase();
        
        filteredJobs = jobsData.filter(job => {
            const titleMatch = !jobTitle || job.title.toLowerCase().includes(jobTitle);
            const locationMatch = !location || job.location.toLowerCase().includes(location);
            const companyMatch = !company || job.company.toLowerCase().includes(company);
            
            return titleMatch && locationMatch && companyMatch;
        });
        
        applyFilters(jobsList, resultsCount);
        hideLoading(loading);
    }, 1000);
}

// Apply filters
function applyFilters(jobsContainer, countElement, isJobsPage = false) {
    let jobType, experience, salary, remote;
    
    if (isJobsPage) {
        jobType = jobsJobTypeFilter.value;
        experience = jobsExperienceFilter.value;
        salary = jobsSalaryFilter.value;
        remote = jobsRemoteFilter.value;
    } else {
        jobType = jobTypeFilter.value;
        experience = experienceFilter.value;
        salary = salaryFilter.value;
        remote = remoteFilter.value;
    }
    
    let filtered = isJobsPage ? [...jobsData] : [...filteredJobs];
    
    if (jobType) {
        filtered = filtered.filter(job => job.type === jobType);
    }
    
    if (experience) {
        filtered = filtered.filter(job => job.experience === experience);
    }
    
    if (remote) {
        filtered = filtered.filter(job => job.remote === remote);
    }
    
    if (salary) {
        // Simple salary filtering logic
        filtered = filtered.filter(job => {
            const salaryText = job.salary.toLowerCase();
            switch (salary) {
                case '0-50k':
                    return salaryText.includes('45,000') || salaryText.includes('55,000');
                case '50k-100k':
                    return salaryText.includes('60,000') || salaryText.includes('75,000') || salaryText.includes('80,000');
                case '100k-150k':
                    return salaryText.includes('100,000') || salaryText.includes('120,000') || salaryText.includes('130,000');
                case '150k+':
                    return salaryText.includes('140,000') || salaryText.includes('160,000') || salaryText.includes('170,000') || salaryText.includes('180,000');
                default:
                    return true;
            }
        });
    }
    
    renderJobs(filtered, jobsContainer, countElement);
}

// Render jobs
function renderJobs(jobs, container, countElement) {
    if (jobs.length === 0) {
        container.style.display = 'none';
        const noResultsElement = container === jobsList ? noResults : jobsNoResults;
        noResultsElement.style.display = 'block';
        countElement.textContent = 'No jobs found';
        return;
    }
    
    container.style.display = 'block';
    const noResultsElement = container === jobsList ? noResults : jobsNoResults;
    noResultsElement.style.display = 'none';
    countElement.textContent = `Showing ${jobs.length} job${jobs.length !== 1 ? 's' : ''}`;
    
    container.innerHTML = jobs.map(job => `
        <div class="job-card ${job.featured ? 'featured' : ''}" onclick="viewJob(${job.id})">
            ${job.featured ? '<div class="featured-badge">Featured</div>' : ''}
            <div class="job-header">
                <div>
                    <div class="job-title">${job.title}</div>
                    <div class="job-company">${job.company}</div>
                </div>
                <div class="salary">${job.salary}</div>
            </div>
            <div class="job-meta">
                <span>📍 ${job.location}</span>
                <span>💼 ${job.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                <span>🎯 ${job.experience.replace(/\b\w/g, l => l.toUpperCase())} Level</span>
                <span>🏠 ${job.remote.replace(/\b\w/g, l => l.toUpperCase())}</span>
                <span>📅 ${job.postedDate}</span>
            </div>
            <div class="job-description">${job.description}</div>
            <div class="job-tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div style="margin-top: 1rem;">
                <button class="apply-btn" onclick="applyJob(event, ${job.id})">Apply Now</button>
            </div>
        </div>
    `).join('');
}

// Show loading state
function showLoading(loadingElement, jobsContainer, noResultsElement) {
    loadingElement.style.display = 'block';
    jobsContainer.style.display = 'none';
    noResultsElement.style.display = 'none';
}

// Hide loading state
function hideLoading(loadingElement) {
    loadingElement.style.display = 'none';
}

// View job details
function viewJob(jobId) {
    const job = jobsData.find(j => j.id === jobId);
    alert(`Viewing details for: ${job.title} at ${job.company}\n\nThis would typically open a detailed job page.`);
}

// Apply to job
function applyJob(event, jobId) {
    event.stopPropagation();
    const job = jobsData.find(j => j.id === jobId);
    alert(`Applying to: ${job.title} at ${job.company}\n\nThis would typically open an application form or redirect to the company's application page.`);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);