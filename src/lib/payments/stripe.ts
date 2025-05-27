import Stripe from 'stripe';

// Verifica che la chiave API sia definita
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY non è definita nell\'ambiente');
}

// Inizializza Stripe con la chiave segreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10', // Usa la versione più recente dell'API Stripe
  appInfo: {
    name: 'PCL Ceramic Lab',
    version: '1.0.0',
  },
});

export default stripe;
