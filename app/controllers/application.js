import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    posters: computed(function() {
        return [
            'Bobby',
            'Emily',
            'Ashley',
            'Tricia',
            'Monica',
            'Lauren',
            'Brandon',
            'Amanda',
            'Josh',
            'Kat',
            'Caroline',
            'Hannah',
            'Jamie',
            'Jared',
            'Joseph',
            'Paul',
            'Rachel',
            'Richard'
        ];
    }),

    days: computed(function() {
        const posters = this.get('posters');
        const startDate = new Date('2/11/2022');
        const endOfYear = new Date('12/31/2022');

        const days = [];
        const holidays = [
            { date: 17, month: 0, name: 'Martin Luther King Jr. Day' },
            { date: 21, month: 1, name: `President's Day` },
            { date: 30, month: 4, name: 'Memorial Day' },
            { date: 4, month: 6, name: 'Independence Day' },
            { date: 5, month: 8, name: 'Labor Day' },
            { date: 24, month: 10, name: 'Thanksgiving' },
            { date: 25, month: 10, name: 'Thanksgiving (Day After)' },
            { date: 23, month: 11, name: 'Christmas Eve'},
            { date: 26, month: 11, name: 'Christmas'},
        ];
        let day = startDate;

        const addDay = (dayToAddTo) => {
            const copy = new Date(Number(dayToAddTo))
            copy.setDate(dayToAddTo.getDate() + 1)
            return copy
        }

        const getWeekNumber = (daysWeekToGet) => {
            var d = new Date(daysWeekToGet.getFullYear(), daysWeekToGet.getMonth(), daysWeekToGet.getDate());
            var dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            var yearStart = new Date(d.getUTCFullYear(),0,1);
            return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
        };
        let count = 0;

        while(day <= endOfYear) {
            const dayOfWeek = day.getDay();
            const date = day.getDate();
            const month = day.getMonth();
            const holidayMatch = holidays.find(holiday => holiday.date === date && holiday.month === month);
            const dateObj = {
                dayOfWeek,
                weekNumber: getWeekNumber(day),
                month,
                date,
            }

            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                if (holidayMatch) {
                    dateObj.poster = holidayMatch.name;

                } else if (dayOfWeek === 2 || dayOfWeek === 4) {
                    dateObj.poster = posters[count];

                    if (count === posters.length - 1) {
                        count = 0;
                    } else {
                        count++;
                    }
                }

                days.push(dateObj);
            }

            day = addDay(day)
        }

        return days;
    }),

    months: computed('days', function() {
        const days = this.get('days');
        const monthsArr = [
            // {
            //     name: 'January',
            //     month: 0,
            //     weeks: {},
            // },
            {
                name: 'February',
                month: 1,
                weeks: {},
            },
            {
                name: 'March',
                month: 2,
                weeks: {},
            },
            {
                name: 'April',
                month: 3,
                weeks: {},
            },
            {
                name: 'May',
                month: 4,
                weeks: {},
            },
            {
                name: 'June',
                month: 5,
                weeks: {},
            },
            {
                name: 'July',
                month: 6,
                weeks: {},
            },
            {
                name: 'August',
                month: 7,
                weeks: {},
            },
            {
                name: 'September',
                month: 8,
                weeks: {},
            },
            {
                name: 'October',
                month: 9,
                weeks: {},
            },
            {
                name: 'November',
                month: 10,
                weeks: {},
            },
            {
                name: 'December',
                month: 11,
                weeks: {},
            },
        ]

        days.forEach((day) => {
            const monthArrObj = monthsArr.find((monthObj) => monthObj.month === day.month);

            if (monthArrObj) {
                if (monthArrObj.weeks[day.weekNumber]) {
                    monthArrObj.weeks[day.weekNumber].push(day);
                } else {
                    if (Object.keys(monthArrObj.weeks).length === 0) {
                        monthArrObj.firstWeek = day.weekNumber.toString();
                    }
                    monthArrObj.weeks[day.weekNumber] = [day];
                }
            }
        })

        return monthsArr;
    }),
});
