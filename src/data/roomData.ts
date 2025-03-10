
export interface Feature {
  icon: string;
  label: string;
}

export interface RoomData {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit: string;
  bills?: string;
  imageUrl: string;
  galleryImages: string[];
  tags: string[];
  isNew?: boolean;
  isHighlighted?: boolean;
  rating?: number;
  reviewCount?: number;
  description: string;
  additionalInfo?: string;
  features: Feature[];
  rules: string[];
  locationDetails: string;
  availableFrom: string;
  minimumStay?: string;
  host: {
    name: string;
    imageUrl: string;
    rating?: number;
    reviewCount?: number;
  };
}

export const mockRoomData: RoomData[] = [
  {
    id: "5",
    title: "Quarto duplo em casa compartilhada",
    location: "Botafogo, Campinas",
    price: 700,
    priceUnit: "/mês",
    bills: "Água e internet inclusas",
    imageUrl: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1595526051245-4506e0005bd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    tags: ["Wi-Fi", "Cozinha compartilhada", "Lavanderia", "Mobiliado"],
    isNew: true,
    rating: 4.3,
    reviewCount: 8,
    description: "Quarto duplo ideal para estudantes em casa compartilhada. O quarto é mobiliado com duas camas de solteiro, duas escrivaninhas e armário duplo. A casa possui cozinha compartilhada bem equipada, dois banheiros, lavanderia e sala de estar com TV.",
    features: [
      { icon: "wifi", label: "Wi-Fi 200 Mbps" },
      { icon: "bed", label: "2 camas de solteiro" },
      { icon: "users", label: "6 moradores" }
    ],
    rules: [
      "Silêncio após as 23h",
      "Limpeza dos espaços comuns em sistema de rodízio",
      "Visitas somente até as 22h",
      "Não é permitido fumar nas áreas internas"
    ],
    locationDetails: "Localizado no bairro Botafogo, a 15 minutos de ônibus do centro. Região residencial tranquila com fácil acesso ao transporte público e comércio local.",
    availableFrom: "01/07/2023",
    minimumStay: "6 meses",
    host: {
      name: "Pedro Santos",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      rating: 4.5,
      reviewCount: 15
    }
  },
  {
    id: "6",
    title: "Suíte executiva com vista panorâmica",
    location: "Cambuí, Campinas",
    price: 1600,
    priceUnit: "/mês",
    bills: "Condomínio incluso",
    imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1585128792020-803d29415281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    tags: ["Wi-Fi", "Ar-condicionado", "Suíte", "Mobiliado", "Academia", "Varanda"],
    isHighlighted: true,
    rating: 4.9,
    reviewCount: 31,
    description: "Suíte executiva em andar alto com vista panorâmica da cidade. Quarto amplo com banheiro privativo, ar-condicionado, cama king size e varanda. O apartamento possui cozinha gourmet, área de home office e academia no prédio.",
    additionalInfo: "Ideal para profissionais que buscam conforto e privacidade. Prédio com portaria 24h e sistema de segurança completo.",
    features: [
      { icon: "wifi", label: "Wi-Fi 500 Mbps" },
      { icon: "wind", label: "Ar-condicionado" },
      { icon: "bed", label: "Cama king size" },
      { icon: "users", label: "2 moradores" }
    ],
    rules: [
      "Ambiente para profissionais",
      "Não é permitido fumar",
      "Pets somente mediante consulta",
      "Limpeza semanal inclusa"
    ],
    locationDetails: "Localizado na área mais nobre do Cambuí, próximo aos melhores restaurantes e cafés da cidade. Fácil acesso às principais vias e ao Shopping Iguatemi.",
    availableFrom: "01/08/2023",
    minimumStay: "12 meses",
    host: {
      name: "Beatriz Lima",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      rating: 4.9,
      reviewCount: 45
    }
  },
  {
    id: "1",
    title: "Quarto individual com banheiro privativo próximo à Unicamp",
    location: "Barão Geraldo, Campinas",
    price: 850,
    priceUnit: "/mês",
    bills: "Contas inclusas",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    tags: ["Wi-Fi", "Ar-condicionado", "Suíte", "Mobiliado", "Limpeza semanal"],
    isHighlighted: true,
    rating: 4.8,
    reviewCount: 24,
    description: "Quarto espaçoso e arejado em casa localizada a apenas 10 minutos a pé da Unicamp. O quarto possui banheiro privativo, cama de casal, escrivaninha para estudos, armário e ar-condicionado. A casa conta com cozinha completa compartilhada, lavanderia e sala de estar.",
    additionalInfo: "A casa é compartilhada com outros estudantes e profissionais. O ambiente é tranquilo e ideal para estudos. Há um jardim nos fundos onde você pode relaxar.",
    features: [
      { icon: "wifi", label: "Wi-Fi de alta velocidade" },
      { icon: "wind", label: "Ar-condicionado" },
      { icon: "bed", label: "Cama de casal" },
      { icon: "users", label: "4 moradores" }
    ],
    rules: [
      "Não é permitido fumar dentro da casa",
      "Festas apenas com autorização prévia",
      "Silêncio após as 22h",
      "Limpeza da cozinha após o uso",
      "Visitas devem ser comunicadas com antecedência"
    ],
    locationDetails: "Situado no bairro Barão Geraldo, a apenas 800 metros do campus da Unicamp. A região possui supermercados, farmácias, padarias e restaurantes a uma distância de até 500 metros.",
    availableFrom: "15/06/2023",
    minimumStay: "6 meses",
    host: {
      name: "Ricardo Silva",
      imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      rating: 4.9,
      reviewCount: 42
    }
  },
  {
    id: "2",
    title: "Suíte moderna no centro de Campinas",
    location: "Centro, Campinas",
    price: 950,
    priceUnit: "/mês",
    bills: "Água e luz não inclusas",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    tags: ["Wi-Fi", "Suíte", "Cozinha compartilhada", "Mobiliado", "Academia"],
    isHighlighted: true,
    rating: 4.6,
    reviewCount: 18,
    description: "Suíte moderna e bem iluminada em apartamento no centro de Campinas. O quarto possui banheiro privativo, cama queen, armário espaçoso e escrivaninha. O apartamento possui cozinha compartilhada completamente equipada e área de serviço. O prédio conta com academia e área de lazer.",
    features: [
      { icon: "wifi", label: "Wi-Fi fibra ótica" },
      { icon: "bed", label: "Cama queen size" },
      { icon: "users", label: "3 moradores" }
    ],
    rules: [
      "Sem animais de estimação",
      "Não é permitido fumar no apartamento",
      "Respeitar o silêncio no período noturno",
      "Limpeza dos espaços compartilhados após o uso"
    ],
    locationDetails: "Localizado no centro de Campinas, a 50 metros da Avenida Francisco Glicério. Próximo de shoppings, supermercados, restaurantes e transporte público.",
    availableFrom: "01/07/2023",
    host: {
      name: "Ana Carvalho",
      imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      rating: 4.7,
      reviewCount: 35
    }
  },
  {
    id: "3",
    title: "Quarto aconchegante em república estudantil",
    location: "Taquaral, Campinas",
    price: 1150,
    priceUnit: "/mês",
    bills: "Internet e água inclusas",
    imageUrl: "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    tags: ["Wi-Fi", "Garagem", "Lavanderia", "Estudantes"],
    isNew: true,
    rating: 4.5,
    reviewCount: 12,
    description: "Quarto individual em uma república estudantil bem localizada no bairro Taquaral. O quarto é mobiliado com cama, armário e escrivaninha. A casa possui dois banheiros compartilhados, cozinha completa, sala de estudos, sala de TV e lavanderia. Excelente localização, próximo à PUC-Campinas.",
    features: [
      { icon: "wifi", label: "Wi-Fi incluso" },
      { icon: "bed", label: "Cama de solteiro" },
      { icon: "users", label: "5 estudantes" }
    ],
    rules: [
      "Ambiente exclusivo para estudantes",
      "Escala de limpeza rotativa entre os moradores",
      "Visitantes com autorização prévia",
      "Festas apenas com acordo de todos"
    ],
    locationDetails: "Localizado no bairro Taquaral, a 10 minutos de ônibus da PUC-Campinas. Região bem servida de comércio, com supermercado, padaria e farmácia a menos de 200 metros.",
    availableFrom: "01/08/2023",
    minimumStay: "12 meses",
    host: {
      name: "Marina Costa",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      rating: 4.4,
      reviewCount: 16
    }
  },
  {
    id: "4",
    title: "Quarto com varanda e vista para o parque",
    location: "Cambuí, Campinas",
    price: 1220,
    priceUnit: "/mês",
    imageUrl: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1527473521283-eb231486d90e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1614546393118-96d2dda4ff6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    tags: ["Wi-Fi", "Varanda", "Cozinha compartilhada", "Profissionais"],
    rating: 4.7,
    reviewCount: 9,
    description: "Quarto amplo com varanda privativa e vista para o Parque Portugal (Lagoa do Taquaral) em apartamento compartilhado. O quarto possui cama de casal, armário embutido, escrivaninha e poltrona de leitura. O apartamento tem dois banheiros compartilhados, sala, cozinha e área de serviço.",
    additionalInfo: "Perfeito para profissionais que buscam tranquilidade e boa localização. A região é segura e bem servida de transporte público.",
    features: [
      { icon: "wifi", label: "Wi-Fi 300 Mbps" },
      { icon: "bed", label: "Cama de casal" },
      { icon: "users", label: "3 profissionais" },
      { icon: "wind", label: "Ventilador de teto" }
    ],
    rules: [
      "Ambiente para profissionais",
      "Respeitar o silêncio após as 22h",
      "Não é permitido fumar no apartamento",
      "Limpeza compartilhada das áreas comuns"
    ],
    locationDetails: "Localizado no bairro Cambuí, em frente ao Parque Portugal (Lagoa do Taquaral). Região nobre de Campinas, com excelentes restaurantes, cafés e serviços nas proximidades.",
    availableFrom: "01/06/2023",
    host: {
      name: "Carlos Mendes",
      imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80",
      rating: 4.8,
      reviewCount: 23
    }
  }
];
