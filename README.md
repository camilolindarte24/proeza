## Proeza Automotriz

This app was created using https://getmocha.com.
Need help or want to join the community? Join our [Discord](https://discord.gg/shDEGBSe2d).

To run the devserver:
```
npm install
npm run dev
```

## Configuración WhatsApp (Netlify)

La cotización funciona 100% del lado del frontend y abre WhatsApp con mensaje prellenado.

1. En Netlify, ve a **Site settings > Environment variables**.
2. Crea la variable `VITE_WHATSAPP_NUMBER` con formato internacional y sin `+`.
	- Ejemplo: `573108712661`
3. Publica el sitio.

La app genera el enlace de WhatsApp directamente en el navegador, sin funciones serverless para la cotización.
