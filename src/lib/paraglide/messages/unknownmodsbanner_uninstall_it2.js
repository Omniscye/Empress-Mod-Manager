// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_unknownmodsbanner_uninstall_it2 = /** @type {(inputs: {}) => string} */ () => {
	return `Uninstall it?`
};

const pl_unknownmodsbanner_uninstall_it2 = /** @type {(inputs: {}) => string} */ () => {
	return `Odinstalować go?`
};

const zh_cn2_unknownmodsbanner_uninstall_it2 = /** @type {(inputs: {}) => string} */ () => {
	return `卸载它?`
};

const sv_se2_unknownmodsbanner_uninstall_it2 = /** @type {(inputs: {}) => string} */ () => {
	return `Avinstallera det?`
};

const pt_br2_unknownmodsbanner_uninstall_it2 = /** @type {(inputs: {}) => string} */ () => {
	return `Desinstalá-lo?`
};

const es_es2_unknownmodsbanner_uninstall_it2 = /** @type {(inputs: {}) => string} */ () => {
	return `¿Desinstalar?`
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
const unknownmodsbanner_uninstall_it2 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.unknownmodsbanner_uninstall_it2(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("unknownmodsbanner_uninstall_it2", locale)
	if (locale === "en") return en_unknownmodsbanner_uninstall_it2(inputs)
	if (locale === "pl") return pl_unknownmodsbanner_uninstall_it2(inputs)
	if (locale === "zh-CN") return zh_cn2_unknownmodsbanner_uninstall_it2(inputs)
	if (locale === "sv-SE") return sv_se2_unknownmodsbanner_uninstall_it2(inputs)
	if (locale === "pt-BR") return pt_br2_unknownmodsbanner_uninstall_it2(inputs)
	return es_es2_unknownmodsbanner_uninstall_it2(inputs)
};
export { unknownmodsbanner_uninstall_it2 as "unknownModsBanner_uninstall_it" }