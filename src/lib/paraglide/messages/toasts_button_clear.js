// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_toasts_button_clear = /** @type {(inputs: {}) => string} */ () => {
	return `Clear toast`
};

const pl_toasts_button_clear = /** @type {(inputs: {}) => string} */ () => {
	return `Wyczyść powiadomienie`
};

const zh_cn2_toasts_button_clear = /** @type {(inputs: {}) => string} */ () => {
	return `清除提示`
};

const sv_se2_toasts_button_clear = /** @type {(inputs: {}) => string} */ () => {
	return `Klar rostat bröd`
};

const pt_br2_toasts_button_clear = /** @type {(inputs: {}) => string} */ () => {
	return `Limpar aviso`
};

const es_es2_toasts_button_clear = /** @type {(inputs: {}) => string} */ () => {
	return `Limpiar notificación`
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
export const toasts_button_clear = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.toasts_button_clear(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("toasts_button_clear", locale)
	if (locale === "en") return en_toasts_button_clear(inputs)
	if (locale === "pl") return pl_toasts_button_clear(inputs)
	if (locale === "zh-CN") return zh_cn2_toasts_button_clear(inputs)
	if (locale === "sv-SE") return sv_se2_toasts_button_clear(inputs)
	if (locale === "pt-BR") return pt_br2_toasts_button_clear(inputs)
	return es_es2_toasts_button_clear(inputs)
};