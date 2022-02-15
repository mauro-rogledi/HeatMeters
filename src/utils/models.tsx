export interface MonthData {
  day: number;
  month: number;
  year: number;
  value: number;
}

export interface ListMonthData extends Array<MonthData> {}

export let rooms: string[] = ['Cucina', 'Ingresso', 'Bagno', 'Camera', 'Sala'];
export let months: string[] = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];
