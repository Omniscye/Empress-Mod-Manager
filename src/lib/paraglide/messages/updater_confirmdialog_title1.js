// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_updater_confirmdialog_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `App update available!`
};

const pl_updater_confirmdialog_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Dostępna aktualizacja aplikacji!`
};

const zh_cn2_updater_confirmdialog_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Gale 有可用更新！`
};

const sv_se2_updater_confirmdialog_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Appuppdatering tillgänglig!`
};

const pt_br2_updater_confirmdialog_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Atualização do app disponível!`
};

const es_es2_updater_confirmdialog_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `¡Actualización de la aplicación disponible!`
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
const updater_confirmdialog_title1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.updater_confirmdialog_title1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("updater_confirmdialog_title1", locale)
	if (locale === "en") return en_updater_confirmdialog_title1(inputs)
	if (locale === "pl") return pl_updater_confirmdialog_title1(inputs)
	if (locale === "zh-CN") return zh_cn2_updater_confirmdialog_title1(inputs)
	if (locale === "sv-SE") return sv_se2_updater_confirmdialog_title1(inputs)
	if (locale === "pt-BR") return pt_br2_updater_confirmdialog_title1(inputs)
	return es_es2_updater_confirmdialog_title1(inputs)
};
export { updater_confirmdialog_title1 as "updater_confirmDialog_title" }