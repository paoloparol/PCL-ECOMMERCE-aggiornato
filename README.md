# PCL E-commerce - Piki Ceramic Lab

![PCL E-commerce Preview](https://img.shields.io/badge/Status-Live-brightgreen)

Un e-commerce moderno e completo per Piki Ceramic Lab, un brand di ceramiche artigianali con gocce tridimensionali in rilievo. Questo progetto è costruito utilizzando Next.js, React, TypeScript e Tailwind CSS.

## 📋 Caratteristiche

- ✨ Design moderno e minimalista ispirato a humanrace.com
- 🛒 Carrello completo con gestione delle quantità e codici sconto
- 💳 Checkout con Stripe per pagamenti online
- 🔐 Autenticazione utente con NextAuth
- 👤 Area account per la gestione ordini
- 🔧 Pannello admin per gestire prodotti e ordini
- 📱 Responsive design per tutte le dimensioni di schermo
- 🎨 Animazioni 3D delle gocce con Three.js
- 📧 Notifiche email per conferma ordini
- 🗣️ Supporto per newsletter

## 🚀 Tecnologie

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **Database**: Prisma ORM con SQLite (configurabile per PostgreSQL)
- **Autenticazione**: NextAuth.js
- **Pagamenti**: Stripe
- **Email**: Resend
- **3D Animations**: React Three Fiber, Three.js
- **Testing**: Jest, Cypress
- **Package Manager**: Bun

## 🏗️ Struttura del Progetto

```
pcl-ecommerce/
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API Routes
│   │   ├── (routes)/      # Pagine dell'applicazione
│   ├── components/        # Componenti React
│   │   ├── animations/    # Animazioni 3D
│   │   ├── layout/        # Layout components
│   │   ├── product/       # Componenti prodotto
│   │   ├── ui/            # Componenti UI riutilizzabili
│   ├── lib/               # Utilità e configurazioni
│   │   ├── db/            # Database e modelli
│   │   ├── store/         # Store Zustand
│   │   ├── auth/          # Configurazione autenticazione
│   │   ├── payments/      # Integrazione pagamenti
│   ├── emails/            # Template email
│   ├── hooks/             # React hooks personalizzati
│   ├── types/             # TypeScript types
├── prisma/                # Schema Prisma e migrazioni
├── public/                # File statici
├── (config files)         # File di configurazione
```

## 🛠️ Setup & Installazione

### Prerequisiti

- Node.js 18+ o Bun
- Git

### Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/yourusername/pcl-ecommerce.git
   cd pcl-ecommerce
   ```

2. Installa le dipendenze:
   ```bash
   bun install
   # oppure
   npm install
   ```

3. Configura le variabili d'ambiente:
   ```bash
   cp .env.example .env
   ```
   Poi modifica il file `.env` con le tue API keys.

4. Avvia il database e le migrazioni:
   ```bash
   bunx prisma migrate dev
   # oppure
   npx prisma migrate dev
   ```

5. Avvia il server di sviluppo:
   ```bash
   bun run dev
   # oppure
   npm run dev
   ```

6. Apri [http://localhost:3000](http://localhost:3000) nel tuo browser.

## 🧪 Testing

```bash
# Unit tests
bun test

# E2E tests
bun cypress
```

## 🚢 Deployment

Il progetto è configurato per essere facilmente deployato su Vercel o Netlify. Per un deployment manuale:

```bash
bun run build
# oppure
npm run build
```

## 📄 Licenza

Questo progetto è disponibile sotto licenza MIT.

## 🙏 Crediti

- Design ispirato a [humanrace.com](https://www.humanrace.com/)
- Componenti UI da [shadcn/ui](https://ui.shadcn.com/)
- Animazioni 3D basate su [Three.js](https://threejs.org/) e [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
