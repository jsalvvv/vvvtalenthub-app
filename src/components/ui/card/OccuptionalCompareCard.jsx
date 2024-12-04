import React from 'react';
import { Search } from 'lucide-react';

const OccuptionalCompareCard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* First Occupation */}
        <div className="space-y-4">
          <h3 className="font-semibold text-amber-400">First Occupation</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search occupation..."
              className="w-full p-3 pl-10 rounded-lg bg-navy-800 border border-navy-600 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-amber-400" />
          </div>
          {/* Results container */}
          <div className="border border-navy-600 rounded-lg p-2 min-h-[100px] bg-navy-800/50">
            <p className="text-gray-400 text-sm">Selected occupation details will appear here</p>
          </div>
        </div>

        {/* Second Occupation */}
        <div className="space-y-4">
          <h3 className="font-semibold text-amber-400">Second Occupation</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search occupation..."
              className="w-full p-3 pl-10 rounded-lg bg-navy-800 border border-navy-600 text-white placeholder-gray-400 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-amber-400" />
          </div>
          {/* Results container */}
          <div className="border border-navy-600 rounded-lg p-2 min-h-[100px] bg-navy-800/50">
            <p className="text-gray-400 text-sm">Selected occupation details will appear here</p>
          </div>
        </div>
      </div>

      {/* Compare Button */}
      <div className="flex justify-center">
        <button className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-navy-900 rounded-lg hover:from-amber-500 hover:to-amber-600 font-semibold shadow-lg transform transition hover:scale-105">
          Compare Skills
        </button>
      </div>

      {/* Results Section */}
      <div className="border-t border-navy-600 pt-6">
        <h3 className="font-semibold text-amber-400 mb-4">Comparison Results</h3>
        <div className="bg-navy-800/50 rounded-lg p-4 border border-navy-600">
          <p className="text-gray-400 text-center">Select two occupations above to see their skill comparison</p>
        </div>
      </div>
    </div>
  );
};

export default OccuptionalCompareCard;