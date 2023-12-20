import { filesystem, os } from "@neutralinojs/lib";

function encodePath(path) {
    return path.replace(/\s/g, "\\ ")
}

async function pathExists(path) {
    try {
        await filesystem.getStats(path)
        return [true, undefined]
    } catch (err) {
        return [false, err]
    }
}

export async function checkIntegrity() {
    const userPath = (await os.execCommand('cd && pwd')).stdOut.replace("\n", "")
    const appSupportPath = `${userPath}/Library/Application Support/AutoLaunch`

    // Checks for application support folder
    let [exists, err] = await pathExists(appSupportPath)
    if (!exists && err.code === "NE_FS_NOPATHE") {
        await filesystem.createDirectory(appSupportPath)
    }

    // Check for url-scheme handler and download
    [exists, err] = await pathExists(`${appSupportPath}/url-handler.app`)
    if (!exists && err.code === "NE_FS_NOPATHE") {
        console.log("Doing")
        try {
            await os.execCommand(`curl "https://raw.githubusercontent.com/Communaute-Events/autolaunch-artifacts/main/macos/url-handler.app.zip" > ${encodePath(appSupportPath)}/url-handler.app.zip`)
            await os.execCommand(`unzip -d ${encodePath(appSupportPath)} ${encodePath(appSupportPath)}/url-handler.app.zip`)
            await os.execCommand(`${encodePath(appSupportPath)}/url-handler.app/Contents/MacOS/applet`)
            await filesystem.removeFile(appSupportPath + "/url-handler.app.zip")
        } catch (err) {
            console.log(err)
        }
    }
}