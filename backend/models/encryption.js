const encrypt = (text) => {
    var [ text, shift ] = text.split(" ");
    shift = parseInt(shift)
    if (shift == 0) { shift = 10; }
    return "String: "+text+" | "+"Key: "+shift+" | "+"Encrypted: "+String.fromCharCode(
    ...text.split('').map(char => ((char.charCodeAt() - 97 + shift) % 26) + 97),
    );
};

module.exports = {
    encrypt: encrypt
};