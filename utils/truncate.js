export default function(string, stringLength) {
    if (string.length > stringLength) {
        return string.slice(0, stringLength) + "...";
    } else {
        return string;
    }
}