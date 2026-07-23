import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    default: 'contact@onestore.com',
  },
  phone: {
    type: String,
    required: true,
    default: '+91 9350996932',
  },
  address: {
    type: String,
    required: true,
    default: 'Gurugram',
  },
  privacyPolicy: {
    type: String,
    default: 'This is the default Privacy Policy. Please update it from the Admin Panel.',
  },
  refundPolicy: {
    type: String,
    default: 'This is the default Refund Policy. Please update it from the Admin Panel.',
  },
  shippingPolicy: {
    type: String,
    default: 'This is the default Shipping Policy. Please update it from the Admin Panel.',
  },
  termsOfService: {
    type: String,
    default: 'This is the default Terms of Service. Please update it from the Admin Panel.',
  },
}, {
  timestamps: true,
});

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
