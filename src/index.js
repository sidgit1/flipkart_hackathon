const path = require('path')
const http = require('http')
const express = require('express')
const xlsx = require('xlsx')
const fs = require('fs')
const sigmoid = require('sigmoid')
const app = express()
const server = http.createServer(app)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

//console.log(data)
function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
 }

app.get('/item', (req,res) => {
    console.log(req.query)
    const wb = xlsx.readFile('mendetails.xlsx')
    const ws = wb.Sheets['mendetails']
    const data = xlsx.utils.sheet_to_json(ws)

    const temp = data.map(function(record){
        T = record.Ratings
        if(T){
            T1 = T.replace("\r\n|\r\n", " ") 
            T2 = T1.replace("Ratings", "")
            T3 = T2.substr(T2.indexOf(' ')+1)
            delete record.Ratings
            record.Total = parseInt(T3.trim())
            record.Score = record.Total*0.01 + record.Average_Rating*0.1
            record.Normalized_Score = sigmoid(record.Score)
            record.Future = record.Normalized_Score*record.Slope
            return record
        }
    })
    if(req.query.timeline=='0'){
        const currData = temp.filter((item) => (item && item.Images && item.Name && item.Brand && item.Price))
        currData.sort(sortByProperty('Normalized_Score'))
        if(req.query.trends=='0')
            res.send(currData)
        else if(req.query.trends=='1'){
            currData.reverse()    
            res.send(currData)
        }
    }
    else if(req.query.timeline=='1'){
        const newData = temp.filter((item) => (item && item.Images && item.Name && item.Brand && item.Price && item.Future))
        newData.sort(sortByProperty('Future'))
        if(req.query.trends=='0')
            res.send(newData)
        else if(req.query.timeline=='1'){
            newData.reverse()
            res.send(newData)
        }
    }
})

server.listen(port, () => {
     console.log(`Server is up on port ${port}!`)

})