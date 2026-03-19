// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_syncer_disconnect_ask = /** @type {(inputs: {}) => string} */ () => {
	return `Do you also want to delete the profile from the database?`
};

const pl_syncer_disconnect_ask = /** @type {(inputs: {}) => string} */ () => {
	return `Czy chcesz również usunąć profil z bazy danych?`
};

const zh_cn2_syncer_disconnect_ask = /** @type {(inputs: {}) => string} */ () => {
	return `您是否想从数据库中删除该配置?`
};

const sv_se2_syncer_disconnect_ask = /** @type {(inputs: {}) => string} */ () => {
	return `Vill du också ta bort profilen från databasen?`
};

const pt_br2_syncer_disconnect_ask = /** @type {(inputs: {}) => string} */ () => {
	return `Você também deseja excluir o perfil do banco de dados?`
};

const es_es2_syncer_disconnect_ask = /** @type {(inputs: {}) => string} */ () => {
	return `¿También desea eliminar el perfil de la base de datos?`
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
export const syncer_disconnect_ask = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.syncer_disconnect_ask(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("syncer_disconnect_ask", locale)
	if (locale === "en") return en_syncer_disconnect_ask(inputs)
	if (locale === "pl") return pl_syncer_disconnect_ask(inputs)
	if (locale === "zh-CN") return zh_cn2_syncer_disconnect_ask(inputs)
	if (locale === "sv-SE") return sv_se2_syncer_disconnect_ask(inputs)
	if (locale === "pt-BR") return pt_br2_syncer_disconnect_ask(inputs)
	return es_es2_syncer_disconnect_ask(inputs)
};