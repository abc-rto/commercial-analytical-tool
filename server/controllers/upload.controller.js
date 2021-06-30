const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).single('file')

var getInverterPromise = () => {
    return runPy = new Promise(function (success, nosuccess) {

        const { spawn } = require('child_process');
        const pyprog = spawn('python', ['./server/python_scripts/codespace.py']);

        pyprog.stdout.on('data', function (data) {
            success(data);
        });

        pyprog.stderr.on('data', (data) => {
            nosuccess(data);
        });
    });
}

var listDirectory = () => {
    var fs = require('fs');
    return files = fs.readdirSync('public');
    //console.log(files)
}

module.exports = {
    post: async (req, res, next) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).send(req.file)
        })
    },
    getInverterLabels: async (req, res, next) => {
        inverterString = await getInverterPromise() + ""
        inverters = inverterString.split(",")
        inverters.forEach(function (inverter, index, inverters) {
            inverters[index] = inverter.replace('[', '').replace(']', '').replace('\'', '').replace('\'', '').replace('\'', '').replace('\'', '')
        })
        //console.log("Promise is: " + inverters)
        res.json(inverters)
    },
    getFilesList: async (req, res, next) => {
        files = listDirectory()
        //console.log("Promise is: " + inverters)
        res.json(files)
    }
}