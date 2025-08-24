export {};

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Add custom attributes here
    'pricing-table-id'?: string;
    'publishable-key'?: string;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}