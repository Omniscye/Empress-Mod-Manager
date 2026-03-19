// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_updateallbanner_dialog_list_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `Ignore this update in the 'Update all' list.`
};

const pl_updateallbanner_dialog_list_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `Ignoruj tę aktualizację na liście 'Aktualizuj wszystko'.`
};

const zh_cn2_updateallbanner_dialog_list_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `在“全部更新”列表中忽略此更新。`
};

const sv_se2_updateallbanner_dialog_list_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `Ignorera den här uppdateringen i listan "Uppdatera alla".`
};

const pt_br2_updateallbanner_dialog_list_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `Ignorar esta atualização na lista 'Atualizar tudo'.`
};

const es_es2_updateallbanner_dialog_list_content2 = /** @type {(inputs: {}) => string} */ () => {
	return `Ignorar esta actualización en la lista «Actualizar todo».`
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
const updateallbanner_dialog_list_content2 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.updateallbanner_dialog_list_content2(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("updateallbanner_dialog_list_content2", locale)
	if (locale === "en") return en_updateallbanner_dialog_list_content2(inputs)
	if (locale === "pl") return pl_updateallbanner_dialog_list_content2(inputs)
	if (locale === "zh-CN") return zh_cn2_updateallbanner_dialog_list_content2(inputs)
	if (locale === "sv-SE") return sv_se2_updateallbanner_dialog_list_content2(inputs)
	if (locale === "pt-BR") return pt_br2_updateallbanner_dialog_list_content2(inputs)
	return es_es2_updateallbanner_dialog_list_content2(inputs)
};
export { updateallbanner_dialog_list_content2 as "updateAllBanner_dialog_list_content" }