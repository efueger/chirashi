import isIPad          from './isIPad'
import isAndroidTablet from './isAndroidTablet'
import isWindowsTablet from './isWindowsTablet'

/**
 * Variable true if the device is a tablet based on User Agent.
 */
var isTablet = isIPad || isAndroidTablet || isWindowsTablet

export default isTablet
