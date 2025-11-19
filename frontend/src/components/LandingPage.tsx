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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-secondary py-20 md:py-32">
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

          {/* Right Image/Illustration */}
          <div className="relative hidden md:block">
            <div className="relative rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                {[Printer, FileText, Package, Megaphone].map((Icon, idx) => (
                  <div
                    key={idx}
                    className="flex aspect-square items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-transform hover:scale-110"
                  >
                    <Icon className="h-12 w-12 text-white" />
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl bg-white p-6 text-center">
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="mt-2 font-semibold text-gray-900">1000+ Happy Clients</p>
                <p className="text-sm text-gray-600">Trusted by businesses across India</p>
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
    <section id="services" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Our <span className="text-primary">Printing Services</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Comprehensive printing solutions for businesses, events, and personal needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:scale-105 hover:border-primary hover:shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-lg bg-accent p-3 group-hover:bg-primary group-hover:text-white">
                <service.icon className="h-6 w-6 text-primary group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
          >
            View All Products & Pricing
            <ArrowRight className="h-5 w-5" />
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

