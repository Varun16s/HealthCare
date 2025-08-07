export default function About() {
  return (
    <div className="min-h-screen py-20 bg-white" data-testid="about-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-sage-700 text-center mb-8">About MindMap AR</h1>
        
        <div className="prose prose-lg mx-auto text-sage-600">
          <p className="text-xl mb-8 text-center">
            Empowering neurodivergent teens through intelligent mental health navigation
          </p>
          
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-semibold text-sage-700 mb-4">Why We Exist</h2>
            <p>
              Traditional mental health systems often fail to meet the unique needs of neurodivergent teens. 
              Long wait times, mismatched specialists, and overwhelming processes create barriers to care when 
              support is needed most.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-sage-100">
              <h3 className="text-xl font-semibold text-sage-700 mb-3">Our Approach</h3>
              <ul className="space-y-2 text-sage-600">
                <li>• AI-powered specialist matching</li>
                <li>• Neurodivergent-friendly interfaces</li>
                <li>• Flexible scheduling options</li>
                <li>• Crisis support integration</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-sage-100">
              <h3 className="text-xl font-semibold text-sage-700 mb-3">Our Values</h3>
              <ul className="space-y-2 text-sage-600">
                <li>• Accessibility for all abilities</li>
                <li>• Privacy and confidentiality</li>
                <li>• Inclusive and affirming care</li>
                <li>• Evidence-based practices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
