import { Injectable } from '@angular/core';

export interface Review {
  author?: string;
  rating: number;
  text: string;
}

export interface Place {
  id: number;
  name: string;
  category: string;
  categoryType: 'cafe' | 'bar' | 'resto' | 'helado';
  mood: string;
  description: string;
  longDescription?: string;
  address: string;
  rating: number;
  lat?: number;
  lng?: number;
  image: string;
  reviews?: Review[];
}

@Injectable({ providedIn: 'root' })
export class PlacesService {
  readonly places: Place[] = [
    // --- CAFÉS ---
    {
      id: 1,
      name: 'Café Urquiza',
      category: '☕ Café',
      categoryType: 'cafe',
      mood: 'Tranquilo, Casual',
      description: 'Café de especialidad con buena música y atención cercana. Te explican las variedades y notas de cada grano.',
      longDescription: 'Café de especialidad en pleno centro de Cipolletti. Además de servirte el café, te cuentan las variedades, notas y aromas de cada grano, así que es un buen lugar para descubrir algo nuevo. El ambiente está muy cuidado, con buena música y una decoración agradable, y tienen opciones dulces y saladas para acompañar.',
      address: 'Urquiza 26',
      rating: 4.9,
      image: 'assets/images/cafe_urquiza.jpg'
      // reviews: [{ author: 'Nombre', rating: 5, text: 'Tu reseña acá' }]
    },
    {
      id: 2,
      name: 'Café Nunou',
      category: '☕ Café',
      categoryType: 'cafe',
      mood: 'Tranquilo, Familiar',
      description: 'Cafetería acogedora con música a buen volumen para charlar o trabajar y mesas al aire libre donde aceptan mascotas.',
      longDescription: 'Cafetería acogedora, conocida por su variedad de meriendas, sándwiches y limonadas. La música suena a un volumen cómodo, ideal para charlar o llevar la notebook, y tiene mesas al aire libre donde se puede ir con mascotas. Atiende hasta tarde varios días de la semana, así que sirve tanto para un desayuno como para una salida de noche.',
      address: 'España 175',
      rating: 4.3,
      image: 'assets/images/cafe_nunou.jpg'
    },
    {
      id: 3,
      name: 'Ribera Tostadores de café',
      category: '☕ Café',
      categoryType: 'cafe',
      mood: 'Tranquilo, Tradicional',
      description: 'Tostadores de café de especialidad, con lugar para sentarse y atención amable.',
      longDescription: 'Tostadores de café de especialidad con un local cómodo y bastante lugar para sentarse. Al tener su propio tostado, el café sale fresco y el equipo conoce bien lo que sirve, así que es fácil que te recomienden algo según tu gusto. Es un buen plan para una pausa tranquila a la mañana o a la tarde.',
      address: 'Gral. San Martín 824',
      rating: 4.7,
      image: 'assets/images/ribera_tostadores.jpg'
    },
    {
      id: 4,
      name: 'Cafe Justina',
      category: '☕ Café',
      categoryType: 'cafe',
      mood: 'Casual, Familiar',
      description: 'Cafetería de ambiente cálido con varios espacios para elegir y opciones sin gluten.',
      longDescription: 'Cafetería de ambiente cálido, con distintos espacios para elegir según el plan: desayuno, merienda o una charla tranquila. Se destaca por su menú sin gluten y tiene un sector al aire libre para fumadores. Entre lo que más se menciona están los croissants de jamón y queso hechos por ellos y la torta tres leches.',
      address: 'Hipólito Yrigoyen 369',
      rating: 4.1,
      image: 'assets/images/cafe_justina.jpg'
    },

    // --- BARES Y CERVECERÍAS ---
    {
      id: 5,
      name: "DUNELL'S",
      category: '🍺 Bar',
      categoryType: 'bar',
      mood: 'Amigos, Noche',
      description: 'Bar con cocktails y porciones abundantes, abierto hasta la madrugada.',
      longDescription: 'Bar de ambiente nocturno en pleno centro, con una carta de cocktails y comida de porciones generosas. Abre por la tarde-noche y sigue hasta la madrugada, y los fines de semana se extiende hasta muy tarde. Es un buen plan para juntarse con amigos a comer algo y seguir la noche.',
      address: 'Gral. Roca 352',
      rating: 4.3,
      image: 'assets/images/dunells.jpg'
    },
    {
      id: 6,
      name: 'Cabrona Bar',
      category: '🍺 Bar',
      categoryType: 'bar',
      mood: 'Amigos, Noche',
      description: 'Bar de cerveza y pizza con ambiente relajado, buena música y menú variado.',
      longDescription: 'Bar cervecero con buena cerveza, pizzas y platos para compartir, como provoletas y tortilla de papas. El ambiente es relajado, con música tranquila, y abre solo por la noche. Si van en grupo, conviene reservar con anticipación.',
      address: 'Primera Junta 171',
      rating: 4.4,
      image: 'assets/images/cabrona_bar.jpg'
    },
    {
      id: 7,
      name: 'Antares Cipolletti',
      category: '🍺 Bar',
      categoryType: 'bar',
      mood: 'Amigos, Noche',
      description: 'Cervecería con gran variedad de cervezas, gin tonics, hamburguesas y música chill-out.',
      longDescription: 'Cervecería con muchas variedades de cerveza, entre ellas APA e IPA, además de gin tonics y mojitos. En la carta se destacan las hamburguesas y las rabas. Tiene sillones y mesas cómodas, y la música es de estilo chill-out, buena para conversar sin gritar.',
      address: 'Gral. Roca 95',
      rating: 3.8,
      image: 'assets/images/antares.jpg'
    },

    // --- RESTAURANTES ---
    {
      id: 8,
      name: 'María Ramona Cantina',
      category: '🍽️ Restó',
      categoryType: 'resto',
      mood: 'Casual, Ruidoso',
      description: 'Restaurante con menú de maridaje, carnes y pastas, en un ambiente animado.',
      longDescription: 'Restaurante céntrico con platos bien preparados, como carnes, pastas y tabla de fiambres, y opciones de maridaje con vinos. El ambiente es animado y por momentos bastante ruidoso. Es una buena opción para una cena con amigos o en pareja.',
      address: 'Gral. Roca 72',
      rating: 4.5,
      image: 'assets/images/maria_ramona.jpg'
    },
    {
      id: 9,
      name: 'Donato Resto Bar Cervecero',
      category: '🍽️ Restó',
      categoryType: 'resto',
      mood: 'Familiar, Amigos',
      description: 'Resto bar con hamburguesas, pizzas, patio y cerveza tirada.',
      longDescription: 'Resto bar cervecero con hamburguesas, pizzas y cerveza tirada. Tiene patio, buena música y mucho movimiento, y está pensado para ir en grupo o en familia. Abre desde la mañana, así que también sirve para un almuerzo.',
      address: 'Av. Mengelle 670',
      rating: 4.2,
      image: 'assets/images/donato.jpg'
    },
    {
      id: 10,
      name: 'Letier',
      category: '🍽️ Restó',
      categoryType: 'resto',
      mood: 'Clásico, Casual',
      description: 'Café y restaurante de ambiente cálido, muy elegido para la merienda.',
      longDescription: 'Café y restaurante que combina meriendas, cocina de estilo europeo y bar en un mismo lugar. Es muy elegido para la merienda, con ambiente cálido y atención rápida. Atiende hasta la noche, así que también funciona para una cena liviana.',
      address: 'Italia 175',
      rating: 4.2,
      image: 'assets/images/letier.jpg'
    },

    // --- HELADERÍAS ---
    {
      id: 11,
      name: 'El Firenze',
      category: '🍦 Helado',
      categoryType: 'helado',
      mood: 'Familiar, Casual',
      description: 'Heladería artesanal con sabores propios, abierta hasta pasada la medianoche.',
      longDescription: 'Heladería artesanal con sabores propios y un estilo distinto al de las heladerías tradicionales. Abre desde la tarde hasta pasada la medianoche, ideal para un helado después de cenar. Los visitantes de paso suelen destacar su helado casero y cremoso.',
      address: 'Presbítero J. M. Brentana 486',
      rating: 4.5,
      image: 'assets/images/el_firenze.jpg'
    },
    {
      id: 12,
      name: "Lucciano's Cipolletti",
      category: '🍦 Helado',
      categoryType: 'helado',
      mood: 'Familiar, Casual',
      description: 'Heladería céntrica con muchos sabores, local limpio y atención rápida.',
      longDescription: 'Heladería céntrica con gran variedad de sabores, un local amplio y muy limpio, y atención rápida. Es una de las heladerías más comentadas de la ciudad y abre hasta tarde. Buen lugar para un helado en familia o una salida con amigos.',
      address: '25 de Mayo 178',
      rating: 4.5,
      image: 'assets/images/lucciano.jpg'
    }
  ];

  readonly emojiByType = { cafe: '☕', bar: '🍺', resto: '🍽️', helado: '🍦' };

  private readonly CACHE_KEY = 'mm_coords_v1';
  private cache: Record<string, { lat: number; lng: number }> =
    JSON.parse(localStorage.getItem('mm_coords_v1') || '{}');

  // Si el lugar tiene lat/lng manual, las usa. Si no, busca por dirección.
  async getCoords(place: Place): Promise<{ lat: number; lng: number } | null> {
    if (place.lat !== undefined && place.lng !== undefined) {
      return { lat: place.lat, lng: place.lng };
    }
    if (this.cache[place.address]) return this.cache[place.address];

    const queries = [
      `${place.address}, Cipolletti, Río Negro, Argentina`,
      `${place.name}, Cipolletti, Río Negro, Argentina`
    ];

    for (const q of queries) {
      const coords = await this.geocode(q);
      await new Promise(r => setTimeout(r, 1100)); // Nominatim pide máximo 1 consulta por segundo
      if (coords) {
        this.cache[place.address] = coords;
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.cache));
        return coords;
      }
    }
    return null;
  }

  private async geocode(q: string): Promise<{ lat: number; lng: number } | null> {
    try {
      const url =
        'https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=ar' +
        '&bounded=1&viewbox=-68.05,-38.90,-67.93,-38.97&q=' + encodeURIComponent(q);
      const res = await fetch(url);
      const data = await res.json();
      return data.length ? { lat: +data[0].lat, lng: +data[0].lon } : null;
    } catch {
      return null;
    }
  }
}