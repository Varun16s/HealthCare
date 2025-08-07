export default function FAQ() {
  const faqs = [
    {
      question: "How does the AI scheduling work?",
      answer: "Our AI assistant analyzes your preferences, emotional state, and needs to match you with the most suitable mental health professionals and optimal appointment times."
    },
    {
      question: "Is my information private and secure?",
      answer: "Yes, absolutely. We use end-to-end encryption and follow HIPAA guidelines to ensure your personal information and conversations remain completely confidential."
    },
    {
      question: "What types of mental health support do you offer?",
      answer: "We connect you with specialists in anxiety, depression, ADHD, autism spectrum support, social skills development, and general teen counseling."
    },
    {
      question: "Can I change or cancel my appointment?",
      answer: "Yes, you can reschedule or cancel appointments up to 24 hours before your scheduled time through your dashboard or by contacting support."
    },
    {
      question: "Do I need parent/guardian permission?",
      answer: "For users under 18, we recommend involving a parent or guardian. However, we also provide confidential support options depending on your local laws and circumstances."
    },
    {
      question: "What if I'm in crisis or need immediate help?",
      answer: "If you're experiencing a mental health crisis, please contact emergency services (911) or the 988 Suicide & Crisis Lifeline. Our platform also provides quick access to crisis resources."
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-white" data-testid="faq-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-sage-700 text-center mb-8">
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-sage-50 rounded-xl p-6" data-testid={`faq-item-${index}`}>
              <h3 className="text-lg font-medium text-sage-700 mb-3">{faq.question}</h3>
              <p className="text-sage-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
