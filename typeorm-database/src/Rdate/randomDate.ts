import randomDate from '@js-random/date';

var date = randomDate();
var Rdate = randomDate({
    from: new Date(2021, 8, 8),
    to: new Date(2022, 8, 8) 
    });

export default Rdate