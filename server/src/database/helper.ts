export default function makeDbHelper() {
  return Object.freeze({
    emptyOrRows
  })
  
  function emptyOrRows(rows: Array<any> | null): Array<any> {
      if (!rows) {
        return [];
      }
      return rows;
    }
}