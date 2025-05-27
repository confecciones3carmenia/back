  export const toLowerCaseObject = (obj: any) => {
    const objUserLowerCase: any = {} 
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        const value = obj[prop] 
        objUserLowerCase[prop] = typeof obj[prop] === 'string' ? obj[prop].toLowerCase() : obj[prop] 
      }
    }
    return objUserLowerCase 
  } 
  
