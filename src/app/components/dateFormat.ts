
function dateFormat(date: Date):string {

      const dt = new Date(date);
      const year = dt.getFullYear()
      const month = dt.getMonth()
      const day = dt.getDay()
      const delivery_date = `${day}-${month}-${year}`
      return delivery_date;
}

export default dateFormat;