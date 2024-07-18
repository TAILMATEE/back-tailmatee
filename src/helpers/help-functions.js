
export const obtainExtensionFiles = (fileName) => {
    let extension = '';
    for (let i = fileName.length - 1; i >= 0; i--) {
        if (fileName[i] === '.') {
            return extension;
        } else {
            extension += fileName[i]
        }
    }
}

export const calculatedAge = (birthDate) => {
    const actualDate = new Date();
    let age=0;
    if (actualDate.getDate() == birthDate.getDate() && actualDate.getMonth() + 1 == birthDate.getMonth()+1) {
        age = actualDate.getFullYear() - birthDate.getFullYear();
    }else{
        age = actualDate.getFullYear() - birthDate.getFullYear() - 1;
    }
    console.log(age);  
    return age;
}