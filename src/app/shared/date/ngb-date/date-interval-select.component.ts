import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateInterval } from './date-interval';
import * as moment from 'moment';
import { DurationInputArg1, DurationInputArg2, unitOfTime } from 'moment';

interface IntervalDefinition {
    label: string;
    startDate: string;
    endDate: string;
}

type GroupName =
    | 'query'
    | 'monthlySchedule'
    | 'dailySchedule'
    | 'quarterlyReport'
    | 'announcement';

@Component({
    selector: 'app-date-interval-select',
    templateUrl: './date-interval-select.component.html',
    styleUrls: ['./date-interval-select.component.css'],
})
export class DateIntervalSelectComponent implements OnInit {
    private static INTERVAL_GROUPS: Map<GroupName, string[]> = new Map<
        GroupName,
        string[]
    >();
    private static INTERVALS: Map<string, IntervalDefinition> = new Map<
        string,
        IntervalDefinition
    >();

    @Output() intervalSelect: EventEmitter<DateInterval> = new EventEmitter<
        DateInterval
    >();

    /**
     * 日期區間常用範圍群組。
     */
    @Input() optionsGroup: GroupName = 'query';

    /**
     * 自訂的日期區間選項。如果有設值的設，就會蓋掉 `optionsGroup` 的值。
     */
    @Input() options: (string | IntervalDefinition)[] = [];

    displayOptions: IntervalDefinition[] = [];

    static initialize() {
        // 未偵破案件車手影像系統、詐欺嫌犯資料查詢、面交熱點清冊匯出、未偵破案件報表、已偵破案件報表、
        // 可疑帳戶查詢、通訊軟體停權申請資料查詢、網路業者回傳資料查詢、知識庫查詢
        // 清除 →清除欄位值
        DateIntervalSelectComponent.INTERVALS.set('clear', {
            label: '清除',
            startDate: 'null',
            endDate: 'null',
        });
        // 今日 → 起始日期、結束日期欄位值設為目前系統日期
        DateIntervalSelectComponent.INTERVALS.set('today', {
            label: '今日',
            startDate: 'startOf day',
            endDate: 'endOf day',
        });
        // 昨日 → 起始日期、結束日期欄位值設為目前系統日期-1天
        DateIntervalSelectComponent.INTERVALS.set('yesterday', {
            label: '昨日',
            startDate: '-1 day, startOf day',
            endDate: '-1 day, endOf day',
        });
        // 一週內 →起始日期欄位值設為目前系統日期-6天、結束日期欄位值設為目前系統日期
        DateIntervalSelectComponent.INTERVALS.set('pastWeek', {
            label: '一週內',
            startDate: '-6 day, startOf day',
            endDate: 'endOf day',
        });
        // 上週：上禮拜一至上禮拜日
        DateIntervalSelectComponent.INTERVALS.set('lastWeek', {
            label: '上一週',
            startDate: '-1 isoWeek, startOf isoWeek',
            endDate: '-1 isoWeek, endOf isoWeek',
        });
        // 一個月內 →起始日期欄位值設為目前系統日期-1個月、結束日期欄位值設為目前系統日期
        DateIntervalSelectComponent.INTERVALS.set('pastMonth', {
            label: '一個月內',
            startDate: '-1 month, startOf day',
            endDate: '-1 month, endOf day',
        });
        // 這個月 → 起始日期欄位值設為本月1號、結束日期欄位值設為目前系統日期
        DateIntervalSelectComponent.INTERVALS.set('thisMonth', {
            label: '這個月',
            startDate: 'startOf month',
            endDate: 'endOf day',
        });
        // 上個月 → 起始日期欄位值設為上個月1號、結束日期欄位值設為目前系統月份-1天
        DateIntervalSelectComponent.INTERVALS.set('lastMonth', {
            label: '上個月',
            startDate: '-1 month, startOf month',
            endDate: '-1 month, endOf month',
        });
        // 今年 → 起始日期欄位值設為目前系統年1月1日、結束日期欄位值設為目前系統日期
        DateIntervalSelectComponent.INTERVALS.set('thisYear', {
            label: '今年',
            startDate: 'startOf year',
            endDate: 'endOf day',
        });
        // 去年 → 起始日期欄位值設為(目前系統年-1年)的1月1日、起始日期欄位值設為(目前系統年-1年)的12月31日
        DateIntervalSelectComponent.INTERVALS.set('lastYear', {
            label: '去年',
            startDate: '-1 year, startOf year',
            endDate: '-1 year, endOf year',
        });

        DateIntervalSelectComponent.INTERVAL_GROUPS.set('query', [
            'clear',
            'today',
            'yesterday',
            'pastWeek',
            'lastWeek',
            'thisMonth',
            'lastMonth',
            'thisYear',
            'lastYear',
        ]);

        // 人員排班、休假預定表、超勤加班表(僅顯示年月)
        // 上月 → 月份顯示為系統日期上個月份(日期預設為1日，不顯示)
        // 同 'lastMonth'
        // 本月 →月份顯示為系統日期本月份(日期預設為1日，不顯示)
        // 同 'thisMonth'
        // 下月 →月份顯示為系統日期下月份(日期預設為1日，不顯示)
        DateIntervalSelectComponent.INTERVALS.set('nextMonth', {
            label: '下個月',
            startDate: '+1 month, startOf month',
            endDate: '+1 month, endOf month',
        });
        // 下下月 →月份顯示為系統日期下下月份(日期預設為1日，不顯示)
        DateIntervalSelectComponent.INTERVALS.set('monthAfterNextMonth', {
            label: '下下月',
            startDate: '+2 month, startOf month',
            endDate: '+2 month, endOf month',
        });

        DateIntervalSelectComponent.INTERVAL_GROUPS.set('monthlySchedule', [
            'lastMonth',
            'thisMonth',
            'nextMonth',
            'monthAfterNextMonth',
        ]);

        // 日勤務分配表
        // 昨日 →顯示昨天日期(YYY/MM/DD)
        // 同 'yesterday'
        // 今日 →顯示 今天日期(YYY/MM/DD)
        // 同 'today'
        // 明日 →顯示明天日期(YYY/MM/DD)
        DateIntervalSelectComponent.INTERVALS.set('tomorrow', {
            label: '明日',
            startDate: '+1 day, startOf day',
            endDate: '+1 day, endOf day',
        });

        DateIntervalSelectComponent.INTERVAL_GROUPS.set('dailySchedule', [
            'yesterday',
            'today',
            'tomorrow',
        ]);

        // 服務績效表
        // 清除 →清除欄位值
        // 同 'clear'
        // 去年第一季→去年1月1日~去年3月31日
        DateIntervalSelectComponent.INTERVALS.set('firstQuarterOfLastYear', {
            label: '去年第一季',
            startDate: '-1 year, quarter 1, startOf quarter',
            endDate: '-1 year, quarter 1, endOf quarter',
        });
        // 去年第二季→去年4月1日~去年6月30日
        DateIntervalSelectComponent.INTERVALS.set('secondQuarterOfLastYear', {
            label: '去年第二季',
            startDate: '-1 year, quarter 2, startOf quarter',
            endDate: '-1 year, quarter 2, endOf quarter',
        });
        // 去年第三季→去年7月1日~去年9月30日
        DateIntervalSelectComponent.INTERVALS.set('thirdQuarterOfLastYear', {
            label: '去年第三季',
            startDate: '-1 year, quarter 3, startOf quarter',
            endDate: '-1 year, quarter 3, endOf quarter',
        });
        // 去年第四季→去年10月1日~去年12月31日
        DateIntervalSelectComponent.INTERVALS.set('fourthQuarterOfLastYear', {
            label: '去年第四季',
            startDate: '-1 year, quarter 4, startOf quarter',
            endDate: '-1 year, quarter 4, endOf quarter',
        });
        // 今年第一季→今年1月1日~今年3月31日
        DateIntervalSelectComponent.INTERVALS.set('firstQuarter', {
            label: '今年第一季',
            startDate: 'quarter 1, startOf quarter',
            endDate: 'quarter 1, endOf quarter',
        });
        // 今年第二季→今年4月1日~今年6月30日
        DateIntervalSelectComponent.INTERVALS.set('secondQuarter', {
            label: '今年第二季',
            startDate: 'quarter 2, startOf quarter',
            endDate: 'quarter 2, endOf quarter',
        });
        // 今年第三季→今年7月1日~今年9月30日
        DateIntervalSelectComponent.INTERVALS.set('thirdQuarter', {
            label: '今年第三季',
            startDate: 'quarter 3, startOf quarter',
            endDate: 'quarter 3, endOf quarter',
        });
        // 今年第四季→今年10月1日~今年12月31日
        DateIntervalSelectComponent.INTERVALS.set('fourthQuarter', {
            label: '今年第四季',
            startDate: 'quarter 4, startOf quarter',
            endDate: 'quarter 4, endOf quarter',
        });

        DateIntervalSelectComponent.INTERVAL_GROUPS.set('quarterlyReport', [
            'firstQuarterOfLastYear',
            'secondQuarterOfLastYear',
            'thirdQuarterOfLastYear',
            'fourthQuarterOfLastYear',
            'firstQuarter',
            'secondQuarter',
            'thirdQuarter',
            'fourthQuarter',
        ]);

        // 跑馬燈訊息公布(顯示年月日時分，秒均預設為00不顯示輸入)
        // 清除 →清除欄位值
        // 同 'clear'
        // 今日 → 欄位值設為目前系統日期
        // 同 'today'
        // 一日 → 欄位值設為目前系統日期+1天
        DateIntervalSelectComponent.INTERVALS.set('oneDay', {
            label: '一日',
            startDate: 'now',
            endDate: '+1 day, endOf day',
        });
        // 二日 → 欄位值設為目前系統日期+2天
        DateIntervalSelectComponent.INTERVALS.set('twoDays', {
            label: '二日',
            startDate: 'now',
            endDate: '+2 days, endOf day',
        });
        // 三日 → 欄位值設為目前系統日期+3天
        DateIntervalSelectComponent.INTERVALS.set('threeDays', {
            label: '三日',
            startDate: 'now',
            endDate: '+3 days, endOf day',
        });
        // 一星期 → 欄位值設為目前系統日期+ 7天
        DateIntervalSelectComponent.INTERVALS.set('oneWeek', {
            label: '一星期',
            startDate: 'now',
            endDate: '+1 week, endOf day',
        });
        // 二星期 → 欄位值設為目前系統日期+14天
        DateIntervalSelectComponent.INTERVALS.set('twoWeeks', {
            label: '二星期',
            startDate: 'now',
            endDate: '+2 weeks, endOf day',
        });
        // 三星期 → 欄位值設為目前系統日期+21天
        DateIntervalSelectComponent.INTERVALS.set('threeWeeks', {
            label: '三星期',
            startDate: 'now',
            endDate: '+3 weeks, endOf day',
        });
        // 一個月 → 欄位值設為目前系統日期+1個月
        DateIntervalSelectComponent.INTERVALS.set('oneMonth', {
            label: '一個月',
            startDate: 'now',
            endDate: '+1 month, endOf day',
        });
        // 二個月 → 欄位值設為目前系統日期+2個月
        DateIntervalSelectComponent.INTERVALS.set('twoMonths', {
            label: '二個月',
            startDate: 'now',
            endDate: '+2 months, endOf day',
        });

        DateIntervalSelectComponent.INTERVAL_GROUPS.set('announcement', [
            'clear',
            'oneDay',
            'twoDays',
            'threeDays',
            'oneWeek',
            'twoWeeks',
            'threeWeeks',
            'oneMonth',
            'twoMonths',
        ]);
    }

    constructor() {}

    static convertDate(date: string | moment.Moment): moment.Moment {
        if (moment.isMoment(date)) {
            return date;
        } else if (typeof date === 'string') {
            return DateIntervalSelectComponent.directiveToMoment(date);
        } else {
            throw new Error(`Unsupported date: ${date}`);
        }
    }

    static directiveToMoment(directives: string): moment.Moment {
        if (directives === 'now') {
            return moment();
        }

        if (directives === 'null') {
            return null;
        }

        let result = moment();
        directives
            .split(',')
            .map(directive => directive.trim())
            .forEach(directive => {
                const tokens = directive.split(' ').map(token => token.trim());
                if (tokens.length <= 1) {
                    throw new Error(`Unknown directive "${directive}"`);
                }

                if (tokens[0].startsWith('+') || tokens[0].startsWith('-')) {
                    const amount = Number(tokens[0]);
                    const unit = tokens[1];
                    result = result.add(
                        amount as DurationInputArg1,
                        unit as DurationInputArg2
                    );
                } else if (tokens[0] === 'startOf') {
                    const unit = tokens[1];
                    result = result.startOf(unit as unitOfTime.StartOf);
                } else if (tokens[0] === 'endOf') {
                    const unit = tokens[1];
                    result = result.endOf(unit as unitOfTime.StartOf);
                } else if (tokens[0] === 'quarter') {
                    const quarter = Number(tokens[1]);
                    result = result.quarter(quarter);
                } else {
                    throw new Error(
                        `Illegal directive "${directive}" in "${directives}".`
                    );
                }
            });

        return result;
    }

    ngOnInit() {
        this.displayOptions = [];
        if (this.options.length > 0) {
            this.options.forEach(option => {
                if (typeof option === 'string') {
                    const def = DateIntervalSelectComponent.INTERVALS.get(
                        option
                    );
                    this.displayOptions.push(def);
                } else {
                    const def = option as IntervalDefinition;
                    if (def.label && def.startDate && def.endDate) {
                        this.displayOptions.push(def);
                    } else {
                        throw new Error(
                            `Given option '${option}' is not well-formed.`
                        );
                    }
                }
            });
        } else {
            DateIntervalSelectComponent.INTERVAL_GROUPS.get(
                this.optionsGroup
            ).forEach(optionName => {
                const def = DateIntervalSelectComponent.INTERVALS.get(
                    optionName
                );
                this.displayOptions.push(def);
            });
        }
    }

    private emit(
        startDate: string | moment.Moment,
        endDate: string | moment.Moment = moment().endOf('day')
    ): void {
        const start = DateIntervalSelectComponent.convertDate(startDate);
        const end = DateIntervalSelectComponent.convertDate(endDate);

        this.intervalSelect.emit({ startDate: start, endDate: end });
    }
}

DateIntervalSelectComponent.initialize();
