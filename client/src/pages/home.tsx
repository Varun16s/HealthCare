import { Link } from "wouter";
import { Heart, Bot, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-sage-700 mb-6 leading-tight">
              Navigate Your Mental Health Journey with{" "}
              <span className="text-primary-600">Confidence</span>
            </h1>
            <p className="text-lg sm:text-xl text-sage-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI-powered appointment scheduling designed specifically for neurodivergent teens. 
              Find the right support when you need it most.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Link href="/signup" data-testid="link-get-started">
                <Button size="lg" className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/about" data-testid="link-learn-more">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 text-lg border-primary-200 text-primary-600 hover:bg-gray-50">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-sage-700 mb-8">Our Mission</h2>
          <p className="text-lg text-sage-600 leading-relaxed mb-8">
            We believe every teen deserves accessible, understanding, and personalized mental health support. 
            Our AI-powered platform removes barriers and connects you with the right care at the right time.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary-50 p-6 rounded-xl">
              <Heart className="text-primary-500 h-12 w-12 mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-sage-700 mb-3">Compassionate Care</h3>
              <p className="text-sage-600">Understanding and empathy at every step of your journey</p>
            </div>
            <div className="bg-secondary-50 p-6 rounded-xl">
              <Bot className="text-secondary-500 h-12 w-12 mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-sage-700 mb-3">AI-Powered Matching</h3>
              <p className="text-sage-600">Smart scheduling that understands your unique needs</p>
            </div>
            <div className="bg-accent-50 p-6 rounded-xl">
              <Shield className="text-accent-500 h-12 w-12 mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-sage-700 mb-3">Safe & Secure</h3>
              <p className="text-sage-600">Your privacy and safety are our top priorities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-sage-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-sage-700 text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-semibold text-xl">1</span>
              </div>
              <h3 className="text-lg font-medium text-sage-700 mb-2">Create Profile</h3>
              <p className="text-sage-600">Tell us about yourself and your preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-secondary-600 font-semibold text-xl">2</span>
              </div>
              <h3 className="text-lg font-medium text-sage-700 mb-2">Chat with AI</h3>
              <p className="text-sage-600">Discuss your needs with our understanding AI assistant</p>
            </div>
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-600 font-semibold text-xl">3</span>
              </div>
              <h3 className="text-lg font-medium text-sage-700 mb-2">Get Matched</h3>
              <p className="text-sage-600">Receive personalized specialist and time recommendations</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 font-semibold text-xl">4</span>
              </div>
              <h3 className="text-lg font-medium text-sage-700 mb-2">Book & Meet</h3>
              <p className="text-sage-600">Schedule your appointment and get the support you need</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
