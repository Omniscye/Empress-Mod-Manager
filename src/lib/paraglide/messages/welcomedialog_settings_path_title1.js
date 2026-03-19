// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_settings_path_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Empress vault folder`
};

const pl_welcomedialog_settings_path_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Folder danych Gale`
};

const zh_cn2_welcomedialog_settings_path_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Gale 数据文件夹`
};

const sv_se2_welcomedialog_settings_path_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Gale-datamapp`
};

const pt_br2_welcomedialog_settings_path_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Pasta de dados do Gale`
};

const es_es2_welcomedialog_settings_path_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Carpeta de datos de Gale`
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
const welcomedialog_settings_path_title1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_settings_path_title1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_settings_path_title1", locale)
	if (locale === "en") return en_welcomedialog_settings_path_title1(inputs)
	if (locale === "pl") return pl_welcomedialog_settings_path_title1(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_settings_path_title1(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_settings_path_title1(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_settings_path_title1(inputs)
	return es_es2_welcomedialog_settings_path_title1(inputs)
};
export { welcomedialog_settings_path_title1 as "welcomeDialog_settings_path_title" }