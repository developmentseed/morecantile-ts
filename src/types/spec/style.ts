/* This file was automatically generated from OGC TMS 2.0 JSON Schema. */
/* DO NOT MODIFY IT BY HAND. Instead, modify the source JSON Schema file */
/* and run `pnpm run generate-types` to regenerate.                     */

import type { LinkSchema } from "./link.js";

export interface Style {
  /**
   * An identifier for this style. Implementation of 'identifier'
   */
  id: string;
  /**
   * A title for this style
   */
  title?: string;
  /**
   * Brief narrative description of this style
   */
  description?: string;
  /**
   * keywords about this style
   */
  keywords?: string[];
  /**
   * Links to style related resources. Possible link 'rel' values are: 'style' for a URL pointing to the style description, 'styleSpec' for a URL pointing to the specification or standard used to define the style.
   *
   * @minItems 1
   */
  links?: [LinkSchema, ...LinkSchema[]];
  [k: string]: unknown;
}
