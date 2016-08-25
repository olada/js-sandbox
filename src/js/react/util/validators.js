// http://stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
export function validatePositiveInteger(value) {
	return value >>> 0 === parseFloat(value);
}