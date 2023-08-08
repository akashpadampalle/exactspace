const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.post('/', (req, res) => {
    try {


        try {
            data = JSON.parse(req.body.data);
        } catch (error){
            console.log(`error in post ${error} `);
            return res.status(500).send(`
                <html>
                    <head>
                        <title>Invalid data received</title>
                    </head>
                    <body>
                        <h1 style="color: orange; text-align: center;">Invalid Data Received</h1>
                    </body>
                </html>
        `);
        }

        
        const dataList = objecToList(data);

        return res.send(`
                <html>
                    <head>
                        <title>Exactspace | Data</title>

                        <style>

                            table{
                                margin: auto;
                                text-align: left;
                                border-spacing: 0 10px;
                            }


                            tr{
                                box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
                            }

                            td, th {
                                padding: 10px;
                                background: lightblue;
                            }

                            .key, th{
                                background: #F5F5F5;
                            }
                        </style>

                    </head>
                    <body>
                        <table> 
                            <tr>
                                <th>Key</th>
                                <th>Value</th>
                            </tr>
                            ${dataList} 
                        </table>    
                    </body>
                </html>
        `);
        

        res.json(data);
    } catch (error) {
        console.log(`error in post ${error} `);
        return res.status(500).send(`
            <html>
                <head>
                    <title>Internal Server Error</title>
                </head>
                <body>
                    <h1 style="color: red; text-align: center;">Internal Server Error</h1>
                </body>
            </html>
        `);
    }
})

app.listen(PORT, (error) => {
    if (error) {
        console.log(`error to start server ${error}`);
        return;
    } else {
        console.log(`server is running at port ${PORT}`);
    }
});


// Utility functions
function objecToList(obj){
    let result = '';

    for(const key in obj){
        result += `
            <tr>
                <td class="key">${key}</td>
                <td class="value">${obj[key]}</td>
            </tr>
        `;
    }

    return result;
}