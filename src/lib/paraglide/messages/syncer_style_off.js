// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_syncer_style_off = /** @type {(inputs: {}) => string} */ () => {
	return `Sync off`
};

const pl_syncer_style_off = /** @type {(inputs: {}) => string} */ () => {
	return `Synch. wyłączona`
};

const zh_cn2_syncer_style_off = /** @type {(inputs: {}) => string} */ () => {
	return `关闭`
};

const sv_se2_syncer_style_off = /** @type {(inputs: {}) => string} */ () => {
	return `Synkronisering av`
};

const pt_br2_syncer_style_off = /** @type {(inputs: {}) => string} */ () => {
	return `Sincronização desativada`
};

const es_es2_syncer_style_off = /** @type {(inputs: {}) => string} */ () => {
	return `Sinc. apagada`
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
export const syncer_style_off = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.syncer_style_off(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("syncer_style_off", locale)
	if (locale === "en") return en_syncer_style_off(inputs)
	if (locale === "pl") return pl_syncer_style_off(inputs)
	if (locale === "zh-CN") return zh_cn2_syncer_style_off(inputs)
	if (locale === "sv-SE") return sv_se2_syncer_style_off(inputs)
	if (locale === "pt-BR") return pt_br2_syncer_style_off(inputs)
	return es_es2_syncer_style_off(inputs)
};