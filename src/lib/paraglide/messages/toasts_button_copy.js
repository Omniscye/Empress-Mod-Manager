// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_toasts_button_copy = /** @type {(inputs: {}) => string} */ () => {
	return `Copy error`
};

const pl_toasts_button_copy = /** @type {(inputs: {}) => string} */ () => {
	return `Kopiuj błąd`
};

const zh_cn2_toasts_button_copy = /** @type {(inputs: {}) => string} */ () => {
	return `复制错误信息`
};

const sv_se2_toasts_button_copy = /** @type {(inputs: {}) => string} */ () => {
	return `Kopieringsfel`
};

const pt_br2_toasts_button_copy = /** @type {(inputs: {}) => string} */ () => {
	return `Copiar erro`
};

const es_es2_toasts_button_copy = /** @type {(inputs: {}) => string} */ () => {
	return `Copiar error`
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
export const toasts_button_copy = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.toasts_button_copy(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("toasts_button_copy", locale)
	if (locale === "en") return en_toasts_button_copy(inputs)
	if (locale === "pl") return pl_toasts_button_copy(inputs)
	if (locale === "zh-CN") return zh_cn2_toasts_button_copy(inputs)
	if (locale === "sv-SE") return sv_se2_toasts_button_copy(inputs)
	if (locale === "pt-BR") return pt_br2_toasts_button_copy(inputs)
	return es_es2_toasts_button_copy(inputs)
};