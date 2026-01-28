/* This file was automatically generated from OGC TMS 2.0 JSON Schema. */
/* DO NOT MODIFY IT BY HAND. Instead, modify the source JSON Schema file */
/* and run `pnpm run generate-types` to regenerate.                     */

import type { CRS } from "./crs.js";

export interface TilePoint {
  /**
   * @minItems 2
   * @maxItems 2
   */
  coordinates: [number, number];
  crs?: {
    [k: string]: unknown;
  } & CRS;
  /**
   * TileMatrix identifier associated with the scaleDenominator
   */
  tileMatrix?: string;
  /**
   * Scale denominator of the tile matrix selected
   */
  scaleDenominator?: number;
  /**
   * Cell size of the tile matrix selected
   */
  cellSize?: number;
  [k: string]: unknown;
}
