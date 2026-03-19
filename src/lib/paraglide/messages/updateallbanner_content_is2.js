// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_updateallbanner_content_is2 = /** @type {(inputs: {}) => string} */ () => {
	return `There is `
};

const pl_updateallbanner_content_is2 = /** @type {(inputs: {}) => string} */ () => {
	return `Dostępna jest `
};

const zh_cn2_updateallbanner_content_is2 = /** @type {(inputs: {}) => string} */ () => {
	return `存在`
};

const sv_se2_updateallbanner_content_is2 = /** @type {(inputs: {}) => string} */ () => {
	return `Det finns `
};

const pt_br2_updateallbanner_content_is2 = /** @type {(inputs: {}) => string} */ () => {
	return `Existe `
};

const es_es2_updateallbanner_content_is2 = /** @type {(inputs: {}) => string} */ () => {
	return `Hay `
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
const updateallbanner_content_is2 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.updateallbanner_content_is2(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("updateallbanner_content_is2", locale)
	if (locale === "en") return en_updateallbanner_content_is2(inputs)
	if (locale === "pl") return pl_updateallbanner_content_is2(inputs)
	if (locale === "zh-CN") return zh_cn2_updateallbanner_content_is2(inputs)
	if (locale === "sv-SE") return sv_se2_updateallbanner_content_is2(inputs)
	if (locale === "pt-BR") return pt_br2_updateallbanner_content_is2(inputs)
	return es_es2_updateallbanner_content_is2(inputs)
};
export { updateallbanner_content_is2 as "updateAllBanner_content_is" }