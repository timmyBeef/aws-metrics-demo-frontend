import { Moment } from 'moment';

/**
 * 時間區間。
 */
export interface DateInterval {
    /**
     * 起始時間。
     */
    startDate: Moment;

    /**
     * 結束時間。
     */
    endDate: Moment;
}
