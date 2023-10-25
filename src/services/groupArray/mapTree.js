// This will map through a tree array to return label, value and 
// children properties in each objects

const collector = ({ children, ...data }) => {
    // console.log(children)
    if (Array.isArray(children)) {
      if (children.length > 0) {
        return {
          label: data.name,
          value: data.id,
          children: children.map(collector)
        }
      } else {
        return {
          label: data.name,
          value: data.id,
        }
      }
    } else {
      return {
          label: data.name,
          value: data.id,
        }
    }
  }


  export default collector