// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_toolbar_launchgame_button2 = /** @type {(inputs: {}) => string} */ () => {
	return `Launch game`
};

const pl_toolbar_launchgame_button2 = /** @type {(inputs: {}) => string} */ () => {
	return `Uruchom grę`
};

const zh_cn2_toolbar_launchgame_button2 = /** @type {(inputs: {}) => string} */ () => {
	return `启动游戏`
};

const sv_se2_toolbar_launchgame_button2 = /** @type {(inputs: {}) => string} */ () => {
	return `Starta spelet`
};

const pt_br2_toolbar_launchgame_button2 = /** @type {(inputs: {}) => string} */ () => {
	return `Iniciar jogo`
};

const es_es2_toolbar_launchgame_button2 = /** @type {(inputs: {}) => string} */ () => {
	return `Iniciar juego`
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
const toolbar_launchgame_button2 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.toolbar_launchgame_button2(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("toolbar_launchgame_button2", locale)
	if (locale === "en") return en_toolbar_launchgame_button2(inputs)
	if (locale === "pl") return pl_toolbar_launchgame_button2(inputs)
	if (locale === "zh-CN") return zh_cn2_toolbar_launchgame_button2(inputs)
	if (locale === "sv-SE") return sv_se2_toolbar_launchgame_button2(inputs)
	if (locale === "pt-BR") return pt_br2_toolbar_launchgame_button2(inputs)
	return es_es2_toolbar_launchgame_button2(inputs)
};
export { toolbar_launchgame_button2 as "toolBar_launchGame_button" }