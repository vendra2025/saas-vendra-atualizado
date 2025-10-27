'use client'

import { Container } from '@/components/ui/container'
import { Instagram, Linkedin, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  product: [
    { label: 'Funcionalidades', href: '#features' },
    { label: 'Preços', href: '#pricing' },
    { label: 'Integrações', href: '#integrations' },
    { label: 'Casos de Uso', href: '#use-cases' },
  ],
  company: [
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Blog', href: '/blog' },
    { label: 'Carreiras', href: '/carreiras' },
    { label: 'Contato', href: '/contato' },
  ],
  legal: [
    { label: 'Termos de Uso', href: '/termos' },
    { label: 'Política de Privacidade', href: '/privacidade' },
    { label: 'LGPD', href: '/lgpd' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/vendra', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/vendra', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@vendra', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com/vendra', label: 'Twitter' },
]

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]/30">
      <Container className="py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo + Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center font-bold text-black text-xl shadow-[var(--shadow-neon)]">
                V
              </div>
              <span className="text-2xl font-bold text-gradient">Vendra</span>
            </div>
            <p className="text-[var(--foreground)]/70 mb-6 max-w-sm">
              Atendimento inteligente via WhatsApp e WebChat com IA. Automatize,
              escale e surpreenda seus clientes.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center hover:border-[var(--primary)] hover:shadow-[var(--shadow-neon-soft)] transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Produto</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[var(--foreground)]/70 hover:text-[var(--primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-[var(--border)] pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[var(--primary)]" />
              <div>
                <div className="text-sm text-[var(--foreground)]/60">Email</div>
                <a
                  href="mailto:contato@vendra.com"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  contato@vendra.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[var(--primary)]" />
              <div>
                <div className="text-sm text-[var(--foreground)]/60">WhatsApp</div>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  (11) 99999-9999
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[var(--primary)]" />
              <div>
                <div className="text-sm text-[var(--foreground)]/60">Endereço</div>
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--border)] pt-8 text-center text-sm text-[var(--foreground)]/60">
          <p>
            © {new Date().getFullYear()} Vendra SaaS. Todos os direitos
            reservados.
          </p>
          <p className="mt-2">
            Desenvolvido com <span className="text-[var(--primary)]">♥</span> e
            muito <span className="text-[var(--primary)]">☕</span>
          </p>
        </div>
      </Container>
    </footer>
  )
}
