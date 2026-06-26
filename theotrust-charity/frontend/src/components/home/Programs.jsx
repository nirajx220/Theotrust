import React from 'react';
import { ArrowRight, BookOpen, Heart, HandHeart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Programs = () => {
  const whatWeDo = [
    {
      title: 'UK Youngsters',
      description:
        'Supporting vulnerable young people with education pathways, residential opportunities and practical mentorship in the UK.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Overseas Children',
      description:
        'Contributing to long-term schooling in India and scholarships for children in the Philippines facing severe hardship.',
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: 'Fundraising Events',
      description:
        'Volunteer-led fundraising activities that keep projects running and connect supporters to real community outcomes.',
      icon: <Heart className="h-6 w-6" />,
    },
    {
      title: 'Direct Giving',
      description:
        'Donations are directed toward education and welfare projects where children need immediate and sustained support.',
      icon: <HandHeart className="h-6 w-6" />,
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-3">
            <p className="mb-2 text-xs font-bold tracking-[0.25em] text-teal-700 uppercase">About TheoTrust</p>
            <h2
              className="mb-5 text-3xl font-bold text-slate-900 sm:text-4xl"
              style={{ fontFamily: 'Merriweather, Georgia, serif' }}
            >
              Built by volunteers, focused on children, committed to education
            </h2>

            <div className="space-y-5 text-lg leading-relaxed text-slate-700">
              <p>
                Theo Trust is run by dedicated volunteers helping troubled youngsters build stable futures through education.
                The charity first supported children from orphanages in Russia and has helped more than 50 young people
                complete one-year residential education courses in the UK.
              </p>
              <p>
                When Ukraine was invaded, the focus expanded to support displaced families through the UK Homes for
                Ukraine scheme, while also backing practical education projects in Ukraine, including support linked to
                kindergartens in Mykolaiv and Cherkasy.
              </p>
              <p>
                In India, Theo Trust contributes to the work of Project Mala, where six schools provide education to
                around 1400 rural children, and continues to support opportunities for selected students to study in the UK.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-8 text-white shadow-xl">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
              <h3 className="mb-4 text-2xl font-bold" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                Why education first?
              </h3>
              <p className="mb-6 leading-relaxed text-slate-100">
                Education is the most durable form of support. It creates confidence, employability and a path to
                long-term dignity for children and families.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-2.5 font-semibold text-slate-900 transition hover:bg-emerald-200"
              >
                Read full TheoTrust story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold tracking-[0.25em] text-teal-700 uppercase">What we do</p>
            <h3
              className="text-3xl font-bold text-slate-900 sm:text-4xl"
              style={{ fontFamily: 'Merriweather, Georgia, serif' }}
            >
              Practical action for children in the UK and abroad
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.map((item, index) => (
              <article
                key={index}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-xl bg-teal-100 p-3 text-teal-700 transition group-hover:bg-teal-700 group-hover:text-white">
                  {item.icon}
                </div>
                <h4 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h4>
                <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;