function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeWords(inputStr) {
    const outputArr = [];
    inputStr.split(' ').forEach(function(word) {
        outputArr.push(capitalizeFirst(word));
    });

    return outputArr.join(' ');
}

export function isNumber(input) {
    const re = /^[0-9\b]*$/;
    return re.test(input) || !input;
}