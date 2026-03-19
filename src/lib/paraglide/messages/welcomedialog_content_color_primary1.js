// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_content_color_primary1 = /** @type {(inputs: {}) => string} */ () => {
	return `The main color of the interface, including backgrounds and text.`
};

const pl_welcomedialog_content_color_primary1 = /** @type {(inputs: {}) => string} */ () => {
	return `Główny kolor interfejsu, w tym tła i tekstu.`
};

const zh_cn2_welcomedialog_content_color_primary1 = /** @type {(inputs: {}) => string} */ () => {
	return `界面的主色调，包括背景和文字。`
};

const sv_se2_welcomedialog_content_color_primary1 = /** @type {(inputs: {}) => string} */ () => {
	return `Gränssnittets huvudfärg, inklusive bakgrunder och text.`
};

const pt_br2_welcomedialog_content_color_primary1 = /** @type {(inputs: {}) => string} */ () => {
	return `A cor principal da interface, incluindo fundos e texto.`
};

const es_es2_welcomedialog_content_color_primary1 = /** @type {(inputs: {}) => string} */ () => {
	return `El color principal de la interfaz, incluyendo los fondos y el texto.`
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
const welcomedialog_content_color_primary1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_content_color_primary1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_content_color_primary1", locale)
	if (locale === "en") return en_welcomedialog_content_color_primary1(inputs)
	if (locale === "pl") return pl_welcomedialog_content_color_primary1(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_content_color_primary1(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_content_color_primary1(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_content_color_primary1(inputs)
	return es_es2_welcomedialog_content_color_primary1(inputs)
};
export { welcomedialog_content_color_primary1 as "welcomeDialog_content_color_primary" }