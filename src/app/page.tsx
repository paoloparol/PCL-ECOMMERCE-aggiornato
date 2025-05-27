"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { ThreeDDrop, DropsGroup } from "@/components/animations/3d-drop";
import { NewsletterForm } from "@/components/shared/newsletter-form";
import { products } from "@/lib/db/products";

export default function HomePage() {
  // Seleziona prodotti in evidenza
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero section con 1 video laterale come sfondo */}
<section className="relative py-20 md:py-32 bg-background overflow-hidden">
  <div className="container-custom relative z-10">
    <div className="max-w-xl text-center md:text-left">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
        FOCUS<br />sul PRODOTTO.
      </h1>
      <p className="text-xl text-muted-foreground mt-6">
        Meglio inseguire il mercato o una visione?<br />PCL sceglie la passione, non la fretta.
      </p>
      <div className="pt-8">
        <Link href="/products" className="btn-humanrace">
          Scopri di più
        </Link>
      </div>
    </div>
  </div>

  {/* Video posizionato a destra come sfondo */}
  <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full z-0">
    <video
      src="/videos/pcl1.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover opacity-100"
    />
  </div>
</section>


      {/* Video Background Section */}
      <section className="relative h-screen min-h-[600px] overflow-hidden video-section">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* Video di ceramica reale da Pexels */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="video-background"
            poster="/images/SFONDO1.png"
          >
            <source src="/videos/pcl3.mp4" type="video/mp4" />
            <source src="/videos/pcl4.mp4" type="video/mp4" />
          </video>

          {/* Fallback per browser che non supportano il video */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.pexels.com/videos/2445325/free-video-2445325.jpg?auto=compress&cs=tinysrgb&w=2070&h=1380"
              alt="L'arte della ceramica"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Overlay finale */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content sopra il video */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              L'arte della ceramica <br />
              <span className="text-dill-green-400">a mano</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Ogni goccia racconta una storia di passione e maestria artigianale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-humanrace">
                Esplora la collezione
              </Link>
              <Link href="/about" className="btn-humanrace-outline bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20">
                La nostra storia
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-w-1 aspect-h-1 relative h-[500px] rounded-lg overflow-hidden">
  <video
    src="/videos/pcl4.mp4"
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  />
</div>

            </div>
            <div className="order-1 md:order-2 space-y-6 text-center md:text-left">
              <div className="text-sm text-muted-foreground">PRODOTTO IN EVIDENZA</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Mug Drop Verde
              </h2>
              <p className="text-xl text-muted-foreground">
                Ceramica artigianale con la nostra distintiva goccia tridimensionale verde.
              </p>
              <div className="pt-4">
                <Link href="/products/mug-drop-verde" className="btn-humanrace">
                  Acquista ora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Prodotti con uno scopo</h2>
            <p className="section-description">
              Dove il design incontra il quotidiano in un rituale di ceramica artigianale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product) => (
              <Card key={product.id} className="humanrace-card bg-white border-none">
                <div className="aspect-w-1 aspect-h-1 relative h-[350px]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="humanrace-image"
                  />
                </div>
                <CardContent className="pt-6 pb-8 text-center">
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">{product.description.substring(0, 60)}...</p>
                  <div className="flex items-center justify-center mb-4">
                    <ThreeDDrop color="#4E6813" size="sm" interactive={false} autoRotate={true} showEnvironment={false} />
                  </div>
                  <Link href={`/products/${product.slug}`} className="btn-humanrace-outline">
                    Scopri
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Three Steps Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="mb-4 text-sm text-muted-foreground text-center">TRE PASSI, TRE MINUTI</div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Il Kit Routine</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Adotta una routine quotidiana con la nostra firma "Tre Minuti Di Ceramica". I tre elementi essenziali per la tua casa.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Link href="/products?category=set" className="btn-humanrace">
              Acquista ora
            </Link>
          </div>      
        </div>
      </section>

      {/* Daily Routines Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center md:text-left mb-12">
            <h2 className="text-3xl font-bold mb-4">Ceramiche Per Tutti</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="humanrace-card bg-white border-none overflow-hidden">
              <AspectRatio ratio={1/1}>
                <div className="relative w-full h-full">
                  <Image
                    src="/images/SHOT6.png"
                    alt="Kit Completo"
                    fill
                    className="humanrace-image"
                  />
                </div>
              </AspectRatio>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-lg mb-2">Kit Completo</h3>
                <p className="text-muted-foreground text-sm mb-4">La routine completa in 3 passi per la ceramica perfetta.</p>
              </CardContent>
            </Card>

            <Card className="humanrace-card bg-white border-none overflow-hidden">
              <AspectRatio ratio={1/1}>
                <div className="relative w-full h-full">
                  <Image
                    src="/images/SHOT6.png"
                    alt="Mug Drop"
                    fill
                    className="humanrace-image"
                  />
                </div>
              </AspectRatio>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-lg mb-2">Mug Drop</h3>
                <p className="text-muted-foreground text-sm mb-4">Un pezzo iconico per la tua routine quotidiana.</p>
              </CardContent>
            </Card>

            <Card className="humanrace-card bg-white border-none overflow-hidden">
              <AspectRatio ratio={1/1}>
                <div className="relative w-full h-full">
                  <Image
                    src="/images/SHOT5.png"
                    alt="Ceramica per Casa"
                    fill
                    className="humanrace-image"
                  />
                </div>
              </AspectRatio>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium text-lg mb-2">Ceramica per Casa</h3>
                <p className="text-muted-foreground text-sm mb-4">Questa routine funziona per decorare e valorizzare la tua casa.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-sm text-muted-foreground mb-2">IL NOSTRO CONCEPT</div>
              <h2 className="text-3xl font-bold mb-4">PCL Ceramica è un progetto di ceramica artigianale fondato nel 2022</h2>
              <p className="text-muted-foreground text-lg">
                PCL Ceramica nasce dall'idea di combinare il design contemporaneo con l'artigianato tradizionale.
                Ogni goccia tridimensionale sulle nostre ceramiche rappresenta l'unicità e la creatività che mettiamo in ogni pezzo.
              </p>
              <div className="pt-4">
                <Link href="/about" className="btn-humanrace-outline">
                  Scopri di più
                </Link>
              </div>
            </div>
            <div>
              <div className="aspect-w-4 aspect-h-5 relative h-[500px]">
                <Image
                  src="/images/SFONDO2.png"
                  alt="Il nostro concept"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-16 bg-dill-green-700 text-white">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Unisciti alla Community</h2>
            <p className="mb-6">
              Sii il primo a ricevere gli aggiornamenti di PCL Ceramica sui nuovi prodotti.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
