/**
 * Aviso de consentimiento SMS/WhatsApp — texto literal de los nodos 6:87
 * (formulario del hero) y 83:69 (newsletter).
 * Poppins ExtraLight Italic 12px, leading 1.17, justificado, blanco.
 *
 * NO reescribir ni resumir: es el consentimiento que exige la TCPA. Cuando el
 * formulario se conecte, hay que guardar la aceptación con timestamp.
 */
export function ConsentNotice({ className }: { className?: string }) {
  return (
    <p
      className={`text-[12px] leading-[1.17] font-extralight text-justify italic text-white ${className ?? ""}`}
    >
      Al enviar este formulario aceptas recibir mensajes transaccionales por SMS o
      WhatsApp de The Law Office Of{" "}
      <span className="font-bold italic">Vernal Farnum Mejia</span> relacionados con tu
      caso. La frecuencia de los mensajes puede variar. Pueden aplicar tarifas de
      mensajes y datos. Podrás cancelar la suscripción cuando quieras respondiendo
      STOP. Consulta nuestras Políticas de privacidad para más información.
    </p>
  );
}
