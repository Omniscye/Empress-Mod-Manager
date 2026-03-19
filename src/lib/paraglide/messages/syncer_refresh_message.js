// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_syncer_refresh_message = /** @type {(inputs: {}) => string} */ () => {
	return `Refreshed synced profile status.`
};

const pl_syncer_refresh_message = /** @type {(inputs: {}) => string} */ () => {
	return `Odświeżono status zsynchronizowanego profilu.`
};

const zh_cn2_syncer_refresh_message = /** @type {(inputs: {}) => string} */ () => {
	return `已刷新配置同步状态。`
};

const sv_se2_syncer_refresh_message = /** @type {(inputs: {}) => string} */ () => {
	return `Uppdaterade statusen för synkroniserad profil.`
};

const pt_br2_syncer_refresh_message = /** @type {(inputs: {}) => string} */ () => {
	return `Status do perfil sincronizado atualizado.`
};

const es_es2_syncer_refresh_message = /** @type {(inputs: {}) => string} */ () => {
	return `Estado del perfil sincronizado actualizado.`
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
export const syncer_refresh_message = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.syncer_refresh_message(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("syncer_refresh_message", locale)
	if (locale === "en") return en_syncer_refresh_message(inputs)
	if (locale === "pl") return pl_syncer_refresh_message(inputs)
	if (locale === "zh-CN") return zh_cn2_syncer_refresh_message(inputs)
	if (locale === "sv-SE") return sv_se2_syncer_refresh_message(inputs)
	if (locale === "pt-BR") return pt_br2_syncer_refresh_message(inputs)
	return es_es2_syncer_refresh_message(inputs)
};