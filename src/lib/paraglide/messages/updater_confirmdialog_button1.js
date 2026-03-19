// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_updater_confirmdialog_button1 = /** @type {(inputs: {}) => string} */ () => {
	return `Install`
};

const pl_updater_confirmdialog_button1 = /** @type {(inputs: {}) => string} */ () => {
	return `Instaluj`
};

const zh_cn2_updater_confirmdialog_button1 = /** @type {(inputs: {}) => string} */ () => {
	return `安装`
};

const sv_se2_updater_confirmdialog_button1 = /** @type {(inputs: {}) => string} */ () => {
	return `Installera`
};

const pt_br2_updater_confirmdialog_button1 = /** @type {(inputs: {}) => string} */ () => {
	return `Instalar`
};

const es_es2_updater_confirmdialog_button1 = /** @type {(inputs: {}) => string} */ () => {
	return `Instalar`
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
const updater_confirmdialog_button1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.updater_confirmdialog_button1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("updater_confirmdialog_button1", locale)
	if (locale === "en") return en_updater_confirmdialog_button1(inputs)
	if (locale === "pl") return pl_updater_confirmdialog_button1(inputs)
	if (locale === "zh-CN") return zh_cn2_updater_confirmdialog_button1(inputs)
	if (locale === "sv-SE") return sv_se2_updater_confirmdialog_button1(inputs)
	if (locale === "pt-BR") return pt_br2_updater_confirmdialog_button1(inputs)
	return es_es2_updater_confirmdialog_button1(inputs)
};
export { updater_confirmdialog_button1 as "updater_confirmDialog_button" }