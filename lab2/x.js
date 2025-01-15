console.log(result);
const birthDate = new Date(users.map(function (args) {
    const birthDate = new Date(args.dob); 
    const today = new Date(); 
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
        today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

console.log(`the age ${age}`);
    
})); 

