# Dentidad — Landing comercial

Single-page landing en Next.js 15 + Tailwind CSS para `www.dentidad.com`.
La app principal vive en `dentidad.com` (separada).

## Quick start

```bash
cd dentidad-landing
npm install
npm run dev
```

Después abrí http://localhost:3000

## Build de producción

```bash
npm run build
npm start
```

## Deploy a Vercel

```bash
npx vercel
```

Configurá el dominio `www.dentidad.com` en el panel de Vercel después del primer deploy.
Apuntá el subdominio `www` al CNAME `cname.vercel-dns.com` en tu DNS provider.

## Estructura

```
dentidad-landing/
├── app/
│   ├── globals.css     ← Tokens de Dentidad + utilidades Tailwind
│   ├── layout.tsx      ← Metadata SEO completa, schema markup, fonts
│   └── page.tsx        ← Orquesta todas las secciones
├── components/
│   ├── Logo.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Problem.tsx
│   ├── Features.tsx
│   ├── Differentiation.tsx
│   ├── HowItWorks.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── public/             ← Logos SVG (heredados del brand kit)
├── tailwind.config.ts  ← Paleta extendida de Dentidad
└── package.json
```

## Brand tokens (en `tailwind.config.ts`)

- `text-navy`, `bg-navy` → `#063760` (primary)
- `text-mint`, `bg-mint` → `#00C9A7` (acento, on-dark)
- `text-mint-deep` → `#00A085` (acento, on-light)
- Todas las escalas Tailwind disponibles: `navy-50` a `navy-900`, `mint-50` a `mint-900`

## Pendientes

- [ ] Conectar formulario del CTA a Klaviyo / Resend / Mailchimp para captura de emails
- [ ] Reemplazar testimonios placeholder con clínicas piloto reales
- [ ] Agregar analytics (Google Analytics 4 + Plausible)
- [ ] Generar OG image (1200×630) para preview en redes
- [ ] Configurar DNS de `www.dentidad.com`
- [ ] Comprar el dominio dentidad.com en Namecheap/Porkbun

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 3
- Google Fonts: DM Sans + DM Mono
