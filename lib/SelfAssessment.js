import convert from 'xml-js'
import Extractor from './Extractor'

/**
 * ask user for file and return file content
 *
 * @returns {Promise<string>}
 */
function getFileWithContent() {
  return new Promise((resolve, reject) => {
    if (!window.File || !window.FileReader) {
      reject(new Error('File not supported'))
      return
    }

    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = false
    input.accept = 'application/xml'

    input.onchange = inputEvent => {
      const file = inputEvent.target.files[0]
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')

      reader.onload = readerEvent => {
        if (readerEvent.target.error !== null) {
          reject(readerEvent.target.error)
          return
        }

        resolve(readerEvent.target.result)
      }
    }

    input.click()
  })
}

const SelfAssessment = {
  async select() {
    return this.parse(await getFileWithContent())
  },
  parse(xml) {
    const json = convert.xml2js(xml, { compact: true })
    console.log('received xml', xml, json) // eslint-disable-line
    return Extractor.json(json)
  },
  async stringify(json) {}
}

export default SelfAssessment
