export function slugifyName(name) {
    return name.split(" ").join("-").toLowerCase();
}