import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    posters: computed(function() {
        return [
            'Bobby',
            'Monica',
            'Rachel',
            'Tricia',
            'Josh Litton',
            'Emily',
            'Lauren',
            'Brandon',
            'Nicole',
            'Josh Lanxner',
            'Kat',
        ];
    }),

    days: computed(function() {
        const posters = this.get('posters');
        const startOfYear = new Date('1/1/2021');
        const endOfYear = new Date('12/31/2021');

        const days = [];
        let day = startOfYear;

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
            if (day.getDay() === 1 || day.getDay() === 3 || day.getDay() === 5) {
                days.push({
                    dayOfWeek: day.getDay(),
                    weekNumber: getWeekNumber(day),
                    month: day.getMonth(),
                    date: day.getDate(),
                    poster: posters[count],
                });

                if (count === 10) {
                    count = 0
                } else {
                    count++;
                }
            }
            day = addDay(day)
        }

        return days;
    }),

    months: computed('days', function() {
        const days = this.get('days');
        const monthsArr = [
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
