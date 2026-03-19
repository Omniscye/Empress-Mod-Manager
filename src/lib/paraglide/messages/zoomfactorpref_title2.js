// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_zoomfactorpref_title2 = /** @type {(inputs: {}) => string} */ () => {
	return `Zoom factor`
};

const pl_zoomfactorpref_title2 = /** @type {(inputs: {}) => string} */ () => {
	return `Współczynnik powiększenia`
};

const zh_cn2_zoomfactorpref_title2 = /** @type {(inputs: {}) => string} */ () => {
	return `缩放比例`
};

const sv_se2_zoomfactorpref_title2 = /** @type {(inputs: {}) => string} */ () => {
	return `Zoomfaktor`
};

const pt_br2_zoomfactorpref_title2 = /** @type {(inputs: {}) => string} */ () => {
	return `Fator de zoom`
};

const es_es2_zoomfactorpref_title2 = /** @type {(inputs: {}) => string} */ () => {
	return `Factor de zoom`
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
const zoomfactorpref_title2 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.zoomfactorpref_title2(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("zoomfactorpref_title2", locale)
	if (locale === "en") return en_zoomfactorpref_title2(inputs)
	if (locale === "pl") return pl_zoomfactorpref_title2(inputs)
	if (locale === "zh-CN") return zh_cn2_zoomfactorpref_title2(inputs)
	if (locale === "sv-SE") return sv_se2_zoomfactorpref_title2(inputs)
	if (locale === "pt-BR") return pt_br2_zoomfactorpref_title2(inputs)
	return es_es2_zoomfactorpref_title2(inputs)
};
export { zoomfactorpref_title2 as "zoomFactorPref_title" }