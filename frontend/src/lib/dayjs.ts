import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekday from 'dayjs/plugin/weekday';

import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import 'dayjs/locale/en-gb';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export default dayjs;
