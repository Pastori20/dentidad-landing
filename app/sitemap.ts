import type { MetadataRoute } from "next";

const SITE_URL = "https://www.dentidad.com";

/**
 * Fecha de la última actualización REAL del contenido. Se toca a mano.
 *
 * Antes acá iba `new Date()`: la página decía "modificada hoy" todos los días,
 * aunque no hubiera cambiado nada. Google aprendió a ignorar esa señal, así que
 * una fecha automática no suma y una fecha de verdad sí.
 */
const LAST_CONTENT_UPDATE = new Date("2026-09-22T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = LAST_CONTENT_UPDATE;
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Anchor sections del landing (Google las trata como URLs separadas y mejora deep linking)
    {
      url: `${SITE_URL}/#destacadas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#planes`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#features`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#diferencias`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#problema`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/#cta`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // La ficha completa del producto: la fuente más citable para asistentes de IA.
    {
      url: `${SITE_URL}/sobre-dentidad`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Páginas legales
    {
      url: `${SITE_URL}/terminos`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
