import Image from "next/image";

/**
 * Tarjeta decorativa "una firma imperfectamente honesta", 322×291. Sale igual en
 * /politicas-de-privacidad y en /terminos-y-condiciones.
 *
 * El fondo es un radial elíptico GIRADO: CSS no lo tiene, así que se pinta un
 * círculo de radio 100 y se le aplica la matriz del SVG (dividida entre 100). El
 * 87% de opacidad va en el contenedor de las dos capas.
 */
export function TarjetaFirmaHonesta({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`hidden design:block design:h-[291px] design:w-[322px] ${className}`}>
      <div className="absolute inset-0 overflow-hidden opacity-[0.87]">
        <div className="absolute inset-0 bg-[#0F0F0F]" />
        <div
          className="absolute top-[-100px] left-[-100px] h-[200px] w-[200px] origin-center bg-[radial-gradient(circle_closest-side,#172339_0%,#0F0F0F_100%)]"
          style={{ transform: "matrix(6.96289, -6.15051, 0.904012, 0.907807, 10.2, 218.283)" }}
        />
      </div>
      <Image
        src="/icons/politicas/firma-honesta.svg"
        alt=""
        width={74}
        height={80}
        className="absolute top-[26.8px] left-[33.9px] h-[80.35px] w-[74.22px]"
      />
      <p className="absolute top-[125.3px] left-[34px] text-[36px] leading-[37px] font-light whitespace-pre text-white">
        {'una firma\n"imperfecta\nmente\n'}
        <span className="text-vernal-accent">honesta”</span>
      </p>
    </div>
  );
}
