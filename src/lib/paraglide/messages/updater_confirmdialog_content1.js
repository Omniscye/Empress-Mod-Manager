// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_updater_confirmdialog_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `The update will be downloaded in the background, then the app will restart to apply it.`
};

const pl_updater_confirmdialog_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `Aktualizacja zostanie pobrana w tle, a następnie aplikacja uruchomi się ponownie, aby ją zastosować.`
};

const zh_cn2_updater_confirmdialog_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `更新将在后台下载，随后应用程序将重新启动以应用更新。`
};

const sv_se2_updater_confirmdialog_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `Uppdateringen laddas ner i bakgrunden och appen startas sedan om för att tillämpa den.`
};

const pt_br2_updater_confirmdialog_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `A atualização será baixada em segundo plano, depois o app será reiniciado para aplicá-la.`
};

const es_es2_updater_confirmdialog_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `La actualización se descargará en segundo plano y, a continuación, la aplicación se reiniciará para aplicarla.`
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
const updater_confirmdialog_content1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.updater_confirmdialog_content1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("updater_confirmdialog_content1", locale)
	if (locale === "en") return en_updater_confirmdialog_content1(inputs)
	if (locale === "pl") return pl_updater_confirmdialog_content1(inputs)
	if (locale === "zh-CN") return zh_cn2_updater_confirmdialog_content1(inputs)
	if (locale === "sv-SE") return sv_se2_updater_confirmdialog_content1(inputs)
	if (locale === "pt-BR") return pt_br2_updater_confirmdialog_content1(inputs)
	return es_es2_updater_confirmdialog_content1(inputs)
};
export { updater_confirmdialog_content1 as "updater_confirmDialog_content" }