export interface MonthData {
  Period: number;
  Picked: Date;
  Year: number;
  Month: number;
  Day: number;
  Room: number;
  Value: number;
}

export interface Period {
  Id: number;
  Period: string;
  OpenDate: string;
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
  CREATE_TABLE_PERIOD:
    'CREATE TABLE IF NOT EXISTS [Period] ([Id] SMALLINT PRIMARY KEY NOT NULL, [Period] TEXT(32), [OpenDate] TEXT(10))',
  CREATE_TABLE_MONTH:
    'CREATE TABLE IF NOT EXISTS [MonthsData]([Period] [SMALLINT], [Picked] TEXT(10), [Year] SMALLINT, [Month] SMALLINT, [Room] SMALLINT, [Value] SMALLINT, PRIMARY KEY([Year] ASC, [Month] ASC, [Room] ASC));',
  SELECT:
    'SELECT Year, Month, Day, SUM(Value) as Value FROM [MonthsData] GROUP BY Year, Month ORDER BY Year, Month',
  SELECT_ALL: 'SELECT * FROM [MonthsData]',
  SELECT_MONTH:
    'SELECT * FROM [MonthsData] WHERE Year = ? AND MONTH = ? ORDER by ROOM',
  INSERT_MONTH:
    'INSERT INTO [MonthsData] (Year, Month, Day, Room, Value) VALUES(?,?,?,?,?)',
  UPDATE_MONTH:
    'UPDATE [MonthsData] SET Value = ? WHERE Year = ? AND Month = ? AND Room = ?',
  DELETE: 'DELETE FROM [MonthsData]',
};

export const colors: {[name: string]: string} = {
  background: '#0080ff',
};
