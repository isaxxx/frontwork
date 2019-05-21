/**
 *
 * Easing - inspired from http://gizma.com/easing/
 *
 */

'use strict';

class Easing {

  /**
   *
   * @param {number} elapsedTime
   * @param {number} currentPosition
   * @param {number} difference
   * @param {number} duration
   * @return {number} position
   *
   */

  static linear(elapsedTime, currentPosition, difference, duration) {
    return difference * elapsedTime / duration + currentPosition;
  }

  static easeInQuad(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration;
    return difference * elapsedTime * elapsedTime + currentPosition;
  }

  static easeOutQuad(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration;
    return - difference * elapsedTime * (elapsedTime - 2) + currentPosition;
  }

  static easeInOutQuad(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration / 2;
    if (elapsedTime < 1) return difference / 2 * elapsedTime * elapsedTime + currentPosition;
    elapsedTime--;
    return - difference / 2 * (elapsedTime * (elapsedTime - 2) - 1) + currentPosition;
  }

  static easeInCubic(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration;
    return difference * elapsedTime * elapsedTime * elapsedTime + currentPosition;
  }

  static easeOutCubic(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration;
    elapsedTime--;
    return difference * (elapsedTime * elapsedTime * elapsedTime + 1) + currentPosition;
  }

  static easeInOutCubic(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration / 2;
    if (elapsedTime < 1) return difference / 2 * elapsedTime * elapsedTime * elapsedTime + currentPosition;
    elapsedTime -= 2;
    return difference / 2 * (elapsedTime * elapsedTime * elapsedTime + 2) + currentPosition;
  }

  static easeInQuart(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration;
    return difference * elapsedTime * elapsedTime * elapsedTime * elapsedTime + currentPosition;
  }

  static easeOutQuart(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration;
    elapsedTime--;
    return - difference * (elapsedTime * elapsedTime * elapsedTime * elapsedTime - 1) + currentPosition;
  }

  static easeInOutQuart(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration / 2;
    if (elapsedTime < 1) return difference / 2 * elapsedTime * elapsedTime * elapsedTime * elapsedTime + currentPosition;
    elapsedTime -= 2;
    return - difference / 2 * (elapsedTime * elapsedTime * elapsedTime * elapsedTime - 2) + currentPosition;
  }

  static easeInQuint(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration;
    return difference * elapsedTime * elapsedTime * elapsedTime * elapsedTime * elapsedTime + currentPosition;
  }

  // これを全体で使っていた
  static easeOutQuint(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration;
    elapsedTime--;
    return difference * (elapsedTime * elapsedTime * elapsedTime * elapsedTime * elapsedTime + 1) + currentPosition;
  }

  static easeInOutQuint(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration / 2;
    if (elapsedTime < 1) return difference / 2 * elapsedTime * elapsedTime * elapsedTime * elapsedTime * elapsedTime + currentPosition;
    elapsedTime -= 2;
    return difference / 2 * (elapsedTime * elapsedTime * elapsedTime * elapsedTime * elapsedTime + 2) + currentPosition;
  }

  static easeInSine(elapsedTime, currentPosition, difference, duration) {
    return - difference * Math.cos(elapsedTime / duration * (Math.PI / 2)) + difference + currentPosition;
  }

  static easeOutSine(elapsedTime, currentPosition, difference, duration) {
    return difference * Math.sin(elapsedTime / duration * (Math.PI / 2)) + currentPosition;
  }

  static easeInOutSine(elapsedTime, currentPosition, difference, duration) {
    return - difference / 2 * (Math.cos(Math.PI * elapsedTime / duration) - 1) + currentPosition;
  }

  static easeInExpo(elapsedTime, currentPosition, difference, duration) {
    return difference * Math.pow(2, 10 * (elapsedTime / duration - 1)) + currentPosition;
  }

  static easeOutExpo(elapsedTime, currentPosition, difference, duration) {
    return difference * (- Math.pow(2, -10 * elapsedTime / duration) + 1) + currentPosition;
  }

  static easeInOutExpo(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration / 2;
    if (elapsedTime < 1) return difference / 2 * Math.pow(2, 10 * (elapsedTime - 1)) + currentPosition;
    elapsedTime--;
    return difference / 2 * (- Math.pow(2, -10 * elapsedTime) + 2) + currentPosition;
  }

  static easeInCirc(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration;
    return - difference * (Math.sqrt(1 - elapsedTime * elapsedTime) - 1) + currentPosition;
  }

  static easeOutCirc(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration;
    elapsedTime--;
    return difference * Math.sqrt(1 - elapsedTime * elapsedTime) + currentPosition;
  }

  static easeOutCirc(elapsedTime, currentPosition, difference, duration) {
    elapsedTime /= duration / 2;
    if (elapsedTime < 1) return - difference / 2 * (Math.sqrt(1 - elapsedTime * elapsedTime) - 1) + currentPosition;
    elapsedTime -= 2;
    return difference / 2 * (Math.sqrt(1 - elapsedTime * elapsedTime) + 1) + currentPosition;
  }

}

export default Easing;
