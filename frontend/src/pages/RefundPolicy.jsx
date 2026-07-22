import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      <h1 className="text-4xl font-serif text-luora-primary uppercase tracking-wider mb-8 text-center">Refund Policy</h1>
      <div className="h-[1px] w-24 bg-luora-accent mx-auto mb-12"></div>
      
      <div className="space-y-8 text-gray-700 font-light leading-relaxed">
        <section>
          <h2 className="text-2xl font-serif text-luora-gold-dark mb-4">1. Return Window</h2>
          <p>We accept returns within 14 days of delivery for a full refund or exchange. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-luora-gold-dark mb-4">2. Non-returnable Items</h2>
          <p>Certain types of items cannot be returned, including custom-made or personalized jewelry pieces. Earrings cannot be returned for hygiene reasons unless faulty.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-luora-gold-dark mb-4">3. Refund Process</h2>
          <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within 5-7 business days.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-luora-gold-dark mb-4">4. Return Shipping</h2>
          <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.</p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
