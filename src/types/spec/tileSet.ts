/* This file was automatically generated from OGC TMS 2.0 JSON Schema. */
/* DO NOT MODIFY IT BY HAND. Instead, modify the source JSON Schema file */
/* and run `pnpm run generate-types` to regenerate.                     */

import type { DBoundingBox } from "./2DBoundingBox.js";
import type { CRS } from "./crs.js";
import type { GeospatialData } from "./geospatialData.js";
import type { LinkSchema } from "./link.js";
import type { Style } from "./style.js";
import type { TileMatrixLimits } from "./tileMatrixLimits.js";
import type { TileMatrixSetDefinition } from "./tileMatrixSet.js";
import type { TilePoint } from "./tilePoint.js";

/**
 * A resource describing a tileset based on the OGC TileSet Metadata Standard. At least one of the 'TileMatrixSet',  or a link with 'rel' http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme
 */
export interface TileSetMetadata {
  /**
   * A title for this tileset
   */
  title?: string;
  /**
   * Brief narrative description of this tile set
   */
  description?: string;
  /**
   * keywords about this tileset
   */
  keywords?: string[];
  /**
   * Version of the Tile Set. Changes if the data behind the tiles has been changed
   */
  version?: string;
  /**
   * Useful information to contact the authors or custodians for the Tile Set
   */
  pointOfContact?: string;
  /**
   * Short reference to recognize the author or provider
   */
  attribution?: string;
  /**
   * License applicable to the tiles
   */
  license?: string;
  /**
   * Restrictions on the availability of the Tile Set that the user needs to be aware of before using or redistributing the Tile Set
   */
  accessConstraints?:
    | "unclassified"
    | "restricted"
    | "confidential"
    | "secret"
    | "topSecret";
  /**
   * Media types available for the tiles
   */
  mediaTypes?: string[];
  dataType: {
    [k: string]: unknown;
  } & (string | ("map" | "vector" | "coverage"));
  /**
   * Limits for the TileRow and TileCol values for each TileMatrix in the tileMatrixSet. If missing, there are no limits other that the ones imposed by the TileMatrixSet. If present the TileMatrices listed are limited and the rest not available at all
   */
  tileMatrixSetLimits?: TileMatrixLimits[];
  crs: {
    [k: string]: unknown;
  } & CRS;
  /**
   * Epoch of the Coordinate Reference System (CRS)
   */
  epoch?: number;
  boundingBox?: {
    [k: string]: unknown;
  } & DBoundingBox;
  created?: {
    [k: string]: unknown;
  } & string;
  updated?: {
    [k: string]: unknown;
  } & string;
  /**
   * @minItems 1
   */
  layers?: [GeospatialData, ...GeospatialData[]];
  style?: {
    [k: string]: unknown;
  } & Style;
  centerPoint?: {
    [k: string]: unknown;
  } & TilePoint;
  tileMatrixSet?: TileMatrixSetDefinition;
  /**
   * Reference to a Tile Matrix Set on an official source for Tile Matrix Sets such as the OGC-NA definition server (http://www.opengis.net/def/tms). Required if the tile matrix set is registered on an open official source.
   */
  tileMatrixSetURI?: string;
  /**
   * Links to related resources. Possible link 'rel' values are: 'http://www.opengis.net/def/rel/ogc/1.0/dataset' for a URL pointing to the dataset, 'item' for a URL template to get a tile; 'alternate' for a URL pointing to another representation of the TileSetMetadata (e.g a TileJSON file); 'http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme' for a definition of the TileMatrixSet; 'http://www.opengis.net/def/rel/ogc/1.0/geodata' for pointing to a single collection (if the tileset represents a single collection)
   */
  links?: LinkSchema[];
  [k: string]: unknown;
}
