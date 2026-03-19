// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_content_settings_11 = /** @type {(inputs: {}) => string} */ () => {
	return `Let's make sure your settings are to your liking.`
};

const pl_welcomedialog_content_settings_11 = /** @type {(inputs: {}) => string} */ () => {
	return `Upewnijmy się, że ustawienia Ci odpowiadają.`
};

const zh_cn2_welcomedialog_content_settings_11 = /** @type {(inputs: {}) => string} */ () => {
	return `让我们确保您的设置符合您的喜好。`
};

const sv_se2_welcomedialog_content_settings_11 = /** @type {(inputs: {}) => string} */ () => {
	return `Låt oss se till att dina inställningar är som du vill.`
};

const pt_br2_welcomedialog_content_settings_11 = /** @type {(inputs: {}) => string} */ () => {
	return `Vamos garantir que suas configurações estejam do seu agrado.`
};

const es_es2_welcomedialog_content_settings_11 = /** @type {(inputs: {}) => string} */ () => {
	return `Vamos a asegurarnos de que la configuración sea de su agrado.`
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
const welcomedialog_content_settings_11 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_content_settings_11(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_content_settings_11", locale)
	if (locale === "en") return en_welcomedialog_content_settings_11(inputs)
	if (locale === "pl") return pl_welcomedialog_content_settings_11(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_content_settings_11(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_content_settings_11(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_content_settings_11(inputs)
	return es_es2_welcomedialog_content_settings_11(inputs)
};
export { welcomedialog_content_settings_11 as "welcomeDialog_content_settings_1" }