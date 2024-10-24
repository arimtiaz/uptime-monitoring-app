// dependencies
const fs = require('fs')
const path = require('path')

const lib = {};

lib.basedir = path.join(__dirname,'/../.data/')

// Create Data
lib.create = (dir, file, data, callback) =>{
    // open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) =>{
        if(!err && fileDescriptor){
            // convert data to string
            const stringData =  JSON.stringify(data);

            // write data to file and then close it
            fs.writeFile(fileDescriptor, stringData, (err2) =>{
                if(!err2){
                    fs.close(fileDescriptor, (err3) =>{
                        if(!err3){
                            callback(false)
                        } else{
                            callback('Error closing the new file')
                        }
                    })
                } else{
                    callback('Error writing to new file')
                }
            })
        } else{
            callback("Could not create new file, it may already exists")
        }
    })
}


// Read Data
lib.read = (dir, file, callback) =>{
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) =>{
        callback(err, data)
    })
}

// Update Data
lib.update = (dir, file, data, callback) => {
    // file open
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            
            // convert the data to string
            const stringData = JSON.stringify(data)

            // truncate the file
            fs.ftruncate(fileDescriptor, (err1) =>{
                if(!err1){
                    // write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err2) =>{
                        if(!err2){
                            // close it
                            fs.close(fileDescriptor, (err3) =>{
                                if(!err3){
                                    callback(false)
                                } else{
                                    callback('Error closing the file')
                                }
                            });
                        }
                        else{
                            callback('Error writing the file')
                        }
                    })
                } else{
                    callback('Error truncating the file')
                }
            })
        }
})
}

// Delete
lib.delete = (dir, file, callback) =>{
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err)=>{ 
        if(!err){
            callback(false)
        } else{
            callback('Error while deleting')
        }
    })
}

module.exports=lib;
