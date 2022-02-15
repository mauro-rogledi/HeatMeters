import {
  enablePromise,
  openDatabase,
  SQLError,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

export function openDb(dbName: string): SQLiteDatabase {
  let db = openDatabase(
    {name: 'prova.db', location: 'default'},
    () => {
      return null;
    },
    err => {
      console.log('opendb:', err);
    },
  );
  return db;
}

export function executeSql(
  db: SQLiteDatabase,
  sqlCommand: string,
  args?: any,
): Promise<any> {
  return new Promise((resolve, reject) => {
    var rows: any;
    db.transaction(
      tx => {
        tx.executeSql(sqlCommand, args, (tx, results) => {
          if (results.rows.length > 0) {
            rows = results.rows.raw();
            resolve(rows);
          }
        });
      },
      error => {
        console.log('error', error);
        reject(error);
      },
    );
  });
}

export function closeDb(db: SQLiteDatabase): boolean {
  let ok = false;
  db.close(
    () => {
      ok = true;
    },
    (err: SQLError) => {
      ok = false;
    },
  );
  return ok;
}

export function enableDbPromise() {
  enablePromise(true);
}

export async function openDbAsync(): Promise<SQLiteDatabase> {
  return await openDatabase({name: 'HeatMeters.db', location: 'default'});
}

export async function executeSqlAsync(
  db: SQLiteDatabase,
  sqlCommand: string,
  args?: any[],
): Promise<any[]> {
  var rows: any;
  await db.transaction(tx => {
    tx.executeSql(sqlCommand, args, (tx, results) => {
      if (results.rows.length > 0) {
        rows = results.rows.raw();
      }
    });
  });
  return rows;
}

export async function closeDbAsync(db: SQLiteDatabase): Promise<void> {
  await db.close();
}
