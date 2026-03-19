// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_updater_installupdate_message_name1 = /** @type {(inputs: {}) => string} */ () => {
	return `Failed to update Empress Mod Manager`
};

const pl_updater_installupdate_message_name1 = /** @type {(inputs: {}) => string} */ () => {
	return `Nie udało się zaktualizować Gale`
};

const zh_cn2_updater_installupdate_message_name1 = /** @type {(inputs: {}) => string} */ () => {
	return `更新 Gale 失败`
};

const sv_se2_updater_installupdate_message_name1 = /** @type {(inputs: {}) => string} */ () => {
	return `Misslyckades med att uppdatera Gale`
};

const pt_br2_updater_installupdate_message_name1 = /** @type {(inputs: {}) => string} */ () => {
	return `Falha ao atualizar o Gale`
};

const es_es2_updater_installupdate_message_name1 = /** @type {(inputs: {}) => string} */ () => {
	return `No se ha podido actualizar Gale.`
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
const updater_installupdate_message_name1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.updater_installupdate_message_name1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("updater_installupdate_message_name1", locale)
	if (locale === "en") return en_updater_installupdate_message_name1(inputs)
	if (locale === "pl") return pl_updater_installupdate_message_name1(inputs)
	if (locale === "zh-CN") return zh_cn2_updater_installupdate_message_name1(inputs)
	if (locale === "sv-SE") return sv_se2_updater_installupdate_message_name1(inputs)
	if (locale === "pt-BR") return pt_br2_updater_installupdate_message_name1(inputs)
	return es_es2_updater_installupdate_message_name1(inputs)
};
export { updater_installupdate_message_name1 as "updater_installUpdate_message_name" }