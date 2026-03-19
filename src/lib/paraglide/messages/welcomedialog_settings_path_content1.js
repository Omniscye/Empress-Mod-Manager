// eslint-disable
import { getLocale, trackMessageCall, experimentalMiddlewareLocaleSplitting, isServer } from '../runtime.js';

const en_welcomedialog_settings_path_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `The folder where mods and profiles are stored. Make sure you have plenty of space on its device.`
};

const pl_welcomedialog_settings_path_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `Folder, w którym przechowywane są mody i profile. Upewnij się, że masz na nim wystarczająco dużo miejsca.`
};

const zh_cn2_welcomedialog_settings_path_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `存放模组和配置文件的文件夹。请确保设备上留有充足的存储空间。`
};

const sv_se2_welcomedialog_settings_path_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `Mappen där moddar och profiler lagras. Se till att du har gott om utrymme på enheten.`
};

const pt_br2_welcomedialog_settings_path_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `A pasta onde mods e perfis são armazenados. Certifique-se de ter bastante espaço no dispositivo.`
};

const es_es2_welcomedialog_settings_path_content1 = /** @type {(inputs: {}) => string} */ () => {
	return `La carpeta donde se almacenan los mods y los perfiles. Asegúrate de tener suficiente espacio en tu dispositivo.`
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
const welcomedialog_settings_path_content1 = (inputs = {}, options = {}) => {
	if (experimentalMiddlewareLocaleSplitting && isServer === false) {
		return /** @type {any} */ (globalThis).__paraglide_ssr.welcomedialog_settings_path_content1(inputs) 
	}
	const locale = options.locale ?? getLocale()
	trackMessageCall("welcomedialog_settings_path_content1", locale)
	if (locale === "en") return en_welcomedialog_settings_path_content1(inputs)
	if (locale === "pl") return pl_welcomedialog_settings_path_content1(inputs)
	if (locale === "zh-CN") return zh_cn2_welcomedialog_settings_path_content1(inputs)
	if (locale === "sv-SE") return sv_se2_welcomedialog_settings_path_content1(inputs)
	if (locale === "pt-BR") return pt_br2_welcomedialog_settings_path_content1(inputs)
	return es_es2_welcomedialog_settings_path_content1(inputs)
};
export { welcomedialog_settings_path_content1 as "welcomeDialog_settings_path_content" }