// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_content_color_accent1 = /** @type {(inputs: {}) => string} */ () => {
	return `The color of highlighted elements, such as buttons and checkboxes`
};

const pl_welcomedialog_content_color_accent1 = /** @type {(inputs: {}) => string} */ () => {
	return `Kolor wyróżnionych elementów, takich jak przyciski i pola wyboru.`
};

const zh_cn2_welcomedialog_content_color_accent1 = /** @type {(inputs: {}) => string} */ () => {
	return `高亮元素的颜色，例如按钮和复选框`
};

const sv_se2_welcomedialog_content_color_accent1 = /** @type {(inputs: {}) => string} */ () => {
	return `Färgen på markerade element, såsom knappar och kryssrutor`
};

const pt_br2_welcomedialog_content_color_accent1 = /** @type {(inputs: {}) => string} */ () => {
	return `A cor dos elementos destacados, como botões e caixas de seleção`
};

const es_es2_welcomedialog_content_color_accent1 = /** @type {(inputs: {}) => string} */ () => {
	return `El color de los elementos resaltados, como botones y casillas de verificación.`
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
const welcomedialog_content_color_accent1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_content_color_accent1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_content_color_accent1", locale)
	if (locale === "en") return en_welcomedialog_content_color_accent1(inputs)
	if (locale === "pl") return pl_welcomedialog_content_color_accent1(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_content_color_accent1(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_content_color_accent1(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_content_color_accent1(inputs)
	return es_es2_welcomedialog_content_color_accent1(inputs)
};
export { welcomedialog_content_color_accent1 as "welcomeDialog_content_color_accent" }