'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, ExternalLink, Code2, Target, Briefcase, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: number;
  name: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  industry: string | null;
  services: string[];
  tags: string[];
  description: string;
  challenges: string | null;
  solutions: string | null;
  impact: string | null;
  imageColor: string;
  image: string | null;
  url: string | null;
}

export function Portfolio() {
  const [categories, setCategories] = useState<string[]>(['All']);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://backend.blueboxxda.com/api/portfolio');
        const data = await response.json();

        // Extract category names and prepend 'All'
        const fetchedCategories = ['All', ...data.categories.map((c: Category) => c.name)];
        setCategories(fetchedCategories);
        setProjects(data.projects);
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Initial Entry Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current?.children || [],
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter Animation
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 40, autoAlpha: 0, scale: 0.95 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)', overwrite: true }
      );
    }
  }, [activeCategory]);

  // Body scroll lock and ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-zinc-50 relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <h4 className="text-theme-gold font-bold tracking-[0.2em] uppercase text-xs mb-4">Our Work</h4>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-zinc-900 mb-6">
              Projects That Drive Real <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-blue to-theme-gold">Business Growth</span>
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed">
              We deliver scalable technology, AI automation, and innovative business solutions across multiple industries. Explore how we transform ideas into enterprise-grade realities.
            </p>
          </div>

          {/* Premium Filter Tabs */}
          <div className="flex flex-wrap gap-2 md:max-w-lg md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden ${activeCategory === cat
                    ? 'text-white shadow-[0_4px_15px_rgba(10,102,194,0.3)]'
                    : 'bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200'
                  }`}
              >
                {activeCategory === cat && (
                  <div className="absolute inset-0 bg-gradient-to-r from-theme-blue to-theme-gold -z-10" />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Premium Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 min-h-[500px]">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-zinc-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 cursor-pointer flex flex-col h-full transform hover:-translate-y-2"
            >
              {/* Image Preview with Hover Zoom & Glow */}
              <div className={`relative w-full aspect-[4/3] bg-gradient-to-br ${project.imageColor} overflow-hidden`}>
                {project.image ? (
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-500" />

                    {/* Simulated Mockup Graphic */}
                    <div className="absolute inset-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl transform group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out flex items-center justify-center overflow-hidden">
                      <span className="text-white/50 font-heading font-bold text-2xl tracking-wider group-hover:scale-110 transition-transform duration-700">PREVIEW</span>
                    </div>
                  </>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Tags mapping over image */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20">
                  <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-lg">
                    {project.category}
                  </span>
                </div>

                {/* Floating Arrow CTA */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white flex items-center justify-center text-theme-blue transform translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl z-20">
                  <ArrowUpRight size={24} />
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-8 flex flex-col flex-grow relative z-10 bg-white">
                <h3 className="text-2xl font-bold text-zinc-900 mb-3 group-hover:text-theme-blue transition-colors duration-300">{project.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{project.description}</p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-semibold rounded-lg bg-zinc-50 text-zinc-600 border border-zinc-100 group-hover:border-theme-gold/30 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 text-xs font-semibold rounded-lg bg-zinc-50 text-zinc-600 border border-zinc-100">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-12">
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-xl transition-opacity animate-in fade-in duration-300"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row animate-in zoom-in-95 duration-300">

            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 text-white lg:text-zinc-900 lg:bg-zinc-100 lg:hover:bg-zinc-200 flex items-center justify-center transition-colors backdrop-blur-md"
            >
              <X size={24} />
            </button>

            {/* Left Column: Hero Image (Sticky on Desktop) */}
            <div className={`w-full lg:w-2/5 h-64 lg:h-auto ${selectedProject.image ? 'bg-zinc-900' : 'bg-gradient-to-br ' + selectedProject.imageColor} relative flex-shrink-0 overflow-hidden`}>
              {selectedProject.image ? (
                <img src={selectedProject.image} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : (
                <div className="absolute inset-0 bg-black/20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:hidden" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end relative z-10">
                <span className="text-white/80 font-semibold tracking-wider uppercase text-sm mb-2">{selectedProject.industry}</span>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6 leading-tight">{selectedProject.title}</h2>
                {selectedProject.url && (
                  <a href={selectedProject.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-full font-bold text-sm w-max hover:bg-theme-gold hover:text-white transition-colors">
                    Visit Live Site <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Scrollable Content */}
            <div className="w-full lg:w-3/5 overflow-y-auto p-8 lg:p-12 custom-scrollbar">

              {/* Overview */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-3">
                  <Target className="text-theme-blue" /> Project Overview
                </h3>
                <p className="text-zinc-600 leading-relaxed text-lg">{selectedProject.description}</p>
              </div>

              {/* Challenges & Solutions */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="p-6 rounded-2xl bg-red-50 border border-red-100">
                  <h4 className="text-red-600 font-bold mb-3">The Challenge</h4>
                  <p className="text-red-900/70 text-sm leading-relaxed">{selectedProject.challenges}</p>
                </div>
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <h4 className="text-emerald-600 font-bold mb-3">Our Solution</h4>
                  <p className="text-emerald-900/70 text-sm leading-relaxed">{selectedProject.solutions}</p>
                </div>
              </div>

              {/* Business Impact */}
              <div className="mb-12 p-8 rounded-3xl bg-zinc-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-theme-gold/20 blur-[50px]" />
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ArrowUpRight className="text-theme-gold" /> Business Impact
                </h3>
                <p className="text-zinc-300 leading-relaxed relative z-10">{selectedProject.impact}</p>
              </div>

              {/* Services & Tech Stack */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                    <Briefcase size={20} className="text-zinc-400" /> Services Provided
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.services.map(service => (
                      <li key={service} className="flex items-center gap-3 text-zinc-600 text-sm font-medium">
                        <ChevronRight size={16} className="text-theme-gold" /> {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                    <Code2 size={20} className="text-zinc-400" /> Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 text-xs font-bold rounded-xl bg-zinc-100 text-zinc-700 border border-zinc-200 hover:border-theme-blue hover:text-theme-blue transition-colors cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
