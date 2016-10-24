import ua from './ua'
import isAndroid from './isAndroid'

/** Variable true if the device is an Android Tablet based on User Agent. */
const isAndroidTablet = isAndroid && !/mobile/i.test(ua)

export default isAndroidTablet
