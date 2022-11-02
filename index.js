import { readdir } from 'fs/promises'
import path from 'path'

const root = path.join('./node_modules');

async function countFiles(directory) {

    return (async function() {    
        let members = await readdir(directory, { withFileTypes: true });
        let files = members.filter(member => member.isFile())
        let folders = members.filter(member => member.isDirectory())

        if (folders.length === 0) return files.length
        if (folders.length > 0) {
            let fileCounter = 0
            for (let folder of folders) {
                let folderPath = path.join(directory, folder.name)
                let fileCount = await countFiles(folderPath)
                fileCounter += fileCount;
            }
            return fileCounter + files.length;
        }         

    })().catch(console.error)
}

countFiles(root).then(console.log)



