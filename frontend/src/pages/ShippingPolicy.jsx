import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      <h1 className="text-4xl font-serif text-brand-primary uppercase tracking-wider mb-8 text-center">Shipping Policy</h1>
      <div className="h-[1px] w-24 bg-brand-accent mx-auto mb-12"></div>
      
      <div className="space-y-8 text-gray-700 font-light leading-relaxed">
        <section>
          <h2 className="text-2xl font-serif text-brand-gold-dark mb-4">1. Order Processing Time</h2>
          <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-brand-gold-dark mb-4">2. Shipping Rates & Delivery Estimates</h2>
          <p>Shipping charges for your order will be calculated and displayed at checkout. We offer standard shipping (3-5 business days) and express delivery (1-2 business days) options across India.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-brand-gold-dark mb-4">3. Shipment Confirmation & Order Tracking</h2>
          <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-brand-gold-dark mb-4">4. Damages</h2>
          <p>ONESTORE is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
