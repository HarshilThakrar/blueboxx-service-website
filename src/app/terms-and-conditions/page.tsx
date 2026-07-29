import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Blueboxx Business Solutions',
  description: 'Terms and Conditions for Blueboxx Business Solutions.',
};

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-6 lg:px-12 py-32 max-w-4xl">
      <h1 className="text-4xl lg:text-5xl font-heading font-bold text-zinc-900 mb-8">Terms and Conditions</h1>
      
      <div className="prose prose-lg text-zinc-600 prose-headings:text-zinc-900 prose-a:text-theme-gold">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Intellectual Property Rights</h2>
        <p className="mb-4">
          Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. License to Use Website</h2>
        <p className="mb-4">
          You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.
        </p>
        <p className="mb-4">You must not:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Republish material from this website (including republication on another website).</li>
          <li>Sell, rent or sub-license material from the website.</li>
          <li>Show any material from the website in public.</li>
          <li>Reproduce, duplicate, copy or otherwise exploit material on this website for a commercial purpose.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations of Liability</h2>
        <p className="mb-4">
          We will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>For any indirect, special or consequential loss.</li>
          <li>For any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contact Information</h2>
        <p className="mb-4">
          If you have any questions regarding our Terms and Conditions, please contact us at <a href="mailto:hello@blueboxx.com" className="text-theme-gold hover:underline">hello@blueboxx.com</a>.
        </p>
      </div>
    </div>
  );
}
