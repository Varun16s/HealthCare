import { Link } from "wouter";
import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sage-700 text-white py-12" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Brain className="text-primary-400 h-8 w-8 mr-3" />
              <span className="text-xl font-semibold">MindMap AR</span>
            </div>
            <p className="text-gray-300 text-sm">
              Empowering neurodivergent teens through AI-powered mental health navigation.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-faq"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="tel:988" 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-crisis"
                >
                  Crisis Line: 988
                </a>
              </li>
              <li>
                <a 
                  href="tel:1-800-MINDMAP" 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-support"
                >
                  Support: 1-800-MINDMAP
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@mindmapar.com" 
                  className="text-gray-300 hover:text-white transition-colors"
                  data-testid="footer-link-email"
                >
                  Email Support
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  HIPAA Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-sage-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2023 MindMap AR. All rights reserved. Made with ❤️ for neurodivergent teens.</p>
        </div>
      </div>
    </footer>
  );
}
