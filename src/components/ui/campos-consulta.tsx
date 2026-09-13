import { Button } from "@/components/ui/button";
import { Field, FieldArea, FieldSelect } from "@/components/ui/field";
import { ConsentNotice } from "@/components/ui/consent-notice";
import { offices } from "@/lib/site";

/**
 * Campos de "Agenda tu consulta": los del hero de la home y los de las páginas
 * de sede, que en el archivo son idénticos al píxel (campos de 271×52 con 23 de
 * separación, comentarios de 565, "Enviar" de 224 a 21 del último campo y el
 * aviso 7px más adentro, a 20 del botón). El contenedor —fondo, relleno y
 * posición— lo pone cada sección.
 *
 * Aún sin backend: cuando se conecte, el envío tiene que guardar la aceptación
 * del aviso con fecha y ser idempotente (ver ConsentNotice).
 */
export function CamposConsulta() {
  return (
    <>
      <div className="grid grid-cols-1 gap-[23px] sm:grid-cols-2 movil:grid-cols-1 movil:gap-[18px]">
        <Field name="nombre" label="Nombre" icon="/icons/form/user.svg" iconWidth={17} iconHeight={19} required />
        <Field name="telefono" label="Teléfono" type="tel" icon="/icons/form/phone.svg" iconWidth={22} iconHeight={22} required />
        <Field name="correo" label="Correo" type="email" icon="/icons/form/mail.svg" iconWidth={18} iconHeight={14} required />
        {/* Las opciones son las 5 sedes; falta confirmar si hay modalidades
            no presenciales (virtual, telefónica) que el Figma no lista. */}
        <FieldSelect name="oficina" label="Oficina o modalidad de atención:" icon="/icons/form/office.svg" iconWidth={21} iconHeight={22} options={offices.map((o) => o.city)} />
        <FieldArea name="comentarios" label="Comentarios" icon="/icons/form/comment.svg" iconWidth={20} iconHeight={20} className="sm:col-span-2" />
      </div>

      <Button className="mt-[21px] w-full sm:w-[224px] movil:mt-[18px] movil:w-[224px]">Enviar</Button>

      {/* El aviso va 7px más adentro que los campos. */}
      <ConsentNotice className="mt-[20px] movil:mt-[21px] movil:ml-0 movil:text-[10px] design:ml-[7px]" />
    </>
  );
}
