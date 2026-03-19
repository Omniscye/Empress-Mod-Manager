import { invoke } from '$lib/invoke';

export const openEmpressLog = () => invoke('open_empress_log');
export const logErr = (msg: string) => invoke('log_err', { msg });
