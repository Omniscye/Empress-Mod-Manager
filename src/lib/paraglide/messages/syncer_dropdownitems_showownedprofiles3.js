// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_syncer_dropdownitems_showownedprofiles3 = /** @type {(inputs: {}) => string} */ () => {
	return `Show owned profiles`
};

const pl_syncer_dropdownitems_showownedprofiles3 = /** @type {(inputs: {}) => string} */ () => {
	return `Pokaż własne profile`
};

const zh_cn2_syncer_dropdownitems_showownedprofiles3 = /** @type {(inputs: {}) => string} */ () => {
	return `显示拥有的配置`
};

const sv_se2_syncer_dropdownitems_showownedprofiles3 = /** @type {(inputs: {}) => string} */ () => {
	return `Visa ägda profiler`
};

const pt_br2_syncer_dropdownitems_showownedprofiles3 = /** @type {(inputs: {}) => string} */ () => {
	return `Mostrar perfis próprios`
};

const es_es2_syncer_dropdownitems_showownedprofiles3 = /** @type {(inputs: {}) => string} */ () => {
	return `Mostrar perfiles propios`
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
const syncer_dropdownitems_showownedprofiles3 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.syncer_dropdownitems_showownedprofiles3(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("syncer_dropdownitems_showownedprofiles3", locale)
	if (locale === "en") return en_syncer_dropdownitems_showownedprofiles3(inputs)
	if (locale === "pl") return pl_syncer_dropdownitems_showownedprofiles3(inputs)
	if (locale === "zh-CN") return zh_cn2_syncer_dropdownitems_showownedprofiles3(inputs)
	if (locale === "sv-SE") return sv_se2_syncer_dropdownitems_showownedprofiles3(inputs)
	if (locale === "pt-BR") return pt_br2_syncer_dropdownitems_showownedprofiles3(inputs)
	return es_es2_syncer_dropdownitems_showownedprofiles3(inputs)
};
export { syncer_dropdownitems_showownedprofiles3 as "syncer_dropdownItems_showOwnedProfiles" }