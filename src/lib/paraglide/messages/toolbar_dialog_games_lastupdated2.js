// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_toolbar_dialog_games_lastupdated2 = /** @type {(inputs: { time: NonNullable<unknown> }) => string} */ (i) => {
	return `Last updated ${i.time} ago`
};

const pl_toolbar_dialog_games_lastupdated2 = /** @type {(inputs: { time: NonNullable<unknown> }) => string} */ (i) => {
	return `Ostatnia aktualizacja ${i.time} temu`
};

const zh_cn2_toolbar_dialog_games_lastupdated2 = /** @type {(inputs: { time: NonNullable<unknown> }) => string} */ (i) => {
	return `最后更新在${i.time}前`
};

const pt_br2_toolbar_dialog_games_lastupdated2 = /** @type {(inputs: { time: NonNullable<unknown> }) => string} */ (i) => {
	return `Atualizado há ${i.time}`
};

const es_es2_toolbar_dialog_games_lastupdated2 = /** @type {(inputs: { time: NonNullable<unknown> }) => string} */ (i) => {
	return `Última actualización hace ${i.time}`
};

/** @type {(inputs: { time: NonNullable<unknown> }) => string} */
const sv_se2_toolbar_dialog_games_lastupdated2 = en_toolbar_dialog_games_lastupdated2;

/**
* This function has been compiled by [Paraglide JS](https://inlang.com/m/gerre34r).
*
* - Changing this function will be over-written by the next build.
*
* - If you want to change the translations, you can either edit the source files e.g. `en.json`, or
* use another inlang app like [Fink](https://inlang.com/m/tdozzpar) or the [VSCode extension Sherlock](https://inlang.com/m/r7kp499g).
* 
* @param {{ time: NonNullable<unknown> }} inputs
* @param {{ locale?: "en" | "pl" | "zh-CN" | "sv-SE" | "pt-BR" | "es-ES" }} options
* @returns {string}
*/
/* @__NO_SIDE_EFFECTS__ */
const toolbar_dialog_games_lastupdated2 = (inputs, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.toolbar_dialog_games_lastupdated2(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("toolbar_dialog_games_lastupdated2", locale)
	if (locale === "en") return en_toolbar_dialog_games_lastupdated2(inputs)
	if (locale === "pl") return pl_toolbar_dialog_games_lastupdated2(inputs)
	if (locale === "zh-CN") return zh_cn2_toolbar_dialog_games_lastupdated2(inputs)
	if (locale === "sv-SE") return sv_se2_toolbar_dialog_games_lastupdated2(inputs)
	if (locale === "pt-BR") return pt_br2_toolbar_dialog_games_lastupdated2(inputs)
	return es_es2_toolbar_dialog_games_lastupdated2(inputs)
};
export { toolbar_dialog_games_lastupdated2 as "toolBar_dialog_games_lastUpdated" }