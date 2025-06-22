import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Github, Linkedin, ExternalLink, MessageCircle } from "lucide-react";

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "prajwalkum03airs@gmail.com",
      href: "mailto:prajwalkum03airs@gmail.com",
      color: "cyber-blue"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "WhatsApp",
      value: "+91 7004990508",
      href: "https://wa.me/7004990508",
      color: "cyber-green"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "IIIT Sricity, Chittor, India",
      href: "https://www.google.com/maps/place/Indian+Institute+of+Information+Technology,+Sri+City,+Chittoor/@13.5555453,80.0240735,17z/data=!3m1!4b1!4m6!3m5!1s0x3a4d773f1e0f8721:0xadb0842ffc2719e4!8m2!3d13.5555453!4d80.0266484!16s%2Fm%2F0wbmm91?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D",
      color: "cyber-purple"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com/prajwal9773",
      color: "cyber-blue",
      description: "My little inventions"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/prajwal-kumar-b2798b24a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      color: "cyber-green",
      description: "Professional network & opportunities"
    }
  ];

  const collaborationAreas = [
    {
      title: "AI/ML Projects",
      description: "Collaborate on cutting-edge AI integration and machine learning applications",
      icon: "🤖"
    },
    {
      title: "Web Development",
      description: "Build scalable applications through AI-driven development.",
      icon: "🌐"
    },
    {
      title: "Startup Opportunities",
      description: "Join innovative teams looking for AI-first development approaches",
      icon: "🚀"
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-20 pb-20 md:pb-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 text-cyber">
            Let's Build the Future
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to explore the possibilities of  development? Let's connect and create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto contact-grid">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-orbitron font-bold text-white mb-8">
              Get In Touch
            </h3>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.label === "WhatsApp" || contact.label === "Location" ? "_blank" : undefined}
                  rel={contact.label === "WhatsApp" || contact.label === "Location" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center gap-4 glass-card p-4 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className={`p-3 rounded-full bg-${contact.color}/20 text-${contact.color} group-hover:scale-110 transition-transform duration-300`}>
                    {contact.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{contact.label}</div>
                    <div className="text-white font-medium">{contact.value}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <h4 className="text-lg font-orbitron font-bold text-white mb-4">
              Connect Online
            </h4>
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center gap-4 glass-card p-4 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className={`p-3 rounded-full bg-${social.color}/20 text-${social.color} group-hover:scale-110 transition-transform duration-300`}>
                    {social.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{social.label}</div>
                    <div className="text-sm text-gray-400">{social.description}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Collaboration Areas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-orbitron font-bold text-white mb-8">
              Collaboration Opportunities
            </h3>

            <div className="space-y-6">
              {collaborationAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {area.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-orbitron font-bold text-white mb-2 group-hover:text-cyber-blue transition-colors duration-300">
                        {area.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>


          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-gray-400">
            <span className="text-cyber-blue font-medium">Prajwal kumar</span> • 
             Full-Stack Developer • 
            <span className="text-cyber-green">Building the Future, One at a Time</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
