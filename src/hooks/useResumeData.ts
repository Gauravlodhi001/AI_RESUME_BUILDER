// src/hooks/useResumeData.ts
import { useState, useEffect } from 'react';
import { Resume, getResumeById, saveResume as saveResumeToDb, ResumeData } from '../services/resumeService';

const INITIAL_RESUME: ResumeData = {
  id: '',
  name: 'Dani Martinez',
  email: 'hello@reallygreatsite.com',
  phone: '+123-456-7890',
  website: 'www.reallygreatsite.com',
  linkedin: 'https://www.linkedin.com/in/dani-martinez',
  address: '123 Anywhere St., Any City, ST 12345',
  summary: 'Marketing Manager with 5+ years of experience in digital marketing and brand management.',
  profileImage: '',
  sections: {
    role: 'Marketing Manager',
    education: [
      { id: '1', school: 'University/College Details', degree: 'Course Studied', date: '2006 - 2008', description: '' },
      { id: '2', school: 'University/College Details', degree: 'Course Studied', date: '2006 - 2008', description: '' }
    ],
    experience: [
      { id: '1', company: 'Company Name | Location', role: 'Job position here', date: '2019 - 2022', description: 'Led cross-functional teams to execute comprehensive digital marketing campaigns. Increased brand awareness by 35% within the first year by optimizing SEO strategies and launching targeted social media initiatives.' },
      { id: '2', company: 'Company Name | Location', role: 'Job position here', date: '2017 - 2019', description: 'Managed multiple high-profile client accounts, improving ROI by an average of 25%. Developed automated reporting dashboards to track KPIs and provide actionable insights to stakeholders.' },
      { id: '3', company: 'Company Name | Location', role: 'Job position here', date: '2015 - 2017', description: 'Conducted market research to identify new opportunities and trends. Assisted in the creation of promotional materials and coordinated events.' }
    ],
    skills: ['UI/UX', 'Visual Design', 'Wireframes', 'Storyboards', 'User Flows', 'Process Flows'],
    references: [
      { id: '1', name: 'Harumi Kobayashi', company: 'Wardiere Inc. / CEO', phone: '123-456-7890', email: 'hello@reallygreatsite.com' },
      { id: '2', name: 'Bailey Dupont', company: 'Wardiere Inc. / CEO', phone: '123-456-7890', email: 'hello@reallygreatsite.com' }
    ]
  },
  templateId: 'dani',
  sectionTitles: {
    personal: 'Contact Me',
    summary: 'Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    references: 'References'
  }
};

export const useResumeData = (userId: string) => {
  const [resume, setResume] = useState<Resume>(() => {
    // Try to load from local storage first (Draft feature)
    const savedDraft = localStorage.getItem('resume_draft');
    if (savedDraft) {
      try {
        const parsedData = JSON.parse(savedDraft);
        return new Resume(parsedData);
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
    return new Resume(INITIAL_RESUME);
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save to LocalStorage whenever resume changes
  useEffect(() => {
    localStorage.setItem('resume_draft', JSON.stringify(resume.data));
  }, [resume]);

  useEffect(() => {
    if (!userId) return;

    const fetchResume = async () => {
      try {
        // We use the userId as the resumeId for simplicity in this MVP
        const fetchedResume = await getResumeById(userId);
        if (fetchedResume) {
          // OPTIONAL: Conflict resolution strategy. 
          // For now, if we have a local draft that is "dirty", we might want to keep it.
          // But to be safe, if DB has data, we might ask? 
          // Current Logic: If DB has data, use it ONLY if we didn't just load a draft.
          // Actually, for a simple "Drafts" feature, let's stick to LocalStorage as primary for "Work in Progress".
          // If the user explicitly Saves, it goes to DB. 
          // If they load the page, we show the Draft.

          // If we want to sync with DB on load:
          // setResume(fetchedResume); 

          // However, since the user said "draft which i can access when i want", 
          // let's stick to the Draft being the persistent session state.
          // If we find a remote resume, we could log it or offer to load it, 
          // but automating it might overwrite the local draft.

          // Let's decide: Local Draft takes precedence for "Session Restoration".
          // We won't overwrite local draft with remote DB automatically on reload if local exists.

          const savedDraft = localStorage.getItem('resume_draft');
          if (!savedDraft) {
            setResume(fetchedResume);
          }
        } else {
          // ...
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [userId]);

  const updateResume = (newData: Partial<ResumeData>) => {
    setResume((prev) => {
      const updatedData = { ...prev.data, ...newData };
      return new Resume(updatedData);
    });
  };

  const updateTemplate = (templateId: string) => {
    updateResume({ templateId });
  };

  const saveResume = async () => {
    setIsSaving(true);
    try {
      await saveResumeToDb(resume);
      // Optional: Clear draft on successful save? 
      // localStorage.removeItem('resume_draft'); 
      // No, keep it as a cache.
      alert('Resume saved to cloud successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume.');
    } finally {
      setIsSaving(false);
    }
  };

  const clearDraft = () => {
    if (confirm("Are you sure you want to clear your local draft and reset?")) {
      localStorage.removeItem('resume_draft');
      setResume(new Resume(INITIAL_RESUME));
    }
  };

  return { resume, loading, updateResume, saveResume, isSaving, updateTemplate, clearDraft };
};
