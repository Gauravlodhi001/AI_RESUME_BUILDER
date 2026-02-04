// src/hooks/useResumeData.ts
import { useState, useEffect } from 'react';
import { Resume, getResumeById, saveResume as saveResumeToDb, ResumeData } from '../services/resumeService';

const INITIAL_RESUME: ResumeData = {
  id: '',
  name: '',
  email: '',
  phone: '',
  summary: '',
  sections: {
    education: [],
    experience: [],
    skills: []
  },
  templateId: 'modern'
};

export const useResumeData = (userId: string) => {
  const [resume, setResume] = useState<Resume>(new Resume(INITIAL_RESUME));
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchResume = async () => {
      try {
        // We use the userId as the resumeId for simplicity in this MVP
        const fetchedResume = await getResumeById(userId);
        if (fetchedResume) {
          setResume(fetchedResume);
        } else {
          // If no resume exists, create a new default one with the ID matching the user
          const newResume = new Resume({ ...INITIAL_RESUME, id: userId });
          setResume(newResume);
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

  const saveResume = async () => {
    setIsSaving(true);
    try {
      await saveResumeToDb(resume);
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume.');
    } finally {
      setIsSaving(false);
    }
  };

  return { resume, loading, updateResume, saveResume, isSaving };
};
