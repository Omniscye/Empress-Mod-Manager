// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_updater_confirmdialog_content_next1 = /** @type {(inputs: { next: NonNullable<unknown>, current: NonNullable<unknown> }) => string} */ (i) => {
	return `Version ${i.next} of Empress Mod Manager is available - you have ${i.current}.`
};

const pl_updater_confirmdialog_content_next1 = /** @type {(inputs: { next: NonNullable<unknown>, current: NonNullable<unknown> }) => string} */ (i) => {
	return `Wersja ${i.next} Gale jest dostępna – posiadasz wersję ${i.current}.`
};

const zh_cn2_updater_confirmdialog_content_next1 = /** @type {(inputs: { next: NonNullable<unknown>, current: NonNullable<unknown> }) => string} */ (i) => {
	return `Gale 的 ${i.next} 版本现已发布——您当前使用的是 ${i.current} 版本。`
};

const sv_se2_updater_confirmdialog_content_next1 = /** @type {(inputs: { next: NonNullable<unknown>, current: NonNullable<unknown> }) => string} */ (i) => {
	return `Version ${i.next} av Gale är tillgänglig - du har ${i.current} .`
};

const pt_br2_updater_confirmdialog_content_next1 = /** @type {(inputs: { next: NonNullable<unknown>, current: NonNullable<unknown> }) => string} */ (i) => {
	return `A versão ${i.next} do Gale está disponível - você tem a ${i.current}.`
};

const es_es2_updater_confirmdialog_content_next1 = /** @type {(inputs: { next: NonNullable<unknown>, current: NonNullable<unknown> }) => string} */ (i) => {
	return `La versión ${i.next} de Gale está disponible - tienes la versión ${i.current}.`
};

/**
* This function has been compiled by [Paraglide JS](https://inlang.com/m/gerre34r).
*
* - Changing this function will be over-written by the next build.
*
* - If you want to change the translations, you can either edit the source files e.g. `en.json`, or
* use another inlang app like [Fink](https://inlang.com/m/tdozzpar) or the [VSCode extension Sherlock](https://inlang.com/m/r7kp499g).
* 
* @param {{ next: NonNullable<unknown>, current: NonNullable<unknown> }} inputs
* @param {{ locale?: "en" | "pl" | "zh-CN" | "sv-SE" | "pt-BR" | "es-ES" }} options
* @returns {string}
*/
/* @__NO_SIDE_EFFECTS__ */
const updater_confirmdialog_content_next1 = (inputs, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.updater_confirmdialog_content_next1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("updater_confirmdialog_content_next1", locale)
	if (locale === "en") return en_updater_confirmdialog_content_next1(inputs)
	if (locale === "pl") return pl_updater_confirmdialog_content_next1(inputs)
	if (locale === "zh-CN") return zh_cn2_updater_confirmdialog_content_next1(inputs)
	if (locale === "sv-SE") return sv_se2_updater_confirmdialog_content_next1(inputs)
	if (locale === "pt-BR") return pt_br2_updater_confirmdialog_content_next1(inputs)
	return es_es2_updater_confirmdialog_content_next1(inputs)
};
export { updater_confirmdialog_content_next1 as "updater_confirmDialog_content_next" }