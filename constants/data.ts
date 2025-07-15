import { CourseInfo } from "@/components/DetailDialog";

export const dummyCourseInfo: CourseInfo[] = [
  { label: "Duration", value: "6 months" },
  { label: "Level", value: "Advanced" },
  { label: "Instructor", value: "John Doe" },
  { label: "Language", value: "English" },
  { label: "Category", value: "Machine Learning" },
  { label: "Enrollment", value: "Open" },
];

export const dummyCategories = [
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Data Science", value: "data-science" },
  { label: "Web Development", value: "web-development" },
  { label: "Mobile Development", value: "mobile-development" },
  { label: "Cloud Computing", value: "cloud-computing" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "AI & Deep Learning", value: "ai-deep-learning" },
  { label: "Blockchain", value: "blockchain" },
  { label: "DevOps", value: "devops" },
  { label: "Game Development", value: "game-development" },
  { label: "Software Engineering", value: "software-engineering" },
  { label: "Digital Marketing", value: "digital-marketing" },
  { label: "UI/UX Design", value: "ui-ux-design" },
  { label: "Project Management", value: "project-management" },
  { label: "Business Analytics", value: "business-analytics" },
];
export const dummyPriceRanges = [
  { label: "Free", value: "free" },
  { label: "Under $500", value: "lt-500" }, // lt = less than
  { label: "$500 - $1000", value: "500-1000" },
  { label: "Over $1000", value: "gt-1000" }, // gt = greater than
];
