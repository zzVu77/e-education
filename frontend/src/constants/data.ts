// export const dummyCourseInfo: CourseInfo[] = [
//   { label: "Duration", value: "6 months" },
//   { label: "Level", value: "Advanced" },
//   { label: "Instructor", value: "John Doe" },
//   { label: "Language", value: "English" },
//   { label: "Category", value: "Machine Learning" },
//   { label: "Enrollment", value: "Open" },
// ];

export const mockCategories = [
  { label: "All", value: "all" },
  { label: "Blockchain", value: "blockchain" },
  { label: "Business", value: "business" },
  { label: "Data Science", value: "data-science" },
  { label: "Design", value: "design" },
  { label: "Finance", value: "finance" },
  { label: "Language", value: "language" },
  { label: "Marketing", value: "marketing" },
  { label: "Mobile Development", value: "mobile-development" },
  { label: "Photography", value: "photography" },
  { label: "Web Development", value: "web-development" },
];
export const sortOptions = [
  { label: "Unsorted", value: "none" },
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

// export const mockCoursesData: ProductCardProps[] = [
//   {
//     courseId: "1",
//     courseName: "Complete Web Development Bootcamp",
//     coursePrice: 499,
//     courseImage:
//       "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Learn HTML, CSS, JavaScript, React and Node.js from scratch",
//     courseFullDescription:
//       "This comprehensive bootcamp takes you from beginner to professional web developer. You'll master frontend technologies like HTML, CSS, JavaScript and React, as well as backend technologies like Node.js, Express, and MongoDB. By the end of this course, you'll be able to build full-stack web applications and launch your career as a web developer.",
//     courseRating: 4.8,
//     courseInfo: [
//       { label: "Category", value: "Web Development" },
//       { label: "Level", value: "Beginner to Advanced" },
//       { label: "Instructor", value: "Dr. Angela Yu" },
//       { label: "Duration", value: "63 hours" },
//     ],
//   },
//   {
//     courseId: "2",
//     courseName: "Advanced Machine Learning Specialization",
//     coursePrice: 1200,
//     courseImage:
//       "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Master machine learning algorithms and neural networks",
//     courseFullDescription:
//       "Take your machine learning skills to the next level with this advanced specialization. You'll dive deep into neural networks, deep learning, computer vision, and natural language processing. Through hands-on projects, you'll build real-world AI applications that can recognize images, understand text, and make predictions based on complex data.",
//     courseRating: 4.9,
//     courseInfo: [
//       { label: "Category", value: "Data Science" },
//       { label: "Level", value: "Advanced" },
//       { label: "Instructor", value: "Andrew Ng" },
//       { label: "Duration", value: "120 hours" },
//     ],
//   },
//   {
//     courseId: "3",
//     courseName: "Business English Communication Skills",
//     coursePrice: 350,
//     courseImage:
//       "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Improve your English skills for professional settings",
//     courseFullDescription:
//       "Enhance your English communication skills specifically for business environments. This course covers email writing, meeting participation, negotiation techniques, presentation skills, and professional vocabulary. Native speakers will guide you through practical exercises and real-world scenarios to help you communicate confidently in any business situation.",
//     courseRating: 4.7,
//     courseInfo: [
//       { label: "Category", value: "Language" },
//       { label: "Level", value: "Intermediate" },
//       { label: "Instructor", value: "Emma Thompson" },
//       { label: "Duration", value: "40 hours" },
//     ],
//   },
//   {
//     courseId: "4",
//     courseName: "Digital Marketing Masterclass",
//     coursePrice: 750,
//     courseImage:
//       "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Complete guide to SEO, social media, email marketing and more",
//     courseFullDescription:
//       "Become a digital marketing expert with this comprehensive masterclass. You'll learn how to create effective marketing strategies across multiple channels including SEO, PPC, social media, content marketing, and email campaigns. By the end of this course, you'll be able to drive traffic, generate leads, and increase conversions for any business.",
//     courseRating: 4.6,
//     courseInfo: [
//       { label: "Category", value: "Marketing" },
//       { label: "Level", value: "All Levels" },
//       { label: "Instructor", value: "Neil Patel" },
//       { label: "Duration", value: "52 hours" },
//     ],
//   },
//   {
//     courseId: "5",
//     courseName: "Financial Accounting Fundamentals",
//     coursePrice: 450,
//     courseImage:
//       "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Master the basics of accounting and financial statements",
//     courseFullDescription:
//       "Gain a solid understanding of financial accounting principles and practices. This course covers the accounting cycle, financial statements, inventory valuation, receivables, fixed assets, liabilities, and equity accounting. You'll learn how to analyze financial statements and make informed business decisions based on accounting data.",
//     courseRating: 4.5,
//     courseInfo: [
//       { label: "Category", value: "Finance" },
//       { label: "Level", value: "Beginner" },
//       { label: "Instructor", value: "Dr. Sarah Johnson" },
//       { label: "Duration", value: "45 hours" },
//     ],
//   },
//   {
//     courseId: "6",
//     courseName: "iOS App Development with Swift",
//     coursePrice: 899,
//     courseImage:
//       "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription: "Build iPhone and iPad apps using Swift and Xcode",
//     courseFullDescription:
//       "Learn to build professional iOS applications from the ground up using Swift and Xcode. This course covers UI design, data persistence, networking, and integration with Apple's frameworks. By completing this course, you'll have built several real-world apps and be ready to publish your own applications to the App Store.",
//     courseRating: 4.7,
//     courseInfo: [
//       { label: "Category", value: "Mobile Development" },
//       { label: "Level", value: "Intermediate" },
//       { label: "Instructor", value: "Chris Anderson" },
//       { label: "Duration", value: "57 hours" },
//     ],
//   },
//   {
//     courseId: "7",
//     courseName: "IELTS Academic Preparation Course",
//     coursePrice: 299,
//     courseImage:
//       "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Comprehensive preparation for all IELTS test sections",
//     courseFullDescription:
//       "Prepare thoroughly for the IELTS Academic exam with this comprehensive course. You'll receive detailed instruction and practice for all four sections: Listening, Reading, Writing, and Speaking. Our experienced instructors will provide personalized feedback on your writing and speaking to help you achieve your target band score.",
//     courseRating: 4.8,
//     courseInfo: [
//       { label: "Category", value: "Language" },
//       { label: "Level", value: "All Levels" },
//       { label: "Instructor", value: "Dr. Jane Wilson" },
//       { label: "Duration", value: "30 hours" },
//     ],
//   },
//   {
//     courseId: "8",
//     courseName: "Graphic Design Principles",
//     coursePrice: 550,
//     courseImage:
//       "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Learn design theory and practical skills with Adobe Creative Suite",
//     courseFullDescription:
//       "Master the fundamental principles of graphic design while learning practical skills in Adobe Photoshop, Illustrator, and InDesign. This course covers color theory, typography, layout design, branding, and digital illustration. You'll complete a portfolio of projects including logos, posters, brochures, and digital graphics ready to showcase to potential clients or employers.",
//     courseRating: 4.6,
//     courseInfo: [
//       { label: "Category", value: "Design" },
//       { label: "Level", value: "Beginner to Intermediate" },
//       { label: "Instructor", value: "Michael Scott" },
//       { label: "Duration", value: "48 hours" },
//     ],
//   },
//   {
//     courseId: "9",
//     courseName: "Blockchain Development Fundamentals",
//     coursePrice: 1500,
//     courseImage:
//       "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Learn to build decentralized applications and smart contracts",
//     courseFullDescription:
//       "Dive into blockchain technology and learn how to build decentralized applications. This course covers blockchain fundamentals, Ethereum development, smart contracts with Solidity, Web3.js, and dApp architecture. You'll build several blockchain applications and understand how to integrate blockchain technology into existing systems.",
//     courseRating: 4.9,
//     courseInfo: [
//       { label: "Category", value: "Blockchain" },
//       { label: "Level", value: "Advanced" },
//       { label: "Instructor", value: "Vitalik B." },
//       { label: "Duration", value: "65 hours" },
//     ],
//   },
//   {
//     courseId: "10",
//     courseName: "Project Management Professional (PMP) Certification",
//     coursePrice: 850,
//     courseImage:
//       "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Complete preparation for the PMP certification exam",
//     courseFullDescription:
//       "Prepare for and pass the Project Management Professional (PMP) certification exam with this comprehensive course. You'll learn all the necessary knowledge areas including project integration, scope, time, cost, quality, resource, communications, risk, procurement, and stakeholder management. Includes practice exams and application assistance.",
//     courseRating: 4.7,
//     courseInfo: [
//       { label: "Category", value: "Business" },
//       { label: "Level", value: "Intermediate to Advanced" },
//       { label: "Instructor", value: "Rita Mulcahy" },
//       { label: "Duration", value: "35 hours" },
//     ],
//   },
//   {
//     courseId: "11",
//     courseName: "Complete Python Data Science Bootcamp",
//     coursePrice: 699,
//     courseImage:
//       "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Master Python for data analysis, visualization and machine learning",
//     courseFullDescription:
//       "Become a data scientist with this comprehensive Python bootcamp. You'll learn data manipulation with Pandas, visualization with Matplotlib and Seaborn, statistical analysis, and machine learning with scikit-learn. Through real-world projects analyzing actual datasets, you'll build a portfolio that demonstrates your data science skills to potential employers.",
//     courseRating: 4.8,
//     courseInfo: [
//       { label: "Category", value: "Data Science" },
//       { label: "Level", value: "Beginner to Advanced" },
//       { label: "Instructor", value: "Jose Portilla" },
//       { label: "Duration", value: "60 hours" },
//     ],
//   },
//   {
//     courseId: "12",
//     courseName: "Professional Photography Masterclass",
//     coursePrice: 480,
//     courseImage:
//       "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Learn photography from composition to post-processing",
//     courseFullDescription:
//       "Take your photography skills from beginner to professional with this comprehensive masterclass. You'll learn camera settings, composition techniques, lighting, portraiture, landscape photography, and post-processing in Adobe Lightroom and Photoshop. By the end of this course, you'll have a professional portfolio and the skills to start your photography business.",
//     courseRating: 4.6,
//     courseInfo: [
//       { label: "Category", value: "Photography" },
//       { label: "Level", value: "All Levels" },
//       { label: "Instructor", value: "Annie Leibovitz" },
//       { label: "Duration", value: "42 hours" },
//     ],
//   },
// ];

// export const suggestionCoursesData: ProductCardProps[] = [
//   {
//     courseId: "4",
//     courseName: "Digital Marketing Masterclass",
//     coursePrice: 750,
//     courseImage:
//       "https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Complete guide to SEO, social media, email marketing and more",
//     courseFullDescription:
//       "Become a digital marketing expert with this comprehensive masterclass. You'll learn how to create effective marketing strategies across multiple channels including SEO, PPC, social media, content marketing, and email campaigns. By the end of this course, you'll be able to drive traffic, generate leads, and increase conversions for any business.",
//     courseRating: 4.6,
//     courseInfo: [
//       { label: "Category", value: "Marketing" },
//       { label: "Level", value: "All Levels" },
//       { label: "Instructor", value: "Neil Patel" },
//       { label: "Duration", value: "52 hours" },
//     ],
//   },
//   {
//     courseId: "5",
//     courseName: "Financial Accounting Fundamentals",
//     coursePrice: 450,
//     courseImage:
//       "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Master the basics of accounting and financial statements",
//     courseFullDescription:
//       "Gain a solid understanding of financial accounting principles and practices. This course covers the accounting cycle, financial statements, inventory valuation, receivables, fixed assets, liabilities, and equity accounting. You'll learn how to analyze financial statements and make informed business decisions based on accounting data.",
//     courseRating: 4.5,
//     courseInfo: [
//       { label: "Category", value: "Finance" },
//       { label: "Level", value: "Beginner" },
//       { label: "Instructor", value: "Dr. Sarah Johnson" },
//       { label: "Duration", value: "45 hours" },
//     ],
//   },
//   {
//     courseId: "6",
//     courseName: "iOS App Development with Swift",
//     coursePrice: 899,
//     courseImage:
//       "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription: "Build iPhone and iPad apps using Swift and Xcode",
//     courseFullDescription:
//       "Learn to build professional iOS applications from the ground up using Swift and Xcode. This course covers UI design, data persistence, networking, and integration with Apple's frameworks. By completing this course, you'll have built several real-world apps and be ready to publish your own applications to the App Store.",
//     courseRating: 4.7,
//     courseInfo: [
//       { label: "Category", value: "Mobile Development" },
//       { label: "Level", value: "Intermediate" },
//       { label: "Instructor", value: "Chris Anderson" },
//       { label: "Duration", value: "57 hours" },
//     ],
//   },
//   {
//     courseId: "7",
//     courseName: "IELTS Academic Preparation Course",
//     coursePrice: 299,
//     courseImage:
//       "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     courseShortDescription:
//       "Comprehensive preparation for all IELTS test sections",
//     courseFullDescription:
//       "Prepare thoroughly for the IELTS Academic exam with this comprehensive course. You'll receive detailed instruction and practice for all four sections: Listening, Reading, Writing, and Speaking. Our experienced instructors will provide personalized feedback on your writing and speaking to help you achieve your target band score.",
//     courseRating: 4.8,
//     courseInfo: [
//       { label: "Category", value: "Language" },
//       { label: "Level", value: "All Levels" },
//       { label: "Instructor", value: "Dr. Jane Wilson" },
//       { label: "Duration", value: "30 hours" },
//     ],
//   },
// ];
// export const formatCoursesToContextString = () => {
//   return mockCoursesData
//     .map((course) => {
//       const info = (course.courseInfo ?? [])
//         .map((i) => `${i.label}: ${i.value}`)
//         .join(", ");

//       return `
// Course ID: ${course.courseId}
// Course: ${course.courseName}
// Description: ${course.courseShortDescription}
// Details: ${course.courseFullDescription}
// ${info}
// Price: ${course.coursePrice}đ
// Rating: ${course.courseRating}
// ---
// `;
//     })
//     .join("\n");
// };
