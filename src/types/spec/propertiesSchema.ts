/* This file was automatically generated from OGC TMS 2.0 JSON Schema. */
/* DO NOT MODIFY IT BY HAND. Instead, modify the source JSON Schema file */
/* and run `pnpm run generate-types` to regenerate.                     */

/**
 * Attributes of the features or rangetypes of a coverage. Defined by a subset of the JSON Schema for the properties of a feature
 */
export interface PropertiesSchema {
  type: "object";
  /**
   * Implements 'multiplicity' by citing property 'name' defined as 'additionalProperties'
   *
   * @minItems 1
   */
  required?: [string, ...string[]];
  properties: {
    /**
     * No property names are defined but any property name they should be described by JSON Schema. So 'additionalProperties' implements 'name'.
     */
    [k: string]: {
      title?: string;
      /**
       * Implements 'description'
       */
      description?: string;
      type?:
        | "array"
        | "boolean"
        | "integer"
        | "null"
        | "number"
        | "object"
        | "string";
      /**
       * Implements 'acceptedValues'
       *
       * @minItems 1
       */
      enum?: [unknown, ...unknown[]];
      /**
       * Complements implementation of 'type'
       */
      format?: string;
      /**
       * Implements 'mediaType'
       */
      contentMediaType?: string;
      /**
       * Implements 'range'
       */
      maximum?: number;
      /**
       * Implements 'range'
       */
      exclusiveMaximum?: number;
      /**
       * Implements 'range'
       */
      minimum?: number;
      /**
       * Implements 'range'
       */
      exclusiveMinimum?: number;
      pattern?: string;
      /**
       * Implements 'upperMultiplicity'
       */
      maxItems?: number;
      /**
       * Implements 'lowerMultiplicity'
       */
      minItems?: number;
      observedProperty?: string;
      observedPropertyURI?: string;
      uom?: string;
      uomURI?: string;
      [k: string]: unknown;
    };
  };
  [k: string]: unknown;
}
