import React from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeWords(inputStr) {
  const outputArr = [];
  inputStr.split(' ').forEach(function (word) {
    outputArr.push(capitalizeFirst(word));
  });

  return outputArr.join(' ');
}

export function isNumber(input) {
  const re = /^[0-9\b]*$/;
  return re.test(input) || !input;
}

/**
 * Imports all URLs in a directory
 * @param {string} r Directory to look in
 * @return {Object} Map from filename to URL
 */
export function importAll(r) {
  const images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

export function formatVulnerability(number) {
  if (number < 100) {
    return <span className="RedNumber">{number}%</span>
  } else if (number > 100) {
    return <span className="GreenNumber">{number}%</span>
  } else {
    return <span>{number}%</span>
  }
}

export function buildVulnerabilityButtons(btnName, toggleCallback, status) {
  const btnGroupName = '<>VulnerabilityOpts'.replace('<>', btnName);

  return <ButtonToolbar className="CenterToolbar paddedButton" >
    <ToggleButtonGroup type="radio" size="sm" ref={btnGroupName} name={btnGroupName} defaultValue={0}>
    <ToggleButton
        size="sm"
        onClick={toggleCallback}
        value={0}
        ref={'<>NA'.replace('<>', btnName)}
      >
        {btnName} N/A
      </ToggleButton>
      <ToggleButton
        size="sm"
        onClick={toggleCallback}
        value={1}
        ref={'<>Weak'.replace('<>', btnName)}
      >
        Weak
      </ToggleButton>
      <ToggleButton
        size="sm"
        onClick={toggleCallback}
        value={2}
        ref={'<>Neu'.replace('<>', btnName)}
      >
        Neu.
      </ToggleButton>
      <ToggleButton
        size="sm"
        onClick={toggleCallback}
        value={3}
        ref={'<>Res'.replace('<>', btnName)}
      >
        Res.
      </ToggleButton>
    </ToggleButtonGroup>
  </ButtonToolbar>
}