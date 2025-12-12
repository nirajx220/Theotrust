import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import wonderfulService from '../services/wonderfulService';
import Loading from '../components/common/Loading';

const DonationSuccess = () => {
  const [searchParams] = useSearchParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyDonation = async () => {
      const sessionId = searchParams.get('session_id');

      if (!sessionId) {
        setError('Invalid donation session');
        setLoading(false);
        return;
      }

      try {
        const response = await wonderfulService.verifyDonation(sessionId);
        
        if (response.success) {
          setDonation(response.donation);
        } else {
          setError('Failed to verify donation');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    verifyDonation();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link
            to="/donate"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Generosity!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Your donation of{' '}
            <span className="font-bold text-blue-600">
              ${donation?.amount} {donation?.currency}
            </span>{' '}
            has been successfully processed.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Donation Details</h3>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Donor:</span>
                <span className="font-semibold">{donation?.donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold">${donation?.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold capitalize">{donation?.status}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-8">
            A confirmation email has been sent to your email address.
            Your contribution will help us continue our mission to empower children globally.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Back to Home
            </Link>
            <Link
              to="/donate"
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Make Another Donation
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">
            Share Your Impact
          </h3>
          <div className="flex justify-center gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=I just donated to TheoTrust to help empower children globally!`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Share on Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;