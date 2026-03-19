// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_button_skip1 = /** @type {(inputs: {}) => string} */ () => {
	return `Skip`
};

const pl_welcomedialog_button_skip1 = /** @type {(inputs: {}) => string} */ () => {
	return `Pomiń`
};

const zh_cn2_welcomedialog_button_skip1 = /** @type {(inputs: {}) => string} */ () => {
	return `跳过`
};

const sv_se2_welcomedialog_button_skip1 = /** @type {(inputs: {}) => string} */ () => {
	return `Hoppa`
};

const pt_br2_welcomedialog_button_skip1 = /** @type {(inputs: {}) => string} */ () => {
	return `Pular`
};

const es_es2_welcomedialog_button_skip1 = /** @type {(inputs: {}) => string} */ () => {
	return `Saltar`
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
const welcomedialog_button_skip1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_button_skip1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_button_skip1", locale)
	if (locale === "en") return en_welcomedialog_button_skip1(inputs)
	if (locale === "pl") return pl_welcomedialog_button_skip1(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_button_skip1(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_button_skip1(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_button_skip1(inputs)
	return es_es2_welcomedialog_button_skip1(inputs)
};
export { welcomedialog_button_skip1 as "welcomeDialog_button_skip" }