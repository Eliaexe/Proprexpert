"use client"

import { useState, useEffect } from "react"
import { LoadingBubble } from "@/components/loading"
import { Playfair_Display } from "next/font/google"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Car, Sofa, CarIcon as Carpet, Phone, ArrowRight, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import ParticlesBackground from "@/components/particles-background"

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula un tempo di caricamento
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingBubble />
  }

  return (
    <div className="min-h-screen">
      <ParticlesBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-sm border-b bg-white/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className={`${playfair.className} text-2xl font-bold text-[#B8D8E8]`}>PropreXpert</div>
          <Button
            variant="ghost"
            className="text-[#B8D8E8]"
            onClick={() => {
              const contactSection = document.getElementById("contact")
              contactSection?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <Phone className="mr-2 h-4 w-4" /> Contactez-nous
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1
            className={`${playfair.className} text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight`}
          >
            Redonnez vie à vos espaces
            <span className="text-[#B8D8E8] block mt-2">avec notre expertise</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Service professionnel de nettoyage pour vos tapis, canapés et intérieurs de voiture
          </p>
          <Button size="lg" className="bg-[#B8D8E8] hover:bg-[#9AC0D0] text-white w-full sm:w-auto">
            Réserver maintenant <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="relative py-16 md:py-32">
        <div className="absolute inset-0 bg-white skew-y-3 -z-10"></div>
        <div className="container mx-auto px-4">
          <h2 className={`${playfair.className} text-2xl md:text-4xl font-bold text-center mb-12`}>Nos Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Carpet,
                title: "Nettoyage de Tapis",
                desc: "Restauration profonde et protection durable de vos tapis",
              },
              {
                icon: Sofa,
                title: "Nettoyage de Canapés",
                desc: "Rafraîchissement et désinfection de vos meubles rembourrés",
              },
              { icon: Car, title: "Intérieur de Voiture", desc: "Détailing complet de l'habitacle de votre véhicule" },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="touch-none"
              >
                <Card className="p-6 hover:shadow-lg transition-shadow group">
                  <div className="h-12 w-12 rounded-full bg-[#B8D8E8]/20 flex items-center justify-center mb-4 group-hover:bg-[#B8D8E8] transition-colors">
                    <service.icon className="h-6 w-6 text-[#B8D8E8] group-hover:text-white" />
                  </div>
                  <h3 className={`${playfair.className} text-xl font-semibold mb-2`}>{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Vertical Timeline */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#B8D8E8]/10 -skew-y-3 -z-10"></div>
        <div className="container mx-auto px-4">
          <h2 className={`${playfair.className} text-2xl md:text-4xl font-bold text-center mb-12`}>
            Pourquoi Nous Choisir
          </h2>
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line - hidden on mobile */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#B8D8E8] hidden md:block"></div>

            {[
              { title: "Expertise", desc: "Plus de 10 ans d'expérience dans le nettoyage professionnel", year: "2013" },
              {
                title: "Écologique",
                desc: "Utilisation exclusive de produits respectueux de l'environnement",
                year: "2016",
              },
              { title: "Innovation", desc: "Adoption des dernières technologies de nettoyage", year: "2019" },
              { title: "Excellence", desc: "Plus de 10,000 clients satisfaits", year: "2023" },
            ].map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 0, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className={`relative mb-8 md:mb-12 ${i % 2 === 0 ? "md:pr-8 md:ml-auto md:w-1/2" : "md:pl-8 md:w-1/2"}`}
                style={{ marginLeft: i % 2 === 0 && window.innerWidth >= 768 ? "50%" : "0" }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg relative">
                  {/* Dot on timeline - visible only on desktop */}
                  <div
                    className="hidden md:block absolute top-6 w-4 h-4 rounded-full bg-[#B8D8E8] border-4 border-white"
                    style={{ [i % 2 === 0 ? "left" : "right"]: "-34px" }}
                  ></div>
                  {/* Year badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-[#B8D8E8]/20 text-sm mb-2">
                    {milestone.year}
                  </div>
                  <h3 className={`${playfair.className} text-xl font-semibold mb-2`}>{milestone.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-white skew-y-3 -z-10"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#B8D8E8] rounded-2xl p-6 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#fff_25%,transparent_25%,transparent_75%,#fff_75%)] bg-[length:20px_20px] opacity-5"></div>
            <Sparkles className="h-12 w-12 text-white mx-auto mb-6" />
            <h2 className={`${playfair.className} text-2xl md:text-4xl font-bold text-white mb-6`}>
              Prêt à transformer vos espaces ?
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              Profitez de notre offre spéciale : -20% sur votre première réservation
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-[#B8D8E8] hover:bg-white/90 w-full sm:w-auto"
            >
              Réserver maintenant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 md:py-24 bg-[#B8D8E8]/10">
        <div className="container mx-auto px-4">
          <h2 className={`${playfair.className} text-2xl md:text-4xl font-bold text-center mb-12`}>Contactez-nous</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6 order-2 md:order-1">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-[#B8D8E8] mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${playfair.className} text-xl font-semibold mb-2`}>Téléphone</h3>
                  <a href="tel:+33123456789" className="text-gray-600 text-lg hover:text-[#B8D8E8] transition-colors">
                    +33 1 23 45 67 89
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Lun-Ven: 8h-19h</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-[#B8D8E8] mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${playfair.className} text-xl font-semibold mb-2`}>Email</h3>
                  <a
                    href="mailto:contact@proprexpert.fr"
                    className="text-gray-600 text-lg hover:text-[#B8D8E8] transition-colors"
                  >
                    contact@proprexpert.fr
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-[#B8D8E8] mt-1 flex-shrink-0" />
                <div>
                  <h3 className={`${playfair.className} text-xl font-semibold mb-2`}>Adresse</h3>
                  <p className="text-gray-600 text-lg">
                    123 Avenue des Champs-Élysées
                    <br />
                    75008 Paris, France
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-6 order-1 md:order-2">
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Nom</label>
                  <Input type="text" placeholder="Votre nom" className="h-12" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input type="email" placeholder="votre@email.com" className="h-12" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Message</label>
                  <Textarea placeholder="Votre message" className="min-h-[120px]" />
                </div>
                <Button className="w-full bg-[#B8D8E8] hover:bg-[#9AC0D0] text-white h-12 text-lg">
                  Envoyer le message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`${playfair.className} text-xl font-bold text-[#B8D8E8]`}>PropreXpert</div>
            <p className="text-gray-600 text-sm text-center">
              © {new Date().getFullYear()} PropreXpert. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600">
                Mentions légales
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

