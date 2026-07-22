import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      <h1 className="text-4xl font-serif text-luora-primary uppercase tracking-wider mb-8 text-center">Privacy Policy</h1>
      <div className="h-[1px] w-24 bg-luora-accent mx-auto mb-12"></div>
      
      <div className="space-y-8 text-gray-700 font-light leading-relaxed">
        <section>
          <h2 className="text-2xl font-serif text-luora-gold-dark mb-4">1. Information We Collect</h2>
          <p>At LUORA, we collect personal information that you provide to us when you create an account, make a purchase, or sign up for our newsletter. This includes your name, email address, shipping address, and payment details.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-luora-gold-dark mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to process your orders, communicate with you about your purchases, and send you marketing communications if you have opted in. Your data helps us improve our website and provide a personalized shopping experience.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-luora-gold-dark mb-4">3. Data Protection</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-luora-gold-dark mb-4">4. Contact Us</h2>
          <p>If you have any questions regarding this privacy policy, you may contact us using the information below:</p>
          <p className="mt-2 text-luora-primary font-medium">contact@luora.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
