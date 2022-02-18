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

export const queries: {[name: string]: string} = {
  CREATE:
    'CREATE TABLE IF NOT EXISTS [MonthsData]( [Year] SMALLINT, [Month] SMALLINT, [Day] SMALLINT, [Room] SMALLINT, [Value] SMALLINT, PRIMARY KEY([Year] ASC, [Month] ASC, [Room] ASC));',
  SELECT:
    'SELECT Year, Month, Day, SUM(Value) as Value FROM [MonthsData] GROUP BY Year, Month ORDER BY Year, Month',
  SELECT_MONTH:
    'SELECT * FROM [MonthsData] WHERE Year = ? AND MONTH = ? ORDER by ROOM',
  INSERT_MONTH:
    'INSERT INTO [MonthsData] (Year, Month, Day, Room, Value) VALUES(?,?,?,?,?)',
  UPDATE_MONTH:
    'UPDATE [MonthsData] SET Value = ? WHERE Year = ? AND Month = ? AND Room = ?',
};
