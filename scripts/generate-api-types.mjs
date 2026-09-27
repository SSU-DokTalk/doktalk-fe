/**
 * 백엔드 OpenAPI 명세로 API 타입(src/shared/api/schema.d.ts)을 만들어요.
 *
 *   yarn api:types                         # 로컬 백엔드 (http://localhost:8000/openapi.json)
 *   yarn api:types https://…/openapi.json  # 다른 서버
 *   yarn api:types ./openapi.json          # 저장해 둔 명세 파일
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import openapiTS, { astToString } from 'openapi-typescript';
import prettier from 'prettier';

const OUTPUT = 'src/shared/api/schema.d.ts';
const source = process.argv[2] ?? 'http://localhost:8000/openapi.json';
const url = /^https?:\/\//.test(source)
  ? new URL(source)
  : pathToFileURL(resolve(source));

const ast = await openapiTS(url);
const header = `/**
 * 자동으로 만든 파일이에요. 직접 고치지 말고 \`yarn api:types\`로 다시 만들어요.
 * 원본: 백엔드(FastAPI)의 /openapi.json
 */

`;
// 커밋할 때 lint-staged가 다시 포맷하지 않게 미리 맞춰 둬요.
const options = (await prettier.resolveConfig(OUTPUT)) ?? {};
const code = await prettier.format(header + astToString(ast), {
  ...options,
  filepath: OUTPUT,
});
writeFileSync(OUTPUT, code);
console.log(`API 타입을 만들었어요: ${OUTPUT}`);
