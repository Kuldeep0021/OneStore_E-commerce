import React from 'react';
import { useStore } from '../store';

const TermsOfService = () => {
  const settings = useStore(state => state.settings);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      <h1 className="text-4xl font-serif text-brand-primary uppercase tracking-wider mb-8 text-center">Terms of Service</h1>
      <div className="h-[1px] w-24 bg-brand-accent mx-auto mb-12"></div>
      
      {settings?.termsOfService ? (
        <div 
          className="space-y-6 text-gray-700 font-light leading-relaxed prose max-w-none"
          dangerouslySetInnerHTML={{ __html: settings.termsOfService }}
        />
      ) : (
        <div className="text-center text-gray-500 py-10">Loading policy...</div>
      )}
    </div>
  );
};

export default TermsOfService;
