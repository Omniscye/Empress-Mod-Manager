// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_syncer_copyitems_copycode2 = /** @type {(inputs: {}) => string} */ () => {
	return `Copy profile code`
};

const pl_syncer_copyitems_copycode2 = /** @type {(inputs: {}) => string} */ () => {
	return `Kopiuj kod profilu`
};

const zh_cn2_syncer_copyitems_copycode2 = /** @type {(inputs: {}) => string} */ () => {
	return `复制配置代码`
};

const sv_se2_syncer_copyitems_copycode2 = /** @type {(inputs: {}) => string} */ () => {
	return `Kopiera profilkod`
};

const pt_br2_syncer_copyitems_copycode2 = /** @type {(inputs: {}) => string} */ () => {
	return `Copiar código do perfil`
};

const es_es2_syncer_copyitems_copycode2 = /** @type {(inputs: {}) => string} */ () => {
	return `Copiar código de perfil`
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
const syncer_copyitems_copycode2 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.syncer_copyitems_copycode2(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("syncer_copyitems_copycode2", locale)
	if (locale === "en") return en_syncer_copyitems_copycode2(inputs)
	if (locale === "pl") return pl_syncer_copyitems_copycode2(inputs)
	if (locale === "zh-CN") return zh_cn2_syncer_copyitems_copycode2(inputs)
	if (locale === "sv-SE") return sv_se2_syncer_copyitems_copycode2(inputs)
	if (locale === "pt-BR") return pt_br2_syncer_copyitems_copycode2(inputs)
	return es_es2_syncer_copyitems_copycode2(inputs)
};
export { syncer_copyitems_copycode2 as "syncer_copyItems_copyCode" }