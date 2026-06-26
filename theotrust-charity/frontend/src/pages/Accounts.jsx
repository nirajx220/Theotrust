import React, { useState } from 'react';
import { FileText, AlertCircle, CheckCircle, Shield, Eye } from 'lucide-react';

const Accounts = () => {
  const [imageErrors, setImageErrors] = useState({});

  const accountYears = [
    {
      images: ['/accounts-1.png', '/accounts1.png', '/account-1.png', '/account1.png'],
      description: 'Annual Financial Report'
    },
    {
      images: ['/accounts-2.png', '/accounts2.png', '/account-2.png', '/account2.png'],
      description: 'Annual Financial Report'
    },
    {
      images: ['/accounts-3.png', '/accounts3.png', '/account-3.png', '/account3.png'],
      description: 'Annual Financial Report'
    }
  ];

  const handleImageError = (index, imageIndex) => {
    setImageErrors(prev => ({
      ...prev,
      [`${index}-${imageIndex}`]: true
    }));
  };

  const getWorkingImage = (account, accountIndex) => {
    for (let i = 0; i < account.images.length; i++) {
      if (!imageErrors[`${accountIndex}-${i}`]) {
        return { src: account.images[i], index: i };
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ultra Compact Header */}
        <div className="text-center mb-2">
          <div className="inline-flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Financial Accounts
            </h1>
          </div>
          <p className="text-xs text-gray-600">
            View our independently audited financial reports
          </p>
        </div>

        {/* Ultra Compact Transparency Statement */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-3 border border-gray-100">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1 rounded-md">
              <Shield className="w-3 h-3 text-white" />
            </div>
            <h2 className="text-sm font-bold text-gray-900">
              Our Commitment to Transparency
            </h2>
          </div>
          <p className="text-gray-700 text-[10px] mb-2 leading-tight">
            Registered UK charity (No. 1069814) - All accounts independently audited and filed with the Charity Commission.
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-md p-1.5 border border-blue-200">
              <div className="flex items-center gap-0.5 mb-0.5">
                <CheckCircle className="w-2.5 h-2.5 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-[10px]">100% Transparent</h3>
              </div>
              <p className="text-[9px] text-gray-600">All tracked</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-md p-1.5 border border-green-200">
              <div className="flex items-center gap-0.5 mb-0.5">
                <Shield className="w-2.5 h-2.5 text-green-600" />
                <h3 className="font-semibold text-gray-900 text-[10px]">Audited</h3>
              </div>
              <p className="text-[9px] text-gray-600">Certified</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-md p-1.5 border border-purple-200">
              <div className="flex items-center gap-0.5 mb-0.5">
                <Eye className="w-2.5 h-2.5 text-purple-600" />
                <h3 className="font-semibold text-gray-900 text-[10px]">Public</h3>
              </div>
              <p className="text-[9px] text-gray-600">Open access</p>
            </div>
          </div>
        </div>

        {/* Annual Reports - Properly Sized */}
        <div className="space-y-3 mb-3">
          {accountYears.map((account, accountIndex) => {
            const workingImage = getWorkingImage(account, accountIndex);
            
            return (
              <div 
                key={accountIndex} 
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative bg-white p-3">
                  {workingImage ? (
                    <div className="w-full">
                      <div className="mb-2 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                        <p className="text-gray-700 text-xs font-medium">{account.description}</p>
                      </div>
                      <div className="flex justify-center bg-gray-50 rounded-lg p-3">
                        <img 
                          src={workingImage.src}
                          alt={`Financial Report ${accountIndex + 1}`}
                          className="rounded-lg shadow-md"
                          style={{ 
                            maxWidth: '750px',
                            width: '60%',
                            height: 'auto'
                          }}
                          onError={() => handleImageError(accountIndex, workingImage.index)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <div className="mb-2 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                        <p className="text-gray-700 text-xs font-medium">{account.description}</p>
                      </div>
                      <div className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
                        <div className="text-center p-4">
                          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600 font-semibold mb-1 text-xs">Financial Document Not Available</p>
                          <p className="text-[10px] text-gray-500">
                            Please ensure the image file is in the public folder.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ultra Compact Footer */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 text-center shadow-lg">
          <p className="text-xs text-white font-semibold">
            Registered Charity Number: 1069814 - THEO TRUST
          </p>
          <p className="text-[10px] text-blue-100 mt-0.5">
            Filed with the Charity Commission for England and Wales
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accounts;