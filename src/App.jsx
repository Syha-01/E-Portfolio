import { useState, useEffect, useRef } from 'react'
import profileImage from './assets/profile.png'
import swotImage from './assets/SWOT.svg'
import './App.css'

// Premium SVG Icons
const Icons = {
  chevronDown: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6L8 10L12 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chevronRight: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 4L10 8L6 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  grid: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  clipboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8" y="2" width="8" height="4" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  book: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  bookmark: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  presentation: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 21l4-4 4 4M12 17v-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  user: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  alert: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8v4M12 16h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  award: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  fileText: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6M12 18v-6M9 15h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

// Define all sections with their children
const sections = [
  {
    id: 'introduction',
    name: 'Introduction',
    icon: Icons.home,
    children: [
      { id: 'swot', name: 'SWOT', icon: Icons.grid },
      { id: 'grade-feedback', name: 'Grade Feedback', icon: Icons.chart },
      { id: 'course-outline', name: 'Course Outline', icon: Icons.clipboard },
      { id: 'grade-attendance', name: 'Grade and Attendance Sheet', icon: Icons.calendar },
      { id: 'bhh-journals', name: 'BHH Weekly Journals', icon: Icons.book },
      { id: 'bookmarkers', name: 'Bookmarkers', icon: Icons.bookmark },
    ],
  },
  {
    id: 'presentation-1',
    name: 'Presentation 1',
    icon: Icons.presentation,
    children: [
      { id: 'pres1-slides', name: 'Slides', icon: Icons.fileText },
      { id: 'pres1-notes', name: 'Notes', icon: Icons.book },
    ],
  },
  {
    id: 'resume',
    name: 'Resume',
    icon: Icons.user,
    children: [
      { id: 'resume-draft', name: 'Draft', icon: Icons.fileText },
      { id: 'resume-final', name: 'Final Version', icon: Icons.award },
    ],
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter',
    icon: Icons.mail,
    children: [
      { id: 'cover-draft', name: 'Draft', icon: Icons.fileText },
      { id: 'cover-final', name: 'Final Version', icon: Icons.award },
    ],
  },
  {
    id: 'letter-of-complaint',
    name: 'Letter of Complaint',
    icon: Icons.alert,
    children: [
      { id: 'complaint-draft', name: 'Draft', icon: Icons.fileText },
      { id: 'complaint-final', name: 'Final Version', icon: Icons.award },
    ],
  },
  {
    id: 'presentation-2',
    name: 'Presentation 2',
    icon: Icons.presentation,
    children: [
      { id: 'pres2-slides', name: 'Slides', icon: Icons.fileText },
      { id: 'pres2-notes', name: 'Notes', icon: Icons.book },
    ],
  },
  {
    id: 'final-exams',
    name: 'Final Exams',
    icon: Icons.award,
    children: [
      { id: 'exam-prep', name: 'Preparation', icon: Icons.clipboard },
      { id: 'exam-results', name: 'Results', icon: Icons.chart },
    ],
  },
  {
    id: 'end-of-semester',
    name: 'End of Semester Journal',
    icon: Icons.fileText,
    children: [
      { id: 'journal-entries', name: 'Journal Entries', icon: Icons.book },
      { id: 'journal-reflection', name: 'Reflection', icon: Icons.bookmark },
    ],
  },
]

function App() {
  // Track which sections are expanded - Introduction open by default
  const [expandedSections, setExpandedSections] = useState(['introduction'])

  // Track which parent section page is active
  const [activeSection, setActiveSection] = useState('introduction')

  // Track which subsection is currently in view (for highlighting in sidebar)
  const [activeSubsection, setActiveSubsection] = useState(null)

  // Ref for main content scroll container
  const mainContentRef = useRef(null)
  const observerRef = useRef(null)

  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const navigateToSection = (sectionId) => {
    setActiveSection(sectionId)
    setActiveSubsection(null)
    // Ensure section is expanded
    if (!expandedSections.includes(sectionId)) {
      setExpandedSections(prev => [...prev, sectionId])
    }
    // Scroll to top of main content
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0)
    }
  }

  const scrollToSubsection = (subsectionId, sectionId) => {
    // Make sure we're on the right section page
    if (activeSection !== sectionId) {
      setActiveSection(sectionId)
      if (!expandedSections.includes(sectionId)) {
        setExpandedSections(prev => [...prev, sectionId])
      }
      // Wait for render then scroll
      setTimeout(() => {
        document.getElementById(subsectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(subsectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Get current section data
  const currentSection = sections.find(s => s.id === activeSection)

  // Intersection observer to track which subsection is in view
  useEffect(() => {
    if (!currentSection) return

    // Small delay to ensure elements are rendered
    const timeoutId = setTimeout(() => {
      const observerOptions = {
        root: null, // Use viewport
        rootMargin: '-40% 0px -40% 0px', // Trigger when element is in middle 20% of viewport
        threshold: 0
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'section-top') {
              setActiveSubsection(null)
            } else {
              setActiveSubsection(entry.target.id)
            }
          }
        })
      }, observerOptions)

      observerRef.current = observer

      currentSection.children.forEach((child) => {
        const element = document.getElementById(child.id)
        if (element) observer.observe(element)
      })

      const topSection = document.getElementById('section-top')
      if (topSection) observer.observe(topSection)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
    }
  }, [activeSection])

  return (
    <div className="app">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">ENGL3155 - OS1</div>
          <div className="sidebar-subtitle">Enrisen Tzib</div>
        </div>

        <nav className="sidebar-nav">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.id)
            const isActive = activeSection === section.id

            return (
              <div
                key={section.id}
                className={`nav-section ${isActive ? 'active' : ''}`}
              >
                <button
                  className={`nav-parent ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    toggleSection(section.id)
                    navigateToSection(section.id)
                  }}
                >
                  <span className="nav-parent-icon">
                    {section.icon}
                  </span>
                  <span className="nav-parent-text">{section.name}</span>
                  <span className={`nav-parent-chevron ${isExpanded ? 'expanded' : ''}`}>
                    {Icons.chevronRight}
                  </span>
                </button>

                <div className={`nav-children ${isExpanded ? 'expanded' : ''}`}>
                  {section.children.map((child) => (
                    <button
                      key={child.id}
                      className={`nav-item ${activeSubsection === child.id ? 'active' : ''}`}
                      onClick={() => scrollToSubsection(child.id, section.id)}
                    >
                      <span className="nav-item-icon">{child.icon}</span>
                      <span>{child.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-text">Technical Writing</div>
          <div className="sidebar-footer-year">2024</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" ref={mainContentRef}>
        {activeSection === 'introduction' ? (
          /* Introduction has special hero header */
          <>
            <section className="hero" id="section-top">
              <div className="hero-content">
                <div className="profile-container">
                  <div className="profile-image-wrapper">
                    <img
                      src={profileImage}
                      alt="Enrisen Tzib"
                      className="profile-image"
                    />
                  </div>
                </div>

                <h1 className="hero-name">Enrisen Tzib</h1>
                <p className="hero-title">Technical Writing Portfolio</p>

                <div className="quote-container">
                  <p className="quote-text">
                    I have not failed. I've just found 10,000 ways that won't work.
                  </p>
                  <p className="quote-author">— Thomas Edison</p>
                </div>
              </div>

              <div className="scroll-indicator">
                <div className="scroll-indicator-icon"></div>
                <span>Scroll</span>
              </div>
            </section>

            {/* Introduction subsections */}
            {currentSection.children.map((child) => (
              <section key={child.id} id={child.id} className="subsection">
                <div className="subsection-content">
                  <div className="subsection-icon">{child.icon}</div>
                  <h2 className="subsection-title">{child.name}</h2>
                  {child.id === 'swot' ? (
                    <div className="swot-container">
                      <img src={swotImage} alt="SWOT Analysis" className="swot-image" />
                    </div>
                  ) : (
                    <div className="subsection-placeholder">
                      Content coming soon...
                    </div>
                  )}
                </div>
              </section>
            ))}
          </>
        ) : (
          /* Other sections with header + subsections */
          <>
            <section className="section-header" id="section-top">
              <div className="section-header-content">
                <div className="section-header-icon">{currentSection?.icon}</div>
                <h1 className="section-header-title">{currentSection?.name}</h1>
              </div>
            </section>

            {/* Subsections */}
            {currentSection?.children.map((child) => (
              <section key={child.id} id={child.id} className="subsection">
                <div className="subsection-content">
                  <div className="subsection-icon">{child.icon}</div>
                  <h2 className="subsection-title">{child.name}</h2>
                  <div className="subsection-placeholder">
                    Content coming soon...
                  </div>
                </div>
              </section>
            ))}
          </>
        )}
      </main>
    </div>
  )
}

export default App
