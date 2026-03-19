// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_updateallbanner_content_update2 = /** @type {(inputs: {}) => string} */ () => {
	return ` update available.`
};

const pl_updateallbanner_content_update2 = /** @type {(inputs: {}) => string} */ () => {
	return ` aktualizacja.`
};

const zh_cn2_updateallbanner_content_update2 = /** @type {(inputs: {}) => string} */ () => {
	return ` 个更新可用`
};

const sv_se2_updateallbanner_content_update2 = /** @type {(inputs: {}) => string} */ () => {
	return ` uppdatering tillgänglig.`
};

const pt_br2_updateallbanner_content_update2 = /** @type {(inputs: {}) => string} */ () => {
	return ` atualização disponível.`
};

const es_es2_updateallbanner_content_update2 = /** @type {(inputs: {}) => string} */ () => {
	return ` actualización(es) disponible(s).`
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
const updateallbanner_content_update2 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.updateallbanner_content_update2(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("updateallbanner_content_update2", locale)
	if (locale === "en") return en_updateallbanner_content_update2(inputs)
	if (locale === "pl") return pl_updateallbanner_content_update2(inputs)
	if (locale === "zh-CN") return zh_cn2_updateallbanner_content_update2(inputs)
	if (locale === "sv-SE") return sv_se2_updateallbanner_content_update2(inputs)
	if (locale === "pt-BR") return pt_br2_updateallbanner_content_update2(inputs)
	return es_es2_updateallbanner_content_update2(inputs)
};
export { updateallbanner_content_update2 as "updateAllBanner_content_update" }