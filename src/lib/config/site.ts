export const siteConfig = {
  name: "PCL - Piki Ceramic Lab",
  description: "Oggetti in ceramica fatti a mano con gocce colorate tridimensionali in rilievo. Design contemporaneo e artigianato artistico per la tua casa.",
  url: "https://www.pikiceramiclab.com",
  ogImage: "/images/pcl-og-image.jpg",
  links: {
    instagram: "https://instagram.com/pikiceramiclab",
    facebook: "https://facebook.com/pikiceramiclab",
    pinterest: "https://pinterest.com/pikiceramiclab"
  },
  contact: {
    email: "info@pikiceramiclab.com",
    phone: "+39 123 4567890",
    address: "Via Ceramica 123, Milano, Italia"
  },
  supportEmail: "support@pikiceramiclab.com",
  mainNav: [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Shop",
      href: "/products",
      children: [
        {
          title: "Tutti i prodotti",
          href: "/products"
        },
        {
          title: "Tazze",
          href: "/products/category/tazze"
        },
        {
          title: "Mugs",
          href: "/products/category/mugs"
        },
        {
          title: "Sets di Shot",
          href: "/products/category/shots"
        },
        {
          title: "Piatti",
          href: "/products/category/piatti"
        },
        {
          title: "Borse",
          href: "/products/category/borse"
        }
      ]
    },
    {
      title: "Chi siamo",
      href: "/about"
    },
    {
      title: "Contatti",
      href: "/contact"
    }
  ],
  footerNav: [
    {
      title: "Shop",
      items: [
        {
          title: "Tutti i prodotti",
          href: "/products"
        },
        {
          title: "Novità",
          href: "/products?filter=new"
        },
        {
          title: "Best Sellers",
          href: "/products?filter=bestseller"
        }
      ]
    },
    {
      title: "Informazioni",
      items: [
        {
          title: "Chi siamo",
          href: "/about"
        },
        {
          title: "Spedizioni",
          href: "/shipping"
        },
        {
          title: "FAQ",
          href: "/faq"
        }
      ]
    },
    {
      title: "Legale",
      items: [
        {
          title: "Privacy Policy",
          href: "/privacy"
        },
        {
          title: "Termini e Condizioni",
          href: "/terms"
        },
        {
          title: "Cookie Policy",
          href: "/cookies"
        }
      ]
    }
  ],
  features: [
    {
      title: "Fatto a mano",
      description: "Ogni pezzo è unico e realizzato a mano con cura e attenzione ai dettagli."
    },
    {
      title: "Design esclusivo",
      description: "Le gocce tridimensionali in rilievo rendono ogni prodotto unico e speciale."
    },
    {
      title: "Materiali di qualità",
      description: "Utilizziamo solo ceramica di alta qualità per garantire resistenza e durata."
    },
    {
      title: "Spedizione sicura",
      description: "Imballiamo con cura ogni prodotto per garantire un arrivo sicuro."
    }
  ],
  shipping: {
    freeShippingThreshold: 80,
    standardShipping: 7.90,
    expressShipping: 12.90
  },
  payments: {
    methods: ["card", "paypal", "applepay", "googlepay"]
  },
  currency: {
    code: "EUR",
    symbol: "€"
  }
};

export type SiteConfig = typeof siteConfig;
