// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_content_importprofiles_22 = /** @type {(inputs: {}) => string} */ () => {
	return `You can always import profiles later by going to `
};

const pl_welcomedialog_content_importprofiles_22 = /** @type {(inputs: {}) => string} */ () => {
	return `Zawsze możesz zaimportować profile później, przechodząc do `
};

const zh_cn2_welcomedialog_content_importprofiles_22 = /** @type {(inputs: {}) => string} */ () => {
	return `您随时可以前往以下位置导入配置文件： `
};

const sv_se2_welcomedialog_content_importprofiles_22 = /** @type {(inputs: {}) => string} */ () => {
	return `Du kan alltid importera profiler senare genom att gå till `
};

const pt_br2_welcomedialog_content_importprofiles_22 = /** @type {(inputs: {}) => string} */ () => {
	return `Você sempre pode importar perfis mais tarde indo em `
};

const es_es2_welcomedialog_content_importprofiles_22 = /** @type {(inputs: {}) => string} */ () => {
	return `Puede importarlos más tarde en `
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
const welcomedialog_content_importprofiles_22 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_content_importprofiles_22(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_content_importprofiles_22", locale)
	if (locale === "en") return en_welcomedialog_content_importprofiles_22(inputs)
	if (locale === "pl") return pl_welcomedialog_content_importprofiles_22(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_content_importprofiles_22(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_content_importprofiles_22(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_content_importprofiles_22(inputs)
	return es_es2_welcomedialog_content_importprofiles_22(inputs)
};
export { welcomedialog_content_importprofiles_22 as "welcomeDialog_content_importProfiles_2" }