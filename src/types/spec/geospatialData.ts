/* This file was automatically generated from OGC TMS 2.0 JSON Schema. */
/* DO NOT MODIFY IT BY HAND. Instead, modify the source JSON Schema file */
/* and run `pnpm run generate-types` to regenerate.                     */

import type { DBoundingBox } from "./2DBoundingBox.js";
import type { CRS } from "./crs.js";
import type { LinkSchema } from "./link.js";
import type { PropertiesSchema } from "./propertiesSchema.js";
import type { Style } from "./style.js";

export interface GeospatialData {
  /**
   * Title of this tile matrix set, normally used for display to a human
   */
  title?: string;
  /**
   * Brief narrative description of this tile matrix set, normally available for display to a human
   */
  description?: string;
  /**
   * Unordered list of one or more commonly used or formalized word(s) or phrase(s) used to describe this layer
   */
  keywords?: string;
  /**
   * Unique identifier of the Layer. Implementation of 'identifier'
   */
  id: string;
  dataType: {
    [k: string]: unknown;
  } & (string | ("map" | "vector" | "coverage"));
  /**
   * The geometry dimension of the features shown in this layer (0: points, 1: curves, 2: surfaces, 3: solids), unspecified: mixed or unknown
   */
  geometryDimension?: number;
  /**
   * Feature type identifier. Only applicable to layers of datatype 'geometries'
   */
  featureType?: string;
  /**
   * Useful information to contact the authors or custodians for the layer (e.g. e-mail address, a physical address,  phone numbers, etc)
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
   * Organization or individual responsible for making the layer available
   */
  publisher?: string;
  /**
   * Category where the layer can be grouped
   */
  theme?: string;
  crs?: {
    [k: string]: unknown;
  } & CRS;
  /**
   * Epoch of the Coordinate Reference System (CRS)
   */
  epoch?: number;
  /**
   * Minimum scale denominator for usage of the layer
   */
  minScaleDenominator?: number;
  /**
   * Maximum scale denominator for usage of the layer
   */
  maxScaleDenominator?: number;
  /**
   * Minimum cell size for usage of the layer
   */
  minCellSize?: number;
  /**
   * Maximum cell size for usage of the layer
   */
  maxCellSize?: number;
  /**
   * TileMatrix identifier associated with the minScaleDenominator
   */
  maxTileMatrix?: string;
  /**
   * TileMatrix identifier associated with the maxScaleDenominator
   */
  minTileMatrix?: string;
  boundingBox?: {
    [k: string]: unknown;
  } & DBoundingBox;
  created?: {
    [k: string]: unknown;
  } & string;
  updated?: {
    [k: string]: unknown;
  } & string;
  style?: {
    [k: string]: unknown;
  } & Style;
  /**
   * URI identifying a class of data contained in this layer (useful to determine compatibility with styles or processes)
   */
  geoDataClasses?: string[];
  propertiesSchema?: {
    [k: string]: unknown;
  } & PropertiesSchema;
  /**
   * Links related to this layer. Possible link 'rel' values are: 'geodata' for a URL pointing to the collection of geospatial data.
   *
   * @minItems 1
   */
  links?: [LinkSchema, ...LinkSchema[]];
  [k: string]: unknown;
}
