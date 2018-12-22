// Discord epoch (2015-01-01T00:00:00.000Z)
const EPOCH = 1420070400000;

export const idToBinary = (num: string) => {
	let bin = '';
	let high = parseInt(num.slice(0, -10), 10) || 0;
	let low = parseInt(num.slice(-10), 10);
	while (low > 0 || high > 0) {
		// tslint:disable-next-line:no-bitwise
		bin = String(low & 1) + bin;
		low = Math.floor(low / 2);
		if (high > 0) {
			low += 5000000000 * (high % 2);
			high = Math.floor(high / 2);
		}
	}
	return bin;
};

export const deconstruct = (snowflake: string) => {
	const BINARY = idToBinary(snowflake).padStart(64, '0');
	return parseInt(BINARY.substring(0, 42), 2) + EPOCH;
};