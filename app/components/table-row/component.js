import  Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    tagName: 'tr',

    blankTableDatum: computed('firstWeek', function() {
        const { week, firstWeek, 'days.length': numDays } = this.getProperties('week', 'firstWeek', 'days.length');
        const blankTableDatum = [];
        const blankDays = 5 - numDays;

        if (week === firstWeek && blankDays !== 0) {
            for (let i = 0; i < blankDays; i++) {
                blankTableDatum.push('')
            }
        }

        return blankTableDatum;
    }),
})