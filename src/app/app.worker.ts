/// <reference lib="webworker" />
import getTableData from './services/table-data'

addEventListener('message', ({ data }) => {
  //fetch data from json file
  const response = getTableData()

  //data coming from main thread i.e {timer: '300', arraySize: '100', id: ''}

  //split ids into array of id
  let ids = data.id.split(',')

  let result: any

  //filter base on ids
  result = response.filter((item: any) => {
    return ids.indexOf(item.id) > -1
  })

  //filter on array size i.e size of the data array can be adjusted via UI input
  let array = result.splice(0, data.arraySize)

  postMessage(array)
})
