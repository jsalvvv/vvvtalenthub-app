import React from 'react';
import { Navigation, ChevronRight } from 'lucide-react';
import FeatureCard from './FeatureCard';

const NavigationCard = () => {
  const steps = [
    {
      title: "Skills Assessment",
      description: "Complete the skills assessment",
      status: "current"
    },
    {
      title: "Compare Occupations",
      description: "Compare different career paths",
      status: "pending"
    },
    {
      title: "Job Search",
      description: "Find open positions",
      status: "pending"
    },
    {
      title: "Market Analysis",
      description: "Analyze salary and company data",
      status: "pending"
    },
    {
      title: "Resume Builder",
      description: "Create your targeted resume",
      status: "pending"
    }
  ];

  return (
    <FeatureCard
      title="Navigation"
      icon={<Navigation className="h-6 w-6" />}
      description="Track your progress"
    >
      <div className="space-y-6">
        {/* Progress Overview */}
        <div className="bg-navy-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-amber-400 font-medium">Your Progress</h4>
            <span className="text-gray-300">1 of 5 complete</span>
          </div>
          <div className="w-full bg-navy-700 rounded-full h-2">
            <div className="bg-amber-400 rounded-full h-2" style={{ width: '20%' }} />
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`p-4 rounded-lg flex items-center gap-4 
                ${step.status === 'current' ? 'bg-navy-700 border border-amber-400' :
                  step.status === 'complete' ? 'bg-navy-700' : 'bg-navy-800'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center
                ${step.status === 'complete' ? 'bg-green-500' :
                  step.status === 'current' ? 'bg-amber-400' : 'bg-navy-600'}`}>
                {step.status === 'complete' ? '✓' : index + 1}
              </div>
              <div className="flex-1">
                <h5 className={`font-medium ${step.status === 'current' ? 'text-amber-400' : 'text-white'}`}>
                  {step.title}
                </h5>
                <p className="text-sm text-gray-300">{step.description}</p>
              </div>
              <ChevronRight className={`h-5 w-5 
                ${step.status === 'current' ? 'text-amber-400' : 'text-gray-400'}`} />
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="bg-navy-800 p-4 rounded-lg">
          <h4 className="text-amber-400 font-medium mb-2">Need Help?</h4>
          <p className="text-gray-300 text-sm mb-3">
            Stuck on a step? Our team is here to assist you.
          </p>
          <button className="w-full py-2 bg-navy-700 text-white rounded-lg hover:bg-navy-600">
            Get Support
          </button>
        </div>
      </div>
    </FeatureCard>
  );
};

export default NavigationCard;