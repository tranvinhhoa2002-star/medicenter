// Helper to read bucket data from local JSON file
const path = require('path')
const bucketData = require(path.join(__dirname, '../bucket.json'))

// Transform metafields array to metadata object (CosmicJS format)
const transformMetafields = (obj) => {
  if (!obj.metafields) return obj
  
  const metadata = {}
  obj.metafields.forEach(field => {
    if (field.type === 'repeater' && field.children) {
      metadata[field.key] = field.children
    } else {
      metadata[field.key] = field.value
    }
  })
  
  return Object.assign({}, obj, { metadata })
}

const getBucketObjects = () => {
  const objects = bucketData.bucket.objects || []
  return {
    objects: objects.map(transformMetafields)
  }
}

const getBucketObject = (query) => {
  const objects = bucketData.bucket.objects || []
  const object = objects.find(obj => obj.slug === query.slug)
  return {
    object: object ? transformMetafields(object) : null
  }
}

module.exports = {
  getObjects: getBucketObjects,
  getObject: getBucketObject
}
