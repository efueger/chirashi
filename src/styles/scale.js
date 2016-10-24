import support3D from '../browser/support3D'

import scale2D from './scale2D'
import scale3D from './scale3D'

/**
* Apply the provided scale transformation (3D if supported) on each element of elements
* @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
* @param {object} transformation - The transformation object
* @param {object.scale} scale - scale option
* @param {object.scale.x} x - scaleX option
* @param {object.scale.y} y - scaleY option
* @param {object.scale.z} z - scaleZ option
* @param {object.scaleX} scaleX - scaleX option
* @param {object.scaleY} scaleY - scaleY option
* @param {object.scaleZ} scaleZ - scaleZ option
* @param {bool} [keep] - Preserve previous transformation
* @return {string | Array | NodeList | HTMLCollection} elements for chaining
*/
export default function scale (elements, transformation, keep) {
  return support3D ? scale3D(elements, transformation, keep) : scale2D(elements, transformation, keep)
}
