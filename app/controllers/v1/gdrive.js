const fs = require('fs');
const path = require('path');
const process = require('process');
const { google } = require('googleapis');
const pkey = JSON.parse(fs.readFileSync('./api-project-346513-e868513358da.json'));
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const { PhotoModel } = require('../../helper/db')

/**
 * Authorize with service account and get jwt client
 *
 */
async function authorize() {
    const jwtClient = new google.auth.JWT(
        pkey.client_email,
        null,
        pkey.private_key,
        SCOPES
    )
    await jwtClient.authorize();
    return jwtClient;
}

/**
 * Create a new file on google drive.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function uploadFile(authClient, fullpath, filename) {
    const drive = google.drive({ version: 'v3', auth: authClient });

    var fileMetadata = {
        'name': filename,
        'parents': ['1SgSYRAdTFwpvvwIjRUmUSmwRiI9MAy1Q']
    };
    var media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(`./${fullpath}`) //
    };

    const result = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id"
    });

    await PhotoModel.update(
        { gdrive_link: `https://drive.google.com/u/0/uc?id=${result}` },
        { where: { _code: filename.split('.')[0] } }
    )

    return result;
}

const uploadToDriveFunc = async (fullpath, filename)=>{
    return await authorize().then(async (auth)=>{
        await uploadFile(auth, fullpath, filename)
        return 200;
    }).catch(()=>{
        return 400;
    });
}



module.exports = {
    uploadToDrive: uploadToDriveFunc
}