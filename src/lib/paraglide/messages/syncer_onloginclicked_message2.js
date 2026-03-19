// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_syncer_onloginclicked_message2 = /** @type {(inputs: { name: NonNullable<unknown> }) => string} */ (i) => {
	return `Signed in with Discord as ${i.name}.`
};

const pl_syncer_onloginclicked_message2 = /** @type {(inputs: { name: NonNullable<unknown> }) => string} */ (i) => {
	return `Zalogowano przez Discord jako ${i.name}.`
};

const zh_cn2_syncer_onloginclicked_message2 = /** @type {(inputs: { name: NonNullable<unknown> }) => string} */ (i) => {
	return `登录 Discord 为 ${i.name}.`
};

const sv_se2_syncer_onloginclicked_message2 = /** @type {(inputs: { name: NonNullable<unknown> }) => string} */ (i) => {
	return `Inloggad med Discord som ${i.name} .`
};

const pt_br2_syncer_onloginclicked_message2 = /** @type {(inputs: { name: NonNullable<unknown> }) => string} */ (i) => {
	return `Logado com Discord como ${i.name}.`
};

const es_es2_syncer_onloginclicked_message2 = /** @type {(inputs: { name: NonNullable<unknown> }) => string} */ (i) => {
	return `Iniciada sesión con Discord como ${i.name}.`
};

/**
* This function has been compiled by [Paraglide JS](https://inlang.com/m/gerre34r).
*
* - Changing this function will be over-written by the next build.
*
* - If you want to change the translations, you can either edit the source files e.g. `en.json`, or
* use another inlang app like [Fink](https://inlang.com/m/tdozzpar) or the [VSCode extension Sherlock](https://inlang.com/m/r7kp499g).
* 
* @param {{ name: NonNullable<unknown> }} inputs
* @param {{ locale?: "en" | "pl" | "zh-CN" | "sv-SE" | "pt-BR" | "es-ES" }} options
* @returns {string}
*/
/* @__NO_SIDE_EFFECTS__ */
const syncer_onloginclicked_message2 = (inputs, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.syncer_onloginclicked_message2(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("syncer_onloginclicked_message2", locale)
	if (locale === "en") return en_syncer_onloginclicked_message2(inputs)
	if (locale === "pl") return pl_syncer_onloginclicked_message2(inputs)
	if (locale === "zh-CN") return zh_cn2_syncer_onloginclicked_message2(inputs)
	if (locale === "sv-SE") return sv_se2_syncer_onloginclicked_message2(inputs)
	if (locale === "pt-BR") return pt_br2_syncer_onloginclicked_message2(inputs)
	return es_es2_syncer_onloginclicked_message2(inputs)
};
export { syncer_onloginclicked_message2 as "syncer_onLoginClicked_message" }