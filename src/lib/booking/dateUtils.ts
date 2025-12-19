import { format, parse, addMinutes, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { bookingConfig } from '@/config/siteConfig';

/**
 * Convierte hora "HH:MM" a Date object para una fecha específica
 */
export const timeStringToDate = (dateStr: string, timeStr: string): Date => {
  return parse(`${dateStr} ${timeStr}`, 'yyyy-MM-dd HH:mm', new Date());
};

/**
 * Formatea Date a ISO 8601 con timezone Europe/Madrid
 */
export const toISO8601 = (date: Date): string => {
  return date.toISOString();
};

/**
 * Genera slots de 30 min entre start y end
 */
export const generateTimeSlots = (date: string): string[] => {
  const { openHours, slotIntervalMin } = bookingConfig;
  
  const startTime = timeStringToDate(date, openHours.start);
  const endTime = timeStringToDate(date, openHours.end);
  
  const slots: string[] = [];
  let currentTime = startTime;
  
  while (currentTime < endTime) {
    slots.push(format(currentTime, 'HH:mm'));
    currentTime = addMinutes(currentTime, slotIntervalMin);
  }
  
  return slots;
};

/**
 * Verifica si un slot está ocupado
 */
export const isSlotBusy = (
  dateStr: string,
  timeStr: string,
  durationMin: number,
  busyTimes: { start: string; end: string }[]
): boolean => {
  const slotStart = timeStringToDate(dateStr, timeStr);
  const slotEnd = addMinutes(slotStart, durationMin);
  
  return busyTimes.some((busy) => {
    const busyStart = new Date(busy.start);
    const busyEnd = new Date(busy.end);
    
    // Slot overlap logic
    return (
      (slotStart >= busyStart && slotStart < busyEnd) ||
      (slotEnd > busyStart && slotEnd <= busyEnd) ||
      (slotStart <= busyStart && slotEnd >= busyEnd)
    );
  });
};

/**
 * Formatea fecha para display
 */
export const formatDisplayDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: require('date-fns/locale/es') });
};

/**
 * Formatea hora para display (12h format)
 */
export const formatDisplayTime = (timeStr: string): string => {
  const date = parse(timeStr, 'HH:mm', new Date());
  return format(date, 'h:mm a');
};
