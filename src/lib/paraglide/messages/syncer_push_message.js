// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_syncer_push_message = /** @type {(inputs: {}) => string} */ () => {
	return `Pushed update to synced profile.`
};

const pl_syncer_push_message = /** @type {(inputs: {}) => string} */ () => {
	return `Wysłano aktualizację do zsynchronizowanego profilu.`
};

const zh_cn2_syncer_push_message = /** @type {(inputs: {}) => string} */ () => {
	return `已推送配置到云端`
};

const sv_se2_syncer_push_message = /** @type {(inputs: {}) => string} */ () => {
	return `Uppdatering av synkroniserad profil skickades.`
};

const pt_br2_syncer_push_message = /** @type {(inputs: {}) => string} */ () => {
	return `Atualização enviada para o perfil sincronizado.`
};

const es_es2_syncer_push_message = /** @type {(inputs: {}) => string} */ () => {
	return `Actualización enviada al perfil sincronizado.`
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
export const syncer_push_message = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.syncer_push_message(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("syncer_push_message", locale)
	if (locale === "en") return en_syncer_push_message(inputs)
	if (locale === "pl") return pl_syncer_push_message(inputs)
	if (locale === "zh-CN") return zh_cn2_syncer_push_message(inputs)
	if (locale === "sv-SE") return sv_se2_syncer_push_message(inputs)
	if (locale === "pt-BR") return pt_br2_syncer_push_message(inputs)
	return es_es2_syncer_push_message(inputs)
};