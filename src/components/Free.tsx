export default function AdditionalServices() {
  const services = [
    {
      title: "INDIVIDUAL CONSULTATIONS",
      description:
        "Prices are set by experts depending on the level of specialization and session duration.",
    },
    {
      title: "PERSONALIZED DEVELOPMENT PLANS AND MENTORSHIP",
      description:
        "Mentorship options and the creation of personalized development plans are offered based on individual requests and are priced separately.",
    },
    {
      title: "SPECIALIZED WORKSHOPS AND MASTERCLASSES",
      description:
        "Access to unique events conducted by leading industry experts, with the option to pay for each event separately.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#001f33] to-[#00334d] py-16 text-white">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Additional Services</h2>
        <p className="text-lg mb-12">
          On the platform, the following expert service purchase options are
          available:
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-[#0a3a53] p-6 rounded-xl shadow-md border border-cyan-600"
            >
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">
                {service.title}
              </h3>
              <p className="text-base text-white/90">{service.description}</p>

              <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400"></div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 bg-[url('/path/to/your/starry-background.jpg')] bg-cover bg-center opacity-20 pointer-events-none"
        aria-hidden="true"
      ></div>
    </section>
  );
}
