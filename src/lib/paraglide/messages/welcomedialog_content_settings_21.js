// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_content_settings_21 = /** @type {(inputs: {}) => string} */ () => {
	return `You can always edit these later by going to `
};

const pl_welcomedialog_content_settings_21 = /** @type {(inputs: {}) => string} */ () => {
	return `Możesz je edytować później w `
};

const zh_cn2_welcomedialog_content_settings_21 = /** @type {(inputs: {}) => string} */ () => {
	return `您随时可以前往以下位置进行编辑： `
};

const sv_se2_welcomedialog_content_settings_21 = /** @type {(inputs: {}) => string} */ () => {
	return `Du kan alltid redigera dessa senare genom att gå till `
};

const pt_br2_welcomedialog_content_settings_21 = /** @type {(inputs: {}) => string} */ () => {
	return `Você sempre pode editá-las mais tarde em `
};

const es_es2_welcomedialog_content_settings_21 = /** @type {(inputs: {}) => string} */ () => {
	return `Puede cambiarla más tarde yendo a `
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
const welcomedialog_content_settings_21 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_content_settings_21(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_content_settings_21", locale)
	if (locale === "en") return en_welcomedialog_content_settings_21(inputs)
	if (locale === "pl") return pl_welcomedialog_content_settings_21(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_content_settings_21(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_content_settings_21(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_content_settings_21(inputs)
	return es_es2_welcomedialog_content_settings_21(inputs)
};
export { welcomedialog_content_settings_21 as "welcomeDialog_content_settings_2" }