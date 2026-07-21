const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <span className="font-serif text-2xl font-bold text-luora-primary tracking-wider mb-4">LUORA</span>
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Luora Jewellery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
