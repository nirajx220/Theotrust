import React from 'react';
import { Link } from 'react-router-dom';

const DonationSection = () => {
  return (
    <section className="bg-gradient-to-br from-rose-700 via-red-700 to-orange-700 py-16 text-white">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-bold tracking-[0.25em] text-amber-200 uppercase">Take action</p>
        <h2
          className="mb-4 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: 'Merriweather, Georgia, serif' }}
        >
          Help a child move from crisis to classroom
        </h2>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-rose-100">
          Every donation helps TheoTrust continue educational support for children in vulnerable situations,
          both in the UK and overseas communities.
        </p>

        <Link
          to="/donate"
          className="inline-flex rounded-full bg-amber-300 px-8 py-3 font-bold text-slate-900 transition hover:bg-amber-200"
        >
          Donate Now
        </Link>
      </div>
    </section>
  );
};

export default DonationSection;