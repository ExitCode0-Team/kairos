/**
 * Backward-compatible re-export of the connector catalog text. The canonical
 * source now lives in apps/web/lib/api/fallback.ts (text only) and the icons
 * in apps/web/components/connectors/icon-registry.tsx.
 *
 * @deprecated import from `@/lib/api/fallback` + `@/components/connectors/icon-registry` instead.
 */
import { connectorsFallback } from "@/lib/api/fallback";
import { getConnectorIcon, getConnectorIconClass } from "@/components/connectors/icon-registry";

const catalog = connectorsFallback();

function hydrate(items: ReturnType<typeof connectorsFallback>["dataSources"]) {
  return items.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description,
    icon: getConnectorIcon(c.id),
    iconClass: getConnectorIconClass(c.id),
  }));
}

export const dataSources = hydrate(catalog.dataSources);
export const channels = hydrate(catalog.channels);
export const comingSoonSources = catalog.comingSoon.map((c) => ({
  id: c.id,
  name: c.name,
  description: c.description,
}));
