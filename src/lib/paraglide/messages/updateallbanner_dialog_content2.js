// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_updateallbanner_dialog_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `Select which mods to update:`
};

const pl_updateallbanner_dialog_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `Wybierz mody do aktualizacji:`
};

const zh_cn2_updateallbanner_dialog_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `选择要更新的模组：`
};

const sv_se2_updateallbanner_dialog_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `Välj vilka moddar som ska uppdateras:`
};

const pt_br2_updateallbanner_dialog_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `Selecione quais mods atualizar:`
};

const es_es2_updateallbanner_dialog_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `Seleccione que mods actualizar:`
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
const updateallbanner_dialog_content2 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.updateallbanner_dialog_content2(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("updateallbanner_dialog_content2", locale)
	if (locale === "en") return en_updateallbanner_dialog_content2(inputs)
	if (locale === "pl") return pl_updateallbanner_dialog_content2(inputs)
	if (locale === "zh-CN") return zh_cn2_updateallbanner_dialog_content2(inputs)
	if (locale === "sv-SE") return sv_se2_updateallbanner_dialog_content2(inputs)
	if (locale === "pt-BR") return pt_br2_updateallbanner_dialog_content2(inputs)
	return es_es2_updateallbanner_dialog_content2(inputs)
};
export { updateallbanner_dialog_content2 as "updateAllBanner_dialog_content" }