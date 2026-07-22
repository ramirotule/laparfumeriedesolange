import { Metadata } from "next";
import { ChevronDown, HelpCircle } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | La Parfumerie de Solange",
  description: "Resolvé tus dudas sobre compras, envíos y cómo vender productos Bagués.",
};

const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.phone}`;

const comprasWebFaqs = [
  {
    pregunta: "¿Cuánto demora en llegar mi pedido?",
    respuesta: (
      <div className="space-y-4">
        <div>
          <strong className="text-white block mb-1">Santa Rosa, La Pampa</strong>
          <p>Enviamos por motomensajería.</p>
          <p>Entrega en hasta 24 horas hábiles.</p>
        </div>
        <div>
          <strong className="text-white block mb-1">Interior de La Pampa</strong>
          <p>
            Realizamos envíos a domicilio con comisionista o retiro por sucursal mediante Correo Argentino.
          </p>
          <p>Entrega estimada: de 2 a 5 días hábiles dependiendo del medio de transporte elegido.</p>
        </div>
        <div>
          <strong className="text-white block mb-1">Interior del país</strong>
          <p>
            Envíos a domicilio o retiro por sucursal mediante Correo Argentino. El tiempo de entrega dependerá del
            correo y la ubicación de destino.
          </p>
        </div>
        <p className="text-sm italic pt-2">
          En fechas de alta demanda como CyberSale, Navidad, Black Friday y eventos especiales, los tiempos de entrega
          pueden verse afectados por la gran cantidad de envíos de los operadores logísticos.
        </p>
      </div>
    ),
  },
  {
    pregunta: "¿Cuáles son las formas de pago?",
    respuesta: (
      <div className="space-y-3">
        <p>Aceptamos los siguientes medios de pago:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Tarjeta de crédito</li>
          <li>Tarjeta de débito</li>
          <li>Mercado Pago</li>
          <li>Transferencia bancaria</li>
        </ul>
        <p>
          Las tarjetas emitidas por entidades bancarias pueden acceder a promociones de hasta 3 cuotas sin interés,
          según disponibilidad vigente.
        </p>
        <p className="text-[#D4AF37] font-medium">
          ✨ Abonando mediante transferencia bancaria en la página se observa la aplicación de descuentos y promociones
          especiales.
        </p>
      </div>
    ),
  },
  {
    pregunta: "¿Cómo se realizan los envíos?",
    respuesta: "Trabajamos con Correo Argentino y servicios de mensajería local.",
  },
  {
    pregunta: "¿Dónde puedo recibir mi pedido?",
    respuesta: (
      <div className="space-y-2">
        <p>Realizamos envíos a todo el país.</p>
        <p>Podés elegir:</p>
        <ul className="list-disc pl-5">
          <li>Envío a domicilio</li>
          <li>Retiro por sucursal</li>
        </ul>
      </div>
    ),
  },
  {
    pregunta: "¿Puedo comprar para revender?",
    respuesta:
      "¡Sí! En La Parfumerie de Solange ofrecemos beneficios y precios especiales para revendedores. Si querés emprender con Bagués, podés contactarnos de manera directa para recibir asesoramiento personalizado.",
  },
];

const baguesFaqs = [
  {
    pregunta: "¿Por qué emprender con Bagués?",
    respuesta: (
      <div className="space-y-3">
        <p>
          Emprender con Bagués significa desarrollar un negocio propio con libertad para manejar tus horarios y crecer
          a tu ritmo.
        </p>
        <p>
          Desde 1987, Bagués acompaña a miles de emprendedores ofreciendo productos de belleza, perfumería y bienestar
          de excelente relación calidad-precio.
        </p>
        <p>
          Además de las ganancias por ventas, contarás con capacitación permanente, herramientas digitales,
          acompañamiento personalizado y la posibilidad de formar tu propio equipo de trabajo si así lo deseas y yo, Romi
          Solange Toulemonde, estaré para guiarte y acompañarte.
        </p>
      </div>
    ),
  },
  {
    pregunta: "¿Cuáles son los beneficios de vender Bagués por catálogo?",
    respuesta: (
      <div className="space-y-4">
        <ul className="space-y-2">
          <li>✨ Excelente porcentaje de ganancia.</li>
          <li>✨ Inversión inicial mínima.</li>
          <li>✨ Horarios totalmente flexibles.</li>
          <li>✨ Posibilidad de generar ingresos extras o desarrollar un negocio a tiempo completo.</li>
          <li>✨ Capacitación permanente y gratuita.</li>
          <li>✨ Acompañamiento personalizado desde el primer día.</li>
          <li>✨ Herramientas digitales para gestionar tu negocio.</li>
          <li>✨ Posibilidad de liderar y desarrollar tu propio equipo.</li>
          <li>✨ Premios e incentivos por objetivos alcanzados.</li>
        </ul>
        <p>
          Además, Bagués cuenta con uno de los mejores porcentajes de ganancia dentro de las empresas de venta directa
          del país.
        </p>
      </div>
    ),
  },
  {
    pregunta: "¿Qué inversión inicial tengo que hacer?",
    respuesta: (
      <p>
        No necesitás realizar una inversión inicial obligatoria. Podés comenzar de forma simple y avanzar a tu propio
        ritmo, incorporando únicamente las herramientas que consideres útiles para potenciar tu negocio.
      </p>
    ),
  },
  {
    pregunta: "¿Puedo liderar mi propio equipo?",
    respuesta: (
      <div className="space-y-3">
        <p>
          Sí, por supuesto. Una de las cosas que más disfrutamos es acompañar el crecimiento de quienes se suman a
          nuestro equipo.
        </p>
        <p>
          Cuando adquieras experiencia también podrás desarrollar y liderar tu propia red de emprendedores, generando
          nuevas oportunidades de crecimiento.
        </p>
      </div>
    ),
  },
  {
    pregunta: "¿Necesito experiencia previa para comenzar?",
    respuesta:
      "No. No es necesario tener experiencia en ventas. Desde el primer día recibirás acompañamiento, capacitación y herramientas para aprender paso a paso cómo desarrollar tu negocio con confianza.",
  },
  {
    pregunta: "¿Recibo capacitación?",
    respuesta: (
      <div className="space-y-3">
        <p>
          Sí. Tendrás acceso a capacitaciones gratuitas y constantes, además del acompañamiento personalizado de tu
          patrocinador y de la Academia de Emprendedores Bagués.
        </p>
        <p>
          Nuestro objetivo es que puedas crecer de manera sostenida y desarrollar tu negocio con las mejores
          herramientas.
        </p>
      </div>
    ),
  },
  {
    pregunta: "¿Todavía tenés dudas?",
    respuesta: (
      <p>
        Escribinos por{" "}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D4AF37] hover:underline"
        >
          WhatsApp
        </a>{" "}
        y con gusto te asesoraremos para encontrar la mejor opción, ya sea realizar una compra o comenzar tu propio
        emprendimiento con Bagués.
      </p>
    ),
  },
  {
    pregunta: "¿Qué descuento obtengo como Usuario Bagués?",
    respuesta:
      "Obtenés un 28,5% de descuento sobre el Precio Público, lo que equivale aproximadamente a una ganancia del 40% sobre tu precio de compra si decidís revender los productos.",
  },
];

/** Preguntas que estaban en la página y no están en el contenido nuevo */
const faqsLegacy = [
  {
    pregunta: "¿Cuál sería mi ganancia?",
    respuesta: (
      <div className="space-y-4">
        <p>La ganancia inicial es del 40% sobre precio costo. Luego, más vendés, más ganás.</p>
        <p>
          Tus objetivos los ponés vos:{" "}
          <span className="text-[#D4AF37] font-medium">✨ Tu ganancia no tiene límites.</span>
        </p>
        <p>
          ¿Querés más información o ya tenés la decisión de emprender con Bagués? Por favor contactanos de manera
          directa para recibir asesoramiento personalizado.
        </p>
      </div>
    ),
  },
  {
    pregunta: "¿Cuál es el mínimo que tengo que vender?",
    respuesta: (
      <div className="space-y-2">
        <p>Para acceder a los descuentos, necesitás vender un mínimo de 5 productos por ciclo.</p>
        <p>Cada ciclo dura 4 semanas.</p>
        <p>En tu primera compra, el mínimo inicial también es de 5 productos.</p>
      </div>
    ),
  },
  {
    pregunta: "¿Qué herramientas necesito para comenzar a vender?",
    respuesta: (
      <div className="space-y-4">
        <p>Para comenzar solo necesitás contar con el catálogo vigente:</p>
        <ul className="list-disc pl-5">
          <li>En versión papel</li>
          <li>PDF</li>
          <li>O catálogo interactivo online</li>
        </ul>
        <p>Además, podés sumar herramientas opcionales que te ayudarán en tu trabajo diario.</p>
      </div>
    ),
  },
  {
    pregunta: "¿Cuándo se abona el pedido?",
    respuesta: "Los pedidos se abonan de forma anticipada antes de ser despachados.",
  },
];

function FaqList({ faqs }: { faqs: typeof comprasWebFaqs }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <details
          key={index}
          className="group bg-[#0D0D0D] border border-[#1A1A1A] rounded-lg overflow-hidden transition-all hover:border-[#D4AF37]/30"
        >
          <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
            <span className="font-medium text-white pr-6">{faq.pregunta}</span>
            <ChevronDown className="text-[#D4AF37] transition-transform group-open:rotate-180 shrink-0" size={20} />
          </summary>
          <div className="px-5 pb-5 text-[#888888] leading-relaxed border-t border-[#1A1A1A] pt-4">
            {faq.respuesta}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <HelpCircle size={40} className="mx-auto text-[#D4AF37] mb-4" />
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Preguntas Frecuentes</h1>
        <p className="text-gray-500">Encontrá respuestas rápidas a tus consultas más comunes.</p>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl text-white border-b border-[#1A1A1A] pb-4">
            Compras en la Web de La Parfumerie de Solange
          </h2>
          <FaqList faqs={comprasWebFaqs} />
        </section>

        <section className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl text-white border-b border-[#1A1A1A] pb-4">
            Preguntas frecuentes para emprender con Bagués ⭐
          </h2>
          <FaqList faqs={baguesFaqs} />
        </section>

        {faqsLegacy.length > 0 && (
          <section className="space-y-6">
            <h2 className="font-serif text-2xl md:text-3xl text-white border-b border-[#1A1A1A] pb-4">
              Información adicional
            </h2>
            <FaqList faqs={faqsLegacy} />
          </section>
        )}
      </div>

      <div className="mt-16 bg-[#0D0D0D] p-8 text-center border border-[#1A1A1A]">
        <h2 className="font-serif text-2xl text-white mb-4">¿Tenés otra consulta?</h2>
        <p className="text-[#888888] mb-8">
          Estamos para ayudarte. Escribinos directamente por WhatsApp y te respondemos en el momento.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#D4AF37] text-black font-bold px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-[#E8CC6B] transition-colors"
        >
          <img src="/what.png" alt="WhatsApp" className="w-5 h-5 rounded-full object-cover" />
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
