// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_toolbar_dialog_games_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Select game to mod`
};

const pl_toolbar_dialog_games_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Wybierz grę do modowania`
};

const zh_cn2_toolbar_dialog_games_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `选择要添加模组的游戏`
};

const sv_se2_toolbar_dialog_games_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Välj spel att modifiera`
};

const pt_br2_toolbar_dialog_games_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Selecione o jogo para modificar`
};

const es_es2_toolbar_dialog_games_title1 = /** @type {(inputs: {}) => string} */ () => {
	return `Selecciona un juego para moddear`
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
const toolbar_dialog_games_title1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.toolbar_dialog_games_title1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("toolbar_dialog_games_title1", locale)
	if (locale === "en") return en_toolbar_dialog_games_title1(inputs)
	if (locale === "pl") return pl_toolbar_dialog_games_title1(inputs)
	if (locale === "zh-CN") return zh_cn2_toolbar_dialog_games_title1(inputs)
	if (locale === "sv-SE") return sv_se2_toolbar_dialog_games_title1(inputs)
	if (locale === "pt-BR") return pt_br2_toolbar_dialog_games_title1(inputs)
	return es_es2_toolbar_dialog_games_title1(inputs)
};
export { toolbar_dialog_games_title1 as "toolBar_dialog_games_title" }