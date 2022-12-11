/// <reference lib="webworker" />
import getTableData from './services/table-data'

addEventListener('message', ({ data }) => {
  //fetch data from json file
  const response = getTableData()

  //data coming from main thread i.e {timer: '300', arraySize: '100', id: ''}

  //filter base on id
  let result = response.filter((table) => table.id.includes(data.id))

  //filter on array size i.e size of the data array can be adjusted via UI input
  let array = result.splice(0, data.arraySize)

  postMessage(array)
})
