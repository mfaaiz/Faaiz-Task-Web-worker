import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { plainToClass } from 'class-transformer'
import { Table } from './model/table'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'faaiz-frontend-task'

  // Create a new web-worker globally
  worker = new Worker(new URL('./app.worker', import.meta.url))

  timer: any

  // make reactive form for inputs
  reactiveForm = new FormGroup({
    timer: new FormControl(3000),
    arraySize: new FormControl(100),
    id: new FormControl('1264,9761,18960'),
  })
  displayedColumns: string[] = ['id', 'int', 'float', 'color', 'child']
  dataSource: any
  showTable: boolean = false

  ngOnInit(): void {
    this.getWorkerData()
  }

  getWorkerData() {
    // receive data from web-worker
    if (typeof Worker !== 'undefined') {
      this.worker.onmessage = ({ data }) => {
        this.showTable = true
        console.log('data array coming from the pseudo-socket=>', data)
        // render last 10 elements. on UI
        let lastTenElements = data.slice(data.length - 10)

        //transform response data(raw) to Table class
        let users = plainToClass(Table, lastTenElements)
        console.log(users)

        this.dataSource = users
      }

      this.intervalTimer(this.reactiveForm.value.timer)
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  onSubmit() {
    console.log(this.reactiveForm.value)
    //call web-worker with a timer
    this.intervalTimer(this.reactiveForm.value.timer)
  }

  intervalTimer(timer: any) {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.worker.postMessage(this.reactiveForm.value)
    }, timer)
  }
}
