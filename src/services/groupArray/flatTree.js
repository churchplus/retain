// This will flatten a hierarchical or tree array

const flatten = (level = 0) => ({ children = [], ...object }) => [
    { ...object, level }, ...children.flatMap(flatten(level + 1))
];

export default flatten