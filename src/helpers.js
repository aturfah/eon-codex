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