const {Storage} = require('@google-cloud/storage');
const db = require('../../modules/database')
const handler = async(req, res) => {
  const keyFilename = '{キーとなるJSONファイルのパス}';
  const bucketName = 'tech-blog-static';
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  // const storage = new Storage({keyFilename: keyFilename});
  let responseJson = {src: ''}
  if(req.body.isDelete) {
    try {
      await deleteImage(req, bucket)
      console.log(`gs://${bucketName}/blog/${req.body.src} deleted`);
    } catch (error) {
      console.error(error);
      return res.status(400).json({error: error.response})
    }
  }
  if(req.body.newSrc) {
    try {
      const name = createName()
      const fileExtension = req.body.newSrc.toString().slice(req.body.newSrc.indexOf('/') + 1, req.body.newSrc.indexOf(';'))
      const filename = name + '.' + fileExtension
      responseJson = await uploadImage(req, bucket, filename)
    } catch (error) {
      console.error(error);
      return res.status(400).json({error: error.response})
    }
  }

  return res.status(200).json(responseJson)
}

const uploadImage = async(req, bucket, filename) => {
  const blob = bucket.file(filename);
  await blob.save(toBlob(req.body.newSrc)) // バイナリデータを指定
  const responseJson = {
    src: filename,
    name: `https://storage.googleapis.com/tech-blog-static/blog/${filename}`
  }
  return responseJson;
}

const deleteImage = async(req, bucket) => {
  const path = 'blog/' + req.body.src;
  const blob = bucket.file(path);
  await blob.delete();
}

const toBlob = (base64) => {
  var bin = atob(base64.replace(/^.*,/, ''));
  var buffer = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i);
  }
  return buffer;
}

const createName = () => {
  const crypto = require('crypto')
  const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const N=16
  return Array.from(crypto.randomFillSync(new Uint8Array(N))).map((n)=>S[n%S.length]).join('')
}

export default handler