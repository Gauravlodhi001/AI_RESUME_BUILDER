import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getPrivateDocRef, getPrivateCollectionRef } from './firebase';

// A converter to ensure type safety when interacting with Firestore
export const resumeConverter = {
  toFirestore: (resume: Resume) => ({
    ...resume.data,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Resume({ ...data, id: snapshot.id });
  },
};

export interface ResumeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  summary: string;
  sections: any;
  templateId: string;
}

export class Resume {
  constructor(public data: ResumeData) {}
}

export async function getResumeById(resumeId: string): Promise<Resume | null> {
  const resumeRef = getPrivateDocRef('resumes', resumeId).withConverter(resumeConverter);
  const resumeSnap = await getDoc(resumeRef);
  if (resumeSnap.exists()) {
    return resumeSnap.data();
  } else {
    return null;
  }
}

export async function saveResume(resume: Resume): Promise<void> {
  const resumeRef = getPrivateDocRef('resumes', resume.data.id);
  await setDoc(resumeRef, resume.data);
}

export async function deleteResume(resumeId: string): Promise<void> {
  const resumeRef = getPrivateDocRef('resumes', resumeId);
  await deleteDoc(resumeRef);
}
