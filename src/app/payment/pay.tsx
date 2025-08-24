// Import React and useEffect
'use client';

import React, { useEffect } from 'react';

// Extend the global JSX namespace to include the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const StripePricingTable = () => {
  useEffect(() => {
    // Create a script element to load the Stripe pricing-table.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://js.stripe.com/v3/pricing-table.js';

    // Append the script element to the document
    document.body.appendChild(script);

    // Clean up the script element when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Render your pricing table here */}
      <>
        {/* @ts-ignore */}
        <stripe-pricing-table
          pricing-table-id="prctbl_1NrVE1SDKHZ803Jh2InMSL1A"
          publishable-key="pk_test_51NrUlfSDKHZ803JhsWSfCU4jKzLDONRxG2XjvDyMPOmSAOo6WN6clhrdZhtTxWzdFi2jGdAWWfOAQMJvbus3FDon00KTBT4ZlD"
        />
      </>
    </div>
  );
};

export default StripePricingTable;
