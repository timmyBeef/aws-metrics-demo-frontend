import { ValidationErrors } from '@angular/forms';


export class ValidationHelper {
    /**
     * 更新既有的 ValidationErrors。
     *
     * 若 `errorDetail` 等效於 `false` (`0`, `-0`, `false`, `NaN`, `undefined`, 或空字串)，則等同於執行 {@link ValidationHelper#clearError};
     * 若 `errorDetail` 等於於 `true`，則等同於執行 {@link ValidationHelper#addError}。
     *
     * @param {ValidationErrors | null} errors
     * @param {string} errorName
     * @param errorDetail
     * @returns {ValidationErrors | null}
     */
    public static updateError(
        errors: ValidationErrors | null,
        errorName: string,
        errorDetail: any
    ): ValidationErrors | null {
        return errorDetail
            ? ValidationHelper.addError(errors, errorName, errorDetail)
            : ValidationHelper.clearError(errors, errorName);
    }

    /**
     * 在既有的 ValidationErrors 中新增或更新一組錯誤。
     *
     * @param {ValidationErrors | null} errors
     * @param {string} errorName
     * @param errorDetail
     * @returns {ValidationErrors | null}
     */
    public static addError(
        errors: ValidationErrors | null,
        errorName: string,
        errorDetail: any
    ): ValidationErrors | null {
        if (errors) {
            return Object.assign({ [errorName]: errorDetail }, errors);
        } else {
            return { [errorName]: errorDetail };
        }
    }

    /**
     * 在既有的 ValidationErrors 中移掉一組錯誤。
     *
     * @param {ValidationErrors | null} errors
     * @param {string} errorName
     * @returns {any}
     */
    public static clearError(
        errors: ValidationErrors | null,
        errorName: string
    ): ValidationErrors | null {
        if (errors) {
            const newErrors = Object.assign({}, errors);
            delete newErrors[errorName];
            if (Object.keys(newErrors).length !== 0) {
                return newErrors;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

/**
 * @deprecated 改用 {@link ValidationHelper}
 * @param result
 * @param errors
 * @param errorName
 * @returns {any}
 */
export function getErrors(result, errors, errorName) {
    return ValidationHelper.updateError(errors, errorName, result);
}
