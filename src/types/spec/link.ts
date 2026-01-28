/* This file was automatically generated from OGC TMS 2.0 JSON Schema. */
/* DO NOT MODIFY IT BY HAND. Instead, modify the source JSON Schema file */
/* and run `pnpm run generate-types` to regenerate.                     */

/**
 * Schema for external references
 */
export interface LinkSchema {
  /**
   * Supplies the URI to a remote resource (or resource fragment).
   */
  href: string;
  /**
   * The type or semantics of the relation.
   */
  rel: string;
  /**
   * This flag set to true if the link is a URL template.
   */
  templated?: boolean;
  /**
   * A base path to retrieve semantic information about the variables used in URL template.
   */
  varBase?: string;
  /**
   * A hint indicating what the media type of the result of dereferencing the link should be.
   */
  type?: string;
  /**
   * A hint indicating what the language of the result of dereferencing the link should be.
   */
  hreflang?: string;
  /**
   * Used to label the destination of a link such that it can be used as a human-readable identifier.
   */
  title?: string;
  length?: number;
  [k: string]: unknown;
}
