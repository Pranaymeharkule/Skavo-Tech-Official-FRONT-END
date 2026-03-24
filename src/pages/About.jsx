import Container from "../components/layout/Container";
import { motion } from "framer-motion";
import { FiLinkedin, FiCheckCircle } from "react-icons/fi";

const team = [
  {
    name: "Sakshi Maske",
    role: "Founder & Python Developer",
    image: "/team/sakshi-maske.png",
    linkedin: "https://www.linkedin.com/in/sakshi-maske-3849b3259/"
  },
  {
    name: "Saurabh Sahare",
    role: "Founder & CA",
    image: "/team/saurabh-sahare.png",
    linkedin: "https://www.linkedin.com/in/saurabh-sahare-70a480129/"
  },
  {
    name: "Pranay Meharkule",
    role: "Full Stack Developer",
    image: "/team/pranay-meharkule.png",
    linkedin: "https://linkedin.com/in/pranay-meharkule"
  }
];

export default function About() {
  return (
    <section className="relative bg-[#070707] text-white overflow-hidden">

      {/* Glow Background */}
      <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-purple-600/20 blur-[180px] rounded-full" />
      <div className="absolute -bottom-40 right-1/3 w-[600px] h-[600px] bg-blue-600/20 blur-[180px] rounded-full" />

      <Container>

        {/* HERO */}
        <div className="pt-40 pb-24 text-center max-w-4xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold mb-6"
          >
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Skavo Tech Solutions Pvt. Ltd
            </span>
          </motion.h1>

          <p className="text-gray-400 leading-relaxed text-lg">
            Skavo Tech Solutions Pvt. Ltd is one of the leading software development
            companies based in Nagpur and Navi Mumbai. We provide modern
            technology solutions including web development, mobile
            applications, automation systems, and digital marketing
            services for businesses across the globe.
          </p>

        </div>


        {/* COMPANY OVERVIEW */}

        <div className="grid md:grid-cols-2 gap-16 mb-32">

          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Who We Are
            </h2>

            <p className="text-gray-400 leading-relaxed">
              Skavo Tech Solutions Pvt. Ltd is a technology-driven company delivering
              innovative digital solutions to businesses worldwide. With
              years of experience in software development, our team combines
              technical expertise with creativity to build powerful digital
              products that provide seamless functionality and stunning
              visual experiences.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6">
              What We Actually Do
            </h2>

            <p className="text-gray-400 leading-relaxed">
              We design and develop modern digital platforms including
              websites, mobile applications, ERP and CRM systems,
              automation solutions, and digital marketing strategies.
              Our goal is to help businesses improve productivity,
              strengthen their digital presence, and accelerate growth.
            </p>
          </div>

        </div>


        {/* MISSION & VISION */}

        <div className="grid md:grid-cols-2 gap-12 mb-32">

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10">

            <h3 className="text-2xl font-semibold mb-4">
              Our Mission
            </h3>

            <p className="text-gray-400">
              Our mission is to deliver innovative technology solutions
              that create real value for our clients. Through advanced
              engineering and a customer-focused approach, we help
              businesses improve efficiency, adopt new technologies,
              and grow successfully in the digital world.
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10">

            <h3 className="text-2xl font-semibold mb-4">
              Our Vision
            </h3>

            <p className="text-gray-400">
              Our vision is to become a leading technology service
              provider in India by delivering innovative digital
              solutions that empower businesses and drive long-term
              success for our customers.
            </p>

          </div>

        </div>


        {/* SERVICES */}

        <div className="mb-32 text-center">

          <h2 className="text-4xl font-bold mb-16">
            Our Core Services
          </h2>

          <div className="grid md:grid-cols-3 gap-12">

            {[
              "Web Development",
              "Mobile App Development",
              "AI & Automation Solutions",
              "ERP & CRM Systems",
              "Digital Marketing",
              "Graphic Design"
            ].map((service, i) => (

              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-purple-500/40 transition"
              >
                <p className="text-gray-300">{service}</p>
              </div>

            ))}

          </div>

        </div>


        {/* SKILLS */}

        <div className="mb-32 text-center">

          <h2 className="text-4xl font-bold mb-16">
            Our Activities & Skills
          </h2>

          <div className="grid md:grid-cols-4 gap-12">

            {[
              { skill: "Native Mobile App Development", value: "70%" },
              { skill: "Custom Web Development", value: "90%" },
              { skill: "Digital Marketing", value: "60%" },
              { skill: "Graphic Designing", value: "50%" }
            ].map((item, i) => (

              <div key={i}>

                <h3 className="text-4xl font-bold text-purple-400 mb-2">
                  {item.value}
                </h3>

                <p className="text-gray-400">
                  {item.skill}
                </p>

              </div>

            ))}

          </div>

        </div>


        {/* WHY CHOOSE US */}

        <div className="mb-32 text-center">

          <h2 className="text-4xl font-bold mb-16">
            Why Our Services Are Better
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">

            {[
              "Customized technology solutions tailored to your business needs",
              "Quick response and dedicated client support",
              "Focus on delivering long-term value",
              "Modern technology stack and development practices",
              "Client-focused development approach",
              "Scalable and secure digital solutions"
            ].map((item, i) => (

              <div key={i} className="flex gap-4">

                <FiCheckCircle className="text-purple-400 mt-1" />

                <p className="text-gray-300">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </div>


  


        {/* CTA */}

        <div className="text-center pb-32">

          <h2 className="text-4xl font-bold mb-6">
            Let’s Build the Future Together
          </h2>

          <p className="text-gray-400 mb-8">
            Partner with Skavo Tech Solutions Pvt. Ltd to build scalable digital
            platforms, modern applications, and innovative technology
            solutions that help your business grow.
          </p>

          <button className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
            Contact Us
          </button>

        </div>

      </Container>
    </section>
  );
}