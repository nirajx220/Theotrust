import React from 'react';
import { BookOpen, Heart, Globe, ShieldCheck, Users, Home, School2, BadgeCheck } from 'lucide-react';

const AboutPage = () => {
  const highlights = [
    {
      title: 'Volunteer-led charity',
      description:
        'Theo Trust is run by professional volunteers dedicated to helping troubled youngsters and families over the long term.',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Education first',
      description:
        'The charity supports children through residential courses, state boarding schools and practical learning opportunities.',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: 'UK and overseas',
      description:
        'Projects span the UK, Ukraine, India and the Philippines, shaped around urgent educational and welfare needs.',
      icon: <Globe className="h-5 w-5" />,
    },
  ];

  const focusAreas = [
    {
      title: 'Ukraine response',
      icon: <Home className="h-6 w-6" />,
      points: [
        'Supporting families through the UK Homes for Ukraine scheme.',
        'Providing portable generators for front-line hospitals.',
        'Helping a children’s hospital with a heating unit under construction away from the battle ground.',
        'Working with kindergartens in Mykolaiv and Cherkasy so children can switch from classrooms to blast shelter.',
      ],
    },
    {
      title: 'UK support',
      icon: <School2 className="h-6 w-6" />,
      points: [
        'Working with charities that place vulnerable children in state boarding schools.',
        'Providing ancillary support and recreation for families.',
        'Serving communities in some of the most deprived areas in the country.',
      ],
    },
    {
      title: 'India and beyond',
      icon: <Globe className="h-6 w-6" />,
      points: [
        'Contributing to Project Mala, founded by Robin Garland.',
        'Supporting six schools educating around 1400 impoverished rural children.',
        'Helping selected students spend one year studying in the UK.',
        'Assisting two youngsters in the Philippines with education support and family hardship.',
      ],
    },
  ];

  const principles = [
    {
      title: 'Compassionate continuity',
      text: 'Children already helped are not abandoned when circumstances change.',
      icon: <Heart className="h-5 w-5" />,
    },
    {
      title: 'Responsible stewardship',
      text: 'Support is directed toward meaningful education, shelter and practical help.',
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      title: 'Real outcomes',
      text: 'The charity focuses on outcomes that improve confidence, stability and long-term opportunity.',
      icon: <BadgeCheck className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.16),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-5 lg:items-end">
            <div className="lg:col-span-3">
              <p className="mb-3 text-xs font-bold tracking-[0.28em] text-emerald-300 uppercase">
                Registered Charity No. 1069814
              </p>
              <h1
                className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                About TheoTrust
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
                Theo Trust is special because it is run by professional volunteers dedicated to helping troubled
                youngsters. The charity began by supporting children from orphanages in Russia and has since continued
                to stand with young people and families across the UK and overseas.
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
                <h2 className="mb-4 text-2xl font-bold" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                  A charity built on continuity
                </h2>
                <p className="text-sm leading-relaxed text-slate-100">
                  When circumstances change, Theo Trust keeps supporting the children and communities it has already
                  committed to helping. That long-term approach is at the heart of the charity’s work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-2xl bg-teal-100 p-3 text-teal-700">{item.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-2 text-xs font-bold tracking-[0.25em] text-teal-700 uppercase">Our work</p>
          <h2
            className="text-3xl font-bold text-slate-900 sm:text-4xl"
            style={{ fontFamily: 'Merriweather, Georgia, serif' }}
          >
            Where TheoTrust focuses its support
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {focusAreas.map((area) => (
            <article key={area.title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-5 inline-flex rounded-2xl bg-slate-100 p-3 text-slate-700">{area.icon}</div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900">{area.title}</h3>
              <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
                {area.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-teal-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.25em] text-teal-700 uppercase">How we work</p>
              <h2
                className="mb-5 text-3xl font-bold text-slate-900 sm:text-4xl"
                style={{ fontFamily: 'Merriweather, Georgia, serif' }}
              >
                The ethos behind TheoTrust
              </h2>
              <p className="text-lg leading-relaxed text-slate-700">
                The charity works with children and families in ways that are practical, steady and human. That includes
                helping families integrate after displacement, supporting education in deprived areas, and making sure
                opportunities continue for those who still need help.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {principles.map((item) => (
                <div key={item.title} className="rounded-2xl bg-slate-50 p-5 shadow-sm ring-1 ring-slate-200">
                  <div className="mb-3 inline-flex rounded-xl bg-emerald-100 p-3 text-emerald-700">{item.icon}</div>
                  <h3 className="mb-2 text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
