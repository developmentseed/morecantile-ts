/**
 * Generates TypeScript types from OGC TMS 2.0 JSON Schema files.
 *
 * Each schema is compiled independently with `declareExternallyReferenced: false`
 * so that $ref'd types appear as bare names. We then prepend the correct import
 * statements based on the known dependency graph.
 *
 * The projJSON.json schema (~1000 lines of CRS subtypes) is replaced with an
 * opaque `ProjJSON` type alias.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { compileFromFile } from "json-schema-to-typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SCHEMA_DIR = resolve(ROOT, "spec/schemas/tms/2.0/json");
const OUT_DIR = resolve(ROOT, "src/types/spec");

const BANNER = `/* This file was automatically generated from OGC TMS 2.0 JSON Schema. */
/* DO NOT MODIFY IT BY HAND. Instead, modify the source JSON Schema file */
/* and run \`pnpm run generate-types\` to regenerate.                     */`;

/**
 * Map from schema filename (without .json) to the type names it exports.
 * Determined empirically from json-schema-to-typescript output.
 */
const SCHEMA_EXPORTS: Record<string, string[]> = {
  "2DPoint": ["DPoint"],
  "2DBoundingBox": ["DBoundingBox"],
  crs: ["CRS"],
  dataType: ["DataType"],
  link: ["LinkSchema"],
  timeStamp: ["TimeStamp"],
  variableMatrixWidth: ["VariableMatrixWidth"],
  tileMatrixLimits: ["TileMatrixLimits"],
  propertiesSchema: ["PropertiesSchema"],
  style: ["Style"],
  tilePoint: ["TilePoint"],
  tileMatrix: ["TileMatrix"],
  tileMatrixSet: ["TileMatrixSetDefinition"],
  geospatialData: ["GeospatialData"],
  tileSet: ["TileSetMetadata"],
};

/**
 * Map from schema filename to the schema files it $ref's.
 * projJSON is excluded — handled separately as an opaque type.
 */
const SCHEMA_DEPS: Record<string, string[]> = {
  "2DPoint": [],
  "2DBoundingBox": ["2DPoint", "crs"],
  crs: [],
  dataType: [],
  link: [],
  timeStamp: [],
  variableMatrixWidth: [],
  tileMatrixLimits: [],
  propertiesSchema: [],
  style: ["link"],
  tilePoint: ["crs"],
  tileMatrix: ["2DPoint", "variableMatrixWidth"],
  tileMatrixSet: ["crs", "2DBoundingBox", "tileMatrix"],
  geospatialData: [
    "dataType",
    "crs",
    "2DBoundingBox",
    "timeStamp",
    "style",
    "propertiesSchema",
    "link",
  ],
  tileSet: [
    "dataType",
    "tileMatrixLimits",
    "crs",
    "2DBoundingBox",
    "timeStamp",
    "geospatialData",
    "style",
    "tilePoint",
    "tileMatrixSet",
    "link",
  ],
};

/** Build an import block, only including types that appear in the generated code. */
function buildImports(schemaName: string, generatedCode: string): string {
  const deps = SCHEMA_DEPS[schemaName];
  if (!deps || deps.length === 0) return "";

  const lines: string[] = [];
  for (const dep of deps) {
    const types = SCHEMA_EXPORTS[dep];
    if (!types) throw new Error(`Unknown schema dependency: ${dep}`);
    // Only import types that are actually referenced in the generated output
    const usedTypes = types.filter((t) =>
      new RegExp(`\\b${t}\\b`).test(generatedCode),
    );
    if (usedTypes.length > 0) {
      lines.push(`import type { ${usedTypes.join(", ")} } from "./${dep}.js";`);
    }
  }

  return lines.length > 0 ? `${lines.join("\n")}\n\n` : "";
}

/** Compile a single schema file, returning the generated TypeScript. */
async function compileSchema(schemaName: string): Promise<string> {
  const ts = await compileFromFile(`${SCHEMA_DIR}/${schemaName}.json`, {
    cwd: SCHEMA_DIR,
    declareExternallyReferenced: false,
    format: false,
    bannerComment: "",
    $refOptions: {
      resolve: {
        projjson: {
          order: 1,
          canRead: /projJSON/,
          read: () => JSON.stringify({ type: "object", title: "ProjJSON" }),
        },
      },
    },
  });

  return ts;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  // Generate the opaque ProjJSON type file
  const projJsonContent = [
    BANNER,
    "",
    "/** Opaque type for PROJ JSON coordinate reference system definitions. */",
    "export type ProjJSON = Record<string, unknown>;",
    "",
  ].join("\n");
  writeFileSync(resolve(OUT_DIR, "projJSON.ts"), projJsonContent);

  const schemaNames = Object.keys(SCHEMA_EXPORTS);

  for (const name of schemaNames) {
    const rawTs = await compileSchema(name);
    const imports = buildImports(name, rawTs);

    // crs.ts needs the ProjJSON import since we stubbed out the schema
    const projImport =
      name === "crs"
        ? 'import type { ProjJSON } from "./projJSON.js";\n\n'
        : "";

    const content = [BANNER, "", projImport + imports + rawTs].join("\n");
    const outPath = resolve(OUT_DIR, `${name}.ts`);
    writeFileSync(outPath, content);
    console.log(`  ${name}.ts`);
  }

  // Generate barrel index.ts
  const reexports = ["projJSON", ...schemaNames]
    .map((name) => `export * from "./${name}.js";`)
    .join("\n");
  const indexContent = [BANNER, "", reexports, ""].join("\n");
  writeFileSync(resolve(OUT_DIR, "index.ts"), indexContent);
  console.log("  index.ts");

  console.log(`\nGenerated ${schemaNames.length + 2} files in src/types/spec/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
