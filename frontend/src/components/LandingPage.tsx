import React from 'react';
import { Link } from 'react-router-dom';
import {
  Printer,
  Clock,
  Award,
  Leaf,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Star,
  FileText,
  Megaphone,
  CreditCard,
  Package,
  Calendar,
  Image as ImageIcon,
  Flag,
  Shirt,
  Badge,
  BookOpen,
  Truck,
} from 'lucide-react';

/**
 * Hero Section Component
 */
const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-secondary pt-12 pb-20 md:pt-16 md:pb-32">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Premium Quality Printing
              <span className="block text-secondary">at Unbeatable Prices</span>
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              From business cards to banners, we bring your vision to life with cutting-edge
              technology, eco-friendly materials, and lightning-fast turnaround times.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                Browse Products
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-primary"
              >
                Contact Us
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap gap-8 text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-secondary" />
                <span className="font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-secondary" />
                <span className="font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-secondary" />
                <span className="font-medium">Best Prices</span>
              </div>
            </div>
          </div>

          {/* Right Visual Elements */}
          <div className="relative hidden md:block">
            {/* Floating Service Cards with Enhanced Design */}
            <div className="relative h-[520px]">
              {/* Card 1 - Business Cards (Top Left) */}
              <div className="group absolute left-0 top-0 w-[200px] rounded-3xl border-2 border-white/20 bg-gradient-to-br from-white/95 to-white/90 p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:shadow-[0_20px_50px_rgba(198,110,82,0.3)]">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <CreditCard className="h-9 w-9 text-primary transition-transform duration-300" />
                </div>
                <h3 className="mb-1 text-xl font-bold text-gray-900">Business Cards</h3>
                <p className="mb-3 text-sm font-medium text-gray-600">Premium quality</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">₹250</span>
                  <span className="text-xs text-gray-500">/100</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">cards</p>
              </div>

              {/* Card 2 - Banners (Top Right) */}
              <div className="group absolute -right-4 top-12 w-[200px] rounded-3xl border-2 border-white/20 bg-gradient-to-br from-white/95 to-white/90 p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-secondary/50 hover:shadow-[0_20px_50px_rgba(233,182,59,0.3)]">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Megaphone className="h-9 w-9 text-secondary transition-transform duration-300" />
                </div>
                <h3 className="mb-1 text-xl font-bold text-gray-900">Banners</h3>
                <p className="mb-3 text-sm font-medium text-gray-600">Large format</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-secondary">₹25</span>
                  <span className="text-xs text-gray-500">/sq.ft</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Outdoor quality</p>
              </div>

              {/* Card 3 - Printing Services (Bottom Center) */}
              <div className="group absolute bottom-0 left-1/2 w-[220px] -translate-x-1/2 rounded-3xl border-2 border-white/20 bg-gradient-to-br from-white via-white/95 to-white/90 p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-secondary/50 hover:shadow-[0_20px_50px_rgba(233,182,59,0.3)]">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/30 via-secondary/20 to-secondary/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Printer className="h-9 w-9 text-primary transition-transform duration-300" />
                </div>
                <h3 className="mb-1 text-xl font-bold text-gray-900">12+ Services</h3>
                <p className="mb-3 text-sm font-medium text-gray-600">Complete solutions</p>
                <div className="flex items-center justify-center gap-1 rounded-lg bg-secondary/10 px-3 py-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary transition-transform duration-300 group-hover:scale-125" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-gray-700">4.9</span>
                </div>
              </div>

              {/* Enhanced Decorative Floating Elements */}
              <div className="absolute -right-12 top-1/4 h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-secondary/30 to-secondary/10 blur-3xl"></div>
              <div className="absolute -bottom-12 -left-12 h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-white/20 to-white/5 blur-3xl" style={{ animationDelay: '1s' }}></div>
              <div className="absolute left-1/4 top-1/2 h-24 w-24 animate-pulse rounded-full bg-primary/20 blur-2xl" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Enhanced Stats Banner */}
            <div className="mt-10 rounded-3xl border border-white/20 bg-gradient-to-r from-white/15 via-white/20 to-white/15 p-8 backdrop-blur-md shadow-2xl">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="group cursor-default">
                  <div className="mb-2 text-4xl font-bold text-white transition-all duration-300 group-hover:scale-110 group-hover:text-secondary">1000+</div>
                  <div className="text-sm font-medium text-white/90">Happy Clients</div>
                  <div className="mt-1 h-1 w-12 rounded-full bg-secondary/50 mx-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="group cursor-default border-x border-white/20 px-6">
                  <div className="mb-2 text-4xl font-bold text-secondary transition-all duration-300 group-hover:scale-110">5000+</div>
                  <div className="text-sm font-medium text-white/90">Projects Done</div>
                  <div className="mt-1 h-1 w-12 rounded-full bg-secondary/50 mx-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="group cursor-default">
                  <div className="mb-2 text-4xl font-bold text-white transition-all duration-300 group-hover:scale-110 group-hover:text-secondary">4.9</div>
                  <div className="text-sm font-medium text-white/90">Rating</div>
                  <div className="mt-1 h-1 w-12 rounded-full bg-secondary/50 mx-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Services Section Component
 */
const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: ImageIcon,
      title: 'Posters & Pamphlets',
      description: 'Eye-catching designs that grab attention and deliver your message effectively.',
    },
    {
      icon: Megaphone,
      title: 'Banners & Hoardings',
      description: 'Large format printing for maximum visibility and brand impact.',
    },
    {
      icon: CreditCard,
      title: 'Business Cards',
      description: 'Professional cards that make a lasting first impression.',
    },
    {
      icon: Package,
      title: 'Packaging Materials',
      description: 'Custom packaging solutions for your products and brand.',
    },
    {
      icon: Calendar,
      title: 'Calendars',
      description: 'Customized calendars to keep your brand visible all year.',
    },
    {
      icon: Flag,
      title: 'Standees',
      description: 'Portable and impactful displays for events and promotions.',
    },
    {
      icon: Award,
      title: 'Certificates',
      description: 'Premium quality certificates for awards and recognition.',
    },
    {
      icon: BookOpen,
      title: 'Catalogues',
      description: 'Professional product catalogues that showcase your offerings.',
    },
    {
      icon: Truck,
      title: 'Vehicle Branding',
      description: 'Turn your vehicles into mobile billboards with stunning wraps.',
    },
    {
      icon: Shirt,
      title: 'T-Shirt Printing',
      description: 'High-quality custom t-shirt prints for events and merchandise.',
    },
    {
      icon: Badge,
      title: 'ID Cards',
      description: 'Professional ID cards with security features and custom designs.',
    },
    {
      icon: FileText,
      title: 'Custom Projects',
      description: 'Have something unique in mind? We love creative challenges!',
    },
  ];

  return (
    <section id="services" className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12 md:mb-16">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl sm:mb-4">
            Our <span className="text-primary">Printing Services</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
            Comprehensive printing solutions for businesses, events, and personal needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 active:scale-[0.98] sm:p-6 sm:hover:scale-105 sm:hover:border-primary sm:hover:shadow-lg"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block hidden"></div>
              
              {/* Content */}
              <div className="relative">
                <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-accent to-accent/80 p-3 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:shadow-md sm:p-3">
                  <service.icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-white sm:h-6 sm:w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary sm:text-lg sm:font-semibold">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center sm:mt-12">
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all active:scale-95 sm:px-8 sm:py-4 sm:text-lg sm:hover:bg-primary-dark sm:hover:shadow-xl"
          >
            View All Products & Pricing
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

/**
 * How It Works Section
 */
const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '1',
      title: 'Share Your Requirements',
      description: 'Contact us via call, WhatsApp, or email with your printing needs and specifications.',
    },
    {
      number: '2',
      title: 'Get Instant Quote',
      description: 'Receive a competitive quote within minutes. No hidden charges, fully transparent pricing.',
    },
    {
      number: '3',
      title: 'Approve & Confirm',
      description: 'Review the design mockup, approve the final proof, and confirm your order.',
    },
    {
      number: '4',
      title: 'Fast Production',
      description: 'We start printing immediately using state-of-the-art equipment and premium materials.',
    },
    {
      number: '5',
      title: 'Quality Check',
      description: 'Every product goes through rigorous quality inspection to ensure perfection.',
    },
    {
      number: '6',
      title: 'Receive Your Order',
      description: 'Pick up from our store or get it delivered to your doorstep. 100% satisfaction guaranteed!',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-accent/30 to-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            From concept to delivery – our seamless 6-step process makes printing hassle-free
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Step Card */}
              <div className="group relative h-full rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-primary hover:shadow-lg">
                {/* Step Number */}
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white group-hover:scale-110 group-hover:bg-secondary">
                  {step.number}
                </div>
                
                {/* Step Content */}
                <h3 className="mb-3 text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {/* Connector Arrow (hidden on mobile, last item) */}
              {idx < steps.length - 1 && (
                <div className="absolute -bottom-4 left-1/2 hidden -translate-x-1/2 text-primary lg:block lg:-bottom-0 lg:left-auto lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-1/2">
                  <ArrowRight className="h-8 w-8 rotate-90 lg:rotate-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Why Choose Us Section
 */
const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Lightning Fast Turnaround',
      description: 'Most orders completed within 24-48 hours. Rush orders available.',
    },
    {
      icon: Award,
      title: 'Premium Quality Materials',
      description: 'We use only the finest papers, inks, and materials for lasting results.',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly Options',
      description: 'Sustainable printing solutions that are kind to the environment.',
    },
    {
      icon: DollarSign,
      title: 'Competitive Pricing',
      description: 'Best value for money with transparent pricing and no hidden costs.',
    },
    {
      icon: Printer,
      title: 'Latest Technology',
      description: 'State-of-the-art printing equipment for perfect results every time.',
    },
    {
      icon: CheckCircle,
      title: '100% Satisfaction Guarantee',
      description: "We don't rest until you're completely happy with the final product.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Why Choose <span className="text-primary">Uttam Printing?</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We're not just another printing service – we're your partner in making a lasting impression
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Pricing Preview Section
 */
const PricingPreviewSection: React.FC = () => {
  const pricingHighlights = [
    {
      service: 'Business Cards',
      price: '₹250',
      unit: 'per 100 cards',
      features: ['Premium quality', 'Multiple finishes', 'Fast delivery'],
    },
    {
      service: 'Banners',
      price: '₹25',
      unit: 'per sq.ft',
      features: ['Weather resistant', 'Vibrant colors', 'Custom sizes'],
    },
    {
      service: 'Flex Printing',
      price: '₹15',
      unit: 'per sq.ft',
      features: ['High resolution', 'Outdoor quality', 'Quick turnaround'],
    },
    {
      service: 'T-Shirt Printing',
      price: '₹150',
      unit: 'per piece',
      features: ['Long-lasting print', 'Any design', 'Bulk discounts'],
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-accent/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Competitive rates with no hidden costs. Prices starting from:
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingHighlights.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-lg"
            >
              <h3 className="mb-3 text-xl font-bold text-gray-900">{item.service}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary">{item.price}</span>
                <span className="text-sm text-gray-600"> {item.unit}</span>
              </div>
              <ul className="space-y-2">
                {item.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Testimonials/Clients Section
 */
const ClientsSection: React.FC = () => {
  const stats = [
    { value: '1000+', label: 'Happy Clients' },
    { value: '5000+', label: 'Projects Completed' },
    { value: '10+', label: 'Years Experience' },
    { value: '4.9/5', label: 'Customer Rating' },
  ];

  return (
    <section className="bg-primary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">
            Trusted by Businesses Across <span className="text-secondary">India</span>
          </h2>
          <p className="mb-12 text-lg text-white/90">
            From startups to established enterprises, we've helped thousands bring their vision to print
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-2 text-4xl font-bold text-secondary md:text-5xl">{stat.value}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Contact Quick Inquiry Section
 */
const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Let's Bring Your <span className="text-primary">Vision to Life</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Have a project in mind? Get in touch with us for a free consultation and quote.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            <a
              href="tel:+917481068602"
              className="group flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 text-center transition-all hover:border-primary hover:bg-primary hover:text-white"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white transition-colors group-hover:bg-white group-hover:text-primary">
                <Phone className="h-7 w-7" />
              </div>
              <div>
                <div className="mb-1 text-sm font-medium text-gray-600 group-hover:text-white/80">
                  Call Us Now
                </div>
                <div className="text-lg font-semibold">+91 7481068602</div>
              </div>
            </a>

            <a
              href="https://wa.me/917481068602"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 text-center transition-all hover:border-green-500 hover:bg-green-500 hover:text-white"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white transition-colors group-hover:bg-white group-hover:text-green-500">
                <MessageCircle className="h-7 w-7" />
              </div>
              <div>
                <div className="mb-1 text-sm font-medium text-gray-600 group-hover:text-white/80">
                  WhatsApp Us
                </div>
                <div className="text-lg font-semibold">Quick Response</div>
              </div>
            </a>

            <a
              href="mailto:uttamprinting@zohomail.in"
              className="group flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 text-center transition-all hover:border-secondary hover:bg-secondary hover:text-white"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white transition-colors group-hover:bg-white group-hover:text-secondary">
                <Mail className="h-7 w-7" />
              </div>
              <div>
                <div className="mb-1 text-sm font-medium text-gray-600 group-hover:text-white/80">
                  Email Us
                </div>
                <div className="text-lg font-semibold">Send a Message</div>
              </div>
            </a>
          </div>

          {/* Visit Us Section */}
          <div className="mt-12 rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
            <h3 className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold text-gray-900">
              <CheckCircle className="h-6 w-6 text-primary" />
              Visit Our Store
            </h3>
            <p className="mb-4 text-gray-700">
              Near Palan G Mall, Opp. Mi Store
              <br />
              Jehanabad 804408, Bihar
            </p>
            <a
              href="https://www.google.com/maps?q=25.219198,84.9896993"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg"
            >
              Get Directions
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Link to Contact Form */}
          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-8 py-4 text-lg font-semibold text-primary transition-all hover:bg-primary hover:text-white"
            >
              Use Our Contact Form
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Main Landing Page Component
 */
export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <PricingPreviewSection />
      <ClientsSection />
      <ContactSection />
    </div>
  );
};

