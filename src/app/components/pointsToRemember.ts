				// function to convert the object into an array

			export default	function pointsToRemember({obj}:{obj:{first:string, second:string, third:string, fourth:string}}) {
					const values = Object.values(obj);
					const nonEmptyValues:string[] = values.filter(value => value !== '');
				    
					if (nonEmptyValues.length === 0) {
					  return []; // Return an empty array for an empty object
					}
				    
					  // Return all non-empty values (up to 4)
					console.log([...nonEmptyValues])
					return [...nonEmptyValues];
				    }
