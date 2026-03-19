// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_content_gameselect2 = /** @type {(inputs: {}) => string} */ () => {
	return `To get started, select a game to mod:`
};

const pl_welcomedialog_content_gameselect2 = /** @type {(inputs: {}) => string} */ () => {
	return `Aby zacząć, wybierz grę do modowania:`
};

const zh_cn2_welcomedialog_content_gameselect2 = /** @type {(inputs: {}) => string} */ () => {
	return `开始前，请选择要管理模组的游戏：`
};

const sv_se2_welcomedialog_content_gameselect2 = /** @type {(inputs: {}) => string} */ () => {
	return `För att komma igång, välj ett spel att modifiera:`
};

const pt_br2_welcomedialog_content_gameselect2 = /** @type {(inputs: {}) => string} */ () => {
	return `Para começar, selecione um jogo para modificar:`
};

const es_es2_welcomedialog_content_gameselect2 = /** @type {(inputs: {}) => string} */ () => {
	return `Para empezar, seleccione un juego para moddear:`
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
const welcomedialog_content_gameselect2 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_content_gameselect2(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_content_gameselect2", locale)
	if (locale === "en") return en_welcomedialog_content_gameselect2(inputs)
	if (locale === "pl") return pl_welcomedialog_content_gameselect2(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_content_gameselect2(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_content_gameselect2(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_content_gameselect2(inputs)
	return es_es2_welcomedialog_content_gameselect2(inputs)
};
export { welcomedialog_content_gameselect2 as "welcomeDialog_content_gameSelect" }