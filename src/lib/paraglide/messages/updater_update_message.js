// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_updater_update_message = /** @type {(inputs: {}) => string} */ () => {
	return `Empress Mod Manager will now restart in order to apply the update.`
};

const pl_updater_update_message = /** @type {(inputs: {}) => string} */ () => {
	return `Gale zostanie teraz uruchomiony ponownie w celu zastosowania aktualizacji.`
};

const zh_cn2_updater_update_message = /** @type {(inputs: {}) => string} */ () => {
	return `Gale 将重新启动以应用更新。`
};

const sv_se2_updater_update_message = /** @type {(inputs: {}) => string} */ () => {
	return `Gale kommer nu att starta om för att installera uppdateringen.`
};

const pt_br2_updater_update_message = /** @type {(inputs: {}) => string} */ () => {
	return `O Gale irá reiniciar agora para aplicar a atualização.`
};

const es_es2_updater_update_message = /** @type {(inputs: {}) => string} */ () => {
	return `Gale se reiniciará para aplicar la actualización.`
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
export const updater_update_message = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.updater_update_message(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("updater_update_message", locale)
	if (locale === "en") return en_updater_update_message(inputs)
	if (locale === "pl") return pl_updater_update_message(inputs)
	if (locale === "zh-CN") return zh_cn2_updater_update_message(inputs)
	if (locale === "sv-SE") return sv_se2_updater_update_message(inputs)
	if (locale === "pt-BR") return pt_br2_updater_update_message(inputs)
	return es_es2_updater_update_message(inputs)
};