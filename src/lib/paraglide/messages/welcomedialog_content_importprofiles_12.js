// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_content_importprofiles_12 = /** @type {(inputs: {}) => string} */ () => {
	return `You can automatically transfer profiles from another mod manager into Empress Mod Manager.`
};

const pl_welcomedialog_content_importprofiles_12 = /** @type {(inputs: {}) => string} */ () => {
	return `Możesz automatycznie przenieść profile z innego menedżera modów do Gale.`
};

const zh_cn2_welcomedialog_content_importprofiles_12 = /** @type {(inputs: {}) => string} */ () => {
	return `您可以自动将配置文件从其他模组管理器转移至Gale。`
};

const sv_se2_welcomedialog_content_importprofiles_12 = /** @type {(inputs: {}) => string} */ () => {
	return `Du kan automatiskt överföra profiler från en annan moddhanterare till Gale.`
};

const pt_br2_welcomedialog_content_importprofiles_12 = /** @type {(inputs: {}) => string} */ () => {
	return `Você pode transferir perfis automaticamente de outro gerenciador de mods para o Gale.`
};

const es_es2_welcomedialog_content_importprofiles_12 = /** @type {(inputs: {}) => string} */ () => {
	return `Puedes transferir automáticamente perfiles desde otros gestores a Gale.`
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
const welcomedialog_content_importprofiles_12 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_content_importprofiles_12(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_content_importprofiles_12", locale)
	if (locale === "en") return en_welcomedialog_content_importprofiles_12(inputs)
	if (locale === "pl") return pl_welcomedialog_content_importprofiles_12(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_content_importprofiles_12(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_content_importprofiles_12(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_content_importprofiles_12(inputs)
	return es_es2_welcomedialog_content_importprofiles_12(inputs)
};
export { welcomedialog_content_importprofiles_12 as "welcomeDialog_content_importProfiles_1" }