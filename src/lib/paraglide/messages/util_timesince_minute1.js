// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_util_timesince_minute1 = /** @type {(inputs: {}) => string} */ () => {
	return `minute`
};

const pl_util_timesince_minute1 = /** @type {(inputs: {}) => string} */ () => {
	return `minuta`
};

const zh_cn2_util_timesince_minute1 = /** @type {(inputs: {}) => string} */ () => {
	return `分`
};

const pt_br2_util_timesince_minute1 = /** @type {(inputs: {}) => string} */ () => {
	return `minuto`
};

const es_es2_util_timesince_minute1 = /** @type {(inputs: {}) => string} */ () => {
	return `minuto`
};

/** @type {(inputs: {}) => string} */
const sv_se2_util_timesince_minute1 = en_util_timesince_minute1;

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
const util_timesince_minute1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.util_timesince_minute1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("util_timesince_minute1", locale)
	if (locale === "en") return en_util_timesince_minute1(inputs)
	if (locale === "pl") return pl_util_timesince_minute1(inputs)
	if (locale === "zh-CN") return zh_cn2_util_timesince_minute1(inputs)
	if (locale === "sv-SE") return sv_se2_util_timesince_minute1(inputs)
	if (locale === "pt-BR") return pt_br2_util_timesince_minute1(inputs)
	return es_es2_util_timesince_minute1(inputs)
};
export { util_timesince_minute1 as "util_timeSince_minute" }