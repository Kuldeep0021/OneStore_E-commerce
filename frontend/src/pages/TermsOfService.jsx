import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      <h1 className="text-4xl font-serif text-brand-primary uppercase tracking-wider mb-8 text-center">Terms of Service</h1>
      <div className="h-[1px] w-24 bg-brand-accent mx-auto mb-12"></div>
      
      <div className="space-y-8 text-gray-700 font-light leading-relaxed">
        <section>
          <h2 className="text-2xl font-serif text-brand-gold-dark mb-4">1. Acceptance of Terms</h2>
          <p>By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions. These Terms of Service apply to all users of the site.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-brand-gold-dark mb-4">2. Online Store Terms</h2>
          <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-brand-gold-dark mb-4">3. Products or Services</h2>
          <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy. We have made every effort to display as accurately as possible the colors and images of our products.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-brand-gold-dark mb-4">4. Modifications to the Service and Prices</h2>
          <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
