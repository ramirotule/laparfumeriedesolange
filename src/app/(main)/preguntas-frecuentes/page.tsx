import { Metadata } from "next";
import { ChevronDown, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | La Parfumerie de Solange",
  description: "Resolvé tus dudas sobre compras, envíos y cómo vender productos Bagués.",
};

const generalFaqs = [
  {
    pregunta: "¿Cuánto demora en llegar mi pedido?",
    respuesta: (
      <div className="space-y-4">
        <div>
          <strong className="text-black block mb-1">Santa Rosa, La Pampa</strong>
          <p>Enviamos por motomensajería. Entrega en hasta 24 horas hábiles.</p>
        </div>
        <div>
          <strong className="text-black block mb-1">Interior de La Pampa</strong>
          <p>Realizamos envíos a domicilio o retiro por sucursal mediante Correo Argentino. Entrega estimada: de 2 a 3 días hábiles.</p>
        </div>
        <div>
          <strong className="text-black block mb-1">Interior del país</strong>
          <p>Envíos a domicilio o retiro por sucursal mediante Correo Argentino. El tiempo de entrega dependerá del correo y la ubicación de destino.</p>
        </div>
        <p className="text-sm italic pt-2">
          • En fechas de alta demanda como CyberSale, Navidad, Black Friday y eventos especiales, los tiempos de entrega pueden verse afectados por la gran cantidad de envíos de los operadores logísticos.
        </p>
      </div>
    )
  },
  {
    pregunta: "¿Cuáles son las formas de pago?",
    respuesta: (
      <div className="space-y-3">
        <p>Aceptamos los siguientes medios de pago:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Tarjeta de débito</li>
          <li>Mercado Pago</li>
          <li>Transferencia bancaria</li>
        </ul>
        <p className="text-[#D4AF37] font-medium">✨ Abonando mediante transferencia bancaria accedes a descuentos especiales.</p>
        <p>Los pedidos se abonan de forma anticipada antes de ser despachados.</p>
      </div>
    )
  },
  {
    pregunta: "¿Cómo se realizan los envíos?",
    respuesta: "Trabajamos con Correo Argentino y servicios de mensajería local."
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
    )
  },
  {
    pregunta: "¿Puedo comprar para revender?",
    respuesta: "¡Sí! En La Parfumerie de Solange te creamos un usuario para que accedas de forma directa a los beneficios y precios especiales en Bagués, siempre que hagas una compra mínima de 5 productos."
  }
];

const revendedoresFaqs = [
  {
    pregunta: "¿Cuál sería mi ganancia?",
    respuesta: (
      <div className="space-y-4">
        <p>La ganancia inicial es del 40% sobre precio costo. Luego, más vendés, más ganás.</p>
        <p>Tus objetivos los ponés vos: <span className="text-[#D4AF37] font-medium">✨ Tu ganancia no tiene límites.</span></p>
        <p>¿Querés más información o ya tenés la decisión de emprender con Bagués? Por favor contactanos de manera directa para recibir asesoramiento personalizado.</p>
      </div>
    )
  },
  {
    pregunta: "¿Cuál es el mínimo que tengo que vender?",
    respuesta: (
      <div className="space-y-2">
        <p>Para acceder a los descuentos, necesitás vender un mínimo de 5 productos por ciclo.</p>
        <p>Cada ciclo dura 4 semanas.</p>
        <p>En tu primera compra, el mínimo inicial también es de 5 productos.</p>
      </div>
    )
  },
  {
    pregunta: "¿Qué inversión inicial tengo que hacer?",
    respuesta: (
      <div className="space-y-4">
        <p>No necesitás realizar una inversión inicial obligatoria.</p>
        <div>
          <p className="mb-2">Para comenzar solo necesitás contar con el catálogo vigente:</p>
          <ul className="list-disc pl-5">
            <li>En versión papel</li>
            <li>PDF</li>
            <li>O catálogo interactivo online</li>
          </ul>
        </div>
        <p>Además, podés sumar herramientas opcionales que te ayudarán en tu trabajo diario.</p>
      </div>
    )
  },
  {
    pregunta: "¿Puedo liderar mi propio equipo de ventas?",
    respuesta: "Sí, por supuesto. Amo acompañar a las personas que quieren crecer."
  },
  {
    pregunta: "¿Cuáles son los beneficios de vender Bagués por catálogo?",
    respuesta: (
      <div className="space-y-4">
        <ul className="space-y-2">
          <li>✨ Excelente porcentaje de ganancia</li>
          <li>✨ Inversión mínima</li>
          <li>✨ Horarios súper flexibles</li>
          <li>✨ Posibilidad de generar ingresos extra</li>
          <li>✨ Oportunidad de crecer y formar tu propio equipo</li>
        </ul>
        <p>Además, Bagués cuenta con uno de los mejores porcentajes de ganancia dentro de las empresas de venta directa.</p>
      </div>
    )
  }
];

export default function FAQPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <HelpCircle size={40} className="mx-auto text-[#D4AF37] mb-4" />
        <h1 className="font-serif text-4xl md:text-5xl text-black mb-4">
          Preguntas Frecuentes
        </h1>
        <p className="text-gray-500">
          Encontrá respuestas rápidas a tus consultas más comunes.
        </p>
      </div>

      <div className="space-y-12">
        {/* General Section */}
        <div className="space-y-4">
          {generalFaqs.map((faq, index) => (
            <details key={index} className="group bg-white border border-gray-100 rounded-lg overflow-hidden transition-all hover:border-[#D4AF37]/30">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                <span className="font-medium text-black pr-6">{faq.pregunta}</span>
                <ChevronDown className="text-[#D4AF37] transition-transform group-open:rotate-180" size={20} />
              </summary>
              <div className="px-5 pb-5 text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                {faq.respuesta}
              </div>
            </details>
          ))}
        </div>

        {/* Revendedores Section */}
        <div className="space-y-6">
          <h2 className="font-serif text-3xl text-black border-b border-gray-100 pb-4">
            Revendedores Bagués
          </h2>
          <div className="space-y-4">
            {revendedoresFaqs.map((faq, index) => (
              <details key={index} className="group bg-white border border-gray-100 rounded-lg overflow-hidden transition-all hover:border-[#D4AF37]/30">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-medium text-black pr-6">{faq.pregunta}</span>
                  <ChevronDown className="text-[#D4AF37] transition-transform group-open:rotate-180" size={20} />
                </summary>
                <div className="px-5 pb-5 text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.respuesta}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 bg-[#0D0D0D] p-8 text-center border border-[#1A1A1A]">
        <h2 className="font-serif text-2xl text-white mb-4">
          ¿Tenés otra consulta?
        </h2>
        <p className="text-[#888888] mb-8">
          Estamos para ayudarte. Escribinos directamente por WhatsApp y te respondemos en el momento.
        </p>
        <a
          href="https://wa.me/5492954808202"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#D4AF37] text-black font-bold px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-[#E8CC6B] transition-colors"
        >
          <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 rounded-full object-cover" />
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
