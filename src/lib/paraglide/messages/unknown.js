// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_unknown = /** @type {(inputs: {}) => string} */ () => {
	return `Unknown`
};

const pl_unknown = /** @type {(inputs: {}) => string} */ () => {
	return `Nieznany`
};

const zh_cn2_unknown = /** @type {(inputs: {}) => string} */ () => {
	return `未知`
};

const sv_se2_unknown = /** @type {(inputs: {}) => string} */ () => {
	return `Okänd`
};

const pt_br2_unknown = /** @type {(inputs: {}) => string} */ () => {
	return `Desconhecido`
};

const es_es2_unknown = /** @type {(inputs: {}) => string} */ () => {
	return `Desconocido`
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
export const unknown = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.unknown(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("unknown", locale)
	if (locale === "en") return en_unknown(inputs)
	if (locale === "pl") return pl_unknown(inputs)
	if (locale === "zh-CN") return zh_cn2_unknown(inputs)
	if (locale === "sv-SE") return sv_se2_unknown(inputs)
	if (locale === "pt-BR") return pt_br2_unknown(inputs)
	return es_es2_unknown(inputs)
};