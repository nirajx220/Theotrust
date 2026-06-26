import React from 'react';
import { GraduationCap, School, HeartHandshake, Globe } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      number: '50+',
      label: 'Young people supported through UK one-year residential courses',
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      number: '1400+',
      label: 'Rural students reached through Project Mala partner schools in India',
      icon: <School className="h-6 w-6" />,
    },
    {
      number: '2',
      label: 'Kindergartens in Mykolaiv and Cherkasy receiving educational support',
      icon: <HeartHandshake className="h-6 w-6" />,
    },
    {
      number: 'UK + Overseas',
      label: 'Local and international projects delivered by an active volunteer team',
      icon: <Globe className="h-6 w-6" />,
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-2 text-xs font-bold tracking-[0.25em] text-teal-700 uppercase">Measured impact</p>
          <h2
            className="text-3xl font-bold text-slate-900 sm:text-4xl"
            style={{ fontFamily: 'Merriweather, Georgia, serif' }}
          >
            Evidence-driven support for vulnerable children
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-teal-100 p-3 text-teal-700">{stat.icon}</div>
              <h3 className="mb-2 text-3xl font-bold text-slate-900">
                {stat.number}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;