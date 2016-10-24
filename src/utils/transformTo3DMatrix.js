import forIn from '../core/forIn'

function _applyPropertyToMatrix (property, value, matrix) {
  switch (property) {
    case 'x':
      matrix[12] += value
      break

    case 'y':
      matrix[13] += value
      break

    case 'z':
      matrix[14] += value
      break

    case 'rotate':
      let cosValue = Math.cos(value)
      let sinValue = Math.sin(value)

      matrix[0] *= cosValue
      matrix[1] += sinValue
      matrix[4] -= sinValue
      matrix[5] *= cosValue
      break

    case 'rotateX':
      let cosValue2 = Math.cos(value)
      let sinValue2 = Math.sin(value)

      matrix[5] *= cosValue2
      matrix[6] += sinValue2
      matrix[9] -= sinValue2
      matrix[10] *= cosValue2
      break

    case 'rotateY':
      let cosValue3 = Math.cos(value)
      let sinValue3 = Math.sin(value)

      matrix[0] *= cosValue3
      matrix[2] -= sinValue3
      matrix[8] += sinValue3
      matrix[10] *= cosValue3
      break

    case 'rotateZ':
      let cosValue4 = Math.cos(value)
      let sinValue4 = Math.sin(value)

      matrix[0] *= cosValue4
      matrix[1] += sinValue4
      matrix[4] -= sinValue4
      matrix[5] *= cosValue4
      break

    case 'scale':
      matrix[0] *= value
      matrix[5] *= value
      break

    case 'scaleX':
      matrix[0] *= value
      break

    case 'scaleY':
      matrix[5] *= value
      break

    case 'scaleZ':
      matrix[10] *= value
      break

    case 'skew':
      let tanValue = Math.tan(value)

      matrix[4] += tanValue
      matrix[1] += tanValue
      break

    case 'skewX':
      matrix[4] += Math.tan(value)
      break

    case 'skewY':
      matrix[1] += Math.tan(value)
      break
  }
}

/**
 * Convert a transformation as object to a 3D matrix as object
 * @param {object} transformation - The transformation object
 * @return {Array} matrix - The 3D matrix
 */
export default function transformTo3DMatrix (transformation) {
  const matrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  forIn(transformation, (prop, value) => {
    if (typeof value === 'object') {
      forIn(value, (subProp, subValue) => {
        _applyPropertyToMatrix(prop + subProp.toUpperCase(), subValue, matrix)
      })
    } else {
      _applyPropertyToMatrix(prop, value, matrix)
    }
  })

  return matrix
}
