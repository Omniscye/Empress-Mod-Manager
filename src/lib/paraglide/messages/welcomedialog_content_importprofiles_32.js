// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_content_importprofiles_32 = /** @type {(inputs: {}) => string} */ () => {
	return `Import > ...from r2modman`
};

const pl_welcomedialog_content_importprofiles_32 = /** @type {(inputs: {}) => string} */ () => {
	return `Importuj > ...z r2modman`
};

const zh_cn2_welcomedialog_content_importprofiles_32 = /** @type {(inputs: {}) => string} */ () => {
	return `导入 > ...从r2modman`
};

const sv_se2_welcomedialog_content_importprofiles_32 = /** @type {(inputs: {}) => string} */ () => {
	return `Importera &gt; ...från r2modman`
};

const pt_br2_welcomedialog_content_importprofiles_32 = /** @type {(inputs: {}) => string} */ () => {
	return `Importar > ...do r2modman`
};

const es_es2_welcomedialog_content_importprofiles_32 = /** @type {(inputs: {}) => string} */ () => {
	return `Importar > ...desde r2modman`
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
const welcomedialog_content_importprofiles_32 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_content_importprofiles_32(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_content_importprofiles_32", locale)
	if (locale === "en") return en_welcomedialog_content_importprofiles_32(inputs)
	if (locale === "pl") return pl_welcomedialog_content_importprofiles_32(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_content_importprofiles_32(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_content_importprofiles_32(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_content_importprofiles_32(inputs)
	return es_es2_welcomedialog_content_importprofiles_32(inputs)
};
export { welcomedialog_content_importprofiles_32 as "welcomeDialog_content_importProfiles_3" }