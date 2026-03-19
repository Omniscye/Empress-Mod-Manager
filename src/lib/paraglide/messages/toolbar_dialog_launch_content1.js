// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_toolbar_dialog_launch_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `This might take a few minutes depending on the size of your profile.`
};

const pl_toolbar_dialog_launch_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `Może to potrwać kilka minut w zależności od rozmiaru profilu.`
};

const zh_cn2_toolbar_dialog_launch_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `这可能需要几分钟时间，具体取决于您的配置大小。`
};

const sv_se2_toolbar_dialog_launch_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `Detta kan ta några minuter beroende på storleken på din profil.`
};

const pt_br2_toolbar_dialog_launch_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `Isso pode levar alguns minutos dependendo do tamanho do seu perfil.`
};

const es_es2_toolbar_dialog_launch_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `Esto puede tomar unos minutos dependiendo del tamaño del perfil.`
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
const toolbar_dialog_launch_content1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.toolbar_dialog_launch_content1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("toolbar_dialog_launch_content1", locale)
	if (locale === "en") return en_toolbar_dialog_launch_content1(inputs)
	if (locale === "pl") return pl_toolbar_dialog_launch_content1(inputs)
	if (locale === "zh-CN") return zh_cn2_toolbar_dialog_launch_content1(inputs)
	if (locale === "sv-SE") return sv_se2_toolbar_dialog_launch_content1(inputs)
	if (locale === "pt-BR") return pt_br2_toolbar_dialog_launch_content1(inputs)
	return es_es2_toolbar_dialog_launch_content1(inputs)
};
export { toolbar_dialog_launch_content1 as "toolBar_dialog_launch_content" }