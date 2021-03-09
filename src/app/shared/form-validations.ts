import { ValidationHelper } from './validation-helper';

import * as moment from 'moment';
import { AbstractControl } from '@angular/forms';

export class FormValidations {

    /**
     *　區間檢查，如果起迄值都有設定，確定起始值不大於結束值。
     *
     * @param {AbstractControl} startControl
     * @param {AbstractControl} endControl
     * @param {string} validationName
     */
    public static rangeCheck(
        startControl: AbstractControl,
        endControl: AbstractControl,
        validationName: string = 'rangeCheck',
        checkRequired: boolean = false,
        clearRequireMessage: boolean = true
    ): void {
        const rawStartCtrlValue = startControl.value;
        const rawEndCtrlValue = endControl.value;
        const isMomentForStart = moment.isMoment(rawStartCtrlValue);
        const isMomentForEnd = moment.isMoment(rawEndCtrlValue);

        const clearRequired = () => {
            startControl.setErrors(
                ValidationHelper.clearError(startControl.errors, 'required')
            );
            endControl.setErrors(
                ValidationHelper.clearError(endControl.errors, 'required')
            );
            // 若是相依性檢查，則一併清除區間檢核的錯誤訊息
            endControl.setErrors(
                ValidationHelper.clearError(endControl.errors, validationName)
            );
        };

        const singleNullCheck = () => {
            if (clearRequireMessage) {
                // 先清除必填
                clearRequired.apply(this);
            }

            // 只輸入開始，並且結束並無輸入
            if (isMomentForStart && rawEndCtrlValue === null) {
                endControl.setErrors(
                    ValidationHelper.addError(endControl.errors, 'required', {
                        startValue: startControl.value,
                        endValue: endControl.value,
                    })
                );
            }

            // 只輸入結束，並且開始並無輸入
            if (isMomentForEnd && rawStartCtrlValue === null) {
                startControl.setErrors(
                    ValidationHelper.addError(startControl.errors, 'required', {
                        startValue: startControl.value,
                        endValue: endControl.value,
                    })
                );
            }
        };

        const rangeCheck = () => {
            let error = false;
            if (typeof startControl.value !== typeof endControl.value) {
                error = true;
            } else {
                if ((moment.isMoment(startControl.value) && !moment.isMoment(endControl.value)) ||
                    (!moment.isMoment(startControl.value) && moment.isMoment(endControl.value))) {
                    error = true;
                } else {
                    if (startControl.value || endControl.value) {
                        if (startControl.value > endControl.value) {
                            error = true;
                        }
                    }
                }
            }
            if (error) {
                endControl.setErrors(
                    ValidationHelper.addError(endControl.errors, validationName, {
                        startValue: startControl.value,
                        endValue: endControl.value,
                    })
                );
            } else {
                endControl.setErrors(
                    ValidationHelper.clearError(endControl.errors, validationName)
                );
            }
        };

        if (checkRequired) {
            singleNullCheck.apply(this);
        }

        if (isMomentForStart && isMomentForEnd) {
            rangeCheck.apply(this);
        }
    }

    /**
     *　資料檢查，兩個資料的值不能相同。
     *
     * @param {AbstractControl} Control1
     * @param {AbstractControl} Control2
     * @param {string} validationName
     */
    public static differentCheck(
        Control1: AbstractControl,
        Control2: AbstractControl,
        validationName: string
    ): void {
        let error = false;
        if (Control1.value && Control2.value) {
            if (Control1.value === Control2.value) {
                error = true;
            }
        }

        if (error) {
            Control2.setErrors(
                ValidationHelper.addError(Control2.errors, validationName, {
                    Value1: Control1.value,
                    Value2: Control2.value,
                })
            );
        } else {
            Control2.setErrors(
                ValidationHelper.clearError(Control2.errors, validationName)
            );
        }
    }

    public static idnCheck(idn: string): boolean {
        if (!idn.match('[A-Z]{1}(1|2)[0-9]{8}')) {
            return false;
        }

        const codes = '0123456789ABCDEFGHJKLMNPQRSTUVXYWZIO';
        const model = {};
        for (let i = 0; i < codes.length; i++) {
            model[codes.charAt(i)] = i;
        }

        let sum = 0;
        for (let i = 0; i < idn.length; i++) {
            if (i === 0) {
                const letter = model[idn.charAt(i)].toString();
                sum +=
                    Number(letter.charAt(0)) +
                    Number(letter.charAt(1) * (9 - model[i]));
            } else {
                sum += Number(model[idn.charAt(i)] * (9 - model[i]));
            }
        }

        if (10 - (sum % 10) === Number(idn.charAt(9))) {
            return true;
        }

        return false;
    }

    /**
     *　資料檢查，兩種日期查詢方式，最少要填一種。
     *
     * @param {AbstractControl} start1Control
     * @param {AbstractControl} end1Control
     * @param {AbstractControl} start2Control
     * @param {AbstractControl} end2Control
     * @param {string} validationName
     */
    public static allNullCheck(
        start1Control: AbstractControl,
        end1Control: AbstractControl,
        start2Control: AbstractControl,
        end2Control: AbstractControl,
        validationName: string
    ): void {
        let error = false;
        if (start1Control.value == null && end1Control.value == null && start2Control.value == null && end2Control.value == null) {
            error = true;
        }

        if (error) {
            start1Control.setErrors(
                ValidationHelper.addError(start1Control.errors, validationName, {
                    start1Value: start1Control.value,
                    end1Value: end1Control.value,
                })
            );
            start2Control.setErrors(
                ValidationHelper.addError(start2Control.errors, validationName, {
                    start2Value: start2Control.value,
                    end2Value: end2Control.value,
                })
            );
        } else {
            start1Control.setErrors(
                ValidationHelper.clearError(start1Control.errors, validationName)
            );
            start2Control.setErrors(
                ValidationHelper.clearError(start2Control.errors, validationName)
            );
        }
    }

    /**
     *　資料檢查，如果開始有值，結束也要有值，相反亦同。
     *
     * @param {AbstractControl} startControl
     * @param {AbstractControl} endControl
     * @param {string} validationName
     */
    public static singleNullCheck(
        startControl: AbstractControl,
        endControl: AbstractControl,
        validationName: string
    ): void {
        let error = false;
        if (startControl.value && !endControl.value) {
            error = true;
        } else if (!startControl.value && endControl.value) {
            error = true;
        }

        if (error) {
            endControl.setErrors(
                ValidationHelper.addError(endControl.errors, validationName, {
                    startValue: startControl.value,
                    endValue: endControl.value,
                })
            );
        } else {
            endControl.setErrors(
                ValidationHelper.clearError(endControl.errors, validationName)
            );
        }
    }
}
