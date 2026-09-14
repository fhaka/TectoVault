export interface JobPosting {
  slug: string;
  title: string;
  location: string;
  employmentType: string;
  aboutRole: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
}

// No open positions right now — per the content rules, we never invent
// job postings. Add real openings here as they become available.
export const jobPostings: JobPosting[] = [];

export function getJobBySlug(slug: string) {
  return jobPostings.find((j) => j.slug === slug);
}
