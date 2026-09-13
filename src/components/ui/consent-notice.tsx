import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Aviso de consentimiento SMS/WhatsApp — texto literal de los nodos 6:87
 * (formulario del hero) y 83:69 (newsletter).
 * Poppins ExtraLight Italic 12px, leading 1.17, justificado, blanco.
 * En el lienzo móvil va justificado y con interlineado de 12. El archivo pide
 * peso 275, que no existe sin fuente variable: con Light (300) la línea sale
 * más ancha y el newsletter corta distinto, así que se queda en ExtraLight
 * como en escritorio. El tamaño
 * cambia según dónde vaya: 10px en el hero y 12px en el newsletter. Por eso el
 * tamaño lo pasa quien lo usa: dos utilidades en conflicto en el mismo
 * className no tienen un orden fiable.
 *
 * NO reescribir ni resumir: es el consentimiento que exige la TCPA. Cuando el
 * formulario se conecte, hay que guardar la aceptación con timestamp.
 */
export function ConsentNotice({ className }: { className?: string }) {
  return (
    <p
      className={`text-[12px] leading-[14px] font-extralight design:text-justify italic text-white movil:leading-[12px] movil:text-justify ${className ?? ""}`}
    >
      Al enviar este formulario aceptas recibir mensajes transaccionales por SMS o
      WhatsApp de The Law Office Of{" "}
      <span className="font-bold italic">Vernal Farnum Mejia</span> relacionados con tu
      caso. La frecuencia de los mensajes puede variar. Pueden aplicar tarifas de
      mensajes y datos. Podrás cancelar la suscripción cuando quieras respondiendo
      STOP. Consulta nuestras{" "}
      <Link href={site.privacyUrl} className="underline-offset-2 hover:underline">
        Políticas de privacidad
      </Link>{" "}
      para más información.
    </p>
  );
}
