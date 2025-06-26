import React from "react";
import { useDarkMode } from "../context/DarkModeContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";

const FAQ = () => {
  const { isDarkMode } = useDarkMode();
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "How do I post a task?",
      answer: "To post a task, click on 'Add Task' in the navigation menu. Fill out the task details including title, description, budget, and deadline. Once submitted, your task will be visible to freelancers who can bid on it."
    },
    {
      question: "How do I find tasks to work on?",
      answer: "Browse available tasks by clicking 'Browse Tasks' in the navigation. You can filter by category, search for specific keywords, and sort by newest or oldest. Click on any task to view details and submit your proposal."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We currently support secure payments through major credit cards, PayPal, and bank transfers. All payments are processed securely and held in escrow until the task is completed to your satisfaction."
    },
    {
      question: "How do I communicate with clients/freelancers?",
      answer: "Once a task is assigned, you can communicate directly through our built-in messaging system. This keeps all communication organized and secure within the platform."
    },
    {
      question: "What if I'm not satisfied with the work?",
      answer: "We have a dispute resolution process in place. If you're not satisfied with the delivered work, you can request revisions or file a dispute. Our support team will help mediate the situation to ensure a fair resolution."
    },
    {
      question: "How do I build my profile and reputation?",
      answer: "Complete your profile with detailed information about your skills and experience. Deliver quality work on time, maintain good communication, and ask clients for reviews. Positive reviews and completed tasks will help build your reputation."
    },
    {
      question: "Are there any fees for using the platform?",
      answer: "We charge a small service fee on completed tasks. This helps us maintain the platform, provide customer support, and ensure secure payments. The fee is clearly displayed before you accept any task."
    },
    {
      question: "How do I ensure the quality of work?",
      answer: "Review freelancer profiles, ratings, and previous work samples before hiring. Set clear expectations and milestones. Use our milestone payment system to release payments as work is completed satisfactorily."
    },
    {
      question: "Can I cancel a task after posting it?",
      answer: "Yes, you can cancel a task if no bids have been placed yet. If bids have been submitted, you should communicate with the freelancers and may need to pay a small cancellation fee."
    },
    {
      question: "What happens if a freelancer doesn't complete the work?",
      answer: "If a freelancer fails to deliver within the agreed timeframe, you can request a refund. We have protection policies in place to ensure you don't lose your money on incomplete work."
    }
  ];

  return (
    <div
      className={`min-h-screen py-12 px-4 ${
        isDarkMode
          ? "bg-slate-900 text-white"
          : "bg-gradient-to-br from-slate-50 to-emerald-100 text-slate-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Frequently Asked Questions
          </h1>
          <p
            className={`text-lg ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Find answers to common questions about our freelance marketplace
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl border shadow-sm overflow-hidden ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors ${
                  isDarkMode
                    ? "hover:bg-slate-700"
                    : "hover:bg-slate-50"
                }`}
              >
                <span className="font-semibold text-lg">{item.question}</span>
                {openItems.has(index) ? (
                  <FaChevronUp className="text-emerald-500" />
                ) : (
                  <FaChevronDown className="text-emerald-500" />
                )}
              </button>
              {openItems.has(index) && (
                <div
                  className={`px-6 pb-4 ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  <p className="leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <div
            className={`rounded-xl p-8 ${
              isDarkMode
                ? "bg-slate-800 border border-slate-700"
                : "bg-white border border-slate-200"
            }`}
          >
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Still have questions?
            </h2>
            <p
              className={`mb-6 ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <a
              href="/contact"
              className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                isDarkMode
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 