import CheckoutStepper from "./CheckoutStepper";

const CheckoutLayout = ({ children }) => {
  return (
    <section className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stepper */}

        <div className="mb-6 overflow-x-auto">
          <CheckoutStepper />
        </div>

        {/* Content */}

        {children}

      </div>
    </section>
  );
};

export default CheckoutLayout;