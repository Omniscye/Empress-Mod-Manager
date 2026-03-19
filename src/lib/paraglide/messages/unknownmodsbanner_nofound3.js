// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_unknownmodsbanner_nofound3 = /** @type {(inputs: {}) => string} */ () => {
	return `The following mod could not be found: `
};

const pl_unknownmodsbanner_nofound3 = /** @type {(inputs: {}) => string} */ () => {
	return `Nie znaleziono następującego moda: `
};

const zh_cn2_unknownmodsbanner_nofound3 = /** @type {(inputs: {}) => string} */ () => {
	return `以下模组无法找到： `
};

const sv_se2_unknownmodsbanner_nofound3 = /** @type {(inputs: {}) => string} */ () => {
	return `Följande mod kunde inte hittas: `
};

const pt_br2_unknownmodsbanner_nofound3 = /** @type {(inputs: {}) => string} */ () => {
	return `O seguinte mod não pôde ser encontrado: `
};

const es_es2_unknownmodsbanner_nofound3 = /** @type {(inputs: {}) => string} */ () => {
	return `No se ha encontrado el siguiente mod: `
};

/**
* This function has been compiled by [Paraglide JS](https://inlang.com/m/gerre34r).
*
* - Changing this function will be over-written by the next build.
*
* - If you want to change the translations, you can either edit the source files e.g. `en.json`, or
* use another inlang app like [Fink](https://inlang.com/m/tdozzpar) or the [VSCode extension Sherlock](https://inlang.com/m/r7kp499g).
* 
* @param {{}} inputs
* @param {{ locale?: "en" | "pl" | "zh-CN" | "sv-SE" | "pt-BR" | "es-ES" }} options
* @returns {string}
*/
/* @__NO_SIDE_EFFECTS__ */
const unknownmodsbanner_nofound3 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.unknownmodsbanner_nofound3(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("unknownmodsbanner_nofound3", locale)
	if (locale === "en") return en_unknownmodsbanner_nofound3(inputs)
	if (locale === "pl") return pl_unknownmodsbanner_nofound3(inputs)
	if (locale === "zh-CN") return zh_cn2_unknownmodsbanner_nofound3(inputs)
	if (locale === "sv-SE") return sv_se2_unknownmodsbanner_nofound3(inputs)
	if (locale === "pt-BR") return pt_br2_unknownmodsbanner_nofound3(inputs)
	return es_es2_unknownmodsbanner_nofound3(inputs)
};
export { unknownmodsbanner_nofound3 as "unknownModsBanner_noFound" }