// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_content_end_11 = /** @type {(inputs: {}) => string} */ () => {
	return `That's it, you're all set up to start modding!`
};

const pl_welcomedialog_content_end_11 = /** @type {(inputs: {}) => string} */ () => {
	return `To wszystko, jesteś gotowy do modowania!`
};

const zh_cn2_welcomedialog_content_end_11 = /** @type {(inputs: {}) => string} */ () => {
	return `你已经可以开始你的模组之旅了！`
};

const sv_se2_welcomedialog_content_end_11 = /** @type {(inputs: {}) => string} */ () => {
	return `Det var allt, du är redo att börja modda!`
};

const pt_br2_welcomedialog_content_end_11 = /** @type {(inputs: {}) => string} */ () => {
	return `É isso, você está pronto para começar a modificar!`
};

const es_es2_welcomedialog_content_end_11 = /** @type {(inputs: {}) => string} */ () => {
	return `¡Y ya estaría, ya estás listo para empezar a moddear!`
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
const welcomedialog_content_end_11 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_content_end_11(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_content_end_11", locale)
	if (locale === "en") return en_welcomedialog_content_end_11(inputs)
	if (locale === "pl") return pl_welcomedialog_content_end_11(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_content_end_11(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_content_end_11(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_content_end_11(inputs)
	return es_es2_welcomedialog_content_end_11(inputs)
};
export { welcomedialog_content_end_11 as "welcomeDialog_content_end_1" }