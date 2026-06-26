import React from 'react';

const Programs = () => {
  const programs = [
    {
      title: 'Education',
      description: 'Providing quality education to underprivileged children.'
    },
    {
      title: 'Healthcare',
      description: 'Ensuring access to basic healthcare services.'
    },
    {
      title: 'Nutrition',
      description: 'Fighting malnutrition through meal programs.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">
                {program.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;