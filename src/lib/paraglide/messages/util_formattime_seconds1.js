// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_util_formattime_seconds1 = /** @type {(inputs: { seconds: NonNullable<unknown> }) => string} */ (i) => {
	return `${i.seconds} seconds`
};

const pl_util_formattime_seconds1 = /** @type {(inputs: { seconds: NonNullable<unknown> }) => string} */ (i) => {
	return `${i.seconds} sek.`
};

const zh_cn2_util_formattime_seconds1 = /** @type {(inputs: { seconds: NonNullable<unknown> }) => string} */ (i) => {
	return `${i.seconds} 秒`
};

const sv_se2_util_formattime_seconds1 = /** @type {(inputs: { seconds: NonNullable<unknown> }) => string} */ (i) => {
	return `${i.seconds} sekunder`
};

const pt_br2_util_formattime_seconds1 = /** @type {(inputs: { seconds: NonNullable<unknown> }) => string} */ (i) => {
	return `${i.seconds} segundos`
};

const es_es2_util_formattime_seconds1 = /** @type {(inputs: { seconds: NonNullable<unknown> }) => string} */ (i) => {
	return `${i.seconds} Segundos`
};

/**
* This function has been compiled by [Paraglide JS](https://inlang.com/m/gerre34r).
*
* - Changing this function will be over-written by the next build.
*
* - If you want to change the translations, you can either edit the source files e.g. `en.json`, or
* use another inlang app like [Fink](https://inlang.com/m/tdozzpar) or the [VSCode extension Sherlock](https://inlang.com/m/r7kp499g).
* 
* @param {{ seconds: NonNullable<unknown> }} inputs
* @param {{ locale?: "en" | "pl" | "zh-CN" | "sv-SE" | "pt-BR" | "es-ES" }} options
* @returns {string}
*/
/* @__NO_SIDE_EFFECTS__ */
const util_formattime_seconds1 = (inputs, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.util_formattime_seconds1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("util_formattime_seconds1", locale)
	if (locale === "en") return en_util_formattime_seconds1(inputs)
	if (locale === "pl") return pl_util_formattime_seconds1(inputs)
	if (locale === "zh-CN") return zh_cn2_util_formattime_seconds1(inputs)
	if (locale === "sv-SE") return sv_se2_util_formattime_seconds1(inputs)
	if (locale === "pt-BR") return pt_br2_util_formattime_seconds1(inputs)
	return es_es2_util_formattime_seconds1(inputs)
};
export { util_formattime_seconds1 as "util_formatTime_seconds" }