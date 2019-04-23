/**
 * extract path from json
 *
 * @param json
 * @param path
 * @param fallback
 * @returns {*}
 */
function getRaw(json, path, fallback = null) {
  let curr = json
  const parts = path.split('.')
  for (const part of parts) {
    if (!curr[part]) {
      return fallback
    }

    curr = curr[part]
  }

  return curr
}

/**
 * extract lang path
 *
 * @param json
 * @param path
 */
function getLang(json, path) {
  const curr = makeArray(getRaw(json, path, []))
  const list = {}

  curr.forEach(e => {
    if (e._attributes.lang) {
      list[e._attributes.lang] = e._text
    }
  })

  return list
}

/**
 * extract simple text
 *
 * @param json
 * @param path
 * @param fallback
 * @returns {string | number | string}
 */
function getText(json, path, fallback = null) {
  const curr = getRaw(json, path, fallback)

  return curr._text ? curr._text : curr
}

/**
 * ensure entry is an array
 *
 * @param element
 * @returns Array
 */
function makeArray(element) {
  if (Array.isArray(element)) {
    return element
  }
  return [element]
}

/**
 * handle a single area block
 *
 * @param area
 * @returns {{description: {}, title: {}, key: string}}
 */
function processArea(area) {
  return {
    title: getLang(area, 'Title'),
    description: getLang(area, 'Description'),
    key: getText(area, '_attributes.key', '')
  }
}

/**
 * handle area in question
 *
 * @param area
 * @returns {string|number}
 */
function processQuestionArea(area) {
  return getText(area, '_attributes.reference', '')
}

/**
 * handle choice in question
 *
 * @param choice
 * @returns {{score: number, description, title}}
 */
function processQuestionChoice(choice) {
  return {
    title: getLang(choice, 'Title'),
    description: getLang(choice, 'Description'),
    score: getText(choice, 'Score', 0) * 1
  }
}

/**
 * handle question
 *
 * @param question
 * @returns {{description, areas: (string|number)[], title, choices: {score: number, description, title}[], key: (string|number)}}
 */
function processQuestion(question) {
  const areas = makeArray(getRaw(question, 'Area', [])).map(processQuestionArea)
  const choices = makeArray(getRaw(question, 'Choice', [])).map(
    processQuestionChoice
  )

  return {
    title: getLang(question, 'Title'),
    description: getLang(question, 'Description'),
    key: getText(question, '_attributes.key', ''),
    areas,
    choices
  }
}

export default {
  json: json => {
    if (!json.SelfAssessment) {
      console.log('llala', json.SelfAssessment) // eslint-disable-line
      throw new Error('invalid XML')
    }

    const raw = json.SelfAssessment

    const result = {
      abstract: {},
      areas: makeArray(raw.Area).map(processArea),
      questions: makeArray(raw.Question).map(processQuestion)
    }

    if (raw.Abstract) {
      result.abstract.author = getText(raw, 'Abstract.Author', '')
      result.abstract.title = getLang(raw, 'Abstract.Title')
      result.abstract.description = getLang(raw, 'Abstract.Description')
      result.abstract.author = getText(raw, 'Abstract.Author._text', '')
    }

    return result
  }
}
