import { DaysEnum } from '../modules/training-calendar/enums/days.constant';

export class DateHelper {
  static getDaysInCurrentWeek(currentDate = new Date()): {
    daysInWeek: Date[];
    daysInWeekWithIosString: string[]
  } {
    const today = new Date(currentDate);
    const dayOfWeek = today.getDay(); // 0 - 6 = Sunday - Saturday

    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    const daysInWeek: Date[] = [];
    const daysInWeekWithIosString: string[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + dayIndex);
      //
      const currentDate = new Date(currentDay);
      daysInWeek.push(currentDate);
      daysInWeekWithIosString.push(currentDate.toISOString());
    }

    return {
      daysInWeek,
      daysInWeekWithIosString
    };
  }

  static convertDayNameToDayNumber(dayName: DaysEnum): number {
    switch (dayName) {
      case DaysEnum.Mon:
        return 1;
      case DaysEnum.Tue:
        return 2;
      case DaysEnum.Wed:
        return 3;
      case DaysEnum.Thu:
        return 4;
      case DaysEnum.Fri:
        return 5;
      case DaysEnum.Sat:
        return 6;
      case DaysEnum.Sun:
      default:
        return 0;
    }
  }

  static convertDayNumberToDayName(dayNumber: number): DaysEnum {
    switch (dayNumber) {
      case 1:
        return DaysEnum.Mon;
      case 2:
        return DaysEnum.Tue;
      case 3:
        return DaysEnum.Wed;
      case 4:
        return DaysEnum.Thu;
      case 5:
        return DaysEnum.Fri;
      case 6:
        return DaysEnum.Sat;
      case 0:
      default:
        return DaysEnum.Sun;
    }
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
}
