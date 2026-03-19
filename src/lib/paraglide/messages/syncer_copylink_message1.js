// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_syncer_copylink_message1 = /** @type {(inputs: {}) => string} */ () => {
	return `Copied profile import link to clipboard.`
};

const pl_syncer_copylink_message1 = /** @type {(inputs: {}) => string} */ () => {
	return `Skopiowano link importu profilu do schowka.`
};

const zh_cn2_syncer_copylink_message1 = /** @type {(inputs: {}) => string} */ () => {
	return `已将复制的配置导入链接复制到剪贴板。`
};

const sv_se2_syncer_copylink_message1 = /** @type {(inputs: {}) => string} */ () => {
	return `Kopierade länken för profilimport till urklipp.`
};

const pt_br2_syncer_copylink_message1 = /** @type {(inputs: {}) => string} */ () => {
	return `Link de importação do perfil copiado para a área de transferência.`
};

const es_es2_syncer_copylink_message1 = /** @type {(inputs: {}) => string} */ () => {
	return `Link de importación del perfil copiado al portapapeles.`
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
const syncer_copylink_message1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.syncer_copylink_message1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("syncer_copylink_message1", locale)
	if (locale === "en") return en_syncer_copylink_message1(inputs)
	if (locale === "pl") return pl_syncer_copylink_message1(inputs)
	if (locale === "zh-CN") return zh_cn2_syncer_copylink_message1(inputs)
	if (locale === "sv-SE") return sv_se2_syncer_copylink_message1(inputs)
	if (locale === "pt-BR") return pt_br2_syncer_copylink_message1(inputs)
	return es_es2_syncer_copylink_message1(inputs)
};
export { syncer_copylink_message1 as "syncer_copyLink_message" }