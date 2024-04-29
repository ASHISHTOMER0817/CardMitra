
function dateFormat(date: Date):string {
      const dt = new Date(date);
      const year = dt.getFullYear()
      const month = dt.getMonth()
      const day = dt.getDate()
      const delivery_date = `${day}-${month +1}-${year}`
      return delivery_date;
}

export default dateFormat;