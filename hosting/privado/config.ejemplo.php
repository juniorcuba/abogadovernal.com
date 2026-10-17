<?php
// Plantilla de privado/config.php, la configuración del formulario en el hosting.
// El config.php DE VERDAD no va en el repo: lo genera scripts/desplegar-ftp.sh
// con la LEAD_WEBHOOK_URL de .env.local y lo sube directamente al servidor.
return [
    // URL del webhook del CRM (LeadConnector). Es un secreto: quien la tenga puede
    // meter contactos en el CRM.
    'webhook' => '',
    // Dominio que se apunta en "campaign". Vacío = el dominio desde el que llega
    // el envío (en pruebas, https://2020.abogadovernal.com).
    'sitio' => '',
    // true = no llama al CRM; escribe lo que mandaría en privado/consulta.log.php.
    'simular' => false,
];
