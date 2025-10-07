// src/app/faq/page.tsx
"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Dữ liệu FAQ từ mẫu của bạn
const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "How can I get an invoice after purchasing a course?",
    answer:
      "After purchasing a course, an invoice is automatically sent to your registered email within minutes, detailing the course title, price, and payment date. Check your spam folder if you don’t see it. You can also log into your account, go to the 'Transaction History' section, and download the invoice as a PDF. For special requests like VAT invoices, contact our support team via email or hotline with your order number.",
  },
  {
    id: "faq-2",
    question: "Can I get a refund after purchasing a course?",
    answer:
      "Yes, we offer refunds within 7–14 days, depending on the course, if you’re not satisfied and have completed less than 20% of the content. To request a refund, visit 'Transaction History' in your account or contact our support team with your order details. Refunds are processed to your original payment method within 5–10 business days after approval, which typically takes 48 hours.",
  },
  {
    id: "faq-3",
    question: "How can I access my course after purchase?",
    answer:
      "Once your payment is confirmed, the course appears in the 'My Courses' section of your account. Log in, click the course title, and start learning from the course dashboard. Your progress is saved automatically. If the course doesn’t show up, check your purchase confirmation email or contact support for assistance.",
  },
  {
    id: "faq-4",
    question: "Can I study on my phone?",
    answer:
      "Yes, our platform supports learning on smartphones via any mobile browser like Chrome or Safari. You can also use our mobile app (if available) from the App Store or Google Play for a smoother experience. Log in, access 'My Courses,' and study anywhere with a stable internet connection.",
  },
  {
    id: "faq-5",
    question: "Do the courses include subtitles?",
    answer:
      "Some courses offer subtitles in Vietnamese or other languages, as noted on the course details page. In the video player, check the settings to enable subtitles if available. If you need subtitles in a specific language or notice an issue, contact support for clarification or assistance.",
  },
  {
    id: "faq-6",
    question: "Will I receive a certificate after completing a course?",
    answer:
      "Most courses provide a certificate of completion, available for download in your account once you finish all lessons and quizzes. The certificate includes your name and course details. If you don’t see it, ensure you’ve reached 100% completion or reach out to our support team.",
  },
  {
    id: "faq-7",
    question: "Can I contact the instructor of my course?",
    answer:
      "Depending on the course, you may interact with instructors via the Q&A or discussion forum in the course dashboard. Post your question, and expect a reply within 24–48 hours. If direct messaging is enabled, you can send private queries. Contact support if you need further assistance connecting with the instructor.",
  },
  {
    id: "faq-8",
    question: "I forgot my password. How can I recover it?",
    answer:
      "If you forget your password, click 'Forgot Password' on the login page, enter your email, and check your inbox for a reset link. Follow the link to create a new password. If the email doesn’t arrive, check your spam folder or contact our support team for help.",
  },
  {
    id: "faq-9",
    question: "Can I share my account with others?",
    answer:
      "No, accounts are for personal use only to protect course content and ensure fair usage. Sharing your account may lead to suspension. If you want to gift a course, use the 'Gift This Course' option during checkout to send it to another user’s email.",
  },
  {
    id: "faq-10",
    question: "Can I download course videos to my device?",
    answer:
      "Most courses are available for online streaming only to protect copyright, but some offer downloadable resources like PDFs or slides. Check the course details for available materials. If you need offline access, contact support to check for specific course options.",
  },
  {
    id: "faq-11",
    question:
      "What should I do if I experience technical issues while studying?",
    answer:
      "If you face technical issues, such as videos not loading or quizzes malfunctioning, reach out to our support team via email or the hotline listed on our website. Provide details like the course name and issue description, and we’ll resolve it within 24–48 hours.",
  },
  {
    id: "faq-12",
    question: "Does the website offer free courses?",
    answer:
      "Yes, we provide free courses and trial content, accessible in the 'Free Courses' section on the homepage. These allow you to explore topics without cost. Check regularly for new free offerings or subscribe to our newsletter for updates.",
  },
  {
    id: "faq-13",
    question: "How can I become an instructor on your website?",
    answer:
      "To become an instructor, visit the 'Become an Instructor' section, complete the application with your expertise and sample content, and submit for review. If approved, you’ll access tools to create and publish courses. Our team will guide you through the process within 3–5 business days.",
  },
  {
    id: "faq-14",
    question: "Does the website have any promotions or discounts?",
    answer:
      "We frequently offer promotions and discounts on courses and bundles. Check the homepage or subscribe to our newsletter to stay informed about current deals, seasonal sales, or special coupon codes for additional savings.",
  },
  {
    id: "faq-15",
    question: "Do you provide live courses?",
    answer:
      "Most of our courses are pre-recorded for flexible learning, but some include live sessions, such as webinars, noted in the course description. You can join these through links provided in the course or via email notifications. Check regularly for updates on live events.",
  },
  {
    id: "faq-16",
    question: "If I’m busy, can I pause or freeze my course access?",
    answer:
      "Yes, you can request to pause your course access for personal reasons. Contact our support team with your course details and desired pause duration, typically up to 30 days. We’ll confirm eligibility and ensure your access is preserved until you’re ready to resume.",
  },
  {
    id: "faq-17",
    question:
      "How long can I pause my course, and how many times is it allowed?",
    answer:
      "You can pause your course access once or twice, depending on the course duration, for up to 30 days per pause. Check the course’s specific policy in its description. Contact our support team to request a pause and confirm the terms for your course.",
  },
  {
    id: "faq-18",
    question: "Can I transfer a purchased course to another account?",
    answer:
      "Purchased courses are non-transferable to ensure security and fairness. Instead, you can gift a course to another user during checkout by selecting 'Gift This Course' and entering their email. Contact support if you need help with gifting or related issues.",
  },
  {
    id: "faq-19",
    question: "Do you support international payments?",
    answer:
      "Yes, we accept international credit/debit cards and select global e-wallets, like PayPal, depending on availability. During checkout, you’ll see all supported payment options. If you encounter issues with international payments, contact our support team for assistance.",
  },
  {
    id: "faq-20",
    question: "Can I use multiple devices with the same account?",
    answer:
      "Yes, you can log into your account from multiple devices, like phones, tablets, or computers, to access your courses. Simultaneous logins are not allowed to protect your account. Ensure a stable internet connection and log out from unused devices for security.",
  },
  {
    id: "faq-21",
    question: "Can I preview a course before buying it?",
    answer:
      "Many courses offer free preview videos or sample lessons, accessible on the course details page. You can also read student reviews and check the course outline to assess suitability. If previews are unavailable, contact support for more information.",
  },
  {
    id: "faq-22",
    question: "Does the website offer course bundles?",
    answer:
      "Yes, we offer course bundles grouped by topic or skill level, allowing you to save money compared to buying courses individually. Browse the 'Course Bundles' section on the homepage to find packages that suit your learning goals.",
  },
  {
    id: "faq-23",
    question: "Can I request an extension for course access time?",
    answer:
      "If your course access is time-limited, you can request an extension by contacting our support team with your course and order details. Extensions are granted based on the course’s policy, and our team will confirm within 48 hours.",
  },
  {
    id: "faq-24",
    question: "What payment methods are accepted?",
    answer:
      "We support payments via credit/debit cards, e-wallets like Momo and ZaloPay, and bank transfers. During checkout, you’ll see all available options based on your region. For payment issues, reach out to our support team for quick resolution.",
  },
  {
    id: "faq-25",
    question: "How do I complete the payment process for a course?",
    answer:
      "To complete the payment process for a course, browse and select the course, review details, click 'Buy Now' or 'Enroll,' add to cart, apply any discount code, proceed to checkout, log in or register, select a payment method, enter payment details, review the order, agree to terms, and confirm payment. You’ll receive a confirmation email, and the course will appear in 'My Courses.'",
  },
  {
    id: "faq-26",
    question:
      "How can I apply for a refund if I'm not satisfied with a course?",
    answer:
      "To apply for a refund, ensure the request is within 7–14 days from purchase and you’ve completed less than 20% of the course. Log in, go to 'Transaction History,' locate the course, click 'Request Refund,' fill out the form with your reason, and submit. The support team will review within 48–72 hours, and if approved, refunds take 5–10 business days.",
  },
  {
    id: "faq-27",
    question: "How do I become an instructor and create my own course?",
    answer:
      "Visit 'Become an Instructor,' fill out the application with your details and work samples, agree to terms, and submit. If approved within 3–7 business days, access the instructor dashboard, create a course with details and content, preview, and submit for review. Once published, promote your course and track earnings.",
  },
];

export default function FaqPage() {
  return (
    <main className="py-16 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h1>

      <Accordion
        type="single"
        collapsible
        className="space-y-4 max-w-3xl mx-auto"
      >
        {faqItems.map((item, index) => (
          <AccordionItem
            key={item.id}
            value={`item-${index}`}
            className="border rounded-lg"
          >
            <AccordionTrigger className="px-4 py-3 font-semibold hover:bg-gray-100">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-gray-700">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
