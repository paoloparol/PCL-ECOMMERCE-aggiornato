export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-16">

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Chi Siamo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            PCL - Piki Ceramic Lab è un laboratorio artigianale specializzato nella creazione
            di ceramiche uniche con gocce tridimensionali in rilievo.
          </p>
        </section>

        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">La Nostra Storia</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Fondato nel 2022, PCL nasce dalla passione per l'arte ceramica e dal desiderio
              di creare oggetti unici che combinano tradizione artigianale e design contemporaneo.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Le nostre iconiche gocce tridimensionali in rilievo sono il tratto distintivo
              che rende ogni pezzo irripetibile, rappresentando la fluidità e la bellezza
              della ceramica lavorata a mano.
            </p>
          </div>
          <div className="bg-dill-green-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-dill-green-700 mb-4">La Nostra Missione</h3>
            <p className="text-dill-green-600 leading-relaxed">
              Creare ceramiche artigianali di alta qualità che portino bellezza e funzionalità
              nella vita quotidiana, mantenendo viva la tradizione ceramica italiana con un
              tocco di innovazione contemporanea.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">I Nostri Valori</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="text-center p-6 rounded-lg bg-card">
              <div className="w-16 h-16 bg-dill-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏺</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Artigianalità</h3>
              <p className="text-muted-foreground">
                Ogni pezzo è realizzato a mano con cura e attenzione ai dettagli,
                garantendo unicità e qualità superiore.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card">
              <div className="w-16 h-16 bg-dill-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sostenibilità</h3>
              <p className="text-muted-foreground">
                Utilizziamo materiali eco-friendly e processi sostenibili per
                rispettare l'ambiente e il futuro del pianeta.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card">
              <div className="w-16 h-16 bg-dill-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovazione</h3>
              <p className="text-muted-foreground">
                Uniamo tradizione e modernità, creando design innovativi che
                rispettano la storia della ceramica italiana.
              </p>
            </div>

          </div>
        </section>

        {/* Process Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Il Nostro Processo</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            <div className="text-center">
              <div className="w-12 h-12 bg-dill-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Progettazione</h3>
              <p className="text-sm text-muted-foreground">
                Ogni pezzo inizia con un'idea e un disegno dettagliato.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-dill-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Modellazione</h3>
              <p className="text-sm text-muted-foreground">
                La ceramica prende forma attraverso la lavorazione manuale al tornio.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-dill-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Decorazione</h3>
              <p className="text-sm text-muted-foreground">
                Le iconiche gocce tridimensionali vengono applicate a mano.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-dill-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Cottura</h3>
              <p className="text-sm text-muted-foreground">
                Il pezzo viene cotto ad alta temperatura per garantire resistenza.
              </p>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-dill-green-50 p-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Scopri le Nostre Ceramiche</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Esplora la nostra collezione di ceramiche artigianali uniche
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            import Link from "next/link";

<Link href="/products" className="btn-humanrace-outline">
  Vedi tutti i prodotti
</Link>
            <a href="/contact" className="btn-humanrace-outline">
              Contattaci
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
