// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_util_timesince_interval_11 = /** @type {(inputs: { str: NonNullable<unknown> }) => string} */ (i) => {
	return `a ${i.str}`
};

const pl_util_timesince_interval_11 = /** @type {(inputs: { str: NonNullable<unknown> }) => string} */ (i) => {
	return `${i.str}`
};

const zh_cn2_util_timesince_interval_11 = /** @type {(inputs: { str: NonNullable<unknown> }) => string} */ (i) => {
	return `一${i.str}`
};

const sv_se2_util_timesince_interval_11 = /** @type {(inputs: { str: NonNullable<unknown> }) => string} */ (i) => {
	return `en ${i.str}`
};

const pt_br2_util_timesince_interval_11 = /** @type {(inputs: { str: NonNullable<unknown> }) => string} */ (i) => {
	return `um ${i.str}`
};

const es_es2_util_timesince_interval_11 = /** @type {(inputs: { str: NonNullable<unknown> }) => string} */ (i) => {
	return `un ${i.str}`
};

/**
* This function has been compiled by [Paraglide JS](https://inlang.com/m/gerre34r).
*
* - Changing this function will be over-written by the next build.
*
* - If you want to change the translations, you can either edit the source files e.g. `en.json`, or
* use another inlang app like [Fink](https://inlang.com/m/tdozzpar) or the [VSCode extension Sherlock](https://inlang.com/m/r7kp499g).
* 
* @param {{ str: NonNullable<unknown> }} inputs
* @param {{ locale?: "en" | "pl" | "zh-CN" | "sv-SE" | "pt-BR" | "es-ES" }} options
* @returns {string}
*/
/* @__NO_SIDE_EFFECTS__ */
const util_timesince_interval_11 = (inputs, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.util_timesince_interval_11(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("util_timesince_interval_11", locale)
	if (locale === "en") return en_util_timesince_interval_11(inputs)
	if (locale === "pl") return pl_util_timesince_interval_11(inputs)
	if (locale === "zh-CN") return zh_cn2_util_timesince_interval_11(inputs)
	if (locale === "sv-SE") return sv_se2_util_timesince_interval_11(inputs)
	if (locale === "pt-BR") return pt_br2_util_timesince_interval_11(inputs)
	return es_es2_util_timesince_interval_11(inputs)
};
export { util_timesince_interval_11 as "util_timeSince_interval_1" }