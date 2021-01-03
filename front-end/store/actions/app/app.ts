export function setIsMobile(isMobile) {
  return {
    type: 'SET_IS_MOBILE',
    payload: {
      isMobile
    }
  };
}

export function getDimensions(dimensions) {
  return {
    type: 'GET_DIMENSIONS',
    payload: {
      dimensions
    }
  };
}

export function resetWarnings() {
  return {
    type: 'RESET_WARNINGS'
  };
}

export function setWarnings(
  warning: string
): { type: string; payload: { warning: string } } {
  return {
    type: 'SET_WARNINGS',
    payload: {
      warning
    }
  };
}
