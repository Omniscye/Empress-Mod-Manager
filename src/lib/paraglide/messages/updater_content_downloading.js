// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_updater_content_downloading = /** @type {(inputs: {}) => string} */ () => {
	return `Downloading update...`
};

const pl_updater_content_downloading = /** @type {(inputs: {}) => string} */ () => {
	return `Pobieranie aktualizacji...`
};

const zh_cn2_updater_content_downloading = /** @type {(inputs: {}) => string} */ () => {
	return `正在下载更新...`
};

const sv_se2_updater_content_downloading = /** @type {(inputs: {}) => string} */ () => {
	return `Laddar ner uppdatering...`
};

const pt_br2_updater_content_downloading = /** @type {(inputs: {}) => string} */ () => {
	return `Baixando atualização...`
};

const es_es2_updater_content_downloading = /** @type {(inputs: {}) => string} */ () => {
	return `Descargando actualización...`
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
export const updater_content_downloading = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.updater_content_downloading(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("updater_content_downloading", locale)
	if (locale === "en") return en_updater_content_downloading(inputs)
	if (locale === "pl") return pl_updater_content_downloading(inputs)
	if (locale === "zh-CN") return zh_cn2_updater_content_downloading(inputs)
	if (locale === "sv-SE") return sv_se2_updater_content_downloading(inputs)
	if (locale === "pt-BR") return pt_br2_updater_content_downloading(inputs)
	return es_es2_updater_content_downloading(inputs)
};