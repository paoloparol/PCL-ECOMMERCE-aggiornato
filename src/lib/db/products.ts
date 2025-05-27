export interface ProductColor {
  name: string;
  color: string;
  images: string[];
}

export interface ProductSize {
  name: string;
  value: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  isNew: boolean;
  isBestseller: boolean;
  category: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  details: {
    dimensions?: string;
    material?: string;
    care?: string[];
    features?: string[];
  };
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "Cup-drop",
    name: "Cup Drop",
    description: "Bicchiere in ceramica con gocce verdi in rilievo. Handmade by Piki.",
    price: 25.00,
    isNew: true,
    isBestseller: true,
    category: "CUPS",
    colors: [
      {
        name: "Dill Green",
        color: "#4E6813",
        images: [
  "/images/cup-drop-1.png",
  "/images/cup-drop-2.png",
  "/images/cup-drop-3.png"
],
      },
      
    ],
    sizes: [],
    images: [
     "/images/cup-drop-1.png",
  "/images/cup-drop-2.png",
  "/images/cup-drop-3.png"
],
    details: {
      dimensions: "Altezza: 10cm, Diametro: 8cm, Capacità: 300ml",
      material: "Ceramica smaltata",
      care: [
        "consigliato lavaggio manuale",
        "Non utilizzare nel microonde",
        "Non utilizzare su fiamma diretta"
      ],
      features: [
        "Goccia tridimensionale in rilievo",
        "Base antiscivolo",
      ]
    },
    stock: 25
  },
  {
    id: 2,
    slug: "Mug-drop",
    name: "Mug Drop",
    description: "Tazza da tè in ceramica con goccia tridimensionale in rilievo. Design elegante per arricchire i tuoi momenti di relax.",
    price: 28.00,
    isNew: false,
    isBestseller: true,
    category: "MUGS",
    colors: [
      {
        name: "Dill Green on Ivory",
        color: "#4E6813",
        images: [
          "/images/mug-drop-1.png"]
      },
      
    ],
    sizes: [],
    images: [
      "/images/mug-drop-1.png"
    ],
    details: {
      dimensions: "Altezza: 7cm, Diametro: 9cm, Capacità: 250ml",
      material: "Ceramica smaltata",
      care: [
        "Lavabile in lavastoviglie",
        "Utilizzabile nel microonde",
        "Non utilizzare su fiamma diretta"
      ],
      features: [
        "Goccia tridimensionale in rilievo",
        "Design minimal",
        "Bordo sottile"
      ]
    },
    stock: 18
  },
  {
    id: 3,
    slug: "Set-Shot-Drop",
    name: "Set di Shot Drop",
    description: "Set di 4 bicchierini da shot con gocce tridimensionali in rilievo. Perfetti per aperitivi e momenti di convivialità.",
    price: 39.90,
    isNew: true,
    isBestseller: false,
    category: "SHOTS",
    colors: [
      {
        name: "Dill Green on Ivory",
        color: "#4E6813",
        images: [
          "/images/SHOT4.png",
        "/images/SHOT2.png",
      "/images/SHOT1.png"
      ]
      },
      
    ],
    sizes: [],
    images: [
      "/images/SHOT3.png"
  ],
    details: {
      dimensions: "Altezza: 6cm, Diametro: 4cm, Capacità: 50ml",
      material: "Ceramica smaltata",
      care: [
        "Lavabile in lavastoviglie",
        "Non utilizzabile nel microonde",
        "Non utilizzare su fiamma diretta"
      ],
      features: [
        "Goccia tridimensionale in rilievo",
        "Set di 6 pezzi",
        "Colore verde"
      ]
    },
    stock: 12
  },
 
];
