// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_content_end_21 = /** @type {(inputs: {}) => string} */ () => {
	return `If you have any questions or need help, feel free to ask in the `
};

const pl_welcomedialog_content_end_21 = /** @type {(inputs: {}) => string} */ () => {
	return `Jeśli masz pytania lub potrzebujesz pomocy, zapraszamy na nasz `
};

const zh_cn2_welcomedialog_content_end_21 = /** @type {(inputs: {}) => string} */ () => {
	return `如有任何疑问或需要帮助，欢迎来到我们的`
};

const sv_se2_welcomedialog_content_end_21 = /** @type {(inputs: {}) => string} */ () => {
	return `Om du har några frågor eller behöver hjälp, tveka inte att fråga i `
};

const pt_br2_welcomedialog_content_end_21 = /** @type {(inputs: {}) => string} */ () => {
	return `Se tiver dúvidas ou precisar de ajuda, sinta-se à vontade para perguntar no `
};

const es_es2_welcomedialog_content_end_21 = /** @type {(inputs: {}) => string} */ () => {
	return `Si tienes alguna pregunta o necesitas ayuda, no dudes en preguntar en nuestro `
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
const welcomedialog_content_end_21 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_content_end_21(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_content_end_21", locale)
	if (locale === "en") return en_welcomedialog_content_end_21(inputs)
	if (locale === "pl") return pl_welcomedialog_content_end_21(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_content_end_21(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_content_end_21(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_content_end_21(inputs)
	return es_es2_welcomedialog_content_end_21(inputs)
};
export { welcomedialog_content_end_21 as "welcomeDialog_content_end_2" }