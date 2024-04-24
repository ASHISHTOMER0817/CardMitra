
function dateFormat(date: Date) {

      // const date = new Date(deliveryDate)
      console.log(date)

      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDay()

      const delivery_date = `${day}-${month}-${year}`
      return delivery_date;
}

export default dateFormat;