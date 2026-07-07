export interface FamiliaContent {
  slug: string;
  nombre: string;
  emoji: string;
  descripcionCorta: string;
  intro: string;
  notas: string;
  curiosidades: string;
  perfumesEmblematicos: string;
}

// slug matches slugified DB nombre
export const FAMILIAS_CONTENT: Record<string, FamiliaContent> = {
  floral: {
    slug: "floral",
    nombre: "Floral",
    emoji: "🌸",
    descripcionCorta: "Rosas, jazmines, flores del jardín",
    intro:
      "Tan antigua como las fragancias cítricas, la floral es la más popular y extensa de todas las familias. Esta gran familia incluye todos los perfumes cuyo tema principal es la representación olfativa de una única flor (soliflore) o un conjunto de flores variadas (bouquet). Enriqueciéndolas con notas accesorias dan lugar a subgrupos como fragancias florales verdes, acuáticas, frutales, flor blanca, floral-aldehídica, especiada y florientales.\n\nJunto a las familias cítricas y amaderadas, se le denomina también familia realista. Las notas florales más clásicas e icónicas son tres: la rosa, el jazmín y el neroli.",
    notas:
      "Jazmín, rosa, geranio, neroli, nardo, lirio, iris, mimosa, ylang-ylang, violeta, champaca, magnolia, osmanthus.",
    curiosidades:
      "La naturaleza ofrece una multitud de flores con aromas complejos. Sin embargo, existen ciertas flores de las que resulta imposible extraer extracto que pueda usarse en la recreación de su fragancia: son las flores mudas o silentes. Su rendimiento de extracción es insuficiente o simplemente inexistente. Es el caso del lirio, lila, jacinto, clavel, madreselva, peonías, violeta, freesia, gardenia, etc. Pero, gracias a la ciencia, su olor puede ser recreado por el perfumista usando distintas moléculas aisladas o de síntesis.",
    perfumesEmblematicos: "Chanel Nº5, Diorissimo, Aire de Loewe, Gucci Bloom.",
  },

  oriental: {
    slug: "oriental",
    nombre: "Ambarada u Oriental",
    emoji: "✦",
    descripcionCorta: "Ámbar, vainilla, especias exóticas",
    intro:
      "Los perfumes ambarinos o balsámicos, tradicionalmente conocidos como orientales, son cálidos, sensuales, almizclados, dulces, intensos y empolvados. Las resinas, bálsamos, maderas, especias, almizcles y los acordes ambarinos que las caracterizan evocan la fantasía de los olores, colores y sabores de oriente. Suelen ser perfumes de gran fijación y duración en piel, ya que contienen notas de fondo muy pronunciadas. Por su voluptuosidad son perfectas para las estaciones más frías del año.\n\nDentro de las subfamilias más comunes encontramos las siguientes: Floriental, Ambarada gourmand, Ambarada especiada y Ambarada amaderada.",
    notas:
      "Vainilla, mirra, incienso, haba tonka, benjuí, bálsamos de Perú y Tolú, cistus, patchouli, vetiver, sándalo, almizcle, canela, cardamomo, nuez moscada, pimienta rosa y notas florales.",
    curiosidades:
      "¿Por qué los perfumes orientales se conocen también como ambarados? El concepto ámbar nos puede llevar a equívocos si pensamos en él como la conocida «piedra» que no es más que resina fosilizada de árboles. Sin embargo, el «ámbar» en perfumería no hace referencia a un material concreto sino a un acorde dulce y avainillado que se crea a partir de la mezcla de un tipo específico de resinas como el cistus o el benjuí, vainilla y patchouli, presente en la base de los perfumes orientales o ambarados.\n\nTampoco debemos confundir el acorde ámbar con el «ámbar gris», que sí es un material que se usa en perfumería, pero completamente distinto, y que hoy en día se reproduce de forma molecular.",
    perfumesEmblematicos:
      "Shalimar, Ambre Sultan, Terre d'Hermès, Black Opium, Miss Dior, Solo Loewe.",
  },

  amaderado: {
    slug: "amaderado",
    nombre: "Amaderada",
    emoji: "🌲",
    descripcionCorta: "Sándalo, cedro, oud",
    intro:
      "Familia realista que engloba aquellos perfumes en los que su nota definitoria es la madera: raíces, cortezas, resinas, hojas, musgo, piñas y arbustos inspiran estas creaciones. Al igual que las notas florales, los acordes madera son muy versátiles y permiten multitud de posibilidades. Los perfumes amaderados pueden estar compuestos por notas cálidas y opulentas como el sándalo y el patchouli; por notas secas como el cedro; ser frescos con un aspecto a pino y coníferas o incluso ahumados con ese carácter tan único que aportan el vetiver o el oud.\n\nLa salida de los perfumes amaderados suele caracterizarse por ir acompañada por notas cítricas y herbales como la lavanda.",
    notas:
      "Sándalo, patchouli, vetiver, cedro de Virginia, cedro del Atlas, oud, abedul, enebro.",
    curiosidades: "Los secretos del Patchouli.",
    perfumesEmblematicos:
      "Gucci Pour Homme, Yves Saint Laurent Splendid Wood, Aura de Loewe, Obsession de Calvin Klein.",
  },

  fresco: {
    slug: "fresco",
    nombre: "Cítrica o Hespéride",
    emoji: "💧",
    descripcionCorta: "Cítricos, acuático, aromático",
    intro:
      "Familia de perfumes realista también conocida como Hespéride. Se caracteriza por estar compuesta eminentemente por notas de salida procedentes de cáscaras de frutos cítricos como la bergamota, el limón, la naranja, la mandarina o el pomelo. Suelen ser fragancias suaves y frescas, con un toque ácido, unisex, intergeneracionales y perfectas para cualquier estación del año.\n\nProbablemente las fragancias más icónicas que se pueden incluir en esta familia sean las aguas de colonia tradicionales, compuestas por notas frescas y volátiles.",
    notas:
      "Limón, naranja, lima, pomelo, bergamota, mandarina, yuzu, petitgrain, neroli, flor de naranjo.",
    curiosidades:
      "Las primeras y más famosas aguas de colonia fueron fragancias cítricas. Aunque el origen del genuino «Eau de Cologne» sigue siendo un misterio, se cuenta que el perfumista Jean-Marie Farina se inspiró en el Aqua Mirabilis, una solución alcohólica perfumada con esencias de plantas producida en la Edad Media por muchos monasterios italianos. Seducido por esta solución fresca y ligera, Farina realizó algunos cambios en la fórmula original con naranja, limón, flores y frutas introduciendo la bergamota. Su Aqua Mirabilis di Colonia nació en 1709, acuñando el término «agua de colonia» que hoy perdura para denominar este tipo de aguas perfumadas.",
    perfumesEmblematicos:
      "CK ONE, Álvarez Gómez, 4711, Jean-Marie Farina Eau de Cologne, Eau de Rochas, Acqua di Parma Colonia.",
  },

  chipre: {
    slug: "chipre",
    nombre: "Chipre",
    emoji: "🌿",
    descripcionCorta: "Bergamota, musgo, labdanum",
    intro:
      "La familia Chipre está compuesta por fragancias sofisticadas que se caracterizan por el contraste entre notas de salida ligeras y frescas como la bergamota y una base profunda y terrosa que aporta el musgo de roble. Aunque los perfumes Chipre más clásicos suelen tener una calidad floral abstracta, a lo largo de los años han surgido numerosas variantes y subfamilias, siendo las más habituales chipre frutal, chipre verde, chipre acuático, chipre amaderado y chipre cuero.",
    notas:
      "Bergamota, musgo de roble, cistus o ládano, patchouli, rosa, jazmín, beta ionona, sándalo, vainilla, ylang-ylang.",
    curiosidades:
      "La denominación «Chipre» deriva de la palabra francesa para designar la isla mediterránea y no del árbol del ciprés como alguna vez se ha sugerido. Existen evidencias históricas para afirmar que la composición de las fragancias Chipre se remonta a la época romana y ya se mencionan explícitamente en los manuales de perfumes del siglo XVIII. En efecto, muchas de las plantas aromáticas presentes en esta familia de perfumes florecen en la isla de Chipre.\n\nEn 2005, un grupo de arqueólogos italianos descubrió en esta misma isla la fábrica de perfumes más antigua del mundo, donde se encontraron perfumes que se remontan 4.000 años atrás. La excavación abarcaba un kilómetro cuadrado, lo que significa que el perfume se producía a escala industrial y tenía ya un mercado bien establecido.\n\nEs cierto que, tal y como hoy lo conocemos, este tipo de perfumes los popularizó el perfumista François Coty, quien en 1917 lanza un perfume de gran éxito llamado simplemente «Chypre». No obstante, Guerlain ya había creado dos perfumes llamados «Chypre de París» y «Chypre», ambos anteriores a 1917. Dicho esto, a Coty se le debe dar crédito por popularizar su perfume Chipre hasta convertirlo en una familia de fragancias con entidad propia. Coty tomó la idea clásica y le dio una estructura bien definida y una forma distinta.",
    perfumesEmblematicos:
      "Chanel Nº19, Guerlain Mitsouko, Sisley Eau du Soir, Citizen Queen Juliette Has a Gun.",
  },

  gourmand: {
    slug: "gourmand",
    nombre: "Gourmand",
    emoji: "🍫",
    descripcionCorta: "Vainilla, caramelo, tonka",
    intro:
      "Gracias al desarrollo de la tecnología y la investigación en química orgánica, a mediados del siglo XX comienzan a surgir nuevas materias primas que dan lugar a la formulación de fragancias innovadoras que resultan imposibles de clasificar en las categorías más tradicionales. Este hito marca la necesidad de crear nuevas familias, como el caso de la familia Gourmand.\n\nEstos perfumes se caracterizan por sus aromas cálidos y dulces, «golosos» con la sensación de «ser comestibles» (figuradamente, claro), que suelen ir acompañados por matices especiados. Sus fórmulas incluyen notas como la vainilla y el haba tonka, así como componentes moleculares diseñados para representar los sabores de distintos alimentos. Por su carácter dulzón y cálido suelen ser perfumes muy utilizados en las estaciones frías del año.",
    notas:
      "Vainilla, caramelo, chocolate, leche, algodón de azúcar, café, coñac, toffee, almendras, chicle.",
    curiosidades:
      "El nacimiento de la familia Gourmand está estrechamente ligada al icónico perfume «Angel» de Thierry Mugler. En 1992, «Angel» marcó un hito importante en la historia de la perfumería moderna. En un momento en el que las fragancias unisex y los bouquet florales eran la norma, Mugler lanzó al mercado una fragancia que reinterpretaba la familia ambarina u oriental, añadiéndole un marcado carácter de repostería con una nota de praliné. En poco tiempo, «Angel» se posicionó en el top 10 de fragancias en Europa.",
    perfumesEmblematicos:
      "Angel de Thierry Mugler, Lolita Lempicka, Black Opium Sound Illusion de YSL.",
  },

  fougere: {
    slug: "fougere",
    nombre: "Fougère",
    emoji: "🌾",
    descripcionCorta: "Lavanda, cumarina, musgo de roble",
    intro:
      "Fougère significa helecho en francés. Este término hace referencia a la fantasía de reproducir el olor de un apacible paseo por el bosque. Las fragancias Fougère a menudo se describen como masculinas y verdes y recuerdan al olor de hierba recién cortada o a heno recién segado y dulce. Tradicionalmente, las fragancias fougère suelen contener un acorde central de lavanda, cumarina y musgo de roble.",
    notas:
      "Lavanda, cumarina, musgo de roble, haba tonka, bergamota, geranio, hoja de violeta, albahaca, enebro, pino, abeto, gálbano y salvia.",
    curiosidades:
      "La primera fragancia Fougère la creó el perfumista Paul Parquet en 1882 para la casa de Houbigant. Su creación bautizada con el nombre de «Fougère Royale» marcó una nueva tendencia en perfumería de la que surgió esta nueva familia icónica de perfumes de fantasía. Parquet nunca quiso recrear el olor real del helecho, pues curiosamente es una planta que carece de olor. Su objetivo era crear un concepto propio que describió de la siguiente forma: «Si Dios le hubiera dado al helecho un perfume, habría olido como Fougère Royal».\n\nEs importante destacar que «Fougère Royale» fue el primer perfume en introducir en su composición una molécula de síntesis: la cumarina (molécula identificada por primera vez en el Haba Tonka y el aceite esencial de Lavanda).",
    perfumesEmblematicos:
      "Dior Sauvage, Paco Rabanne Pour Homme, Azzaro Pour Homme, Eternity CK.",
  },
};

export function getFamiliaContent(slug: string): FamiliaContent | null {
  return FAMILIAS_CONTENT[slug] ?? null;
}
