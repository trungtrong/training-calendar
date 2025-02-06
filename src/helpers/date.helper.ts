export class DateHelper {
  static getDaysInCurrentWeek(currentDate = new Date()): {
    datesInWeek: Date[];
    datesInWeekWithIosString: string[]
  } {
    const today = new Date(currentDate);
    const dayOfWeek = today.getDay(); // 0 - 6 = Sunday - Saturday

    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(today);
    switch (dayOfWeek) {
      case 0: // Sunday
        startOfWeek.setDate(today.getDate() - 6);
        break;
      case 1:  // Monday
        break;
      default:
        startOfWeek.setDate(today.getDate() - dayOfWeek + 1);
        break;
    }
    //
    const datesInWeek: Date[] = [];
    const datesInWeekWithIosString: string[] = [];
    // index = 0 - Monday, 6 - Sunday
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + dayIndex);
      //
      const currentDate = new Date(currentDay);
      datesInWeek.push(currentDate);
      datesInWeekWithIosString.push(currentDate.toISOString());
    }

    return {
      datesInWeek,
      datesInWeekWithIosString
    };
  }

  static compareDate(params: {
    firstDate: Date | string | number;
    secondDate: Date | string | number
  }): 'equal' | 'lessThan' | 'greaterThan' | undefined {
    const firstDate: Date = new Date(params.firstDate);
    const secondDate: Date = new Date(params.secondDate);

    const firstDateTime: number = new Date(firstDate.setHours(0, 0, 0, 0)).getTime();
    const secondDateTime: number = new Date(secondDate.setHours(0, 0, 0, 0)).getTime();
    if (firstDateTime > secondDateTime) {
      return 'greaterThan';
    }
    if (firstDateTime === secondDateTime) {
      return 'equal';
    }
    if (firstDateTime < secondDateTime) {
      return 'lessThan';
    }
  };

  static isSameDate(params: {
    firstDate: Date | string | number;
    secondDate: Date | string | number
  }): boolean {
    const compareResult = this.compareDate({
      firstDate: params.firstDate,
      secondDate: params.secondDate
    });
    return compareResult === 'equal';
  };

  static toFormatDate(params: {
    value: Date | string,
    format?: string
  }): string {
    if (!params || !params.value) {
      return '-';
    }
    const valueDate = new Date(params.value);
    const date: number = valueDate.getDate();
    const month: number = valueDate.getMonth() + 1;
    const year: number = valueDate.getFullYear();

    switch (params.format) {
      case 'MM/dd/yyyy':
        return `${month > 9 ? month : '0' + month}/${date > 9 ? date : '0' + date}/${year}`;
      case 'yyyy/MM/dd':
        return `${year}/${month > 9 ? month : '0' + month}/${date > 9 ? date : '0' + date}`;
      case 'yyyy-MM-dd':
        return `${year}-${month > 9 ? month : '0' + month}-${date > 9 ? date : '0' + date}`;
      case 'dd/MM/yyyy':
      default:
        return `${date > 9 ? date : '0' + date}/${month > 9 ? month : '0' + month}/${year}`;
    }
  }
}
